import { useContext, useState } from "react"
import CurrentUserContext from './CurrentUserContext'
import LangContext from './LangContext'
import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(CurrentUserContext)
    const { language, setLanguage } = useContext(LangContext)
    const [optionVisible, setOptionVisible] = useState('hidden')

    return (
        <nav className="navbar">
            <img src="title.jpg" alt="title" width="504.5" height="50"></img>
            {!currentUser && <div className="login" onClick={() => navigate('/login')}>登入</div>}
            {currentUser && <div className="logout" onClick={() => navigate('/logout')}>登出</div>}
            {currentUser && <div className="profile" onClick={() => navigate('/profile')}>個人檔案</div>}
            {currentUser && <div className="reserve" onClick={() => navigate('/reserve')}>預約琴房</div>}
            {currentUser && <div className="list" onClick={() => navigate('/list')}>琴譜列表</div>}
            {currentUser && currentUser === 'Admin' && <div className="userList" onClick={() => navigate('/userList')}>使用者列表</div>}
            <div className="news" onClick={() => navigate('/news')}>最新消息</div>
            <div className="home" onClick={() => navigate('/')}>首頁</div>
            <div className="language" onClick={() => (optionVisible === 'visible') ? setOptionVisible('hidden') : setOptionVisible('visible')}>
                <img src="globe.png" alt="title" width="20" height="20"></img>
                <div className="dropBox" style={{ visibility: optionVisible }}>
                    <div className="option" onClick={() => setLanguage('zh')} style={{ backgroundColor: (language === 'zh') ? 'gray' : 'black' }}>中文</div>
                    <div className="option" onClick={() => setLanguage('en')} style={{ backgroundColor: (language === 'en') ? 'gray' : 'black' }}>EN</div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar