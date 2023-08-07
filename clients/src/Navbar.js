import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from './CurrentUserContext';
const Navbar = () => {
    const { currentUser } = useContext(CurrentUserContext);

    return (
        <nav className="navbar">
            <div className="home"><Link to="/">首頁</Link></div>
            {currentUser && <div className="list"><Link to="/list">琴譜列表</Link></div>}
            {currentUser && <div className="reserve"><Link to="/reserve">預約琴房</Link></div>}
            <div className="about"><Link to="/about">關於</Link></div>
            {!currentUser && <div className="login"><Link to="/login">登入</Link></div>}
            {currentUser && <div className="logout"><Link to="/logout">登出</Link></div>}
            {!currentUser && <div className="signup"><Link to="/signup">註冊</Link></div>}
            {currentUser && <div className="profile"><Link to="/profile">個人檔案</Link></div>}
        </nav>
    );
}

export default Navbar;