import { useState, useContext, useEffect } from "react"
import CurrentUserContext from './CurrentUserContext'
import Variable from './Variable'
const Popup = (props) => {
    const { visibility, id, status, user, boxUser, period, periodList, flipPopupVisibility, flipSignal, week } = props
    const [newStatus, setNewStatus] = useState(status)
    const [newUser, setNewUser] = useState(boxUser)
    const [enabled, setEnabled] = useState(true)
    const [updateError, setUpdateError] = useState('')


    const { currentUser } = useContext(CurrentUserContext)

    const handleClick = () => {
        const go = async (action) => {
            try {
                const res = await fetch(`${Variable.serverURL}/reserve`, {
                    mode: "cors",
                    method: action,
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id })
                })
                if (res.ok) {
                    flipPopupVisibility(period)
                    if (status === 'Available') {
                        console.log('reserve successful')
                    } else {
                        console.log('cancel successful')
                    }
                } else {
                    const data = await res.json()
                    console.log(data)
                }
            } catch (err) {
                console.log(err)
            }
        }

        if (status === 'Available') {
            if (week === 2 && user.times > 0) {
                go('POST')
            }
        } else if (status === 'Occupied') {
            if (boxUser === user.username) {
                go('DELETE')
            }
        } else if (status === 'Not Available') {
            //can't click
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${Variable.serverURL}/reserve`, {
                mode: "cors",
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, newStatus, newUser })
            })
            if (res.ok) {
                // navigate('/reserve')
                flipPopupVisibility(period)
                flipSignal()
                console.log('update successful')
            } else {
                const data = await res.json()
                console.log(data)
            }
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        console.log('popuprender')
        setNewStatus(status)
        setNewUser(boxUser)
    }, [visibility])

    useEffect(() => {
        if (newStatus !== 'Occupied') {
            if (newUser !== '') {
                setEnabled(false)
                setUpdateError('只有已預約狀態可以有使用者')
            } else {
                setEnabled(true)
                setUpdateError('')
            }
        } else {
            if (newUser === '') {
                setEnabled(false)
                setUpdateError('已預約狀態使用者不得為空')
            } else {
                setEnabled(true)
                setUpdateError('')
            }
        }
    }, [newStatus, newUser])


    const buttonOption = () => {
        if (status === 'Not Available') {
            return ''
        } else if (status === 'Occupied') {
            if (user && boxUser === user.username) {
                return '取消預約'
            }
        } else if (status === 'Available' && week === 2) {
            if (user.times > 0) {
                return '預約'
            } else {
                return '已沒有預約次數'
            }
        } else {
            return ''
        }
    }

    return (
        <div className='popup'>
            <div style={{ visibility: visibility ? 'visible' : 'hidden' }} className="popupContainer">

                <div>預約</div>
                {/* <div>period:{period % 16}</div> */}
                <div>時段:{periodList[((period - 1) % 16)]}</div>
                <div className="closeButton" onClick={() => { flipPopupVisibility(period) }}>關閉</div>
                <div className="reserveButton" onClick={handleClick}>{buttonOption()}</div>
                {currentUser === 'Admin' && <form onSubmit={handleSubmit}>
                    <label>狀態:</label>
                    <select value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}>
                        <option value='Available'>開放預約</option>
                        <option value='Not Available'>暫停使用</option>
                        <option value='Occupied'>已預約</option>
                    </select>
                    <label>使用者:</label>
                    <input
                        type="text"
                        value={newUser}
                        onChange={(e) => setNewUser(e.target.value)}
                    />
                    <div>{updateError}</div>
                    <button disabled={!enabled}>更新</button>
                </form>}

            </div>
            <div className="backCover" style={{ visibility: visibility ? 'visible' : 'hidden' }}></div>
        </div>
    )
}

export default Popup