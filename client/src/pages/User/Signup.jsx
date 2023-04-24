import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { Link } from "react-router-dom";
import ReactCardFlip from "react-card-flip";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDOB] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    const [flip, setFlip] = useState(false);
    const { signup, load, status } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("email", email);
        formData.append("password", password);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("DOB", dob);
        formData.append("profilePhoto", profilePhoto);

        await signup(formData);
    }
    return (
        <div id="Authentication">
            <div className="authSection">
                <h1>Sign up</h1>
                {status && <div className="status">{status}</div>}
                {load && <div>Loading...</div>}
            </div>
            <form onSubmit={handleSubmit}>
                <ReactCardFlip isFlipped={flip} flipDirection="vertical">
                    <div className="authForm">
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
                            <button onClick={() => { setFlip(!flip) }} className="btn btn-primary">Continue</button>
                            <Link to="/"><button className="btn btn-secondary">Back</button></Link>
                        </div>
                    </div>
                    <div className="authForm">
                        <div className="auth">
                            <div className="singleLineInput">
                                <label>First Name:</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="singleLineInput">
                                <label>Last Name:</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="singleLineInput">
                                <label>Date of Birth:</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={dob}
                                    onChange={(e) => setDOB(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="photoInput">
                                <label>Profile Photo:</label>
                                <input
                                    type="file"
                                    name="profilePhoto"
                                    accept="image/*"
                                    onChange={(e) => { setProfilePhoto(e.target.files[0]) }}
                                    required
                                />
                            </div>
                        </div>
                        <div className="authControls">
                            {status && <div className="status">{status}</div>}
                            <div className="button-group">
                                <button disabled={load} type='submit' className="btn btn-primary">Sign up</button>
                                <button onClick={() => { setFlip(!flip) }} className="btn btn-secondary">Back</button>
                            </div>
                        </div>
                    </div>
                </ReactCardFlip>
            </form>
        </div>
    );
}

export default Signup;