import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage"


// components
import { Spinner, MessageBox, Button, Form, TextEditor } from "../../components"
import { AiFillPicture } from 'react-icons/ai'
import { BsFillCameraVideoFill } from "react-icons/bs"

// css
import styles from "./createevent.module.css"

// functions and objects
import { createEvent } from "../../actions"
import { firebaseStorage, onSubmitError, onChangeError, objectToArray } from '../../utils/'

// type
import { CREATE_EVENT_RESET } from "../../constants/eventConstants"


const CreateEvent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()


  // state
  const {
    errorCreateEvent,
    successCreateEvent,
    loadingCreateEvent,
    idCreateEvent,
  } =  useSelector(state => state.eventStore)

  const initialFormState = {
    text: "",
    title: "",
    videos: [],
    images: [],
    tags: "",
    bannerImgs:  [],
    date: new Date('2019-10-25 10:44'),
  }

  const initialErrorState = {
    text: "",
    title: "",
    images: {min: 1, text: ""},
    date: "",
    tags: "",
    bannerImgs: {min: 1, text: ""},
  }
  const [form, setForm] = useState(initialFormState)
  const [error, setError] = useState(initialErrorState)
  const [submitError, setSubmitError] = useState(false)
  const [uploadError, setUploadError] = useState({
    videos: "",
    images: "",
    bannerImgs: "",
  })
  const [percent, setPercent] = useState({
    videos: 0,
    images: 0,
    bannerImgs: 0,
  });

  useEffect(() => {
    if(successCreateEvent){
      dispatch({type: CREATE_EVENT_RESET})
      navigate(location.search ? location.search.split("=")[1] : `/event/${idCreateEvent}` )
    }
  }, [dispatch, successCreateEvent, idCreateEvent, location.search, navigate])

  const ResetImage = (id) => {
    setForm({...form, images: form["images"].filter(image => image._id !== id)})
  }
  
  const ResetVideo = (id) => {
    setForm({...form, videos: form["videos"].filter(video => video._id !== id)})
  }
  const handleSubmit = e => {
    e.preventDefault()
    setSubmitError(false)
    if(!onSubmitError(form, error, setError)){
        dispatch(createEvent(form))
    } else{
      setSubmitError(true)
    }
  }

  const handleChange = e => {
    const {name,value} = e.target
    setForm({...form, [name]: value})
    onChangeError(name, value, form, error, setError)
  }

  const handleFileChange = (fileList, name) => {
    if(fileList && fileList[0]){
      try {
        const fileListArr = objectToArray(fileList)
        fileListArr.map(async file => {
          setUploadError("")
          const storageRef = ref(firebaseStorage, `/files/${file.name}`)
          const uploadTask = uploadBytesResumable(storageRef, file);
      
          await uploadTask.on(
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
              console.log(uploadError)
              setUploadError({[name]: "Error while uploading file"})
            },
            async () => {
              // download url
              await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                setPercent({...percent, [name]: 0})
                if(name === "images"){
                  onChangeError("images", url, form, error, setError)
                }
                
                setForm(prevForm =>{ 
                  return  {
                    ...prevForm, 
                    [name]: [...prevForm[name], {url: url, _id: prevForm[name].length + 1 }]
                  }
                  }
                )
              });
            }
          )
        })
      } catch (error) {
        console.log(error)
        setUploadError({[name]: "Error while uploading file"})
      }
    }
  }

  const handleEditor = ( event, editor ) => {
    const data = editor.getData();
    setForm({...form, text: data})
    onChangeError("text", data, form, error, setError)
  }

  const handleDate = date => {
    setForm({...form, date: date})
  }

  return (
    <div className={`${styles.createevent} container`}>
        
      <form className={`${styles.form_container}`}onSubmit={handleSubmit}>
        <h1 className="spacing-md">Add New Event</h1>
        
        {loadingCreateEvent && <Spinner />}
        {errorCreateEvent && <MessageBox variant="danger">{errorCreateEvent} </MessageBox>}
        
        <Form.Input 
          label="Title"
          onChange={handleChange}
          value={form.title}
          error={error.title}
          type="text"
          name="title"
          required={true}
        />

        <Form.Input 
          label="Tags"
          onChange={handleChange}
          value={form.tags}
          type="text"
          name="tags"
        />

        <Form.DateTime
          label="Date"
          error={error.date}
          required={true}
          onChange={handleDate}
          value={form.date}
          name="date"
        />

        <TextEditor
          onChange={handleEditor}
          error={error.text}
          required={true}
          placeholder="Write about this event"
        />

        

        <div className="spacing-lg"></div>

        <Form.File 
          onChange={value => handleFileChange(value, "bannerImgs")} 
          icon={<AiFillPicture />}  
          label={"Banner Images"}
          type="bannerImgs"
          error={uploadError.bannerImgs || error.bannerImgs.text}
          preview={form.bannerImgs}
          clearPreview={ResetImage}
          loadingPercent={percent.bannerImgs}
          accept="image/*"
          multiple={true}
        />

        <Form.File 
          onChange={value => handleFileChange(value, "images")} 
          icon={<AiFillPicture />}  
          label={"Images"}
          type="images"
          error={uploadError.images || error.images.text}
          preview={form.images}
          clearPreview={ResetImage}
          loadingPercent={percent.images}
          accept="image/*"
          multiple={true}
        />

        <Form.File 
          onChange={value => handleFileChange(value, "videos")} 
          icon={<BsFillCameraVideoFill />}  
          label={"Video"}
          type="videos"
          error={uploadError.videos || error.videos}
          preview={form.videos}
          clearPreview={ResetVideo}
          loadingPercent={percent.videos}
          accept="video/*"
          multiple={true}
        />
        <div className="spacing-lg"></div>


        <Button variant="primary" error={submitError} block={true} className="spacing-sm" type="submit">Create Event</Button>
      </form>

    </div>
  )
}

export default CreateEvent