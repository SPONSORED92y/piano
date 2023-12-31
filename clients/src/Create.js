import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import CurrentUserContext from './CurrentUserContext'
import Variable from './Variable'

const Create = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('Available')
  const [borrower, setBorrower] = useState('')
  const [date, setDate] = useState('')
  const [titleError, setTitleError] = useState('')
  const [statusError, setStatusError] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { currentUser } = useContext(CurrentUserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTitleError('')
    setStatusError('')
    setErrorMessage('')
    try {
      const res = await fetch(`${Variable.serverURL}/create`, {
        mode: 'cors',
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, status, borrower, date })
      })
      if (res.ok) {
        //console.log(`${title} created successfully`)
        navigate('/list')
      } else {
        const data = await res.json()
        //console.log(data)
        setTitleError(data.errors.title)
        setStatusError(data.errors.status)
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
    <div className="create">
      <h1>新增琴譜</h1>
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
        <label>借出日期</label>
        <div className="inputContainer">
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="error">{errorMessage}</div>
        <button disabled={errorMessage !== ''}>新增</button>
      </form>
    </div>
  )
}
export default Create