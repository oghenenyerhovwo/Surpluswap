import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage"


// components
import { Spinner, MessageBox, Button, Form, TextEditor } from "../../components"
import { AiFillPicture } from 'react-icons/ai'
import { BsFillCameraVideoFill } from "react-icons/bs"

// css
import styles from "./createstory.module.css"

// functions and objects
import { createStory } from "../../actions"
import { firebaseStorage, onSubmitError, onChangeError } from '../../utils/'

// type
import { CREATE_STORY_RESET } from "../../constants/storyConstants"


const CreateStory = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()


  // state
  const {
    errorCreateStory,
    successCreateStory,
    loadingCreateStory,
    idCreateStory,
  } =  useSelector(state => state.storyStore)

  const initialFormState = {
    content: "",
    title: "",
    video: "",
    image: "",
    subtitle: "",
    tags: "",
  }

  const initialErrorState = {
    content: "",
    title: "",
    image: "",
  }
  const [form, setForm] = useState(initialFormState)
  const [error, setError] = useState(initialErrorState)
  const [submitError, setSubmitError] = useState(false)
  const [uploadError, setUploadError] = useState({
    video: "",
    image: "",
  })
  const [percent, setPercent] = useState({
    video: 0,
    image: 0,
  });

  useEffect(() => {
    if(successCreateStory){
      dispatch({type: CREATE_STORY_RESET})
      navigate(location.search ? location.search.split("=")[1] : `/story/${idCreateStory}` )
    }
  }, [dispatch, successCreateStory, idCreateStory, location.search, navigate])

  const ResetImage = () => {
    setForm({...form, image: ""})
  }
  
  const ResetVideo = () => {
    setForm({...form, video: ""})
  }
  const handleSubmit = e => {
    e.preventDefault()
    setSubmitError(false)
    const {isError, errorObject} = onSubmitError(form, error)
    setError(errorObject)
    if(!isError){
      dispatch(createStory(form))
    } else{
      setSubmitError(true)
    }
  }

  const handleChange = e => {
    const {name,value} = e.target
    setForm({...form, [name]: value})
    setError(onChangeError(name, value, form, error))
  }

  const handleFileChange = (fileList, name) => {
    if(fileList && fileList[0]){
      try {
        setUploadError("")
        const file = fileList[0]
        const storageRef = ref(firebaseStorage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const currentPercent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            // update progress
            setPercent({...percent, [name]: currentPercent})
          },
          (err) => {
            console.log(err)
            setUploadError({[name]: `Error while uploading ${name}`})
          },
          () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setForm({...form, [name]: url})
              setPercent({...percent, [name]: 0})
              if(name === "image"){
                onChangeError("image", url, form, error, setError)
              }
            });
          }
        )
      } catch (error) {
            console.log(error)
        setUploadError({[name]: "Error while uploading file"})
      }
    }
  }

  const handleEditor = ( event, editor ) => {
    const data = editor.getData();
    setForm({...form, content: data})
    onChangeError("content", data, form, error, setError)
  }

  return (
    <div className={`${styles.createstory} container`}>
        
      <form className={`${styles.form_container}`} onSubmit={handleSubmit}>
        <h1 className="spacing-md">Create Post Section</h1>
        
        {loadingCreateStory && <Spinner />}
        {errorCreateStory && <MessageBox variant="danger">{errorCreateStory} </MessageBox>}
        
        <Form.Input 
          label="Title"
          onChange={handleChange}
          value={form.title}
          error={error.title}
          type="text"
          name="title"
          required={true}
              setError={setError}
        />

        <Form.Input 
          label="Subtitle"
          onChange={handleChange}
          value={form.subtitle}
          type="text"
          name="subtitle"
        />

        <TextEditor
          onChange={handleEditor}
          error={error.content}
          required={true}
              setError={setError}
          placeholder="Write about something"
        />

        <Form.Input 
          label="Tags"
          onChange={handleChange}
          value={form.tags}
          type="text"
          name="tags"
        />

        <div className="spacing-lg"></div>

        <Form.File 
          onChange={value => handleFileChange(value, "image")} 
          icon={<AiFillPicture />}  
          label={"Image"}
          type="image"
          error={uploadError.image || error.image}
          preview={form.image}
          clearPreview={ResetImage}
          loadingPercent={percent.image}
          accept="image/*"
        />

        <Form.File 
          onChange={value => handleFileChange(value, "video")} 
          icon={<BsFillCameraVideoFill />}  
          label={"Video"}
          type="video"
          preview={form.video}
          clearPreview={ResetVideo}
          loadingPercent={percent.video}
          accept="video/*"
        />
        <div className="spacing-lg"></div>


        <Button variant="primary" error={submitError}  block={true} className="spacing-sm" type="submit">Post</Button>
      </form>

    </div>
  )
}

export default CreateStory