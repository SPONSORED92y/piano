import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from './CurrentUserContext';
const Logout = () => {
  const navigate = useNavigate();
  const {
    setCurrentUser
  } = useContext(CurrentUserContext);

  useEffect(() => {
    fetch('http://localhost:9000/logout', {
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(res => {
      setCurrentUser(null)
      navigate('/')
    }).catch(err => {
      console.log(err);
    })
  }, [navigate, setCurrentUser])

  return (
    <div className="logout">
    </div>
  );
}

export default Logout;