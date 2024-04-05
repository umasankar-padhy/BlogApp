import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const CommentApiContext = createContext();

export default function CommentApiContextProvider({ children }) {
    const [loading, setLoading] = useState(false);

    const [api, setApi] = useState([]);
    const [count, setCount] = useState(0);
    const [size, setSize] = useState(10);

    const [index, setIndex] = useState(10);
    const [lindex, setLindex] = useState(0);

    const [page, setPage] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [search, setSearch] = useState("");
    const [postid, setPostid] = useState("");

    const [type, setType] = useState("_id");
    const [order, setOrder] = useState(-1);


    useEffect(() => {
        if (localStorage.getItem("auth") && postid && size) {
            fetchApiCount()
            setLindex((Math.ceil(count / size)) * size)
            setPage((Math.ceil(count / size)))
            fetchApiComment()
        }
    }, [count, index, size, search, type, order, postid]);

 
    async function fetchApiComment() {
        setLoading(true)
        try {
            // console.log(postid)
            const response = await axios.post(`http://localhost:4000/api/v1/blog/comments/get/${postid}`,
                 { index: index ,type:type,order:order}, 
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))?.token}`
                    }
                });

            if (response && response.data) {
                // console.log(response)
                setApi(response.data.data);
            } else {
              //  console.error('Failed to fetch api data');
            }

        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false)
    }
    async function fetchApiCount() {
        setLoading(true)
        try {

            const response = await axios.get(`http://localhost:4000/api/v1/blog/comments/count/${postid}`, 
             {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))?.token}`
                }
            });
            if (response && response.data) {
                setCount(response.data);
            } else {
                // console.error('Failed to fetch api data');
            }

        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false)
    }


    const value = {
        loading, setLoading, fetchApiComment, fetchApiCount, postid, setPostid, lindex, setLindex, api, setApi, size, setSize, index, setIndex, page, setPage, pageIndex, setPageIndex, count, setCount, search, setSearch, type, setType, order, setOrder
    };
    return <CommentApiContext.Provider value={value}>
        {children}
    </CommentApiContext.Provider>
}