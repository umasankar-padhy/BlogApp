import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
// import Navbarrr from './Navbar'
import { PostApiContext } from '../context/PostApiContext';
import Spinner from './Spinner';
import AddPost from './AddPost';
import Page from './Page';

export default function Home() {
  const [load, setLoad] = useState(false)
  const { api, loading, fetchApiData, fetchApiCount, count, index, search } = useContext(PostApiContext);
  useEffect(() => {
    fetchApiCount()
    fetchApiData()
    window.scroll({ behavior: 'smooth' })
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
      {!loading ?
        <div >
          {/* <Navbarrr /> */}
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
          {/* <pre>{JSON.stringify(api, null, 4)}</pre> */}
          <div   >
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

            <div className='m-1'><Page /></div>
          </div>
          {/* <button className='btn btn-primary rounded-circle bi bi-plus-circle py-2' style={{ position: 'fixed', right: "37px", bottom: "30px" }}></button> */}
        </div>
        : <Spinner />}
    </div>
  )
}
