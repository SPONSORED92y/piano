import { Link } from "react-router-dom"
import { useContext } from "react"
import CurrentUserContext from './CurrentUserContext'
const Navbar = () => {
    const { currentUser } = useContext(CurrentUserContext)

    return (
        <nav className="navbar">
            <img src="title.jpg" alt="title" width="504.5" height="50"></img>
            {!currentUser && <div className="login"><Link to="/login">登入</Link></div>}
            {currentUser && <div className="logout"><Link to="/logout">登出</Link></div>}
            {currentUser && <div className="profile"><Link to="/profile">個人檔案</Link></div>}
            {currentUser && <div className="reserve"><Link to="/reserve">預約琴房</Link></div>}
            {currentUser && <div className="list"><Link to="/list">琴譜列表</Link></div>}
            {currentUser && currentUser === 'Admin' && <div className="userList"><Link to="/userList">使用者列表</Link></div>}
            <div className="news"><Link to="/news">最新消息</Link></div>
            <div className="home"><Link to="/">首頁</Link></div>
        </nav>
    )
}

export default Navbar