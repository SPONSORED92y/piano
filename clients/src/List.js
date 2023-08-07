import { Link, useNavigate } from 'react-router-dom';
import useFetch from "./useFetch"
import { useContext, useEffect } from 'react';
import CurrentUserContext from './CurrentUserContext';
import Variable from './Variable'
const List = () => {
    const navigate = useNavigate()
    const { currentUser } = useContext(CurrentUserContext)

    const { error, isPending, data: books } = useFetch(`${Variable.serverURL}/list`);

    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
    }, [currentUser, error])

    return (
        <div className="list">
            <div>
                <h1>琴譜列表</h1>
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                <div className='columnContainer'>
                    <span >琴譜名稱</span>
                    <span >狀態</span>
                    {currentUser === 'Admin' && <span >出借社員</span>}
                </div>
                {currentUser && books && books.map(book => (
                    // bookimage
                    <div className="book" key={book._id}>
                        <span className='title' >{book.title}</span>
                        <span className='status'>{(book.status === 'Available') ? '可借閱' : '已外借'}</span>
                        {currentUser === 'Admin' && <span className='borrower'>{book.borrower}</span>}
                        {currentUser === 'Admin' &&
                            <span className='edit'
                                onClick={() => {
                                    navigate('/editBook', {
                                        state: {
                                            title: book.title,
                                            id: book._id,
                                            status: book.status,
                                            borrower: book.borrower,
                                        }
                                    })
                                }}>編輯</span>}
                    </div>
                ))}
                {currentUser === 'Admin' && <div className='create'> <Link to={"/create"}>增加</Link></div>}
            </div>
        </div >
    );
}


export default List;