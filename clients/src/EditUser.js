import { useState, useEffect, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Variable from './Variable'
import CurrentUserContext from './CurrentUserContext'

const EditUser = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser } = useContext(CurrentUserContext)
  const user = location.state.user
  //form
  const id = user._id
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [department, setDepartment] = useState(user.department)
  const [studentID, setStudentID] = useState(user.studentID)
  //password
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  //error message
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [departmentError, setDepartmentError] = useState('')
  const [studentIDError, setStudentIDError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordAgainError, setPasswordAgainError] = useState('')
  const [enabled, setEnabled] = useState(false)

  const handleSubmitProfile = async (e) => {
    e.preventDefault()
    setUsernameError('')
    setEmailError('')
    setDepartmentError('')
    setStudentIDError('')
    try {
      const res = await fetch(`${Variable.serverURL}/profileEditUser`, {
        mode: 'cors',
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, username, email, department, studentID })
      })
      if (res.ok) {
        console.log(`${username} profile updated successfully`)
        navigate('/userList')
      } else {
        const data = await res.json()
        console.log(data)
        setUsernameError(data.errors.username)
        setEmailError(data.errors.email)
        setDepartmentError(data.errors.department)
        setStudentIDError(data.errors.studentID)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitPassword = async (e) => {
    e.preventDefault()
    setPasswordAgainError('')
    setPasswordError('')
    try {
      const res = await fetch(`${Variable.serverURL}/changePasswordEditUser`, {
        mode: 'cors',
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password })
      })
      if (res.ok) {
        console.log(`${username} password changed successfully`)
        navigate('/userList')
      } else {
        const data = await res.json()
        console.log(data)
        setPasswordError(data.errors.password)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleClickDelete = async () => {
    try {
      const res = await fetch(`${Variable.serverURL}/editUser`, {
        mode: 'cors',
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      })
      if (res.ok) {
        console.log(`${username} deleted successfully`)
        navigate('/userList')
      } else {
        const data = await res.json()
        console.log(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!Variable.getCookie('currentUser') || Variable.getCookie('currentUser') !== 'Admin') {
      navigate('/logout')
    }
  }, [])

  useEffect(() => {
    if (password !== '' && passwordAgain !== '') {
      if (password !== passwordAgain) {
        setPasswordAgainError('輸入的密碼不同')
        setEnabled(false)
      } else {
        setPasswordAgainError('')
        setEnabled(true)
      }
    }
  }, [password, passwordAgain])

  return (
    <div className="profile">
      <h1>使用者個人檔案</h1>
      {user && <div>本週剩餘次數:{user.times}</div>}
      <form onSubmit={handleSubmitProfile}>
        <div>
          <label>姓名: (請使用本名)</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div>{usernameError}</div>
        </div>
        <div>
          <label>Email: </label>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>{emailError}</div>
        </div>
        <div>
          <label>系級: (校外人士請填"校外")</label>
          <input
            type="text"
            required
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <div>{departmentError}</div>
        </div>
        <div>
          <label>學號: (校外人士請填"0")</label>
          <input
            type="text"
            required
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
          />
          <div>{studentIDError}</div>
        </div>
        <div>身分: {(user.role === 'Admin') ? '幹部' : '一般社員'}</div>
        <button >更新資料</button>
      </form>

      <form onSubmit={handleSubmitPassword}>

        <h2>更改密碼: </h2>
        <div>
          <label>新密碼: </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>{passwordError}</div>
        </div>
        <div>
          <label>請再次輸入新密碼:</label>
          <input
            type="password"
            required
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
          <div>{passwordAgainError}</div>
        </div>
        <button disabled={!enabled}>更改密碼</button>
      </form>
      <div onClick={handleClickDelete}>刪除此使用者</div>
    </div>
  )
}
export default EditUser