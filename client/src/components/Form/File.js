import React, { useState, useEffect, useRef } from 'react'
import { FileSelector } from 'react-rainbow-components';
import { ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage"


import { firebaseStorage, onChangeError, objectToArray } from '../../utils/'

import "./file.css"

const LargeScreenFile = props => {
  const { accept, icon, name, onChange, errorFileMessage, multiple } = props

  return (
    <FileSelector
      className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      uploadIcon={icon}
      placeholder="Drag & Drop or Click to Browse"
      bottomHelpText={multiple ? "Can select multiple files" :  "Select only one file"}
      variant="multiline"
      onChange={onChange}
      accept={accept}
      name={name}
      multiple={multiple}
      error={errorFileMessage}
    /> 
  )
}

const SmallScreenFile = props => {
  const { accept, icon, name, onChange, errorFileMessage, multiple } = props

  return (
    <FileSelector
      className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      placeholder="Drag & Drop or Click to Browse"
      bottomHelpText={multiple ? "Can select multiple files" :  "Select only one file"}
      uploadIcon={icon}
      onChange={onChange}
      error={errorFileMessage}
      accept={accept}
      name={name}
      multiple={multiple}
    />
  )
}

// Our app
const FileComponent = props => {

  const { label, activateRef, name, errorMessage, setForm, setError, multiple, form, error, required } = props
  const elFileComponent = useRef();

  const [uploadError, setUploadError] = useState({
    [name]: "",
  })
  const [percent, setPercent] = useState({
    [name]: 0,
  });

  useEffect(() => {
      if(uploadError[name] || errorMessage){
          if(activateRef === "unique" || (activateRef && name && activateRef === name)){
              window.scrollTo(10, elFileComponent.current.offsetTop)
          }
      }
  }, [uploadError, errorMessage, activateRef, name])


  const handleMultipleFileChange = (fileList) => {
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
              setUploadError({[name]: "Error while uploading file"})
            },
            async () => {
              // download url
              await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                setPercent({...percent, [name]: 0})
                if(multiple){
                  setError(onChangeError(name, url, form, error))
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

  const onChange = multiple ? handleMultipleFileChange : () => {}

  return (
    <div ref={elFileComponent} className={`app_file ${(uploadError[name] || errorMessage) && "app_file_error"} spacing-md`}>
        <label className="form__label spacing-sm">{label} <span className="icon_required">{label && required && "*"} </span></label>
        <div className="spacing-sm"></div>
        <>
          <div className="file_largescreen"> 
              <LargeScreenFile {...props} errorFileMessage={uploadError[name] || errorMessage} onChange={onChange}/>
          </div>
          <div className="file_smallscreen">
              <SmallScreenFile {...props} errorFileMessage={uploadError[name] || errorMessage} onChange={onChange}/>
          </div>
        </>
        {/* {
          (!preview || preview.length < 1  ) ? (
            <>
              <div className="file_largescreen">
                  <LargeScreenFile {...props} errorFileMessage={uploadError || errorMessage} />
              </div>
              <div className="file_smallscreen">
                  <SmallScreenFile {...props} errorFileMessage={uploadError || errorMessage} />
              </div>
            </>
          )
          :
          <>
            {
              type === "image" && (
                <div className="preview_file">
                  <img src={preview} alt="preview" />
                  <div className="preview_icon flex flex__center">
                    <FaTimes onClick={clearPreview} />
                  </div>
                  <div className="preview_overlay"></div>
                </div>
              )
            } 
            {
              type === "images" && preview.length > 0  && (
                <div>
                  <SmallScreenFile image={props} />
                  <div onClick={togglePreview} className="preview_button">
                    {showPreview ? "Hide Files" : "Show Files"}
                  </div>
                  {
                    showPreview && (
                      <div className="preview_files">
                        {
                            preview.reverse().map(previewFile => {

                              const handleClearPreview = () => {
                                clearPreview(previewFile._id)
                              }

                              return (
                                <div key={previewFile._id} className="preview_file spacing-sm">
                                  <img src={previewFile.url} alt="preview" />
                                  <div className="preview_icon flex flex__center">
                                    <FaTimes onClick={handleClearPreview} />
                                  </div>
                                  <div className="preview_overlay"></div>
                              </div>
                              )
                            })
                        }
                      </div>
                    )
                  }
                </div>
              )
            } 
            {
              type === "video" && (
                <div className="preview_file">
                  <VideoPlayer url={preview} />
                  <div className="preview_icon flex flex__center">
                    <FaTimes onClick={clearPreview} />
                  </div>
                </div>
              )
            }
            {
              type === "videos" && preview.length > 1  && (
                <div>
                  <SmallScreenFile image={props} />
                  <div className="preview_files">
                    {
                        preview.map(previewFile => {

                          const handleClearPreview = () => {
                            clearPreview(previewFile._id)
                          }

                          return (
                            <div key={previewFile._id} className="preview_file spacing-sm">
                              <VideoPlayer url={preview.url} />
                              <div className="preview_icon flex flex__center">
                                <FaTimes onClick={handleClearPreview} />
                              </div>
                          </div>
                          )
                        })
                    }
                  </div>
                </div>
              )
            } 

          </>
      } */}
      {
        percent > 0 &&
        <div className="file_loader spacing-md">
          <div style={{width: `${percent}%`}} className="file_loader_inner spacing-md"></div>
        </div>
      }
  </div>
  )
}

export default FileComponent