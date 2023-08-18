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
        <div className="navbar">
            <div className="navbarBig">
                <ul>
                    {!currentUser && <li className="navButton" onClick={() => navigate('/login')}>登入</li>}
                    {currentUser && <li className="navButton" onClick={() => navigate('/logout')}>登出</li>}
                    {currentUser && <li className="navButton" onClick={() => navigate('/list')}>琴譜列表</li>}
                    {currentUser && <li className="navButton" onClick={() => navigate('/reserve')}>預約琴房</li>}
                    {currentUser && <li className="navButton" onClick={() => navigate('/profile')}>個人檔案</li>}
                    {currentUser && currentUser === 'Admin' && <li className="navButton" onClick={() => navigate('/userList')}>使用者列表</li>}
                    <li className="navButton" onClick={() => navigate('/news')}>最新消息</li>
                    <li className="navButton" onClick={() => navigate('/')}>首頁</li>
                    <li className="language" onClick={() => (optionVisible === 'visible') ? setOptionVisible('hidden') : setOptionVisible('visible')}>
                        <img src="globe.png" alt="globe" width="20" height="20"></img>
                        <div className="dropBox" style={{ visibility: optionVisible }}>
                            <div className="option" onClick={() => setLanguage('zh')} style={{ backgroundColor: (language === 'zh') ? 'gray' : 'black' }}>中文</div>
                            <div className="option" onClick={() => setLanguage('en')} style={{ backgroundColor: (language === 'en') ? 'gray' : 'black' }}>EN</div>
                        </div>
                    </li>
                    <li className="title"><img src="title.jpg" alt="title" width="484" height="48"></img></li>
                </ul>
            </div>
            <nav className="navbarSmall">
                <div className="titleBox">
                    <img className="title" src="title.jpg" alt="title" width="1221" height="121"></img>
                </div>
                <div className="bigBox">
                    <img className="navButton" id="tools" src="tools.png" alt="tools" width="20" height="20" onClick={() => (optionVisible === 'visible') ? setOptionVisible('hidden') : setOptionVisible('visible')}></img>
                    {currentUser && <div className="navButton" onClick={() => {
                        setOptionVisible('hidden')
                        navigate('/logout')
                    }
                    }>登出</div>}
                    {currentUser && <div className="navButton" onClick={() => {
                        setOptionVisible('hidden')
                        navigate('/reserve')
                    }
                    }>預約琴房</div>}
                    {!currentUser && <div className="navButton" onClick={() => {
                        setOptionVisible('hidden')
                        navigate('/login')
                    }
                    }>登入</div>}
                    <div className="navButton" onClick={() => {
                        setOptionVisible('hidden')
                        navigate('/')
                    }
                    }>首頁</div>
                    <div className="bigDropbox" style={{ visibility: optionVisible }}>
                        {currentUser && <div className="brick" onClick={() => {
                            setOptionVisible('hidden')
                            navigate('/profile')
                        }}>個人檔案</div>}
                        {currentUser && <div className="brick" onClick={() => {
                            setOptionVisible('hidden')
                            navigate('/list')
                        }}>琴譜列表</div>}
                        {currentUser && currentUser === 'Admin' && <div className="brick" onClick={() => {
                            setOptionVisible('hidden')
                            navigate('/userList')
                        }}>使用者列表</div>}
                        <div className="brick" onClick={() => {
                            setOptionVisible('hidden')
                            navigate('/news')
                        }}>最新消息</div>
                        <div className="brick" style={{ visibility: optionVisible }}>
                            <img className="globe" src="globe.png" alt="globe" width="20" height="20"></img>
                            <div className="line"></div>
                            <div className="option" onClick={() => {
                                setOptionVisible('hidden')
                                setLanguage('zh')
                            }} style={{ backgroundColor: (language === 'zh') ? 'gray' : 'black' }}>中文</div>
                            <div className="option" onClick={() => {
                                setOptionVisible('hidden')
                                setLanguage('en')
                            }} style={{ backgroundColor: (language === 'en') ? 'gray' : 'black' }}>EN</div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar