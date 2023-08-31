import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
// import CurrentUserContext from './CurrentUserContext'
import LangContext from "./LangContext"
import Variable from './Variable'

const Signup = () => {
  const [username, setUsername] = useState(Variable.publish ? '' : 'jason')
  const [password, setPassword] = useState(Variable.publish ? '' : '123456')
  const [passwordAgain, setPasswordAgain] = useState(Variable.publish ? '' : '123456')
  const [email, setEmail] = useState(Variable.publish ? '' : 'jason@gmail.com')
  const [department, setDepartment] = useState(Variable.publish ? '' : 'EE')
  const [studentID, setStudentID] = useState(Variable.publish ? '' : 'E24106652')
  const [role, setRole] = useState('Member')
  const [adminKey, setAdminKey] = useState(Variable.publish ? '' : 'SPONSORED')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordAgainError, setPasswordAgainError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [departmentError, setDepartmentError] = useState('')
  const [studentIDError, setStudentIDError] = useState('')
  const [roleError, setRoleError] = useState('')
  const [adminKeyError, setAdminKeyError] = useState('')
  const [enabled, setEnabled] = useState(false)

  const { language } = useContext(LangContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (Variable.getCookie('currentUser')) {
      navigate('/news')
    }
  }, [])

  const handleSubmit = async () => {
    setUsernameError('')
    setPasswordError('')
    setEmailError('')
    setDepartmentError('')
    setStudentIDError('')
    setRoleError('')
    setAdminKeyError('')
    try {
      const res = await fetch(`${Variable.serverURL}/signup`, {
        mode: 'cors',
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email, department, studentID, role, adminKey })
      })
      const data = await res.json()
      //console.log(data)
      if (data.errors) {
        setUsernameError(data.errors.username)
        setPasswordError(data.errors.password)
        setEmailError(data.errors.email)
        setDepartmentError(data.errors.department)
        setStudentIDError(data.errors.studentID)
        setRoleError(data.errors.role)
        setAdminKeyError(data.errors.adminKey)
      }
      if (data.user) {
        //console.log(`${data.user} signed up successfully`)
        navigate('/login')
      }
    } catch (err) {
      //console.log(err)
    }
  }

  useEffect(() => {
    if (password !== '' && passwordAgain !== '') {
      if (password !== passwordAgain) {
        setPasswordAgainError(language === 'zh' ? '輸入的密碼不同' : 'Two New Password are not identical')
        setEnabled(false)
      } else {
        setPasswordAgainError('')
        setEnabled(true)
      }
    }
  }, [password, passwordAgain])

  return (
    <div className="signup">
      <h1>{language === 'zh' ? '註冊' : 'Sign Up'}</h1>
      <div className="lastPage" onClick={() => navigate(-1)}>{language === 'zh' ? '< 上一頁' : '< Previous Page'}</div>
      <div className="bigBox">
        <form onSubmit={handleSubmit}>
          <label>{language === 'zh' ? '姓名 (請使用本名)' : 'Real Name'}</label>
          <div className="inputContainer">
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="error">{usernameError}</div>
          </div>
          <label>{language === 'zh' ? '密碼' : 'Password'}</label>
          <div className="inputContainer">

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="error">{passwordError}</div>
          </div>
          <label>{language === 'zh' ? '請再次輸入密碼' : 'Enter Password Again'}</label>
          <div className="inputContainer">
            <input
              type="password"
              required
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
            <div className="error">{passwordAgainError}</div>
          </div>
          <label>Email</label>
          <div className="inputContainer">

            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="error">{emailError}</div>
          </div>
          <label>{language === 'zh' ? '系級' : 'Department'}<span className="tooltip">?<span className="tooltiptext">{language === 'zh' ? '校外人士請填 "校外"' : '"guest" if you\'re not inside NCKU'}</span></span></label>
          <div className="inputContainer">
            <input
              type="text"
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <div className="error">{departmentError}</div>
          </div>
          <label >{language === 'zh' ? '學號' : 'Sutdent ID'}<span className="tooltip">?<span className="tooltiptext">{language === 'zh' ? '校外人士請填 "0"' : '"0" if you\'re not inside NCKU'}</span></span></label>
          <div className="inputContainer">
            <input
              type="text"
              required
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
            />
            <div className="error">{studentIDError}</div>
          </div>
          <label>{language === 'zh' ? '身分' : 'Role'}</label>
          <div className="inputContainer">
            <select value={role}
              onChange={(e) => setRole(e.target.value)}>
              <option value='Member'>{language === 'zh' ? '一般社員' : 'Club Member'}</option>
              <option value='Admin'>{language === 'zh' ? '幹部' : 'Club Officer'}</option>
            </select>
            <div className="error">{roleError}</div>
          </div>
          {(role === 'Admin') &&
            <div>
              <label>{language === 'zh' ? '金鑰' : 'Secret'}</label>
              <div className="inputContainer">
                <input
                  type="text"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                />
                <div className="error">{adminKeyError}</div>
              </div>
            </div>
          }
          <div disabled={!enabled} className="signUpButton" onClick={() => { handleSubmit() }}>{language === 'zh' ? '註冊' : 'Confirm'}</div>
        </form>
      </div>
    </div>
  )
}
export default Signup