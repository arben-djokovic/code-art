import React from 'react'
import { PrivateRoute } from '../../services/PrivateRoute'
import { auth } from '../../services/AuthService';
import apiCalls from "../../api/apiCalls"; 
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import './Home.scss'
import { motion } from "framer-motion"

export default function Home() {
    const history = useHistory();
    
    const logOut = async() => {
        try{
          const response = await apiCalls.post("/user/logout");
          toast.success("Logged out");
          auth.logout()
          history.push("/log-in");
        }catch(err){
            console.log(err);
            if (err.response) {
              toast.error(err.response.data.responseCodes[0].responseKey);
            }
        }
      }
  return (<PrivateRoute>
        <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }} 
        className='home'>
          <section>
            <h1>You are logged!!</h1>
            <p>Username: {localStorage.getItem("username")}</p>
            <button className='orangeBtn' onClick={logOut}>LOGOUT</button>
          </section>
        </motion.div>
    </PrivateRoute>
  )
}
