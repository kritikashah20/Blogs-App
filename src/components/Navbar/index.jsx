import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSignedIn, selectUserData, setInput, setSignedIn, setUserData } from '../../redux/features/userSlice';
import { GoogleLogout } from 'react-google-login'
import { Avatar } from '@material-ui/core';
// style
import styles from './Navbar.module.css';

const Navbar = () => {

    const isSignedIn = useSelector(selectSignedIn)
    const [inputValue, setInputValue] = useState("tech")

    const userData = useSelector(selectUserData)

    const dispatch = useDispatch()

    const logout = (res) => {
        dispatch(setSignedIn(false))
        dispatch(setUserData(null))
    }



    return (
        <div className={styles.navbar}>
            <h1 className={styles.navbarHeader}>BlogMania 📃</h1>
            {isSignedIn && (
                <div className={styles.blogSearch}>
                    <input type="text" className={styles.search} placeholder="Search for a blog" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button className={styles.submit} onClick={(e) => {
                        e.preventDefault()
                        dispatch(setInput(inputValue))
                    }}>
                        Search
                    </button>
                </div>
            )}

            {isSignedIn ? (
                <div className={styles.navbarUserData}>
                    <Avatar className={styles.user} src={userData?.imageUrl} alt={userData?.name} />
                    <h1 className={styles.signedIn}>{userData?.givenName}</h1>
                    <GoogleLogout
                        clientId="488855830044-j2lonikvnm502a1hiql8f8sgvvk7gthm.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className={styles.logoutButton}
                            >
                                Logout
                            </button>
                        )}
                        onLogoutSuccess={logout}
                    />
                </div>
            ) : <h1 className={styles.notSignedIn}>User not Logged in</h1>}
        </div>
    )
}

export default Navbar
