import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import CurrentUserContext from './CurrentUserContext'
import Variable from './Variable'
const Login = () => {
  const [email, setEmail] = useState(Variable.publish ? '' : 'jasonsu@gmail.com')
  const [password, setPassword] = useState(Variable.publish ? '' : '789456')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const { setCurrentUser } = useContext(CurrentUserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (Variable.getCookie('currentUser')) {
      setCurrentUser(Variable.getCookie('currentUser'))
      navigate('/news')
    } else {
      setCurrentUser(null)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
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
      console.log(data)
      if (data.errors) {
        setEmailError(data.errors.email)
        setPasswordError(data.errors.password)
      }
      if (data.user) {
        console.log(`${data.user.username} logged in successfully`)
        console.log(data.user.role)
        setCurrentUser(data.user.role)
        navigate('/news')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="login">
      {/* <h1>登入</h1> */}
      <div className="bigBox">
        {/* <img src="loginBackground.png" alt="loginBackground" width="1425" height="729"></img> */}
        <div className="colLeft">
        </div>
        <div className="colRight">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                required
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>{emailError}</div>
            </div>
            <div>
              <input
                type="password"
                required
                value={password}
                placeholder="密碼"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>{passwordError}</div>
            </div>
            <button className="loginButton">登入</button>
          </form>
          <div className="divider"></div>
          <button className="signupButton" onClick={() => navigate('/signup')}>註冊新帳號</button>
        </div>
      </div>
    </div>
  )
}


export default Login
