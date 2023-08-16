import { Link, useNavigate } from 'react-router-dom'
import useFetch from "./useFetch"
import { useContext, useEffect } from 'react'
import CurrentUserContext from './CurrentUserContext'
import Variable from './Variable'
const List = () => {
    const navigate = useNavigate()
    const { currentUser } = useContext(CurrentUserContext)

    const { error, isPending, data: books } = useFetch(`${Variable.serverURL}/list`)

    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
    }, [currentUser, error])

    return (
        <div className="list">
            <h1>琴譜列表</h1>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            <table>
                <thead>
                    <th>標題</th>
                    <th>狀態</th>
                    {currentUser === 'Admin' && <th >出借社員</th>}
                    {currentUser === 'Admin' && <th >借出日期</th>}
                </thead>
                <tbody>
                    {currentUser && books && books.map(book => (
                        // bookimage
                        <tr className="book" key={book._id}>
                            <td className='title' >{book.title}</td>
                            <td className='status'>{(book.status === 'Available') ? '可借閱' : '已外借'}</td>
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
                                    }}>編輯</div>}
                        </tr>
                    ))}
                </tbody>
            </table>
            {currentUser === 'Admin' && <div className='create'> <Link to={"/create"}>增加</Link></div>}
        </div>
    )
}


export default List