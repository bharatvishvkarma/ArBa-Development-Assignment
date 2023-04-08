import { useState } from 'react'
import styles from './box.module.css'
import { useSelector } from 'react-redux'
import { updateNewPassword } from '../../api/userData'
import { toast } from 'react-toastify';

function ChangePassword({setBox}){

    const {user} = useSelector(state =>state)
    const [data,setData] = useState({
        email:"",
        password:"",
        newPassword:""
    })

    function handleInput(e){
        setData({...data, [e.target.name]:e.target.value})
    }

    function updatePassword(){
        updateNewPassword(data,user._id)
        .then((res)=>{
            toast('Password Successfully Changed',{
                type: 'success',
            })
            setBox(false)
        })
        .catch((err)=>{
            toast(err.response.data.message,{
                type: 'error',
            })
            // console.log(res.data)
        })
    }

    return(
        <div className = {styles.box}>
            <div style={{textAlign:"right",marginBottom:"40px"}}>
                <button id={styles.btn} onClick={()=>setBox(false)}>close</button>
            </div>
            <h2>Change Password</h2>
           
            <input onChange={handleInput} type="text" name = "email" placeholder='Email'/>
            <input onChange={handleInput} type="text" name = "password" placeholder='Current Password'/>
            <input onChange={handleInput} type="text" name = "newPassword" placeholder='New Password'/>
            {( data.newPassword.length>0  && !(/[a-zA-Z]/.test(data.newPassword) && /\d/.test(data.newPassword) && data.newPassword.length>=8)  )  ?<p className={styles.suggestions} >Password must contain at least 8 characters, including one number and alphabets </p>:null}
            <button disabled = {data.email.length<1 || data.password.length<1 || !(  (/[a-zA-Z]/.test(data.newPassword) && /\d/.test(data.newPassword) && data.newPassword.length>=8)  )} onClick={updatePassword}>Update Password</button>
        </div>
    )
}

export default ChangePassword