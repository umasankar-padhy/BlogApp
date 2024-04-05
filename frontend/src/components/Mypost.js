import React, { useContext, useEffect, useState } from 'react'
// import Navbarrr from './Navbar';
import Spinner from './Spinner';
import Card from './Card';
import { MyPostApiContext } from '../context/MyPostApiContext';
import AddPost from './AddPost';
import MyPostPage from './MyPostPage';

export default function Mypost() {

    const [load, setLoad] = useState(false)

    const { api, loading, fetchApiData, fetchApiCount ,count, index, search,setUser }  = useContext(MyPostApiContext);
    useEffect(() => {
        fetchApiCount()
        fetchApiData()
        window.scroll({ behavior: 'smooth' })
       
        setUser(true)
        setLoad(true)
    }, []);

    if (!count) {
        return (
            <div>
                {/* <div><Navbarrr /></div> */}
                {!load ? <Spinner /> : <div> <div className=' my-5 w-100 text-center fs-3' >
                    The Post List is Empty!


                </div>
                    <AddPost /></div>}

            </div>
        );
    }

  return (
     <div>
          {!loading ? <div >
              <div className="d-flex justify-content-end mb-3">
                  <div>
                      <span className="m-2">Total Count ({api?.length}):  {index + 1} - {index + api?.length} out of {api?.length && count}</span>

                  </div>

              </div>
              {search && api.length === 0 ?
                  <div className=' my-5 w-100 text-center fs-3' >
                      The search keyword not matched to any post


                  </div> : ""
              }
              {/* <Navbarrr /> */}
              {/* <pre>{JSON.stringify(api, null, 4)}</pre> */}
              <div >
                  {!loading ?
                      <div className='container-fluid d-flex flex-wrap '>
                          {api.map(item => {
                              return (
                                  <div key={item._id}>
                                      <Card post={item} />
                                  </div>
                              );
                          })}
                      </div>
                      :
                      <Spinner />
                  }
              </div>
              <AddPost />
              <div style={{ height: "2.9rem" }}></div>
              <div style={{ position: 'fixed', bottom: "0px", height: "2.9rem" }} className="d-flex w-100  justify-content-center  bg-secondary " >

                  <div className='m-1'><MyPostPage /></div>
              </div>
          </div>:<Spinner />}
     </div>
  )
}
