function LogoutPage() {
    const logoutContainerStyles = {
        height: "90vh"
    };

    return (
        <div style={logoutContainerStyles} className="d-flex align-items-center justify-content-center">
            <h1>You have been successfully logged out of MediScan!</h1>
        </div>
    );
}

export default LogoutPage;
