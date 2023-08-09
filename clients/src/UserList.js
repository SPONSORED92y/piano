import { Link, useNavigate } from 'react-router-dom';
import useFetch from "./useFetch"
import { useContext, useEffect } from 'react';
import CurrentUserContext from './CurrentUserContext';
import Variable from './Variable'
const UserList = () => {
    const navigate = useNavigate()
    const { currentUser } = useContext(CurrentUserContext)

    const { error, isPending, data: users } = useFetch(`${Variable.serverURL}/userList`);

    useEffect(() => {
        if (!currentUser) {
            navigate('/')
        }
    }, [currentUser, error])

    return (
        <div className="userList">
            <div>
                <h1>已註冊帳號列表</h1>
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                <div className='columnContainer'>
                    <span >姓名</span>
                    <span >Email</span>
                    <span >系級</span>
                    <span >身分</span>
                </div>
                {currentUser && users && users.map(user => (
                    // bookimage
                    <div className="user" key={user._id}>
                        <span className='username' >{user.username}</span>
                        <span className='email' >{user.email}</span>
                        <span className='department' >{user.department}</span>
                        <span className='role'>{(user.role === 'Admin') ? '幹部' : '一般社員'}</span>
                        {<span className='edit'
                            // TODO
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


export default UserList;