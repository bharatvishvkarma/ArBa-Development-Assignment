import styles from './t&c.module.css'

function TermsCondition({setLoad}){
    
    return (
        <div className={styles.terms}>
                    <h3>TERMS & CONDITIONS</h3>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                     elit, sed do eiusmod tempor incididunt ut labore et
                      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                      consequat. Duis aute irure dolor in reprehenderit in voluptate 
                      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
                      sint occaecat cupidatat non proident, 
                    sunt in culpa qui officia deserunt mollit anim id est laborum
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                     elit, sed do eiusmod tempor incididunt ut labore et
                      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                      consequat. Duis aute irure dolor in reprehenderit in voluptate 
                      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
                      sint occaecat cupidatat non proident, 
                    sunt in culpa qui officia deserunt mollit anim id est laborum
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                     elit, sed do eiusmod tempor incididunt ut labore et
                      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo 
                      consequat. Duis aute irure dolor in reprehenderit in voluptate 
                      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
                      sint occaecat cupidatat non proident, 
                    
                    </p>
                    <div style={{position:"absolute",bottom:"10px"}}>
                        <button onClick={()=>setLoad(false)} style={{marginRight:"40px"}}>Cancel</button>
                        <button onClick={()=>{
                            localStorage.setItem('terms',true)
                            setLoad(false)
                        }
                            }>Accept</button>
                        
                    </div>
                </div>
    )
}

export default TermsCondition