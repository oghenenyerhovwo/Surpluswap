import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage"


// components
import { Spinner, MessageBox, Button, Form, TextEditor } from "../../components"
import { AiFillPicture } from 'react-icons/ai'
import { BsFillCameraVideoFill } from "react-icons/bs"

// css
import styles from "./editstory.module.css"

// functions and objects
import { updateStory, getStory } from "../../actions"
import { firebaseStorage, onSubmitError, onChangeError, isAuthor } from '../../utils/'

// type
import { UPDATE_STORY_RESET, GET_STORY_RESET } from "../../constants/storyConstants"

const EditStory = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()


  // state
  const {
    errorUpdateStory,
    successUpdateStory,
    loadingUpdateStory,
    idUpdateStory,
    successGetStory,
    errorGetStory,
    loadingGetStory,
    story,
  } =  useSelector(state => state.storyStore)

  const { currentUser } = useSelector(state => state.userStore)

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
  const [uploadError, setUploadError] = useState("")
  const [percent, setPercent] = useState({
    video: 0,
    image: 0,
  });

  useEffect(() => {
    dispatch(getStory(params.id))
  }, [dispatch, params.id])

  useEffect(() => {
    if(successGetStory){
      setForm(prevForm => {
        return {
          ...prevForm,
          content: story.content || "",
          title: story.title || "", 
          video: story.video || "",
          image: story.image || "",
          subtitle: story.subtitle || "",
          tags: story.tags || "",
        }
      })
      dispatch({type: GET_STORY_RESET})
    }
  }, [dispatch, story, successGetStory])

  useEffect(() => {
    if(successUpdateStory){
      dispatch({type: UPDATE_STORY_RESET})
      navigate(location.search ? location.search.split("=")[1] : `/story/${idUpdateStory}` )
    }
  }, [dispatch, successUpdateStory, idUpdateStory, location.search, navigate])

  const ResetImage = () => {
    setForm({...form, image: ""})
  }
  
  const ResetVideo = () => {
    setForm({...form, video: ""})
  }
  const handleSubmit = e => {
    e.preventDefault()
    setSubmitError(false)
    if(!onSubmitError(form, error, setError)){
        dispatch(updateStory(form, params.id))
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
            setUploadError({[name]: "Error while uploading file"})
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
}

  const presetEditor = editor => {
    editor.setData(story.content)
  } 

  return (
    <div className={`${styles.editstory} container`}>
      {loadingGetStory && <Spinner />}
      {errorGetStory && <MessageBox variant="danger">{errorGetStory} </MessageBox>}
      {
        (currentUser._id && story._id) && (
          <>
            { isAuthor(currentUser, story.author) ?
              <form className={`${styles.form_container}`}onSubmit={handleSubmit}>
                <h1 className="spacing-md">Edit Post Section</h1>
                
                {loadingUpdateStory && <Spinner />}
                {errorUpdateStory && <MessageBox variant="danger">{errorUpdateStory} </MessageBox>}
                
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
                  label="Subtitle"
                  onChange={handleChange}
                  value={form.subtitle}
                  type="text"
                  name="subtitle"
                />

                <TextEditor
                  onChange={handleEditor}
                  onReady={presetEditor}
                  error={error.content}
                  required={true}
                  placeholder="Write about something"
                  presetData={form.content}
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
                  error={uploadError.video || error.video}
                  preview={form.video}
                  clearPreview={ResetVideo}
                  loadingPercent={percent.video}
                  accept="video/*"
                />
                <div className="spacing-lg"></div>

                <Button error={submitError} variant="primary" block={true} className="spacing-sm" type="submit">Update</Button>
              
              </form>: (
                <MessageBox>Only the author of this post can edit this post. Go to <Link to="/">Home</Link> </MessageBox>
              )
            }
          </>
        ) 
      }
    </div>
  )
}

export default EditStory