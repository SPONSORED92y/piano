import { Link, useNavigate } from 'react-router-dom'
import useFetch from "./useFetch"
import { useContext, useEffect } from 'react'
import CurrentUserContext from './CurrentUserContext'
import Variable from './Variable'
const UserList = () => {
    const navigate = useNavigate()
    const { currentUser } = useContext(CurrentUserContext)

    const { error, isPending, data: users } = useFetch(`${Variable.serverURL}/userList`)

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
                <table>
                    <thead>
                        <th>姓名</th>
                        <th>Email</th>
                        <th>系級</th>
                        <th>身分</th>
                    </thead>
                    <tbody>
                        {currentUser && users && users.map(user => (
                            <tr className="user" key={user._id}>
                                <td className='username' >{user.username}</td>
                                <td className='email' >{user.email}</td>
                                <td className='department' >{user.department}</td>
                                <td className='role'>{(user.role === 'Admin') ? '幹部' : '一般社員'}</td>
                                <td>

                                    {<div className='edit'
                                        onClick={() => {
                                            navigate('/editUser', {
                                                state: {
                                                    user: user
                                                }
                                            })
                                        }}>編輯</div>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}


export default UserList