


import { Link,  useLocation,  useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth";

export default function Login() {
    const navigate = useNavigate();
    const [view, setView] = useState(true)
    const location = useLocation();
    const{setAuth} =useContext(AuthContext)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setView(true)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:4000/api/v1/auth/login", formData);

            if (res.data.success) {
                alert(res.data.message);
setAuth(res.data)
                localStorage.setItem("auth", JSON.stringify(res.data));
                // navigate(location.state || "/home");
                navigate(location.state?.from || '/home');
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.error("Error:", err);
        }
    }

    return (
        <div>
            {/* <div style={{ backgroundColor: "#ffff00" }}> <h4 className="p-2 m-2">login Page</h4></div> */}
            <div className="d-flex  justify-content-center align-items-center" style={{ minHeight: "100vh" }}>

                <form className="col-3-lg col-6-md col-9-sm border border-5 border-light rounded rounded-3" onSubmit={handleSubmit}>
                    <div className="m-1 rounded rounded-2  " style={{ backgroundColor: "#ffff00" }}> <h4 className="p-2 m-2">login Page</h4></div>

                    <div className="p-1 m-2">
                        {/* <label htmlFor="email">Enter User Name:</label> */}
                        <input
                            type="text" className="form-control" id="email" name="email"
                            value={formData.email} placeholder="Enter Email" onChange={handleInputChange}
                            autoFocus required
                        />
                    </div>
                    <div className="p-1 m-2 " style={{ height: "3rem" }}>
                        {/* <label htmlFor="password">Enter password:</label> */}
                        {view ?
                            <div style={{ height: "3rem" }}>
                                <input
                                    type="password" className="form-control" id="password" name="password"
                                    value={formData.password} placeholder="Enter Password" onChange={handleInputChange}
                                    required
                                /><span className="bi bi-eye-slash-fill  "
                                    onClick={() => setView(false)}
                                    style={{ position: 'relative', left: "181px", bottom: "30px" }}
                                ></span>
                            </div> :
                            <div style={{ height: "3rem" }}>
                                <input
                                    type="text" className="form-control" id="password" name="password"
                                    value={formData.password} placeholder="Enter Password" onChange={handleInputChange}
                                    required
                                /><span className="bi bi-eye  "
                                    onClick={() => setView(true)}

                                    style={{ position: 'relative', left: "181px", bottom: "30px" }}
                                ></span>
                            </div>
                        }

                    </div>
                    <div className="p-1 m-2">
                        <button className="btn btn-primary w-100" type="submit"> Login</button>
                    </div>
                    <div className="p-1 m-2">

                        <Link to="/register">Don't have an account?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
