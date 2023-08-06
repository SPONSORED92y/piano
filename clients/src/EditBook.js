import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Variable from './Variable'

const EditBook = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const id = location.state.id
  const [title, setTitle] = useState(location.state.title);
  const [status, setStatus] = useState(location.state.status);
  const [borrower, setBorrower] = useState(location.state.borrower);
  const [titleError, setTitleError] = useState('');
  const [statusError, setStatusError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClickDelete = async () => {
    try {
      const res = await fetch(`${Variable.serverURL}/book`, {
        mode: 'cors',
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      })
      if (res.ok) {
        console.log(`${title} deleted successfully`)
        navigate('/list')
      } else {
        const data = await res.json()
        console.log(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError('')
    setStatusError('')
    setErrorMessage('')
    try {
      const res = await fetch(`${Variable.serverURL}/book`, {
        mode: 'cors',
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, status, borrower })
      })
      if (res.ok) {
        console.log(`${title} edited successfully`)
        navigate('/list')
      } else {
        const data = await res.json()
        console.log(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

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
    <div className="EditBook">
      <h1>編輯琴譜</h1>
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
        <button disabled={errorMessage !== ''}>更新</button>
        <div onClick={handleClickDelete}>刪除琴譜</div>
      </form>
    </div>
  );
}
export default EditBook;