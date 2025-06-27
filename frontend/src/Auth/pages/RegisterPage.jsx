import { useState } from "react";
import { useNavigate } from "react-router";


function RegisterPage() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUpContainerStyles = {
        height: "95.85vh"
    };

    const handleSignUpSubmit = () => {
        console.log("Button works for now!");
    }

    return (
        <div className="container-fluid overflow-hidden">
            <div style={signUpContainerStyles} className="row text-center no-padding">
                <section className="register-page-welcome col-sm text-white bg-primary bg-gradient d-flex flex-column justify-content-center">
                    <h1>Welcome to MediScan!</h1>
                    <p>Already have an account?</p>
                    <button className="btn btn-light rounded-pill w-25 mx-auto" onClick={() => navigate('/login')}>Sign In</button>
                </section>

                <form className="col-sm my-auto" onSubmit={handleSignUpSubmit}>
                    <h2>Register</h2>

                    <input type="text" className="rounded-pill form-control w-50 p-3 my-3 mx-auto" placeholder="First name" onChange={(e) => setFirstName(e.target.value)} required />
                    <input type="text" className="rounded-pill form-control w-50 p-3 my-3 mx-auto" placeholder="Last name" onChange={(e) => setLastName(e.target.value)} required />
                    <input type="email" className="rounded-pill form-control w-50 p-3 my-3 mx-auto" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" className="rounded-pill form-control w-50 p-3 my-3 mx-auto" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />

                    <button className="btn btn-primary rounded-pill w-50 p-3" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
