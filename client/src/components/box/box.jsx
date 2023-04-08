import { useState } from "react"
import styles from './box.module.css'
import { updateImg } from "../../api/userData"
import { updateUserData } from "../../api/userData"
import { useDispatch } from "react-redux"
import getData from "../../redux/action/action"

function Box({ user,setBox }) {

    const [file,setFile] = useState()
    const [userData,setUserData]  = useState(user)
    const [userImg,setUserImg] = useState(user.avatar)
    const dispatch = useDispatch()

    function handleInput(e){
        setUserData({...userData, [e.target.name]:e.target.value})
    }
    function handleFile(e){
        let f = URL.createObjectURL(e.target.files[0])
        setFile(e.target.files[0])
        setUserImg(f)
    }

    async function updateUser(){
        let obj = {
            fullName:userData.fullName
        }
        if(file){
            const formData = new FormData();
            formData.append('image', file)
            let result = await updateImg(formData)
            obj.avatar = result.data.file.Location
        }

        let userUpdate = await updateUserData(obj,user._id)
        // console.log(userUpdate.data.user.fullName)
        let token = localStorage.getItem('token')
        dispatch(getData(token))
        setBox(false)
    }

    // console.log(userData)
    return (
        <div className = {styles.box}>
            <div style={{textAlign:"right",marginBottom:"40px"}}>
                <button id={styles.btn} onClick={()=>setBox(false)}>close</button>
            </div>
            <h2>Update Profile</h2>
            <label htmlFor='file-upload' className='custom-file-upload'>
                <div className="">
                    <img  src={userImg} alt="" className="signupImg" />
                </div>

            </label>
            <input type = "file"
                            label = "image"
                            name = "image"
                            id = "file-upload"
                            accept=".jpeg, .jpg, .png"
                            onChange={handleFile} 
                            hidden = "true" />
                            <p>Selete Image to Update</p>
            <input onChange={handleInput} type="text" value = {userData.fullName} name = "fullName" placeholder="fullName"/>
            <button onClick={updateUser}>Update</button>
        </div>
    )
}

export default Box