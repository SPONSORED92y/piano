import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import CurrentUserContext from './CurrentUserContext'
import Variable from './Variable'

const CreatePost = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [titleError, setTitleError] = useState('')
  const [contentError, setContentError] = useState('')
  const { currentUser } = useContext(CurrentUserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTitleError('')
    setContentError('')
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
        setTitleError(data.errors.title)
        setContentError(data.errors.content)
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
    <div className="create">
      <h1>新增消息</h1>
      <div className="lastPage" onClick={() => navigate(-1)}>{'< 上一頁'}</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>消息標題:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>{titleError}</div>
        </div>
        <div>
          <label>內容:</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div>{contentError}</div>
        </div>
        <button >新增</button>
      </form>
    </div>
  )
}
export default CreatePost