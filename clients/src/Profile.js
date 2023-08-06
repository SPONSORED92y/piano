import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Variable from './Variable'

const Profile = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState()
    const [passwordCurrent, setPasswordCurrent] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    //props to form
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [studentID, setStudentID] = useState('');
    const [role, setRole] = useState('');
    const [adminKey, setAdminKey] = useState('');
    //error message
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [departmentError, setDepartmentError] = useState('');
    const [studentIDError, setStudentIDError] = useState('');
    const [roleError, setRoleError] = useState('');
    const [adminKeyError, setAdminKeyError] = useState('');
    const [passwordCurrentError, setPasswordCurrentError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordAgainError, setPasswordAgainError] = useState('');
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        fetch(`${Variable.serverURL}/user`, {
            mode: "cors",
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (user) {
            setUsername(user.username)
            setEmail(user.email)
            setDepartment(user.department)
            setStudentID(user.studentID)
            setRole(user.role)
        }
    }, [user])

    const handleSubmitProfile = async (e) => {
        e.preventDefault();
        setUsernameError('')
        setEmailError('')
        setDepartmentError('')
        setStudentIDError('')
        setRoleError('')
        setAdminKeyError('')
        try {
            const res = await fetch(`${Variable.serverURL}/profile`, {
                mode: 'cors',
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, department, studentID, role, adminKey })
            })
            if (res.ok) {
                console.log(`${username} profile updated successfully`)
                navigate('/')
            } else {
                const data = await res.json();
                console.log(data);
                setUsernameError(data.errors.username)
                setEmailError(data.errors.email)
                setDepartmentError(data.errors.department)
                setStudentIDError(data.errors.studentID)
                setRoleError(data.errors.role)
                setAdminKeyError(data.errors.adminKey)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        setPasswordAgainError('')
        setPasswordError('')
        setPasswordCurrentError('')
        try {
            const res = await fetch(`${Variable.serverURL}/changePassword`, {
                mode: 'cors',
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ passwordCurrent, password })
            })
            if (res.ok) {
                console.log(`${username} password changed successfully`)
                navigate('/logout')
            } else {
                const data = await res.json();
                console.log(data);
                setPasswordCurrentError(data.errors.passwordCurrent)
                setPasswordError(data.errors.password)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (password !== '' && passwordAgain !== '') {
            if (password !== passwordAgain) {
                setPasswordAgainError('輸入的密碼不同')
                setEnabled(false)
            } else {
                setPasswordAgainError('')
                setEnabled(true)
            }
        }
    }, [password, passwordAgain])

    return (
        <div className="profile">
            <h1>個人檔案</h1>
            {user && <div>本週剩餘次數:{user.times}</div>}
            <form onSubmit={handleSubmitProfile}>
                <div>
                    <label>{'姓名: (請使用本名)'}</label>
                    <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div>{usernameError}</div>
                </div>
                <div>
                    <label>{'Email: '}</label>
                    <input
                        type="text"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div>{emailError}</div>
                </div>
                <div>
                    <label>{'系級: (校外人士請填"校外")'}</label>
                    <input
                        type="text"
                        required
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    />
                    <div>{departmentError}</div>
                </div>
                <div>
                    <label>{'學號: (校外人士請填"0")'}</label>
                    <input
                        type="text"
                        required
                        value={studentID}
                        onChange={(e) => setStudentID(e.target.value)}
                    />
                    <div>{studentIDError}</div>
                </div>
                <div>
                    <label>{'身分: '}</label>
                    <select value={role}
                        onChange={(e) => setRole(e.target.value)}>
                        <option value='Member'>一般社員</option>
                        <option value='Admin'>幹部</option>
                    </select>
                    <div>{roleError}</div>
                </div>
                {(role === 'Admin') &&
                    <div>
                        <label>通關密語:</label>
                        <input
                            type="text"
                            value={adminKey}
                            onChange={(e) => setAdminKey(e.target.value)}
                        />
                        <div>{adminKeyError}</div>
                    </div>
                }
                <button >更新資料</button>
            </form>
            <form onSubmit={handleSubmitPassword}>

                <h2>更改密碼: </h2>
                <div>
                    <label>現在密碼: </label>
                    <input
                        type="password"
                        required
                        value={passwordCurrent}
                        onChange={(e) => setPasswordCurrent(e.target.value)}
                    />
                    <div>{passwordCurrentError}</div>
                </div>
                <div>
                    <label>新密碼: </label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div>{passwordError}</div>
                </div>
                <div>
                    <label>請再次輸入新密碼:</label>
                    <input
                        type="password"
                        required
                        value={passwordAgain}
                        onChange={(e) => setPasswordAgain(e.target.value)}
                    />
                    <div>{passwordAgainError}</div>
                </div>
                <button disabled={!enabled}>更改密碼</button>
            </form>

        </div>
    );
}

export default Profile;