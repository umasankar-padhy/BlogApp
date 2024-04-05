import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/Login';

import PostApiContextProvider from './context/PostApiContext';
import Register from './components/Register';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Mypost from './components/Mypost';
import MyPostApiContextProvider from './context/MyPostApiContext';
import SinglePost from './components/SinglePost';
import CommentApiContextProvider from './context/CommentApiContext';
import Layout from './components/Layout';
import AuthContextProvider from './context/auth';
import CommentOfCommentApiContextProvider from './context/CommentOfCommentApiContext';

function App() {
  return (
    <div >
      <CommentOfCommentApiContextProvider>
      <AuthContextProvider>
      <PostApiContextProvider>
        <MyPostApiContextProvider>
          <CommentApiContextProvider>
            <BrowserRouter>

              <Routes>
                {/* <Route path="/" element={localStorage.getItem("auth") ? <Home /> : <Login />}></Route> */}
                <Route path="/" element={<Layout />}>
                <Route index  element={<Home /> }></Route>
                  <Route path="/home" element={<Home />}></Route>
                  <Route path="/About" element={<About />}></Route>
                  <Route path="/Contact" element={<Contact />}></Route>
                  <Route path="/Mypost" element={<Mypost />}></Route>
                  <Route path="/singlepost/:id" element={<SinglePost />}></Route>
                </Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                
                {/* <code> is an bootstrap element  */}
                <Route path="*" element={<main><code>not found  </code></main>}></Route>
              </Routes>
            </BrowserRouter>
          </CommentApiContextProvider>

        </MyPostApiContextProvider>
      </PostApiContextProvider>
      </AuthContextProvider>
      </CommentOfCommentApiContextProvider>
    </div>
  );
}

export default App;
