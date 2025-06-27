import { useState } from "react";
import { useNavigate } from "react-router";


function RegisterPage() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accountType, setAccountType] = useState("");

    const handleSignUpSubmit = () => {
        console.log("Button works for now!");
    }

    const AccountTypes = {
        PATIENT: "Patient",
        PROVIDER: "Provider"
    }

    return (
        <div className="container-fluid">
            <div className="row vh-100 text-center no-padding">
                <section className="register-page-welcome col-sm text-white bg-primary bg-gradient d-flex flex-column justify-content-center">
                    <h1>Welcome to MediScan!</h1>
                    <p>Already have an account?</p>
                    <button className="btn btn-light rounded-pill w-25 mx-auto" onClick={() => navigate('/login')}>Sign In</button>
                </section>

                <form className="col-sm my-auto" onSubmit={handleSignUpSubmit}>
                    <h2>Register</h2>

                    <input type="text" className="rounded-pill form-control w-50 p-3 my-3 mx-auto" placeholder="First name" onChange={(e) => setFirstName(e.target.value)} required />
                    <input type="text" className="rounded-pill form-control w-50 p-3  my-3 mx-auto" placeholder="Last name" onChange={(e) => setLastName(e.target.value)} required />
                    <input type="email" className="rounded-pill form-control w-50 p-3 my-3 mx-auto" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" className="rounded-pill form-control w-50 p-3  mx-auto" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />


                    <section className="account-type-select w-50 p-3 my-3 mx-auto text-start" name="account-select" onChange={(e) => setAccountType(e.target.value)}>

                        <section className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" value={AccountTypes.PATIENT} name="account-select" />
                            <label className="form-check-label">Patient</label>
                        </section>

                        <section className="form-check form-check-inline">
                            <input type="radio" className="form-check-input" value={AccountTypes.PROVIDER} name="account-select" />
                            <label className="form-check-label">Provider</label>
                        </section>
                    </section>



                    <button className="btn btn-primary rounded-pill w-50 p-3" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
