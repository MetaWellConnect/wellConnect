import { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../../api";
import { useAuth } from "../../hooks/AuthProvider";

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginFrontend } = useAuth();


    const handlLoginSubmit = async (e) => {
        e.preventDefault();

        await loginUser(email, password);
        loginFrontend();

        navigate('/dashboard');
    }

    return (
        <div className="container-fluid">
            <div className="row vh-100 text-center no-padding">
                <section className="login-page-welcome col-sm text-white bg-primary bg-gradient d-flex flex-column justify-content-center">
                    <h1>Welcome back to MediScan!</h1>
                    <p>Don't have an account?</p>
                    <button className="btn btn-light rounded-pill w-25 mx-auto" onClick={() => navigate('/register')}>Sign Up</button>
                </section>

                <form className="col-sm my-auto" onSubmit={(e) => handlLoginSubmit(e)}>
                    <h2>Sign In</h2>

                    <input type="email" className="rounded-pill form-control w-50 p-3 my-3 mx-auto" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" className="rounded-pill form-control w-50 p-3 my-3 mx-auto" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />

                    <button className="btn btn-primary rounded-pill w-50 p-3" type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
