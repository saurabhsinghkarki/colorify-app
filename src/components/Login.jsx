import { useState } from "react";
import { createAccount, login } from "../firebase/auth";
import Loading from 'react-js-loader';

function Login({ setActiveUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (username && password) {
            let user = await login(username, password);
            if (user) {
                localStorage.setItem('user', user);
                setActiveUser(user);
            }
        }
        else {
            window.alert("Please enter Username and Password");
        }
    }

    const handleCreate = async () => {
        if (username && password) {
            let user = await createAccount(username, password);
            if (user) {
                localStorage.setItem('user', user);
                setActiveUser(user);
            }
        }
        else {
            window.alert("Please enter Username and Password");
        }
    }

    if (loading) {
        return (
            <div className='loader'>
                <Loading type='ball_triangle' width={200} height={200} fill='#f44242' />
            </div>
        )
    }

    return (
        <div className="login">
            <span>colorify</span>
            <input placeholder="email" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="password" value={password} type={"password"} onChange={(e) => setPassword(e.target.value)} />
            <div>
                <button id="signUp" onClick={handleCreate}>Sign Up</button>
                <button onClick={handleLogin}>Sign In</button>
            </div>
        </div>
    )
}

export default Login;