import React, { useState } from 'react'
import { FileSelector } from 'react-rainbow-components';
import { FaTimes } from "react-icons/fa"

import VideoPlayer from "../VideoPlayer"

import "./file.css"

const LargeScreenFile = props => {
  const { accept, icon, name, onChange, error, multiple } = props

  return (
    <FileSelector
      className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      uploadIcon={icon}
      placeholder="Drag & Drop or Click to Browse"
      bottomHelpText={multiple ? "Can select multiple files" :  "Select only one file"}
      variant="multiline"
      onChange={onChange}
      error={error}
      accept={accept}
      name={name}
      multiple={multiple}
    /> 
  )
}

const SmallScreenFile = props => {
  const { accept, icon, name, onChange, error, multiple } = props

  return (
    <FileSelector
      className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
      placeholder="Drag & Drop or Click to Browse"
      bottomHelpText={multiple ? "Can select multiple files" :  "Select only one file"}
      uploadIcon={icon}
      onChange={onChange}
      error={error}
      accept={accept}
      name={name}
      multiple={multiple}
    />
  )
}

// Our app
const FileComponent = props => {

  const { label, type, preview, clearPreview, loadingPercent } = props

  const [showPreview, setShowPreview] = useState(false)

  const togglePreview = () => setShowPreview(prevToggle => !prevToggle)

  return (
    <div className="app_file spacing-md">
        <label className="form__label spacing-sm">{label}</label>
        <div className="spacing-sm"></div>
        {
          (!preview || preview.length < 1  ) ? (
            <>
              <div className="file_largescreen">
                  <LargeScreenFile {...props} />
              </div>
              <div className="file_smallscreen">
                  <SmallScreenFile {...props} />
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
      }
      {
        loadingPercent > 0 &&
        <div className="file_loader spacing-md">
          <div style={{width: `${loadingPercent}%`}} className="file_loader_inner spacing-md"></div>
        </div>
      }
  </div>
  )
}

export default FileComponent