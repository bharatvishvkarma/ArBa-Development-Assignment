import { useState } from 'react'
import styles from './navbar.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import { BsCartDashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [list, setList] = useState(false)
    const { isLoggedIn, user,products,cartProducts } = useSelector(state => state)
    const navigate = useNavigate()

    return (
        <>
            {
                isLoggedIn ? <div className={styles.main}>
                    <div className={styles.navbar}>
                        <div>
                            logo
                        </div>
                        <div className={styles.profileImg}>
                            <div onClick={()=>navigate('/cart')} style={{ display: "flex", gap: "6px", alignItems: "center", color: "blue" }}>
                                <BsCartDashFill />
                                <p>{cartProducts.length}</p>

                            </div>
                            <img onClick={() => setList(!list)} className={styles.avatar} src={user.avatar} />
                            {list ? <div className={styles.list}>
                                <li><Link className={styles.link} onClick={() => setList(!list)} to="/">My store</Link></li>
                                <li><Link className={styles.link} onClick={() => setList(!list)} to="/">Profile</Link></li>
                                <li className={styles.link} onClick={() => setList(!list)} to="/">Logout</li>
                            </div> : null}
                        </div>
                    </div>
                </div> : <div style={{ height: "60px" }}></div>
            }
        </>

    )
}

export default Navbar