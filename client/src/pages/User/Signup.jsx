import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, load, status } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password);
    }
    return (
        <div id="Add">

            <h3>Sign up</h3>
            <form className="authForm" onSubmit={handleSubmit}>

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

                <div className="controls">
                    {status && <div className="status">{status}</div>}
                    <div className="button-group">
                        <button disabled={load} type='submit' className="btn btn-primary">Sign up</button>
                        <Link to="/"><button className="btn btn-secondary">Back</button></Link>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default Signup;