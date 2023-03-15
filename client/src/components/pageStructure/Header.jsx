import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

function Header() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    return (
        <div id="Header">
            <div className="header">
                <Link to="/">Yila</Link>
            </div>

            <div className="profile">
                <nav>
                    {user && (
                        <div className="log">
                            <span>{user.email}</span>
                            <button onClick={() => { logout(); }}>LogOut</button>
                        </div>
                    )}
                    {!user && (
                        <div className="log">
                            <Link to="/login"><button>Login</button></Link>
                            <Link to="/sign-up"><button>Signup</button></Link>
                        </div>
                    )}
                </nav>
            </div>
        </div>
    )
}

export default Header;