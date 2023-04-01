import { useState } from 'react';
import styles from './signup.module.css'
import { Link } from "react-router-dom";
import { updateImg,addUser } from '../../api/userData';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';


function SignUp(){

    const [user,setUser] = useState({
        fullName:"",
        userName:"",
        email:"",
        password:"",
        avatar:"",
    })
    const [loading,setLoading] = useState(false)
    const [isValid,setIsValid] = useState(false)
    const[file,setFile] = useState(null)
    const navigate = useNavigate()
    const [confirmPassword,setConfirmPassword] = useState("")

    async function handleForm(e){
        
        setUser({...user,[e.target.name] : e.target.value})
    }

    function handleFile(e){
        let image = e.target.files[0]
        setFile(image)
    }

    async function formSubmit(e){
        e.preventDefault()
        try{
            setLoading(true)
            let data
            if(file){
                const formData = new FormData();
                formData.append('image',file)
                let result = await updateImg(formData)
                data = result.data.file.Location
            }
            let updateUser = {...user,avatar:data?data:"https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"}
            let registerdUser = await addUser(updateUser)
            setLoading(false)
            toast('Registration successful',{
                type: 'success',
            })
            navigate('/login')
        }
        catch(err){
            setLoading(false)
            toast(err.response.data.message,{
                type: 'error',
            })
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
                    <input onChange={handleForm} type = "text" name = "userName" placeholder= "Username" />
                    {user.userName.length>0 && user.userName.length<4?<p className={styles.suggestions} >userName must contain atleast 4 character</p>:null}
                    <input onChange={handleForm} type = "text" name = "fullName" placeholder= "Full Name" />
                    {user.fullName.length>0 && user.fullName.length<4?<p className={styles.suggestions} >Full Name must contain atleast 4 character</p>:null}
                    <input onChange={(e)=>{
                        handleForm(e)
                        const val = e.target.value
                        if(isEmail(val)) {
                            setIsValid(true);              
                         } else {
                            setIsValid(false);              
                         }
                        }}
                         type = "email" name = "email" placeholder = "Email" />
                    {user.email.length>0 && !isValid ?<p className={styles.suggestions} >Invalid Email</p>:null}
                    <input onChange={handleForm} type = "password" name = "password" placeholder = "Password" />
                    {( user.password.length>0  && !(/[a-zA-Z]/.test(user.password) && /\d/.test(user.password) && user.password.length>=8)  )  ?<p className={styles.suggestions} >Password must contain at least 8 characters, including one number and alphabets </p>:null}
                    <input onChange={(e)=>setConfirmPassword(e.target.value)} type = "password" name = "password" placeholder = "Confirm Password" />
                    {confirmPassword.length>0 && confirmPassword !== user.password?<p className={styles.suggestions} >password not matched</p>:null }
                    <input 
                    type = "file"
                    name = "image" 
                    label = "image"
                    accept = ".jpeg, .jpg, .png"
                    onChange={handleFile}
                    />
                    <button className={styles.register} disabled= {user.fullName.length<4 || !isValid  ||
                    !(/[a-zA-Z]/.test(user.password)  && /\d/.test(user.password) && user.password.length>=8) 
                    || confirmPassword !== user.password || user.userName.length<4} onClick={formSubmit} >{loading?<div className={styles.spinner} />:'Register'}</button>

                </form>
                <p>Already have an account? <Link className={styles.link} to="/login" > login</Link></p>
                
            </div>
        </div>
    )
}

export default SignUp