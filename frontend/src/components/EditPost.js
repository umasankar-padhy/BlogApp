import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { PostApiContext } from '../context/PostApiContext';
import { MyPostApiContext } from '../context/MyPostApiContext';


export default function EditPost(props) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const { fetchApiData, fetchApiCount } = useContext(PostApiContext);
  const { fetchApiData: myfetchApiData, fetchApiCount: myfetchApiCount } = useContext(MyPostApiContext);



  useEffect(() => {
    setTitle(props.post.title);
    setDescription(props.post.description);
  }, [])


  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);




  const handleSaveChanges = async () => {
    try {
      const newPost = new FormData();

      newPost.append("title", title);
      newPost.append("description", description);
      newPost.append("img", img);
      // Make an Axios POST request to send the to the backend
      const response = await axios.put(`http://localhost:4000/api/v1/blog/posts/update/${props.post._id}`, newPost,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`
          }
        });
      fetchApiData()
      myfetchApiData()
      fetchApiCount()
      myfetchApiCount()
      if(props?.setOk){
      props?.setOk((prev)=>!prev)}
      // Handle the response from the backend (e.g., show a success message)
      console.log('Data sent to the backend successfully:', response.data);
      handleClose(); // Close the modal after saving
    } catch (error) {
      // Handle any errors (e.g., show an error message)
      console.error('Error sending data to the backend:', error);
    }
  };

  return (
    <>
      {/* <pre>{JSON.stringify(post, null, 4)}</pre> */}
      <Button variant="light" className="my-2 p-1 mx-1 " onClick={handleShow}>
        <span className=' bi bi-pencil'></span>
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>you can edit your  post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter post title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter here"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}

              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Enter post description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}

              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Upload photo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImg(e.target.files[0])}


              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

