import { useState } from 'react'
import styles from './navbar.module.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { BsCartDashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import logout from '../../redux/action/logoutAction';

function Navbar() {
    const [list, setList] = useState(false)
    const { isLoggedIn, user,products,cartProducts } = useSelector(state => state)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <>
            {
                isLoggedIn ? <div className={styles.main}>
                    <div className={styles.navbar}>
                        <div>
                            <h1>ArBa </h1>
                        </div>
                        <div className={styles.profileImg}>
                            <div onClick={()=>navigate('/cart')} style={{ display: "flex", gap: "6px", alignItems: "center", color: "blue" }}>
                                <BsCartDashFill />
                                <p>{cartProducts.length}</p>

                            </div>
                            <img onClick={() => setList(!list)} className={styles.avatar} src={user.avatar} />
                            {list ? <div className={styles.list}>
                                <li><Link className={styles.link} onClick={() => setList(!list)} to="/mystore">My store</Link></li>
                                <li><Link className={styles.link} onClick={() => setList(!list)} to="/myprofile">Profile</Link></li>
                                <li className={styles.link} onClick={() =>{
                                    dispatch(logout())
                                    localStorage.removeItem('token')
                                    setList(!list)
                                    navigate('/login')
                                } } to="/">Logout</li>
                            </div> : null}
                        </div>
                    </div>
                </div> : <div style={{ height: "60px" }}></div>
            }
        </>

    )
}

export default Navbar