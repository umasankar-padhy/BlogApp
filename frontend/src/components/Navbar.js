import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { PostApiContext } from '../context/PostApiContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyPostApiContext } from '../context/MyPostApiContext';



export default function Navbarrr(props) {
    const { search, setSearch, setIndex, setPageIndex } = useContext(PostApiContext);
    const { search:mysearch, setSearch:mysetSearch, setIndex:mysetIndex, setPageIndex:mysetPageIndex, user } = useContext(MyPostApiContext);
    const navigate = useNavigate(); 

    const handleLogout = () => {
        localStorage.removeItem("auth");
    }


    return (
        <Navbar expand="lg" className="bg-info">
            <div className="container " style={{ fontSize: "1rem" }}>
                <Navbar.Brand href="/home" className='fs-2 fst-italic'>BlogHive</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">HOME</Nav.Link>
                        <Nav.Link href="/about">ABOUT</Nav.Link>
                        <Nav.Link href="/contact">CONTACT</Nav.Link>
                    </Nav>
                    {user ? <Nav className="me-2 ms-2 w-50">
                        <input className="form-control " type="search" placeholder="Search" aria-label="Search"
                            value={mysearch} onChange={(e) => { mysetSearch(e.target.value); mysetIndex(0); mysetPageIndex(1)}}
                        />
                    </Nav> : <Nav className="me-2 ms-2 w-50">
                        <input className="form-control " type="search" placeholder="Search" aria-label="Search"
                            value={search} onChange={(e) => { setSearch(e.target.value); setIndex(0); setPageIndex(1); navigate("/home") }}
                        />
                    </Nav>}
                    <Nav className="ms-auto">
                        <Nav.Link href="/mypost" >MY POST</Nav.Link>
                        <Nav.Link href="/login" onClick={handleLogout}>LOGOUT</Nav.Link>



                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}
