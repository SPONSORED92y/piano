import { useEffect, useState, useContext } from "react"
import CurrentUserContext from './CurrentUserContext'
import { useNavigate } from "react-router-dom"
import Variable from './Variable'
const Reserve = () => {
    const navigate = useNavigate()

    const [week, setWeek] = useState(1)
    const [room, setRoom] = useState(1)
    const [boxes, setBoxes] = useState([])
    const [user, setUser] = useState({})
    const [today, setDate] = useState(new Date())
    const [disablePage, setDisablePage] = useState(false)
    const [signalRerender, setSignalRerender] = useState(false)
    // popup
    const [focusBox, setFocusBox] = useState(null)
    const [positionTop, setPositionTop] = useState(0)
    const [positionLeft, setPositionLeft] = useState(0)
    const [status, setStatus] = useState('Available')
    const [boxUser, setBoxUser] = useState('')
    const [enabled, setEnabled] = useState(true)
    const [updateError, setUpdateError] = useState('')

    const { currentUser } = useContext(CurrentUserContext)

    const periodList = ['08:00 ~ 09:00', '09:00 ~ 10:00', '10:00 ~ 11:00', '11:00 ~ 12:00', '12:00 ~ 13:00', '13:00 ~ 14:00', '14:00 ~ 15:00', '15:00 ~ 16:00', '16:00 ~ 17:00', '17:00 ~ 18:00', '18:00 ~ 19:00', '19:00 ~ 20:00', '20:00 ~ 21:00', '21:00 ~ 22:00', '22:00 ~ 23:00', '23:00 ~ 24:00']

    //time
    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date())
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])
    const specific = today.toLocaleDateString('roc', { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const day = today.getDay()
    const hour = today.getHours()
    const minute = today.getMinutes()
    const second = today.getSeconds()

    useEffect(() => {
        if (!Variable.getCookie('currentUser')) {
            navigate('/logout')
        }
        if (day === 7 && hour === 23 && minute === 59 && second === 59) {
            // console.log('updating')
            setDisablePage(true)
        }
        if (day === 1 && hour === 8 && minute === 0 && second === 0) {
            // console.log('done updating')
            setDisablePage(false)
        }
    }, [today])

    useEffect(() => {
        //fetch user data
        fetch(`${Variable.serverURL}/user`, {
            mode: "cors",
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })
            .catch(err => {
                console.log(err)
                navigate('/login')
            })

    }, [signalRerender])

    useEffect(() => {
        console.log('render')
        fetch(`${Variable.serverURL}/reservePage`, {
            mode: "cors",
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ week, room })
        })
            .then(res => res.json())
            .then(data => {
                setBoxes(data)
            })
            .catch(err => { console.log(err) })
    }, [week, room, signalRerender])

    useEffect(() => {
        if (status !== 'Occupied') {
            if (boxUser !== '') {
                setEnabled(false)
                setUpdateError('只有已預約狀態可以有使用者')
            } else {
                setEnabled(true)
                setUpdateError('')
            }
        } else {
            if (boxUser === '') {
                setEnabled(false)
                setUpdateError('已預約狀態使用者不得為空')
            } else {
                setEnabled(true)
                setUpdateError('')
            }
        }
    }, [status, boxUser])

    const handleClickBox = (period) => {
        if (!disablePage) {
            var offsets = document.getElementById(`box_${period}`).getBoundingClientRect();
            if (currentUser === 'Admin') {
                setFocusBox(period)
                setPositionTop(offsets.top)
                setPositionLeft(offsets.left)
                setStatus(boxes[period - 1].status)
                setBoxUser(boxes[period - 1].user)
            } else {
                if (user) {
                    if (user.username === boxes[period - 1].user) {
                        setFocusBox(period)
                        setPositionTop(offsets.top)
                        setPositionLeft(offsets.left)
                    } else if (boxes[period - 1].user === '' && user.times > 0 && boxes[period - 1].status === 'Available' && boxes[period - 1].week === 2) {
                        setFocusBox(period)
                        setPositionTop(offsets.top)
                        setPositionLeft(offsets.left)
                    }
                }
            }
        }
    }

    const handleClickGoodButton = async (action) => {
        try {
            const res = await fetch(`${Variable.serverURL}/reserve`, {
                mode: "cors",
                method: action,
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: boxes[focusBox - 1]._id })
            })
            if (res.ok) {
                setFocusBox(null)
                setSignalRerender(!signalRerender)
                if (status === 'Available') {
                    console.log('reserve successful')
                } else {
                    console.log('cancel successful')
                }
            } else {
                const data = await res.json()
                console.log(data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmitUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${Variable.serverURL}/reserve`, {
                mode: "cors",
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: boxes[focusBox - 1]._id, status, boxUser })
            })
            if (res.ok) {
                setFocusBox(null)
                console.log('update successful')
                setSignalRerender(!signalRerender)
            } else {
                const data = await res.json()
                console.log(data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const goodButton = () => {//(?
        if (boxes[focusBox - 1].status === 'Not Available') {
            return
        } else if (boxes[focusBox - 1].status === 'Occupied') {
            if (user && boxes[focusBox - 1].user === user.username) {
                return (<div className="goodButton" onClick={() => handleClickGoodButton('DELETE')}>取消預約</div>)
            }
        } else if (boxes[focusBox - 1].status === 'Available' && week === 2) {
            if (user.times > 0) {
                return (<div className="goodButton" onClick={() => handleClickGoodButton('POST')}>預約</div>)
            } else {
                return (<div className="goodButton">已沒有預約次數</div>)
            }
        } else {
            return
        }
    }

    return (
        <div className='reserve'>
            <h1>預約琴房</h1>
            {disablePage && <div className="notReserveTime">非預約時段</div>}
            <div className="bigBox">
                <div className="colLeft">
                    <div className="weekContainer">
                        <span className="week" style={{ backgroundColor: (week === 1) ? "#47deec" : "white" }} onClick={() => { setWeek(1) }}>本周</span>
                        <span className="week" style={{ backgroundColor: (week === 2) ? "#47deec" : "white" }} onClick={() => { setWeek(2) }}>下周</span>
                        <span className="reserveRules">預約規則?</span>
                    </div>
                    <div className="roomContainer">
                        <span className="room" style={{ backgroundColor: (room === 1) ? "#47deec" : "white" }} onClick={() => { setRoom(1) }}>琴房一</span>
                        <span className="room" style={{ backgroundColor: (room === 2) ? "#47deec" : "white" }} onClick={() => { setRoom(2) }}>琴房二</span>
                        <span className="room" style={{ backgroundColor: (room === 3) ? "#47deec" : "white" }} onClick={() => { setRoom(3) }}>琴房三</span>
                    </div>
                </div>
                <div className="colRight">
                    <div className="clock">現在時間 :  {specific}</div>
                    <div className="name">姓名 :  {user && user.username}</div>
                    <div className="count">本週剩餘次數 :  {user && user.times}</div>
                </div>
            </div>
            {boxes &&
                <div className="tableContainer">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>星期一</th>
                                <th>星期二</th>
                                <th>星期三</th>
                                <th>星期四</th>
                                <th>星期五</th>
                                <th>星期六</th>
                                <th>星期日</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15).map(i => (
                                    <tr key={i}>
                                        <th>{periodList[i]}</th>
                                        {Array(1, 17, 33, 49, 65, 81, 97).map(j => (<td key={i + j} ><div id={`box_${i + j}`} className="box" onClick={() => handleClickBox(i + j)}>{boxes[i + j - 1] && boxes[i + j - 1].user}</div></td>))}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>}
            {/* popup */}
            {focusBox && <div className="popupContainer" style={{ top: positionTop + 32, left: positionLeft - 20 }}>
                <div>預約</div>
                <div>時段:{periodList[((focusBox - 1) % 16)]}</div>
                <div className="closeButton" onClick={() => { setFocusBox(null) }}>關閉</div>
                {goodButton()}
                {currentUser === 'Admin' &&
                    <form onSubmit={handleSubmitUpdate}>
                        <label>狀態:</label>
                        <select value={status}
                            onChange={(e) => setStatus(e.target.value)}>
                            <option value='Available'>開放預約</option>
                            <option value='Not Available'>暫停使用</option>
                            <option value='Occupied'>已預約</option>
                        </select>
                        <label>使用者:</label>
                        <input
                            type="text"
                            value={boxUser}
                            onChange={(e) => setBoxUser(e.target.value)}
                        />
                        <div>{updateError}</div>
                        <button disabled={!enabled}>更新</button>
                    </form>}
            </div >}
            {focusBox && <div className="backCover"></div>}

        </div >
    )
}

export default Reserve