import { useEffect, useState, useContext } from "react"
import CurrentUserContext from './CurrentUserContext'
import LangContext from "./LangContext"
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
    //rule help popup
    const [visible, setVisible] = useState('hidden')

    const { currentUser } = useContext(CurrentUserContext)
    const { language } = useContext(LangContext)

    const periodList = ['08:00 ~ 09:00', '09:00 ~ 10:00', '10:00 ~ 11:00', '11:00 ~ 12:00', '12:00 ~ 13:00', '13:00 ~ 14:00', '14:00 ~ 15:00', '15:00 ~ 16:00', '16:00 ~ 17:00', '17:00 ~ 18:00', '18:00 ~ 19:00', '19:00 ~ 20:00', '20:00 ~ 21:00', '21:00 ~ 22:00', '22:00 ~ 23:00', '23:00 ~ 24:00']

    const specific = today.toLocaleDateString('roc', { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    //time
    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date())
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        //console.log(today.getDay(), today.getHours(), today.getMinutes(), today.getSeconds())
        if (!Variable.getCookie('currentUser')) {
            navigate('/logout')
        }
        if (today.getDay() === 1 && today.getHours() < 8) {
            // //console.log('updating')
            setDisablePage(true)
        }
        if (today.getDay() === 1 && today.getHours() >= 8) {
            // //console.log('done updating')
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
                //console.log(err)
                navigate('/login')
            })

    }, [signalRerender])

    useEffect(() => {
        //console.log('render')
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
            .catch(err => { //console.log(err)
            })
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
                setPositionTop(offsets.top + window.scrollY)
                setPositionLeft(offsets.left + window.scrollX)
                setStatus(boxes[period - 1].status)
                setBoxUser(boxes[period - 1].user)
            } else {
                if (user) {
                    if (user.username === boxes[period - 1].user) {
                        setFocusBox(period)
                        setPositionTop(offsets.top + window.scrollY)
                        setPositionLeft(offsets.left + window.scrollX)
                    } else if (boxes[period - 1].user === '' && user.times > 0 && boxes[period - 1].status === 'Available' && boxes[period - 1].week === 2) {
                        setFocusBox(period)
                        setPositionTop(offsets.top + window.scrollY)
                        setPositionLeft(offsets.left + window.scrollX)
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
                    //console.log('reserve successful')
                } else {
                    //console.log('cancel successful')
                }
            } else {
                const data = await res.json()
                //console.log(data)
            }
        } catch (err) {
            //console.log(err)
        }
    }

    const handleSubmitUpdate = async () => {
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
                //console.log('update successful')
                setSignalRerender(!signalRerender)
            } else {
                const data = await res.json()
                //console.log(data)
            }
        } catch (err) {
            //console.log(err)
        }
    }

    const goodButton = () => {
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
                return (<div className="goodButton">{language === 'zh' ? "已沒有預約次數" : 'You don\'t have any reservaion points'}</div>)
            }
        } else {
            return
        }
    }

    return (
        <div className='reserve'>
            <h1>{language === 'zh' ? "預約琴房" : 'Piano Room Resrvation'}</h1>
            {disablePage && <div className="notReserveTime">{language === 'zh' ? "非預約時段" : 'Its Not Reservation Stage Now '}</div>}
            <div className="backCover" onClick={() => { setVisible('hidden') }} style={{ visibility: visible }}></div>
            <div className="rulePopup" style={{ visibility: visible }}>
                {language === 'zh' ?
                    <div>
                        <h3>預約規則</h3>
                        <div>只能預約下周的琴房,當周可以取消</div>
                        <div>每人每周有七個預約次數</div>
                        <div>每周一00:00~8:00停止預約功能,8:00重新開放,並且可預約新一周的琴房</div>
                    </div>
                    :
                    <div>
                        <h3>Reservation Rules</h3>
                        <div>You can only reserve next week's piano room</div>
                        <div>Everyone has 7 reservation points per week</div>
                        <div>00:00~8:00 Every Monday the reservation function is stoped, and will reopen at 8:00. You can reserve next week's room from here</div>
                    </div>}
            </div>

            <div className="bigBox">
                <div className="colLeft">
                    <div className="weekContainer">
                        <span className="week" style={{ backgroundColor: (week === 1) ? "var(--GRAY)" : "var(--LIGHT_PINK)", color: (week === 1) ? "var(--LIGHT_PINK)" : "var(--GRAY)" }} onClick={() => { setWeek(1) }}>{language === 'zh' ? "本周" : 'This Week'}</span>
                        <span className="week" style={{ backgroundColor: (week === 2) ? "var(--GRAY)" : "var(--LIGHT_PINK)", color: (week === 2) ? "var(--LIGHT_PINK)" : "var(--GRAY)" }} onClick={() => { setWeek(2) }}>{language === 'zh' ? "下周" : 'Next Week'}</span>
                        <span className="reserveRules" onClick={() => { setVisible('visible') }}>{language === 'zh' ? "預約規則?" : 'Rules?'}</span>
                    </div>
                    <div className="roomContainer">
                        <span className="room" style={{ backgroundColor: (room === 1) ? "var(--GRAY)" : "var(--LIGHT_PINK)", color: (room === 1) ? "var(--LIGHT_PINK)" : "var(--GRAY)" }} onClick={() => { setRoom(1) }}>{language === 'zh' ? "琴房一" : 'Room 1'}</span>
                        <span className="room" style={{ backgroundColor: (room === 2) ? "var(--GRAY)" : "var(--LIGHT_PINK)", color: (room === 2) ? "var(--LIGHT_PINK)" : "var(--GRAY)" }} onClick={() => { setRoom(2) }}>{language === 'zh' ? "琴房二" : 'Room 2'}</span>
                        <span className="room" style={{ backgroundColor: (room === 3) ? "var(--GRAY)" : "var(--LIGHT_PINK)", color: (room === 3) ? "var(--LIGHT_PINK)" : "var(--GRAY)" }} onClick={() => { setRoom(3) }}>{language === 'zh' ? "琴房三" : 'Room 3'}</span>
                    </div>
                </div>
                <div className="colRight">
                    <div className="clock">{language === 'zh' ? "現在時間 :  " : 'System Time : '}{specific}</div>
                    <div className="name">{language === 'zh' ? "姓名 :  " : 'Name : '}{user && user.username}</div>
                    <div className="count">{language === 'zh' ? "本週剩餘次數 :  " : 'Reserve Points :  '}{user && user.times}</div>
                </div>
            </div>
            {boxes &&
                <div className="tableContainer">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ paddingBottom: '4px' }}></th>
                                <th style={{ paddingBottom: '4px' }}>{language === 'zh' ? "星期一" : 'Monday'}</th>
                                <th style={{ paddingBottom: '4px' }}>{language === 'zh' ? "星期二" : 'Tuesday'}</th>
                                <th style={{ paddingBottom: '4px' }}>{language === 'zh' ? "星期三" : 'Wednesday'}</th>
                                <th style={{ paddingBottom: '4px' }}>{language === 'zh' ? "星期四" : 'Thursday'}</th>
                                <th style={{ paddingBottom: '4px' }}>{language === 'zh' ? "星期五" : 'Friday'}</th>
                                <th style={{ paddingBottom: '4px' }}>{language === 'zh' ? "星期六" : 'Saturday'}</th>
                                <th style={{ paddingBottom: '4px' }}>{language === 'zh' ? "星期日" : 'Sunday'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15).map(i => (
                                    <tr key={i}>
                                        <th className="hourInterval">{periodList[i]}</th>
                                        {Array(1, 17, 33, 49, 65, 81, 97).map(j => (<td key={i + j} style={{ fontWeight: (boxes[i + j - 1] && boxes[i + j - 1].status === 'Not Available') ? '700' : '400' }}><div id={`box_${i + j}`} className="box" onClick={() => handleClickBox(i + j)}>{boxes[i + j - 1] && ((boxes[i + j - 1].status === 'Not Available') ? '暫停使用' : boxes[i + j - 1].user)}</div></td>))}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>}
            {/* popup */}
            {focusBox && <div className="popupContainer" style={{ top: positionTop + 32, left: positionLeft - 30 }}>
                <div >預約</div>
                <div>{periodList[((focusBox - 1) % 16)]}</div>
                <div className="closeButton" onClick={() => { setFocusBox(null) }}>關閉</div>
                {goodButton()}
                {currentUser === 'Admin' &&
                    <form onSubmit={handleSubmitUpdate}>
                        <div className="divider"></div>
                        <label>狀態</label>
                        <select value={status}
                            onChange={(e) => setStatus(e.target.value)}>
                            <option value='Available'>開放預約</option>
                            <option value='Not Available'>暫停使用</option>
                            <option value='Occupied'>已預約</option>
                        </select>
                        <label>使用者</label>
                        <input
                            type="text"
                            value={boxUser}
                            onChange={(e) => setBoxUser(e.target.value)}
                        />
                        <div>{updateError}</div>
                        <div className="updateButton" disabled={!enabled} onClick={() => handleSubmitUpdate()}>更新</div>
                    </form>}
            </div >}
            {focusBox && <div className="backCover" onClick={() => { setFocusBox(null) }}></div>}

        </div >
    )
}
export default Reserve