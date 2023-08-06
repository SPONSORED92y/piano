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
    }, [currentUser])

    return (
        <div className="list">
            <div>
                <h1>琴譜列表</h1>
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                <div>
                    <span style={{ paddingLeft: "20px", paddingRight: "20px" }} >琴譜名稱</span>
                    <span style={{ paddingLeft: "20px", paddingRight: "20px" }} >狀態</span>
                    {currentUser === 'Admin' && <span style={{ paddingLeft: "20px", paddingRight: "20px" }} >出借社員</span>}
                </div>
                {currentUser && books && books.map(book => (
                    // bookimage
                    <div className="book" key={book._id}>
                        <span style={{ paddingLeft: "20px", paddingRight: "20px" }}>{book.title}</span>
                        <span style={{ paddingLeft: "20px", paddingRight: "20px" }}>{(book.status === 'Available') ? '可借閱' : '已外借'}</span>
                        {currentUser === 'Admin' && <span style={{ paddingLeft: "20px", paddingRight: "20px" }}>{book.borrower}</span>}
                        {currentUser === 'Admin' &&
                            <span
                                style={{ paddingLeft: "20px", paddingRight: "20px" }}
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
                {currentUser === 'Admin' && <Link to={"/create"}>增加</Link>}
            </div>
        </div >
    );
}


export default List;