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
                    {!currentUser && <li className="navButton" onClick={() => navigate('/login')}>{language === 'zh' ? "登入" : 'Login'}</li>}
                    {currentUser && <li className="navButton" onClick={() => navigate('/logout')}>{language === 'zh' ? "登出" : 'Logout'}</li>}
                    {currentUser && <li className="navButton" onClick={() => navigate('/list')}>{language === 'zh' ? "琴譜列表" : 'Scores'}</li>}
                    {currentUser && <li className="navButton" onClick={() => navigate('/reserve')}>{language === 'zh' ? "預約琴房" : 'Reserve'}</li>}
                    {currentUser && <li className="navButton" onClick={() => navigate('/profile')}>{language === 'zh' ? "個人檔案" : 'Profile'}</li>}
                    {currentUser && currentUser === 'Admin' && <li className="navButton" onClick={() => navigate('/userList')}>{language === 'zh' ? "使用者列表" : 'All User'}</li>}
                    <li className="navButton" onClick={() => navigate('/news')}>{language === 'zh' ? "最新消息" : 'News'}</li>
                    <li className="navButton" onClick={() => navigate('/')}>{language === 'zh' ? "首頁" : 'Home'}</li>
                    <li className="language" onClick={() => (optionVisible === 'visible') ? setOptionVisible('hidden') : setOptionVisible('visible')}>
                        <img src="globe.png" alt="globe" width="20" height="20"></img>
                        <div className="dropBox" style={{ visibility: optionVisible }}>
                            <div className="option" onClick={() => setLanguage('zh')} style={{ backgroundColor: (language === 'zh') ? 'gray' : 'black' }}>中文</div>
                            <div className="option" onClick={() => setLanguage('en')} style={{ backgroundColor: (language === 'en') ? 'gray' : 'black' }}>EN</div>
                        </div>
                    </li>
                    <li className="title"><img src="title.png" alt="title" width="261" height="50"></img></li>
                </ul>
            </div>
            <nav className="navbarSmall">
                <div className="titleBox">
                    <img className="title" src="title.png" alt="title" width="261" height="50"></img>
                </div>
                <div className="bigBox">
                    <img className="navButton" id="tools" src="tools.png" alt="tools" width="20" height="20" onClick={() => (optionVisible === 'visible') ? setOptionVisible('hidden') : setOptionVisible('visible')}></img>
                    {currentUser && <div className="navButton" onClick={() => {
                        setOptionVisible('hidden')
                        navigate('/logout')
                    }
                    }>{language === 'zh' ? "登出" : 'Logout'}</div>}
                    {currentUser && <div className="navButton" onClick={() => {
                        setOptionVisible('hidden')
                        navigate('/reserve')
                    }
                    }>{language === 'zh' ? "預約琴房" : 'Reserve'}</div>}
                    {!currentUser && <div className="navButton" onClick={() => {
                        setOptionVisible('hidden')
                        navigate('/login')
                    }
                    }>{language === 'zh' ? "登入" : 'Login'}</div>}
                    <div className="navButton" onClick={() => {
                        setOptionVisible('hidden')
                        navigate('/')
                    }
                    }>{language === 'zh' ? "首頁" : 'Home'}</div>
                    <div className="bigDropbox" style={{ visibility: optionVisible }}>
                        {currentUser && <div className="brick" onClick={() => {
                            setOptionVisible('hidden')
                            navigate('/profile')
                        }}>{language === 'zh' ? "個人檔案" : 'Profile'}</div>}
                        {currentUser && <div className="brick" onClick={() => {
                            setOptionVisible('hidden')
                            navigate('/list')
                        }}>{language === 'zh' ? "琴譜列表" : 'Scores'}</div>}
                        {currentUser && currentUser === 'Admin' && <div className="brick" onClick={() => {
                            setOptionVisible('hidden')
                            navigate('/userList')
                        }}>{language === 'zh' ? "使用者列表" : 'User list'}</div>}
                        <div className="brick" onClick={() => {
                            setOptionVisible('hidden')
                            navigate('/news')
                        }}>{language === 'zh' ? "最新消息" : 'News'}</div>
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