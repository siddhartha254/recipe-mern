import React from "react";
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

export const Navbar = () => {

    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }

    return (
    <div className="navbar">
        <div className="left">
        <Link to="/">Home</Link>
        <Link to="/create">Add Recipe</Link>
        </div>
        {!cookies.access_token ? (
            <Link to="/auth">Login/Register</Link>) 
            :(
                <>
                <div className="saved-div"><Link to="/saved">Saved</Link></div>
                <div className="nav-button"><button onClick={logout}>Logout</button></div>
                </>
            )
        }
        
    </div>
    )

}

//export default Navbar;