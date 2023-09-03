import { useNavigate } from 'react-router-dom'
import useFetch from "./useFetch"
import { useContext, useEffect, useState } from 'react'
import CurrentUserContext from './CurrentUserContext'
import LangContext from "./LangContext"
import Variable from './Variable'
const News = () => {
  const navigate = useNavigate()
  const { currentUser } = useContext(CurrentUserContext)
  const { language } = useContext(LangContext)

  const { error, isPending, data: posts } = useFetch(`${Variable.serverURL}/posts`)

  useEffect(() => {
    if (Variable.getCookie('currentUser') !== currentUser) {
      navigate('/logout')
    }
  }, [])

  return (
    <div className="news">
      <h1>{language === 'zh' ? "最新消息" : 'News'}</h1>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      <table>
        <thead>
          <tr>
            <th>{language === 'zh' ? "標題" : 'Title'}</th>
            <th>{language === 'zh' ? "日期" : 'Date'}</th>
          </tr>
        </thead>
        <tbody>
          {posts && posts.map(post => (
            <tr key={post._id}>
              <td className='title' onClick={() => { navigate(`/post/:${post._id}`) }}>{post.title}</td>
              <td>{`${new Date(post.date).getFullYear()}-${new Date(post.date).getMonth() + 1}-${new Date(post.date).getDate()}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {currentUser && currentUser === 'Admin' && <div className='create' onClick={() => { navigate('/createPost') }}> {language === 'zh' ? "增加" : 'Add'}</div>}
    </div >
  )
}

export default News