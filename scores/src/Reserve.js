import { useEffect, useState, useContext } from "react";
import useCookie from "./useCookie";
import CurrentUserContext from './CurrentUserContext';
const Reserve = () => {
    const [boxes, setBoxes] = useState([])
    const [week, setWeek] = useState(1)
    const [room, setRoom] = useState(1)

    const {
        currentUser,
        setCurrentUser
    } = useContext(CurrentUserContext);
    const getCookie = useCookie()
    useEffect(() => {
        setCurrentUser(getCookie('currentUser'))
        if (currentUser) {
            fetch('http://localhost:8000/reservePage', {
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
                        data.slice(1, 17),
                        data.slice(17, 33),
                        data.slice(33, 49),
                        data.slice(49, 65),
                        data.slice(65, 81),
                        data.slice(81, 97),
                        data.slice(97, 113),
                    ])
                })
                .catch(err => { console.log(err) })
        }
    }, [getCookie, currentUser, setCurrentUser, week, room])



    return (
        <div className='reserve'>
            <h1>預約琴房</h1>
            <div>
                <span onClick={() => { setWeek(1) }}>本周</span>
                <span onClick={() => { setWeek(2) }}>下周</span>
                <span onClick={() => { setWeek(3) }}>下下周</span>
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
                    <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div><div>10</div><div>11</div><div>12</div><div>13</div><div>14</div><div>15</div><div>16</div>
                </div>
                {boxes.map(box16 => (
                    <div className="column" key={box16[0].period}>
                        <div className="box">{box16.map(box => (<div key={box.period}>{box.user}</div>))}</div>
                    </div>))}
            </div>
        </div>
    );
}

export default Reserve;