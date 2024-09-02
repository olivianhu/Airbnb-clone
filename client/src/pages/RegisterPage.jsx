import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { motion as m } from "framer-motion";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function registerUser(event) {
    event.preventDefault();
    try {
      await axios.post('/register', {
        name, 
        email,
        password
      });
      alert('Registration successful. You can now log in.')
      setRedirect(true);
    } catch (e) {
      alert('Registration failed. Please try again later.')
    }
  }

  if (redirect) {
    return <Navigate to={'/login'} />
  }

  return (
    <m.div 
      initial={{opacity: 0}} 
      animate={{opacity: 1}} 
      transition={{duration: 0.75, ease: 'easeOut'}}
    className="mt-40 grow flex items-center justify-around">
      <div className="">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input type="text" 
            placeholder="John Doe" 
            value={name} 
            onChange={ev => {setName(ev.target.value)}}/>
          <input type="email" 
            placeholder="your@email.com"
            value={email} 
            onChange={ev => {setEmail(ev.target.value)}}/>
          <input type="password" 
            placeholder="password" 
            value={password} 
            onChange={ev => {setPassword(ev.target.value)}}/>
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </m.div>
  )
}