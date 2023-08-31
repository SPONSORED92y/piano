import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import CurrentUserContext from './CurrentUserContext'
import LangContext from "./LangContext"
import Variable from './Variable'
const Login = () => {
  const [email, setEmail] = useState(Variable.publish ? '' : 'jasonsu@gmail.com')
  const [password, setPassword] = useState(Variable.publish ? '' : '789456')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const { setCurrentUser } = useContext(CurrentUserContext)
  const { language } = useContext(LangContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (Variable.getCookie('currentUser')) {
      setCurrentUser(Variable.getCookie('currentUser'))
      navigate('/news')
    } else {
      setCurrentUser(null)
    }
  }, [])

  const handleSubmit = async () => {
    setEmailError('')
    setPasswordError('')
    try {
      const res = await fetch(`${Variable.serverURL}/login`, {
        mode: "cors",
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      ////console.log(data)
      if (data.errors) {
        setEmailError(data.errors.email)
        setPasswordError(data.errors.password)
      }
      if (data.user) {
        ////console.log(`${data.user.username} logged in successfully`)
        ////console.log(data.user.role)
        setCurrentUser(data.user.role)
        navigate('/news')
      }
    } catch (err) {
      ////console.log(err)
    }
  }

  return (
    <div className="login">
      <div className="bigBox">
        <img className="colLeft" src="logo.png">
        </img>
        <div className="colRight">
          <form onSubmit={handleSubmit}>
            <div className="row1">
              <div className="highContainer">
                <img className="high" src="high.png"></img>
              </div>
              <input
                type="text"
                required
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="row2">
              <div className="lowContainer">
                <img className="low" src="low.png"></img>
              </div>
              <input
                type="password"
                required
                value={password}
                placeholder={language === 'zh' ? "密碼" : 'Password'}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="row3">
              <div className="error">{emailError}</div>
              <div className="error">{passwordError}</div>
            </div>
            <div className="loginButton" onClick={() => handleSubmit()}>{language === 'zh' ? "登入" : 'Login'}</div>
          </form>
          {/* <div className="divider"></div> */}
          <div className="signupButton" onClick={() => navigate('/signup')}>{language === 'zh' ? "註冊新帳號" : 'Sign Up'}</div>
        </div>
      </div >
    </div >
  )
}


export default Login
