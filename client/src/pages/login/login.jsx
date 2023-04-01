import styles from './login.module.css'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useState } from 'react';
import { logIn } from '../../api/userData';
import { useDispatch } from 'react-redux';
import getData from '../../redux/action/action';

function Login(){


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user,setUser] = useState({
        userName:"",
        password:""
    })

    function handleChange(e){
        setUser({...user,[e.target.name]:e.target.value})
    }
    
    async function logInUser(e){
        e.preventDefault()
        try{
            let response = await logIn(user)
            toast('Login successful',{
                type: 'success',
            })
            localStorage.setItem("token", response.data.data.token)
            dispatch(getData(response.data.data.token))
            navigate('/')
        }
        catch(err){
            toast(err.response.data.message)
        }
    }


    return (
        <div className={styles.container}>
            <div>
                <img className={styles.wallpaperImage} src = "https://thumbs.dreamstime.com/b/cyan-portrait-abstract-wallpaper-background-graphic-vivid-colored-backdrop-watercolor-231087587.jpg" alt= 'wallpaper' />
            </div>
            <div>
                <div className={styles.circle}>

                </div>
                <h2>App Name</h2>
                <form className = {styles.form}>
                    <input onChange={handleChange} type = "text" name = "userName" placeholder= "Username" />
                    <input onChange={handleChange} type = "password" name = "password" placeholder = "Password" />
                    <button onClick={logInUser} className={styles.loginBtn} >Login</button>

                </form>
                <p>Don't have an account? <Link className={styles.link} to="/signup" > Sign up</Link></p>
                
            </div>
        </div>
    )
}

export default Login