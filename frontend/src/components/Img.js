import React, { useEffect, useState } from 'react'
import img_not_found from "../assets/img_not_found.png"

export default function Img({id}) {
    const [url, setUrl] = useState(`http://localhost:4000/api/v1/blog/posts/photo/${id}`)
    useEffect(() => {
        setUrl(`http://localhost:4000/api/v1/blog/posts/photo/${id}`)
    }, [id])
  return (
      <img

          src={url}
          onError={(e) => {
              e.target.src = img_not_found;
          }}
          className="card-img-top"
          // alt={"img_not_found"}
          style={{ height: "10rem", width: "100%" }}  ></img>
  )
}
