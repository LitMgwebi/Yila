import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, status, load } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(email, password)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div id="Authentication">
            <div className="authSection">
                <h1>Login</h1>
                {load && <div>Loading...</div>}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="auth">
                    <div className="singleLineInput">
                        <label>Email: </label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div className="singleLineInput">
                        <label>Password: </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="authControls">
                    {status && <div className="status">{status}</div>}
                    <div className="button-group">
                        <button disabled={load} type='submit' className="btn btn-primary">Login</button>
                        <Link to="/"><button className="btn btn-secondary">Back</button></Link>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default Login;