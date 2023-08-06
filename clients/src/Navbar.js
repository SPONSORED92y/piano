import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from './CurrentUserContext';
const Navbar = () => {
    const { currentUser } = useContext(CurrentUserContext);

    return (
        <nav className="navbar">
            <div className="links">
                <Link to="/">首頁</Link>
                {currentUser && <Link to="/list">琴譜列表</Link>}
                {currentUser && <Link to="/reserve">預約琴房</Link>}
                <Link to="/about">關於</Link>
                {!currentUser && <Link to="/login">登入</Link>}
                {currentUser && <Link to="/logout">登出</Link>}
                {!currentUser && <Link to="/signup">註冊</Link>}
                {currentUser && <Link to="/profile">個人檔案</Link>}
            </div>
        </nav>
    );
}

export default Navbar;