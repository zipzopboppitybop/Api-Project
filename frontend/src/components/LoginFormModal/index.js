// frontend/src/components/LoginFormModal/index.js
import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const history = useHistory();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.length > 6) {
            setErrors([]);
            return dispatch(sessionActions.login({ credential, password }))
                .then(closeModal, history.push("/"))
                .catch(
                    async (res) => {
                        const data = await res.json();
                        if (res.status === 403) {
                            return setErrors(['Invalid Credentials Or Password'])
                        }
                        if (data && data.errors) setErrors(Object.values(data.errors));
                    }
                );
        }
        return setErrors(['Password must be longer than 5 characters'])
    };

    const demoUser = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.loginDemo({ credential, password }))
            .then(closeModal, history.push("/"))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    }

    useEffect(() => {
        if (credential.length < 4 || password.length < 6) {
            setIsButtonDisabled(true);
        } else setIsButtonDisabled(false);
    }, [credential, password]);

    const buttonClassName = "login-button" + (isButtonDisabled ? "" : "disabled");

    return (
        <>

            <form onSubmit={handleSubmit}>
                <h1>Log In</h1>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <p>Username or Email</p>
                <label>
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <p>Password</p>
                <label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button className={buttonClassName} disabled={isButtonDisabled} type="submit">Log In</button>
                <button onClick={demoUser}>Demo User</button>
            </form>
        </>
    );
}

export default LoginFormModal;
