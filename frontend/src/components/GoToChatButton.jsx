import { useNavigate } from "react-router";

function GoToChatButton() {
    const navigate = useNavigate();

    return(
        <>
            <button className="btn btn-light w-100 p-3 mb-3" onClick={() => navigate('/messenger')}>Go To Chat</button>
        </>
    );
}

export default GoToChatButton;
