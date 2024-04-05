import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
// import Navbarrr from './Navbar';
import axios from 'axios';
import EditPost from './EditPost';
import Button from 'react-bootstrap/Button';
import Comment from './Comment';
import img_not_found from "../assets/img_not_found.png"
import Spinner from './Spinner';
import Card from './Card';




export default function SinglePost() {
    const params = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({});
    const [rendomPost, setRendomPost] = useState([]);
    const [loading, setLoading] = useState(false)
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [ok, setOk] = useState(false)



    async function fetchApiData() {
        setLoading(true)
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/blog/posts/getPostById/${params.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
                    }
                });

            if (response && response.data) {
                setPost(response.data.data);
            } else {
                console.error('Failed to fetch api data');
            }

        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false)

    }
    async function fetchRendomPost() {
        setLoading(true)
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/blog/posts/getRendomPosts/${post?.user}`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
                    }
                });

            if (response && response.data) {
                setRendomPost(response.data.data);
            } else {
                console.error('Failed to fetch api data');
            }

        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false)
    }




    async function fetchLikeCount() {
        try {
            const response = await axios.post("http://localhost:4000/api/v1/blog/likes/likeCounter", { post: params.id },
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
                    }
                });
            if (response.status === 200) {
                setLikeCount(response.data);
            } else {
                console.error('Failed to fetch api data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    async function fetchDislikeCount() {
        try {
            const response = await axios.post("http://localhost:4000/api/v1/blog/likes/dislikeCounter", { post: params.id },
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
                    }
                });
            if (response.status === 200) {
                setDislikeCount(response.data);
            } else {
                console.error('Failed to fetch api data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    async function fetchLikeViewer() {
        try {

            const response = await axios.post("http://localhost:4000/api/v1/blog/likesViewer", { post: params.id },
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
                    }
                });
            if (response.status === 200) {
                // setDislikeCount(response.data.data);
                setLike(response?.data?.data?.like);
                setDislike(response?.data?.data?.dislike)
            } else {
                console.error('Failed to fetch api data');
            }

        } catch (error) {
            console.error('Error:', error);
        }

    }
    useEffect(() => {
        fetchApiData()
        fetchLikeCount()
        fetchDislikeCount()
        fetchLikeViewer()
        window.scroll({ top: 0, left: 0, behavior: 'smooth' })


    }, [ok, params.id]);

    useEffect(() => {

        fetchRendomPost()

    }, [post]);
    const handleDelete = async () => {
        try {
            let answer = window.confirm("Are You Sure want to delete this post ? ");
            if (!answer) return;
            const { data } = await axios.delete(
                `http://localhost:4000/api/v1/blog/posts/delete/${params.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
                    }
                });
            alert("post deleted successfully")
            navigate(-1)
            // toast.success("Product Deleted Successfully");
            // navigate("/dashboard/admin/products");
        } catch (error) {
            console.log(error);
            // toast.error("Something went wrong");
        }
    };

    const handleLikePost = async (l, d) => {

        // console.log("called") 
        try {
            // let answer = window.prompt("Are You Sure want to delete this post ? ");
            // if (!answer) return;
            const { data } = await axios.post(
                `http://localhost:4000/api/v1/blog/likes`, { post: params.id, like: l, dislike: d },
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
                    }
                });
            fetchLikeCount()
            fetchDislikeCount()
            setLike(l);
            setDislike(d);
            // alert("post de successfully")
            // toast.success("Product Deleted Successfully");
            // navigate("/dashboard/admin/products");
        } catch (error) {
            console.log(error);
            // toast.error("Something went wrong");
        }
    };






    return (
        <div>
            {/* <Navbarrr /> */}
            <div className=' d-flex flex-wrap'>
                {/* <pre>{JSON.stringify(api, null, 4)}</pre> */}
                <div className='col-lg-7 col-sm-12 ' >
                    <div className='m-2 p-2'>
                        <img
                            src={`http://localhost:4000/api/v1/blog/posts/photo/${params.id}`}

                            onError={(e) => {
                                e.target.src = img_not_found;
                            }}
                            alt={post.title}
                            style={{ width: "100%", height: "auto", aspectRatio: " 5/3" }}
                        ></img>

                        <div className='mt-2'> <h3 >{post.title}</h3> </div>

                        <div className='d-flex flex-wrap ' style={{ height: "2.77rem" }}>

                            {like ?
                                <button className='btn my-2 p-1 bi bi-hand-thumbs-up-fill ' onClick={() => handleLikePost(false, false)} >{likeCount}</button>
                                :
                                <button className='btn my-2 p-1 bi bi-hand-thumbs-up  ' onClick={() => handleLikePost(true, false)}> {likeCount}</button>

                            }
                            {dislike ?
                                <button className='btn my-2 p-1 bi bi-hand-thumbs-down-fill ' onClick={() => handleLikePost(false, false)}> {dislikeCount}</button>
                                :
                                <button className='btn my-2 p-1 bi bi-hand-thumbs-down   ' onClick={() => handleLikePost(false, true)}> {dislikeCount}</button>

                            }
                            {(post.user === JSON.parse(localStorage.getItem("auth")).email) ?
                                <span>
                                    <EditPost post={post} setOk={setOk} />
                                    <Button
                                        variant="light"
                                        className="my-2 p-1"
                                        // style={{ fontSize: ".6rem" }}
                                        onClick={handleDelete}>
                                        <span className=' bi bi-trash3'></span>

                                    </Button>
                                </span>
                                : ""}
                        </div>
                        <div > <p >{post.description}</p> </div>
                    </div>
                    {/* related post */}
                    <div className='m-2 '>
                        {/* <pre>{JSON.stringify(rendomPost, null, 4)}</pre> */}
                        <div   >
                            {!loading ?
                                <div className='container-fluid d-flex flex-wrap '>
                                    {rendomPost?.map(item => {
                                        return (
                                            <div key={item._id}>
                                                {item._id !== post._id ? <Card post={item} /> : ""}
                                            </div>
                                        );
                                    })}
                                </div>
                                :
                                <Spinner />
                            }
                        </div>
                    </div>
                </div>






                <div className='col-lg-5  col-sm-12  col-12' >
                    <Comment id={params.id} user={post.user} />

                </div>
            </div>
        </div>
    )
}
