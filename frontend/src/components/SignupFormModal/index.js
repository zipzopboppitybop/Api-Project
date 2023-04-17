// frontend/src/components/SignupFormModal/index.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";
import './SignupForm.css';

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const history = useHistory();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    let wrongPassword = password === confirmPassword ? "" : "Passwords do not match!";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
                .then(closeModal, history.push('/'))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(Object.values(data.errors));
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    useEffect(() => {
        if (!username || !password || !confirmPassword || !email || !firstName || !lastName || username.length < 4 || password.length < 6 || password !== confirmPassword) {
            setIsButtonDisabled(true);
        } else setIsButtonDisabled(false);
    }, [username, password, confirmPassword, email, firstName, lastName]);

    const buttonClassName = "login-button" + (isButtonDisabled ? "" : "disabled");

    return (
        <>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <p>Email</p>
                <label>

                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <p>Username</p>
                <label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <p>First Name</p>
                <label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                <p>Last Name</p>
                <label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
                <p>Password</p>
                <label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <p>{wrongPassword}</p>
                <p>Confirm Password</p>
                <label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
                <p>{wrongPassword}</p>
                <button className={buttonClassName} disabled={isButtonDisabled} type="submit">Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormModal;
