import React from "react-dom";
import logo from "../../assets/images/logo-dark.png";
//import { FiEye, FiEyeOff } from "react-icons/fi";
//import { FcGoogle } from "react-icons/fc";
//import { useState } from "react";
import { Link } from "react-router-dom";

const Forgot = () => {
    //const [isShow, setIsShow] = useState(true);

    // const showHidePass = () =>{
    //     setIsShow(!isShow);
    // }
    return (
        <>
            <div className="container">
                <div className="auth-body">
                    <div className="auth-panel">
                        <div style={{textAlign: 'center'}}>
                            <img src={logo} alt="LOGO" />
                        </div>
                        <h5 style={{textAlign:'center', marginTop:'30px'}}>Forgot Your Password?</h5>
                        <div className="para">
                            <p>Enter your email address and we will send you instructions to reset your password.</p>
                        </div>
                        <form>
                            <div className="email-field field">
                                <input type="text" placeholder="Email address" />
                            </div>
                            <div className="action">
                                <button className="btn btn-primary">Continue</button>
                            </div>
                            <div className="back-to-login">
                                <Link to="/auth/login">Back to Screenshot API</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forgot;