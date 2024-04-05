import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const MyPostApiContext = createContext();

export default function MyPostApiContextProvider({ children }) {
    const [loading, setLoading] = useState(false);

    const [api, setApi] = useState([]);
    const [count, setCount] = useState(0);
    const [size, setSize] = useState(12);

    const [index, setIndex] = useState(0);
    const [lindex, setLindex] = useState(0);

    const [page, setPage] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [search, setSearch] = useState("");

    const [type, setType] = useState("_id");
    const [order, setOrder] = useState(-1);
    const [user, setUser] = useState(false)


    useEffect(() => {
        if (localStorage.getItem("auth") && size) {

            fetchApiCount()
            setLindex((Math.ceil(count / size) - 1) * size)
            setPage((Math.ceil(count / size)))
            fetchApiData()
        }
    }, [count, index, size, search, type, order]);


    async function fetchApiData() {
        setLoading(true)
        try {

            const response = await axios.post("http://localhost:4000/api/v1/blog/posts/getPostsByUser",
                { index: index, size: size  , keyword: search ,type:type,order:order}, 
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))?.token}`
                    }
                });

            if (response && response.data) {
                setApi(response.data.data);
            } else {
                console.error('Failed to fetch api data');
            }

        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false)
    }
    async function fetchApiCount() {
        setLoading(true)
        try {

            const response = await axios.post("http://localhost:4000/api/v1/blog/posts/postsByUserCount", { keyword: search }, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth"))?.token}`
                }
            });
            if (response && response.data) {
                setCount(response.data);
            } else {
                console.error('Failed to fetch api data');
            }

        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false)
    }


    const value = {
        user, setUser, loading, setLoading, fetchApiData, fetchApiCount, lindex, setLindex, api, setApi, size, setSize, index, setIndex, page, setPage, pageIndex, setPageIndex, count, setCount, search, setSearch, type, setType, order, setOrder
    };
    return <MyPostApiContext.Provider value={value}>
        {children}
    </MyPostApiContext.Provider>
}