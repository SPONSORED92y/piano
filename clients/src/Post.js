import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import CurrentUserContext from './CurrentUserContext'
import LangContext from "./LangContext"
import Variable from './Variable'

const Post = () => {
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [date, setDate] = useState('')
    const [titleError, setTitleError] = useState('')
    const [contentError, setContentError] = useState('')
    const { currentUser } = useContext(CurrentUserContext)
    const { language } = useContext(LangContext)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${Variable.serverURL}/post/${id}`, {
            mode: "cors",
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(res => res.json())
            .then(data => {
                setTitle(data.title)
                setContent(data.content)
                setDate(data.date)
            })
            .catch(err => {
                //console.log(err)
            })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setTitleError('')
        setContentError('')
        try {
            const res = await fetch(`${Variable.serverURL}/editPost`, {
                mode: 'cors',
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, title, content })
            })
            if (res.ok) {
                //console.log(`${title} edited successfully`)
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

    return (
        <div className="post">
            <div className="lastPage" onClick={() => navigate(-1)}>{language === 'zh' ? '< 上一頁' : '< Previous Page'}</div>
            <form onSubmit={handleSubmit}>
                {currentUser && currentUser === 'Admin' ?
                    <div>
                        <label>{`${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}-${new Date(date).getDate()}`}</label>
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
                        <button >儲存變更</button>
                    </div>
                    :
                    <div className="guest">
                        <div>{`${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}-${new Date(date).getDate()}`}</div>
                        <div className="title">{title}</div>
                        <div className="content"><p>{content}</p></div>
                    </div>
                }
            </form>
        </div>
    )
}

export default Post