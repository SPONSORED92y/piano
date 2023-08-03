import { Link, useNavigate } from 'react-router-dom';
import useFetch from "./useFetch"
import { useEffect, useContext } from 'react';
import useCookie from './useCookie';
import CurrentUserContext from './CurrentUserContext';
const List = () => {
    const getCookie = useCookie()
    const navigate = useNavigate()
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
    useEffect(() => {
        setCurrentUser(getCookie('currentUser'))
    }, [])


    const { error, isPending, data: books } = useFetch('http://localhost:9000/list');

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
                        <span style={{ paddingLeft: "20px", paddingRight: "20px" }}>{book.status}</span>
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