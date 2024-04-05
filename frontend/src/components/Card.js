import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import EditPost from './EditPost';
import Button from 'react-bootstrap/Button';
// import Button from 'react-bootstrap/esm/Button';
import { Link, useNavigate } from "react-router-dom";
import { PostApiContext } from '../context/PostApiContext';
import { MyPostApiContext } from '../context/MyPostApiContext';
import img_not_found from "../assets/img_not_found.png"
import Img from './Img';


export default function Card(props) {
    const [url, setUrl] = useState(`http://localhost:4000/api/v1/blog/posts/photo/${props.post._id}`)
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const { fetchApiData, fetchApiCount } = useContext(PostApiContext);
    const { fetchApiData: myfetchApiData, fetchApiCount: myfetchApiCount } = useContext(MyPostApiContext);


    const navigate = useNavigate();
    async function fetchLikeCount() {
        try {

            const response = await axios.post("http://localhost:4000/api/v1/blog/likes/likeCounter", { post: props.post._id },
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

            const response = await axios.post("http://localhost:4000/api/v1/blog/likes/dislikeCounter", { post: props.post._id },
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

            const response = await axios.post("http://localhost:4000/api/v1/blog/likesViewer", { post: props.post._id },
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
                    }
                });
            if (response.status === 200) {
                // setDislikeCount(response.data.data);
                setLike(response?.data?.data?.like);
                setDislike(response?.data?.data?.dislike);

            } else {
                console.error('Failed to fetch api data');
            }

        } catch (error) {
            console.error('Error:', error);
        }

    }
    useEffect(() => {
        fetchLikeCount()
        fetchDislikeCount()
        fetchLikeViewer()
    }, []);

    const handleDelete = async () => {
        try {
            let answer = window.confirm("Are You Sure want to delete this post ? ");
            if (!answer) return;
            const response = await axios.delete(
                `http://localhost:4000/api/v1/blog/posts/delete/${props.post._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
                    }
                });
            if (response.status === 200) {
                alert("post deleted successfully")
                fetchApiData()
                myfetchApiData()
                fetchApiCount()
                myfetchApiCount()
            } else {
                console.error('Failed to fetch api data');
            }


        } catch (error) {
            console.log(error);

        }
    };


    const handleLikePost = async (l, d) => {

        // console.log("called") 
        try {
            // let answer = window.prompt("Are You Sure want to delete this post ? ");
            // if (!answer) return;
            const { data } = await axios.post(
                `http://localhost:4000/api/v1/blog/likes`, { post: props.post._id, like: l, dislike: d },
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
        <div className='border m-2 '  >
            {/* <pre>{JSON.stringify(props.post, null, 4)}</pre> */}

            <div className="card " style={{ width: "16.3rem" }} key={props.post._id} >
                <Link to={`/singlepost/${props.post._id}`} style={{ textDecorationLine: "none", color: "black" }} >
                    <Img id={props.post._id} />
                    {/* <img

                        src={`http://localhost:4000/api/v1/blog/posts/photo/${props.post._id}` }
                        onError={(e) => {
                            e.target.src = img_not_found; 
                        }}
                        className="card-img-top"
                       // alt={"img_not_found"}
                        style={{ height: "10rem", width: "100%" }}  ></img> */}
                    {/* <p>{`http://localhost:4000/api/v1/blog/posts/photo/${props.post._id}`}</p> */}

                    <div className="card-body" style={{ height: "5.5rem" }}>
                        <h5 className="card-title">{props.post.title.length > 14 ? `${props.post.title.substring(0, 14)}...` : props.post.title}</h5>
                        <p className="card-text  " style={{ fontSize: "0.9rem" }}>{props.post.description.length > 41 ? `${props.post.description.substring(0, 41)}....` : props.post.description}</p>
                    </div></Link>
                <div className='d-flex justify-content-between align-items-center' style={{ height: "2.77rem" }}>
                    <div>
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
                    </div>


                    <div>
                        {(props.post.user === JSON.parse(localStorage.getItem("auth")).email) ?
                            <EditPost post={props.post} />
                            : ""}
                        {(props.post.user === JSON.parse(localStorage.getItem("auth")).email) ?
                            <Button
                                variant="light"
                                className="my-2 p-1 me-1"
                                // style={{ fontSize: ".6rem" }}
                                onClick={handleDelete}
                            >
                                <span className=' bi bi-trash3'></span>
                            </Button>
                            : ""}
                    </div>

                </div>
                <div>

                </div>
            </div>
        </div>

    )
}
