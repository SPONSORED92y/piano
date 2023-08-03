import { useEffect, useState, useContext } from "react";
import useCookie from "./useCookie";
import Popup from "./Popup";
import CurrentUserContext from './CurrentUserContext';
import { useNavigate } from "react-router-dom";
const Reserve = () => {
    const getCookie = useCookie()
    const navigate = useNavigate()
    const [boxes, setBoxes] = useState([])
    const [week, setWeek] = useState(1)
    const [room, setRoom] = useState(1)
    const [popupVisibility, setPopupVisibility] = useState([])
    const [user, setUser] = useState({})
    const [signalRerender, setSignalRerender] = useState(false)

    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    useEffect(() => {
        let vis112 = []
        for (let i = 0; i < 112; i++) {
            vis112.push(false)
        }
        setPopupVisibility(vis112)


    }, [])
    const flipPopupVisibility = (period) => {
        let newVis112 = popupVisibility;
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
        fetch('http://localhost:9000/user', {
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
        setCurrentUser(getCookie('currentUser'))
        if (currentUser) {
            fetch('http://localhost:9000/reservePage', {
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
        if (currentUser) {
            if (currentUser === 'Admin') {
                flipPopupVisibility(box.period)
            } else {
                if (user.username === box.user) {
                    flipPopupVisibility(box.period)
                } else if (box.user === '' && user.times > 0 && box.status === 'Available' && box.week === 2) {
                    flipPopupVisibility(box.period)
                }
            }
        }
    }

    return (
        <div className='reserve'>
            <h1>預約琴房</h1>
            <div>
                <div>姓名:{user.username}</div>
                <div>本週剩餘次數:{user.times}</div>
            </div>
            <div>
                <span onClick={() => { setWeek(1) }}>本周</span>
                <span onClick={() => { setWeek(2) }}>下周</span>
                <div>week: {week}</div>
            </div>
            <div>
                <span onClick={() => { setRoom(1) }}>琴房一</span>
                <span onClick={() => { setRoom(2) }}>琴房二</span>
                <span onClick={() => { setRoom(3) }}>琴房三</span>
                <div>room: {room}</div>
            </div>
            <div><span className='daysOfWeek'>      </span><span className='daysOfWeek'>星期一</span><span className='daysOfWeek'>星期二</span><span className='daysOfWeek'>星期三</span><span className='daysOfWeek'>星期四</span><span className='daysOfWeek'>星期五</span><span className='daysOfWeek'>星期六</span><span className='daysOfWeek'>星期日</span></div>
            <div className="columnContainer">
                <div className="column">
                    <div>{periodList[0]}</div><div>{periodList[1]}</div><div>{periodList[2]}</div><div>{periodList[3]}</div><div>{periodList[4]}</div><div>{periodList[5]}</div><div>{periodList[6]}</div><div>{periodList[7]}</div><div>{periodList[8]}</div><div>{periodList[9]}</div><div>{periodList[10]}</div><div>{periodList[11]}</div><div>{periodList[12]}</div><div>{periodList[13]}</div><div>{periodList[14]}</div><div>{periodList[15]}</div>
                </div>
                {boxes.map(box16 => (
                    <div className="column" key={box16[0]._id}>
                        <div className="box">{box16.map(box => (
                            <div key={box._id}>
                                <div onClick={() => handleClick(box)} style={{ backgroundColor: (box.status === 'Available') ? 'white' : ((box.status === 'Not Available') ? 'gray' : ((box.user === user.username) ? 'rgb(84, 219, 136)' : 'rgb(60, 138, 216)')) }}>{box.user ? box.user : "____"}</div>
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
                    </div>))}
            </div>
        </div>
    );
}

export default Reserve;