import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import login from "../../media/icons/login.svg";
import logOut from "../../media/icons/logout.svg";
import signup from "../../media/icons/signup.svg";
import HeaderMenu from "./HeaderMenu";

function Header() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    return (
        <div id="Header">
            <div className="header">
                <Link to="/">Yila</Link>
            </div>

            <HeaderMenu />

            <div className="profile">
                <nav>
                    {user && (
                        <div className="log">
                            <span>{user.email}</span>
                            <img
                                className="headerLogo"
                                onClick={() => logout()}
                                src={logOut}
                                alt="logout"
                            />
                        </div>
                    )}
                    {!user && (
                        <div className="log">
                            <Link to="/login">
                                <img
                                    className="headerLogo"
                                    src={login}
                                    alt="login"
                                />
                            </Link>
                            <Link to="/sign-up">
                                <img
                                    className="headerLogo"
                                    src={signup}
                                    alt="signup"
                                />
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </div>
    )
}

export default Header;