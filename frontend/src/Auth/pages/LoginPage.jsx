function LoginPage() {
    const loginContainerStyles = {
        height: "95.85vh"
    };

    return (
        <div className="container-fluid overflow-hidden">
            <div style={loginContainerStyles} className="row text-center no-padding">
                <section className="login-page-welcome col text-white bg-primary bg-gradient d-flex flex-column justify-content-center">
                    <h1>Welcome to MediScan!</h1>
                    <p>Don't have an account?</p>
                    <button className="btn btn-light rounded-pill w-25 mx-auto">Sign Up</button>
                </section>

                <form className="col my-auto">
                    <h2>Sign In</h2>

                    <input type="text" className="rounded-pill form-control w-50 p-3 my-3 mx-auto" placeholder="First name" required />
                    <input type="text" className="rounded-pill form-control w-50 p-3 my-3 mx-auto" placeholder="Last name" required />
                    <input type="text" className="rounded-pill form-control w-50 p-3 my-3 mx-auto" placeholder="Email" required />
                    <input type="text" className="rounded-pill form-control w-50 p-3 my-3 mx-auto" placeholder="Password" required />

                    <button className="btn btn-primary rounded-pill w-50 p-3">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
