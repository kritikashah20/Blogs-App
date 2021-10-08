// styles
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { selectSignedIn, setSignedIn, setUserData } from '../../../redux/features/userSlice';
import styles from './HomePage.module.css';

const HomePage = () => {

    const dispatch = useDispatch()

    const login = (res) => {
        console.log(res);
        dispatch(setSignedIn(true))
        dispatch(setUserData(res.profileObj))
    }

    const isSignedIn = useSelector(selectSignedIn)


    return(
        <div className={styles.homePage} style={{display: isSignedIn ? "none" : ""}}>
            {!isSignedIn ? (
                <div className={styles.loginMessage}>
                    <h1>A Readers favourite place!</h1>
                    <p>
                        We provide high quality online resource for reading blogs, articles based on any domain. Just sign up and start exploring your interest.
                    </p>
                    <GoogleLogin
                        clientId="488855830044-j2lonikvnm502a1hiql8f8sgvvk7gthm.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className={styles.loginButton}
                            >
                                Login with Google
                            </button>
                        )}
                        onSuccess={login}
                        onFailure={login}
                        isSignedIn={true}
                        cookiePolicy={"single_host_origin"}
                    />
                </div>
            ) : ("") }
        </div>
    )
}

export default HomePage
