import { useState, useEffect, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Variable from './Variable'
import CurrentUserContext from './CurrentUserContext'
import LangContext from "./LangContext"

const EditUser = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser } = useContext(CurrentUserContext)
  const { language } = useContext(LangContext)
  const user = location.state.user
  //form
  const id = user._id
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [department, setDepartment] = useState(user.department)
  const [studentID, setStudentID] = useState(user.studentID)
  //error message
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [departmentError, setDepartmentError] = useState('')
  const [studentIDError, setStudentIDError] = useState('')
  const [enabled, setEnabled] = useState(false)

  const handleSubmitProfile = async () => {
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
        //console.log(`${username} profile updated successfully`)
        navigate('/userList')
      } else {
        const data = await res.json()
        //console.log(data)
        setUsernameError(data.errors.username)
        setEmailError(data.errors.email)
        setDepartmentError(data.errors.department)
        setStudentIDError(data.errors.studentID)
      }
    } catch (err) {
      //console.log(err)
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
        //console.log(`${username} deleted successfully`)
        navigate('/userList')
      } else {
        const data = await res.json()
        //console.log(data)
      }
    } catch (err) {
      //console.log(err)
    }
  }

  useEffect(() => {
    if (!Variable.getCookie('currentUser') || Variable.getCookie('currentUser') !== 'Admin') {
      navigate('/logout')
    }
  }, [])

  return (
    <div className="editUser">
      <h1>使用者個人檔案</h1>
      <div className="lastPage" onClick={() => navigate(-1)}>{'< 上一頁'}</div>
      {user && <div className="pointText">{language === 'zh' ? '本週預約點數次數: ' : 'Reserve Points: '}{user.times}</div>}

      <div className="bigBox">
        <form>
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
          <label>{language === 'zh' ? '系級' : 'Department'}<span className="tooltip1">?</span><span className="tooltiptext1" >{language === 'zh' ? '校外人士請填 "校外"' : '"guest" if you\'re not inside NCKU'}</span></label>
          <div className="inputContainer">
            <input
              type="text"
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <div className="error">{departmentError}</div>
          </div>
          <label >{language === 'zh' ? '學號' : 'Sutdent ID'}<span className="tooltip2">?</span><span className="tooltiptext2" >{language === 'zh' ? '校外人士請填 "0"' : '"0" if you\'re not inside NCKU'}</span></label>
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
            <div>{user.role === 'Admin' ? '幹部' : '一般社員'}</div>
          </div>
          <div className="editUserButton" onClick={() => { handleSubmitProfile() }}>{language === 'zh' ? '更新資料' : 'Save edit'}</div>
          <div className="delButton" onClick={handleClickDelete}>刪除此使用者</div>
        </form>
      </div>
    </div>
  )
}
export default EditUser