import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Dropdown, Button } from 'react-bootstrap';
import { CommentApiContext } from '../context/CommentApiContext';
import { CommentOfCommentApiContext } from '../context/CommentOfCommentApiContext';


export default function CommentOfComment({ item, user, fetchApiCommentOfComment, fetchApiCommentOfCommentCount }) {

    const [showButtons, setShowButtons] = useState(false);
    const [comment, setComment] = useState("");
    const [edit, setEdit] = useState(false)
    const { fetchApiComment, fetchApiCount } = useContext(CommentOfCommentApiContext);




    const handleDelete = async () => {
        try {
            let answer = window.confirm("Are You Sure want to delete this comment ? ");
            if (!answer) return;
            const { data } = await axios.delete(
                `http://localhost:4000/api/v1/blog/commentOfComments/delete/${item._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
                    }
                });
            alert("comment deleted successfully")
            fetchApiComment()
            fetchApiCount()
            fetchApiCommentOfComment()
            fetchApiCommentOfCommentCount()
            // toast.success("Product Deleted Successfully");
            // navigate("/dashboard/admin/products");
        } catch (error) {
            console.log(error);
            // toast.error("Something went wrong");
        }
    };





    const handleEdit = async () => {
        setEdit(true)
        setComment(item.comment)
    };



    async function HandleEditComment(e) {
        e.preventDefault()
        try {
            // console.log(postid)
            const response = await axios.put(`http://localhost:4000/api/v1/blog/commentOfComments/update/${item._id}`,
                // { index: index, size: size  , keyword: search ,type:type,order:order}, 
                { comment: comment },
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
                    }
                });

            if (response && response.data) {
                // console.log(response)
                alert("comment added successfully")
                fetchApiComment()
                fetchApiCount()
                setEdit(false);
                fetchApiCommentOfComment()
                fetchApiCommentOfCommentCount()
                // setApi(response.data.data);
            } else {
                console.error('Failed to fetch api data');
            }

        } catch (error) {
            console.error('Error:', error);
        }

    }

    function handleClear(e) {
        e.preventDefault(); // Prevent page reload
        setEdit(false);
    }




    //     ///// like dislike logic

    //     const [likeCount, setLikeCount] = useState(0);
    //     const [dislikeCount, setDislikeCount] = useState(0);
    //     const [like, setLike] = useState(false);
    //     const [dislike, setDislike] = useState(false);

    //     const handleLikePost = async (l, d) => {

    //         // console.log("called") 
    //         try {
    //             // let answer = window.prompt("Are You Sure want to delete this post ? ");
    //             // if (!answer) return;
    //             const { data } = await axios.post(
    //                 `http://localhost:4000/api/v1/blog/likeOfComments`, { commentId: item._id, like: l, dislike: d },
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
    //                     }
    //                 });
    //             fetchLikeCount()
    //             fetchDislikeCount()
    //             setLike(l);
    //             setDislike(d);
    //             // alert("post de successfully")
    //             // toast.success("Product Deleted Successfully");
    //             // navigate("/dashboard/admin/products");
    //         } catch (error) {
    //             console.log(error);
    //             // toast.error("Something went wrong");
    //         }
    //     };
    //     async function fetchLikeCount() {
    //         try {

    //             const response = await axios.post("http://localhost:4000/api/v1/blog/likeOfComments/likeCounter", { commentId: item._id },
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
    //                     }
    //                 });
    //             if (response.status === 200) {
    //                 setLikeCount(response.data);
    //             } else {
    //                 console.error('Failed to fetch api data');
    //             }

    //         } catch (error) {
    //             console.error('Error:', error);
    //         }

    //     }
    //     async function fetchDislikeCount() {
    //         try {

    //             const response = await axios.post("http://localhost:4000/api/v1/blog/likeOfComments/dislikeCounter", { commentId: item._id },
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
    //                     }
    //                 });
    //             if (response.status === 200) {
    //                 setDislikeCount(response.data);
    //             } else {
    //                 console.error('Failed to fetch api data');
    //             }

    //         } catch (error) {
    //             console.error('Error:', error);
    //         }

    //     }
    //     async function fetchLikeViewer() {
    //         try {

    //             const response = await axios.post("http://localhost:4000/api/v1/blog/likeOfCommentsViewer", { commentId: item._id },
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
    //                     }
    //                 });
    //             if (response.status === 200) {
    //                 // setDislikeCount(response.data.data);
    //                 setLike(response?.data?.data?.like);
    //                 setDislike(response?.data?.data?.dislike);

    //             } else {
    //                 console.error('Failed to fetch api data');
    //             }

    //         } catch (error) {
    //             console.error('Error:', error);
    //         }

    //     }

    //     useEffect(() => {
    //         fetchLikeCount()
    //         fetchDislikeCount()
    //         fetchLikeViewer()
    //     }, []);




    // //comment logic
    //     const { api, setPostid, 
    //         // fetchApiComment, fetchApiCount ,
    //         count, setCount,   index, lindex, setIndex, size, setLindex, setOrder } = useContext(CommentOfCommentApiContext);

    // const [commentView, setCommentView]= useState(false)
    // const [commentOfComment,setCommentOfComment]=useState("")
    //     const FormData = {
    //         comment: commentOfComment,
    //         commentId: item._id
    //     }
    //     useEffect(() => {
    //         window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    //         setPostid(item._id)
    //         setCount(0)
    //         setIndex(10)
    //         setLindex(0)
    //         setOrder(-1)
    //         // fetchApiComment()
    //         // fetchApiCount()
    //     }, [item._id]);
    //     async function HandleAddComment(e) {
    //         e.preventDefault()
    //         try {
    //             // console.log(postid)
    //             const response = await axios.post(`http://localhost:4000/api/v1/blog/commentOfComments/create`,
    //                 // { index: index, size: size  , keyword: search ,type:type,order:order}, 
    //                 FormData,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
    //                     }
    //                 });

    //             if (response && response.data) {
    //                 // console.log(response)
    //                 alert("comment added successfully")
    //                 // setApi(response.data.data);
    //                 fetchApiComment()
    //                 fetchApiCount()
    //                 setCommentOfComment("")
    //                 setCommentView(false)
    //             } else {
    //                 console.error('Failed to fetch api data');
    //             }

    //         } catch (error) {
    //             console.error('Error:', error);
    //         }

    //     }









    return (
        <div className='d-flex '>
            <div className=' bg-warning text-light rounded-circle mt-2 p-1  me-2' style={{ height: "2.7rem", width: "2.7rem" }}> <h3 className='text-center'> {item.user.toUpperCase().substring(0, 1)}</h3></div>
            <div className="flex-grow-1" >
                <div className="d-flex justify-content-between align-items-center " >
                    <h6 className='mb-0'>{item.user}</h6>
                    {/* {(item.user === JSON.parse(localStorage.getItem("auth")).email) ?
                        <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic" className="no-arrow-toggle">
                                <i className="bi bi-three-dots-vertical"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu show={showButtons}>
                                <Dropdown.Item onClick={handleEdit}><span className='bi bi-pencil'> </span>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={handleDelete}><span className='bi bi-trash3'> </span>Delete</Dropdown.Item>
                                {/* {(user === JSON.parse(localStorage.getItem("auth")).email) ?
                                <Dropdown.Item onClick={handleDelete}><span className='bi bi-trash3'> </span>Delete By Auth</Dropdown.Item>:""} 
                            </Dropdown.Menu>
                        </Dropdown> : ""} */}

                    <Dropdown>
                        <Dropdown.Toggle variant="" id="dropdown-basic" className="no-arrow-toggle">
                            <i className="bi bi-three-dots-vertical"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu show={showButtons}>
                            {/* <Dropdown.Item onClick={()=>setCommentView(true)} >Reply</Dropdown.Item> */}

                            {(item.user === JSON.parse(localStorage.getItem("auth")).email) ?
                                <><Dropdown.Item onClick={handleEdit}><span className='bi bi-pencil'> </span>Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={handleDelete}><span className='bi bi-trash3'> </span>Delete</Dropdown.Item></> : ""}
                            {/* {(user === JSON.parse(localStorage.getItem("auth")).email) ?
                                <Dropdown.Item onClick={handleDelete}><span className='bi bi-trash3'> </span>Delete By Auth</Dropdown.Item> : ""} */}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                {edit ? <form onSubmit={HandleEditComment} >
                    <input type="text"
                        className="form-control m-1 "
                        autoFocus
                        value={comment}
                        onChange={(e) => setComment(e.target.value)} />
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>

                        </div>
                        <div>
                            <button type='reset' className="btn btn-light m-1" onClick={handleClear} >Cancel </button>
                            {item.comment === comment.trim() ?
                                <button type='submit' className="btn btn-light m-1" disabled>comment </button>
                                : <button type='submit' className="btn btn-light m-1" >comment </button>}

                        </div>
                    </div>


                </form> : <p className='my-0'>{item.comment}</p>}

                {/* <div>


                    {like ?
                        <button className='btn  bi bi-hand-thumbs-up-fill ' onClick={() => handleLikePost(false, false)} >{likeCount}</button>
                        :
                        <button className='btn  bi bi-hand-thumbs-up  ' onClick={() => handleLikePost(true, false)}> {likeCount}</button>

                    }
                    {dislike ?
                        <button className='btn  bi bi-hand-thumbs-down-fill ' onClick={() => handleLikePost(false, false)}> {dislikeCount}</button>
                        :
                        <button className='btn  bi bi-hand-thumbs-down   ' onClick={() => handleLikePost(false, true)}> {dislikeCount}</button>
                    }


                </div> */}
                <div>
                    {/* {commentView ? <div className='  mx-3  my-2 p-2 '>
                        <form onSubmit={HandleAddComment}>
                            <input type="text"
                                className="form-control m-1 "
                                placeholder="Add a comment..."
                                value={commentOfComment}
                                onChange={(e) => setCommentOfComment(e.target.value)} />
                            {commentOfComment && <div className='d-flex justify-content-between align-items-center'>
                                <div>

                                </div>
                                <div>
                                    <button type='reset' className="btn btn-light m-1" onClick={handleClear} >Cancel </button>
                                    <button type="submit" className="btn btn-light m-1" >Comment </button>

                                </div>
                            </div>}
                        </form>
                    </div>:""} */}
                    {/* <div className='ms-4 m-2 p-2' >
                        {api.map(item => (
                            <div key={item._id}>
                                <Comments item={item} user={user} />
                            </div>
                        ))}
                    </div> */}


                </div>

            </div>

        </div>
    )
}
