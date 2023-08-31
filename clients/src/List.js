import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import CurrentUserContext from './CurrentUserContext'
import LangContext from "./LangContext"
import Variable from './Variable'
const List = () => {
    const navigate = useNavigate()
    const { currentUser } = useContext(CurrentUserContext)
    const [books, setBooks] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const { language } = useContext(LangContext)
    useEffect(() => {
        if (!Variable.getCookie('currentUser')) {
            navigate('/logout')
        }
    }, [])

    useEffect(() => {
        const abortCont = new AbortController()
        fetch(Variable.serverURL + '/list', {
            mode: 'cors',
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            signal: abortCont.signal,
        })
            .then(res => {
                if (!res.ok) {
                    navigate('/login')
                }
                return res.json()
            })
            .then(data => {
                setIsPending(false)
                setBooks(data)
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    //console.log('fetch aborted')
                } else {
                    setIsPending(false)
                    //console.log(err)
                }
            })

        return () => abortCont.abort()
    }, [])

    return (
        <div className="list">
            <h1>{language === 'zh' ? "琴譜列表" : 'Scores List'}</h1>
            {isPending && <div>載入中...</div>}
            <div className='bigBox'>
                <table>
                    <thead>
                        <th>{language === 'zh' ? "標題" : 'Title'}</th>
                        <th>{language === 'zh' ? "狀態" : 'Status'}</th>
                        {currentUser === 'Admin' && <th >{language === 'zh' ? "出借社員" : 'Borrower'}</th>}
                        {currentUser === 'Admin' && <th >{language === 'zh' ? "借出日期" : 'Lent date'}</th>}
                    </thead>
                    <tbody>
                        {currentUser && books && books.map(book => (
                            // bookimage
                            <tr className="book" key={book._id}>
                                <td className='title' >{book.title}</td>
                                <td className='status'>{language === 'zh' ? (book.status === 'Available') ? '可借閱' : '已外借' : book.status}</td>
                                {currentUser === 'Admin' && <td className='borrower'>{book.borrower}</td>}
                                {currentUser === 'Admin' && <td className='date'>{book.date}</td>}
                                {currentUser === 'Admin' &&
                                    <div className='edit'
                                        onClick={() => {
                                            navigate('/editBook', {
                                                state: {
                                                    title: book.title,
                                                    id: book._id,
                                                    status: book.status,
                                                    borrower: book.borrower,
                                                }
                                            })
                                        }}>{language === 'zh' ? "編輯" : 'Edit'}</div>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {currentUser === 'Admin' && <div className='create' onClick={() => { navigate('/create') }}> {language === 'zh' ? "增加" : 'Add'}</div>}
        </div>
    )
}


export default List