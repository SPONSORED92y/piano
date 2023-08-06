import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from './CurrentUserContext';
import Variable from './Variable'
const Logout = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    fetch(`${Variable.serverURL}/logout`, {
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