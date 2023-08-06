import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from './CurrentUserContext';
import useCookie from "./useCookie";
import Variable from './Variable'

const Create = () => {
  const navigate = useNavigate()
  const getCookie = useCookie()
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Available');
  const [borrower, setBorrower] = useState('');
  const [titleError, setTitleError] = useState('');
  const [statusError, setStatusError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError('')
    setStatusError('')
    setErrorMessage('')
    try {
      const res = await fetch(`${Variable.serverURL}/create`, {
        mode: 'cors',
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, status, borrower })
      })
      if (res.ok) {
        console.log(`${title} created successfully`)
        navigate('/list')
      } else {
        const data = await res.json();
        console.log(data);
        setTitleError(data.errors.title)
        setStatusError(data.errors.status)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    setCurrentUser(getCookie('currentUser'))
    if (!currentUser) {
      navigate('/')
    } else if (currentUser !== 'Admin') {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    if (status === 'Available') {
      if (borrower !== '') {
        setErrorMessage('可借閱狀態不能有出借社員')
      } else {
        setErrorMessage('')
      }
    } else {
      if (borrower === '') {
        setErrorMessage('已外借狀態必須有出借社員')
      } else {
        setErrorMessage('')
      }
    }
  }, [status, borrower])

  return (
    <div className="login">
      <h1>新增琴譜</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>樂譜名稱:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>{titleError}</div>
        </div>
        <div>
          <label>狀態:</label>
          <select value={status}
            onChange={(e) => setStatus(e.target.value)}>
            <option value='Available'>可借閱</option>
            <option value='Not Available'>已外借</option>
          </select>
          <div>{statusError}</div>
        </div>
        <div>
          <label>出借社員:</label>
          <input
            type="text"
            value={borrower}
            onChange={(e) => setBorrower(e.target.value)}
          />
        </div>
        <div>{errorMessage}</div>
        <button disabled={errorMessage !== ''}>新增</button>
      </form>
    </div>
  );
}
export default Create;