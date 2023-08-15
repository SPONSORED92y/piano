import { useEffect, useState, useContext } from "react"
import Popup from "./Popup"
import CurrentUserContext from './CurrentUserContext'
import { useNavigate } from "react-router-dom"
import Variable from './Variable'
const Reserve = () => {
    const navigate = useNavigate()

    const [boxes, setBoxes] = useState([])
    const [week, setWeek] = useState(1)
    const [room, setRoom] = useState(1)
    const [popupVisibility, setPopupVisibility] = useState([])
    const [user, setUser] = useState({})
    const [signalRerender, setSignalRerender] = useState(false)
    const [today, setDate] = useState(new Date())
    const [disablePage, setDisablePage] = useState(false)


    const { currentUser } = useContext(CurrentUserContext)

    useEffect(() => {
        let vis112 = []
        for (let i = 0; i < 112; i++) {
            vis112.push(false)
        }
        setPopupVisibility(vis112)


    }, [])
    const flipPopupVisibility = (period) => {
        let newVis112 = popupVisibility
        newVis112[period - 1] = !newVis112[period - 1]
        setPopupVisibility(newVis112)
        flipSignal()
    }
    const flipSignal = () => {
        setSignalRerender(!signalRerender)
    }

    useEffect(() => {
        console.log('render')
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
        if (currentUser) {
            fetch(`${Variable.serverURL}/reservePage`, {
                mode: "cors",
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ week, room })
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    setBoxes([
                        data.slice(0, 16),
                        data.slice(16, 32),
                        data.slice(32, 48),
                        data.slice(48, 64),
                        data.slice(64, 80),
                        data.slice(80, 96),
                        data.slice(96, 112),
                    ])
                })
                .catch(err => { console.log(err) })
            // console.log(popupVisibility)

        } else {
            navigate('/login')
        }
    }, [signalRerender, week, room])

    const periodList = ['08:00 ~ 09:00', '09:00 ~ 10:00', '10:00 ~ 11:00', '11:00 ~ 12:00', '12:00 ~ 13:00', '13:00 ~ 14:00', '14:00 ~ 15:00', '15:00 ~ 16:00', '16:00 ~ 17:00', '17:00 ~ 18:00', '18:00 ~ 19:00', '19:00 ~ 20:00', '20:00 ~ 21:00', '21:00 ~ 22:00', '22:00 ~ 23:00', '23:00 ~ 24:00']


    const handleClick = (box) => {
        if (!disablePage) {
            if (currentUser) {
                if (currentUser === 'Admin') {
                    flipPopupVisibility(box.period)
                } else {
                    if (user) {
                        if (user.username === box.user) {
                            flipPopupVisibility(box.period)
                        } else if (box.user === '' && user.times > 0 && box.status === 'Available' && box.week === 2) {
                            flipPopupVisibility(box.period)
                        }
                    } else {
                        navigate('/login')
                    }
                }
            }
        }
    }

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
        if (day === 7 && hour === 23 && minute === 59 && second === 59) {
            // console.log('updating')
            setDisablePage(true)
        }
        if (day === 1 && hour === 8 && minute === 0 && second === 0) {
            // console.log('done updating')
            setDisablePage(false)
        }
    }, [today])

    return (
        <div className='reserve'>
            <h1>預約琴房</h1>
            {disablePage && <div style={{ "color": "red" }}>非預約時段</div>}
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
            <div className="tableContainer">
                <div className="daysOfWeek"><span><div style={{ visibility: 'hidden' }}>佔位子</div></span><span>星期一</span><span >星期二</span><span>星期三</span><span >星期四</span><span>星期五</span><span>星期六</span><span >星期日</span></div>
                <div className="columnContainer">
                    <div className="columnPeriod">
                        <div>{periodList[0]}</div><div>{periodList[1]}</div><div>{periodList[2]}</div><div>{periodList[3]}</div><div>{periodList[4]}</div><div>{periodList[5]}</div><div>{periodList[6]}</div><div>{periodList[7]}</div><div>{periodList[8]}</div><div>{periodList[9]}</div><div>{periodList[10]}</div><div>{periodList[11]}</div><div>{periodList[12]}</div><div>{periodList[13]}</div><div>{periodList[14]}</div><div>{periodList[15]}</div>
                    </div>
                    {boxes.map(box16 => (
                        <div className="column" key={box16[0]._id}>
                            {box16.map(box => (
                                <div key={box._id}>
                                    {/* <div className="box" onClick={() => handleClick(box)} style={{ backgroundColor: (box.status === 'Available') ? 'white' : ((box.status === 'Not Available') ? 'gray' : ((user && (box.user === user.username)) ? 'rgb(84, 219, 136)' : 'rgb(60, 138, 216)')) }}>{box.user ? box.user : <div style={{ visibility: 'hidden' }}>佔位子</div>}</div> */}
                                    <div className="box" onClick={() => handleClick(box)}>{box.user ? box.user : <div style={{ visibility: 'hidden' }}>佔位子</div>}</div>
                                    <Popup
                                        visibility={popupVisibility[box.period - 1]}
                                        id={box._id}
                                        status={box.status}
                                        boxUser={box.user}
                                        user={user}
                                        period={box.period}
                                        periodList={periodList}
                                        flipPopupVisibility={flipPopupVisibility}
                                        flipSignal={flipSignal}
                                        week={week}
                                    />
                                </div>))}
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default Reserve