import { useEffect, useState, useContext } from "react";
import useCookie from "./useCookie";
import CurrentUserContext from './CurrentUserContext';
const Reserve = () => {

    const {
        currentUser,
        setCurrentUser
      } = useContext(CurrentUserContext);
      const getCookie = useCookie()
      useEffect(() => {
        setCurrentUser(getCookie('currentUser'))
    }, [getCookie, setCurrentUser])

    const { error, isPending, data } = useFetch('http://localhost:8000/reserve');
    cosnt [week,setWeek]=useState(1)
    cosnt [room,setRoom]=useState(1)

    return (
        <div className='reserve'>
<h1>預約琴房</h1>
<div>
    <div onClick={()=>{setWeek(1)}}>本周</div>
    <div onClick={()=>{setWeek(2)}}>下周</div>
    <div onClick={()=>{setWeek(3)}}>下下周</div>
    <div>week: {week}</div>
</div>
<div>
    <div onClick={()=>{setRoom(1)}}>琴房一</div>
    <div onClick={()=>{setRoom(2)}}>琴房二</div>
    <div onClick={()=>{setRoom(3)}}>琴房三</div>
    <div>room: {room}</div>
</div>
        </div>
      );
}
 
export default Reserve;