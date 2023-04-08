import { useSelector } from 'react-redux'
import styles from './myprofile.module.css'
import { useState } from 'react'
import Box from '../../components/box/box'
import TermsCondition from '../../components/terms and condition/t&c'
import ChangePassword from '../../components/box/changePassword'

function MyProfile() {

    const { user } = useSelector(state => state)
    const [box,setBox] = useState(false)
    const [tc,setTc] = useState(false)
    const [change,setChange] = useState(false)
    
    return (
        <>
            {
                box?<Box setBox = {setBox} user = {user}/>:null
            }
            {
                tc?<TermsCondition setLoad = {setTc} />:null
            }
            {
                change?<ChangePassword setBox={setChange} />:null
            }
            <div className={styles.profileContainer}>
                <img src={user.avatar} alt="userImg"/>
                <h4>Name: {user.fullName}</h4>
                <p>Username: {user.userName}</p>
                <p>Email: {user.email}</p>
                <button onClick={()=>setBox(true)}>Update Profile</button>
            </div>
            <div className={styles.tc}>
                <button onClick={()=>setTc(true)}>See T&C</button>
                <button onClick={()=>setChange(true)}>Change Password</button>
            </div>
        </>

    )
}

export default MyProfile