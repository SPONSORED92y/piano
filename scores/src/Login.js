import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useCookie from "./useCookie";
import CurrentUserContext from './CurrentUserContext';
const Login = () => {
  const [email, setEmail] = useState('jason');
  const [password, setPassword] = useState('123456');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const {
    currentUser,
    setCurrentUser
  } = useContext(CurrentUserContext);
  const getCookie = useCookie()
  const navigate = useNavigate()

  useEffect(() => {
    setCurrentUser(getCookie('currentUser'))
    if (currentUser) {
      navigate('/')
    }
  }, [getCookie, navigate, currentUser, setCurrentUser])



  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('')
    setPasswordError('')
    try {
      const res = await fetch('http://localhost:9000/login', {
        mode: "cors",
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        setEmailError(data.errors.email)
        setPasswordError(data.errors.password)
      }
      if (data.user) {
        console.log(`${data.user} logged in successfully`)
        setCurrentUser(getCookie('currentUser'))
        navigate('/')
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="login">
      <h1>登入</h1>
      <form onSubmit={handleSubmit}>
        <div>

          <label>Email:</label>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>{emailError}</div>
        </div>
        <div>
          <label>密碼:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>{passwordError}</div>
        </div>
        <button>登入</button>
      </form>
    </div>
  );
}


export default Login;