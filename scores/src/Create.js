import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Available');
  const [borrower, setBorrower] = useState();
  const [titleError, setTitleError] = useState('');
  const [statusError, setStatusError] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError('')
    setStatusError('')
    try {
      const res = await fetch('http://localhost:8000/create', {
        mode: 'cors',
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, status, borrower })
      })
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        setTitleError(data.errors.title)
        setStatusError(data.errors.status)
      }
      if (data.title) {
        console.log(`${data.title} created successfully`)
        navigate('/list')
      }
    } catch (err) {
      console.log(err)
    }
  }

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
            <option value='Available'>Available</option>
            <option value='Not Available'>Not Available</option>
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
        <button>新增</button>
      </form>
    </div>
  );
}
export default Create;