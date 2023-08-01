import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import useCookie from "./useCookie";
import CurrentUserContext from './CurrentUserContext';
const Navbar = () => {
    const {
        currentUser,
        setCurrentUser
    } = useContext(CurrentUserContext);
    const getCookie = useCookie()

    useEffect(() => {
        setCurrentUser(getCookie('currentUser'))
    }, [getCookie, setCurrentUser])
    return (
        <nav className="navbar">
            <div className="links">
                <Link to="/">首頁</Link>
                {currentUser && <Link to="/list">琴譜列表</Link>}
                <Link to="/about">關於</Link>
                {!currentUser && <Link to="/login">登入</Link>}
                {currentUser && <Link to="/logout">登出</Link>}
                {!currentUser && <Link to="/signup">註冊</Link>}
            </div>
        </nav>
    );
}

export default Navbar;