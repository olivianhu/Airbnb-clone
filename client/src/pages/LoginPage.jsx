import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { motion as m } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);
  async function handleLoginSubmit(event) {
    event.preventDefault();
    try {
      const {data} = await axios.post('/login', {email, password})
      setUser(data);
      setRedirect(true);
    } catch (e) {
      throw e;
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <m.div 
      initial={{opacity: 0}} 
      animate={{opacity: 1}} 
      transition={{duration: 0.75, ease: 'easeOut'}}
      className="mt-40 grow flex items-center justify-around">
      <div className="">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input type="email" 
            placeholder="your@email.com"
            value={email}
            onChange={ev => {setEmail(ev.target.value)}}/>
          <input type="password" 
            placeholder="password"
            value={password}
            onChange={ev => {setPassword(ev.target.value)}}/>
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account? <Link className="underline text-black" to={'/register'}>Register</Link>
          </div>
        </form>
      </div>
    </m.div>
  )
}