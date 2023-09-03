import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import CurrentUserContext from './CurrentUserContext'
import Variable from './Variable'

const CreatePost = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { currentUser } = useContext(CurrentUserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${Variable.serverURL}/createPost`, {
        mode: 'cors',
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
      })
      if (res.ok) {
        //console.log(`${title} created successfully`)
        navigate('/news')
      } else {
        const data = await res.json()
        //console.log(data)
      }
    } catch (err) {
      //console.log(err)
    }
  }

  useEffect(() => {
    if (Variable.getCookie('currentUser') !== 'Admin') {
      navigate('/logout')
    }
  }, [])

  return (
    <div className="createPost">
      <h1>新增消息</h1>
      <div className="lastPage" onClick={() => navigate(-1)}>{'< 上一頁'}</div>
      <form onSubmit={handleSubmit}>
        <label>消息標題</label>
        <div className="inputContainer">
          <input
            className="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <label>內容</label>
        <div className="inputContainer">
          <textarea
            className="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            cols={50}
          />
        </div>
        <button >新增</button>
      </form>
    </div>
  )
}
export default CreatePost