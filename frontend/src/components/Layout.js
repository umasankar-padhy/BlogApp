// import React, { useContext, useEffect, useState } from 'react'
// import { Outlet } from 'react-router-dom'
// import Login from './Login'
// import { AuthContext } from '../context/auth'
// import Navbarrr from './Navbar'
// import Spinner from './Spinner'

// export default function Layout() {
//     const [ok, setok] = useState(null)
//     const { auth } = useContext(AuthContext)
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {

//         setok(localStorage.getItem("auth"))
//         //eslint-disable-next-line
//         setLoading(false);

//     }, [auth])
//     return (
//         <div>
//             {loading ? <Spinner />:
//                 <div>{/* <Outlet /> */}
//                     {ok ? <div> <Navbarrr /><Outlet /> </div> : <Login />}
//                     {/* {localStorage.getItem("auth") ? <Outlet /> : <Login />} */}
//                     </div>
//             }
//         </div>
//     )
// }










import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import Navbarrr from './Navbar';
import Spinner from './Spinner';

export default function Layout() {
    const { auth } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(false);
    }, [auth]);

    if (loading) {
        return <Spinner />;
    }

    if (!localStorage.getItem("auth")) {
        navigate('/login', { state: { from: location.pathname } });
        return null; // Redirecting to login, so return nothing for now
    }

    return (
        <div>
            <Navbarrr />
            <Outlet />
        </div>
    );
}
