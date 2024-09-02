import axios from "axios";
import { useContext, useState } from "react"
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../layout-components/AccountNav";
import { UserContext } from "../UserContext"
import PlacesPage from "./PlacesPage";
import { motion as m } from "framer-motion";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const {ready, user, setUser} = useContext(UserContext);

  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <m.div 
      initial={{opacity: 0}} 
      animate={{opacity: 1}} 
      transition={{duration: 0.75, ease: 'easeOut'}}>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          <div className="mb-2">Logged in as {user.name} ({user.email})</div>
          <button onClick={logout} className="primary max-w-xs">Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage />
      )}
    </m.div>
  )
}