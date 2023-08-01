import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useCookie from './useCookie';
import CurrentUserContext from './CurrentUserContext';

const Signup = () => {
  const [username, setUsername] = useState('jason');
  const [password, setPassword] = useState('123');
  const [passwordAgain, setPasswordAgain] = useState('123');
  const [email, setEmail] = useState('jason@gmail.com');
  const [department, setDepartment] = useState('EE');
  const [studentID, setStudentID] = useState('E24106652');
  const [role, setRole] = useState('Member');
  const [adminKey, setAdminKey] = useState('SPONSORED');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordAgainError, setPasswordAgainError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [departmentError, setDepartmentError] = useState('');
  const [studentIDError, setStudentIDError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [adminKeyError, setAdminKeyError] = useState('');
  const [enabled, setEnabled] = useState(false);
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
    setUsernameError('')
    setPasswordError('')
    setEmailError('')
    setDepartmentError('')
    setStudentIDError('')
    setRoleError('')
    setAdminKeyError('')
    try {
      const res = await fetch('http://localhost:8000/signup', {
        mode: 'cors',
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email, department, studentID, role, adminKey })
      })
      const data = await res.json();
      console.log(data);
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
        console.log(`${data.user} signed up successfully`)
        navigate('/login')
      }
    } catch (err) {
      console.log(err)
    }
  }

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
    <div className="login">
      <h1>註冊</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>使用者名稱:</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div>{usernameError}</div>
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
        <div>
          <label>請再次輸入密碼:</label>
          <input
            type="password"
            required
            value={passwordAgain}
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
          <div>{passwordAgainError}</div>
        </div>
        <div>
          <label>email:</label>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>{emailError}</div>
        </div>
        <div>
          <label>系級:</label>
          <input
            type="text"
            required
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <div>{departmentError}</div>
        </div>
        <div>
          <label>學號:</label>
          <input
            type="text"
            required
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
          />
          <div>{studentIDError}</div>
        </div>
        <div>
          <label>身分:</label>
          <select value={role}
            onChange={(e) => setRole(e.target.value)}>
            <option value='Member'>一般社員</option>
            <option value='Admin'>幹部</option>
          </select>
          <div>{roleError}</div>
        </div>
        {(role === 'Admin') &&
          <div>
            <label>通關密語:</label>
            <input
              type="text"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
            />
            <div>{adminKeyError}</div>
          </div>
        }
        <button disabled={!enabled}>註冊</button>
      </form>
    </div>
  );
}
export default Signup;