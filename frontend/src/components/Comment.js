import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { CommentApiContext } from '../context/CommentApiContext';
import Comments from './Comments'
import { flushSync } from 'react-dom';



export default function Comment({ id, user }) {
    //comment logic
    const { api, setPostid, fetchApiComment, count, setCount, fetchApiCount, index, lindex, setIndex, size, setLindex, setOrder } = useContext(CommentApiContext);

    const [comment, setComment] = useState("");

    useEffect(() => {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' })
        setPostid(id)
        setCount(0)
        setIndex(10)
        setLindex(0)
        setOrder(-1)
        // fetchApiComment()
        // fetchApiCount()
    }, [id]);
    const FormData = {
        comment: comment,
        post: id
    }

    async function HandleAddComment(e) {
        e.preventDefault()
        try {
            // console.log(postid)
            const response = await axios.post(`http://localhost:4000/api/v1/blog/comments/create`,
                // { index: index, size: size  , keyword: search ,type:type,order:order}, 
                FormData,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
                    }
                });

            if (response && response.data) {
                // console.log(response)
                alert("comment added successfully")
                // setApi(response.data.data);
                fetchApiComment()
                fetchApiCount()
                setComment("")
            } else {
                console.error('Failed to fetch api data');
            }

        } catch (error) {
            console.error('Error:', error);
        }

    }
    function handleClear(e) {
        e.preventDefault(); // Prevent page reload
        setComment("");
    }

    function loadMore() {
        setIndex(index + size)
    }


    return (
        <div>
            <div className='m-2 p-2'>
                <div className='container-fluid d-flex  flex-wrap'>
                    <h2>{api.length && count ? count : ""} Comments </h2>
                    <div className='ms-3 m-1 p-1'>  sort by
                        <button className=' btn btn-light mx-1 px-1' onClick={() => setOrder(-1)}> new </button>
                        <button className='btn btn-light mx-1 px-1' onClick={() => setOrder(1)}>  old </button>
                    </div>
                </div>
                <div className='  mx-3 p-0 '>
                    <form onSubmit={HandleAddComment}>
                        <input type="text"
                            className="form-control m-1 "
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)} />
                        {comment && <div className='d-flex justify-content-between align-items-center'>
                            <div>

                            </div>
                            <div>
                                <button type='reset' className="btn btn-light m-1" onClick={handleClear} >Cancel </button>
                                <button type="submit" className="btn btn-light m-1" >Comment </button>

                            </div>
                        </div>}
                    </form>
                </div>

                <div className='ms-4 m-2 p-2' >
                    {api.map(item => (
                        <div key={item._id}>
                            <Comments item={item} user={user} />
                        </div>
                    ))}
                </div>
                {(index < lindex) ?
                    <button className='btn btn-primary w-100' onClick={loadMore}>  load more</button> : ""}

            </div>
        </div>
    )
}
