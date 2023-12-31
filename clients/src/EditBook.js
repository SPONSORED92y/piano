import { useState, useEffect, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Variable from './Variable'
import CurrentUserContext from './CurrentUserContext'

const EditBook = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const id = location.state.id
  const [title, setTitle] = useState(location.state.title)
  const [status, setStatus] = useState(location.state.status)
  const [borrower, setBorrower] = useState(location.state.borrower)
  const [date, setDate] = useState(location.state.date)
  const [titleError, setTitleError] = useState('')
  const [statusError, setStatusError] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { currentUser } = useContext(CurrentUserContext)

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
        //console.log(`${title} deleted successfully`)
        navigate('/list')
      } else {
        const data = await res.json()
        //console.log(data)
      }
    } catch (err) {
      //console.log(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTitleError('')
    setStatusError('')
    setErrorMessage('')
    try {
      const res = await fetch(`${Variable.serverURL}/book`, {
        mode: 'cors',
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, status, borrower, date })
      })
      if (res.ok) {
        //console.log(`${title} edited successfully`)
        navigate('/list')
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

  useEffect(() => {
    if (status === 'Available') {
      if (borrower !== '') {
        if (date !== '') {
          setErrorMessage('可借閱狀態不能有出借社員和借出日期')
        } else {
          setErrorMessage('可借閱狀態不能有出借社員')
        }
      } else {
        if (date !== '') {
          setErrorMessage('可借閱狀態不能有借出日期')
        } else {
          setErrorMessage('')
        }
      }
    } else {
      if (borrower === '') {
        setErrorMessage('已外借狀態必須有出借社員')
      } else {
        setErrorMessage('')
      }
    }
  }, [status, borrower, date])

  return (
    <div className="editBook">
      <h1>編輯琴譜</h1>
      <div className="lastPage" onClick={() => navigate(-1)}>{'< 上一頁'}</div>
      <form onSubmit={handleSubmit}>
        <label>樂譜名稱</label>
        <div className="inputContainer">
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="error">{titleError}</div>
        </div>
        <label>狀態</label>
        <div className="inputContainer">
          <select value={status}
            onChange={(e) => setStatus(e.target.value)}>
            <option value='Available'>可借閱</option>
            <option value='Not Available'>已外借</option>
          </select>
          <div className="error">{statusError}</div>
        </div>
        <label>出借社員</label>
        <div className="inputContainer">
          <input
            type="text"
            value={borrower}
            onChange={(e) => setBorrower(e.target.value)}
          />
        </div>
        <label>借出日期 </label>
        <div className="inputContainer">
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div>{errorMessage}</div>
        </div>
        <button disabled={errorMessage !== ''}>更新</button>
        <div className="delButton" onClick={handleClickDelete}>刪除琴譜</div>
      </form>
    </div>
  )
}
export default EditBook