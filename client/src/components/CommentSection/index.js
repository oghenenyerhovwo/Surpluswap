import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { userPic } from "../../assets"
import styles from "./commentsection.module.css"
import Button from "../Button"
import Spinner from "../Spinner"
import MessageBox from "../MessageBox"
import CommentCard from "../CommentCard"
import { RiSendPlaneFill } from "react-icons/ri"

import { createComment } from "../../actions"

// type
import { CREATE_COMMENT_RESET } from "../../constants/commentConstants"

const CommentSection = props => {
    const {
        currentUser,
        storyId,
        comments,
    } = props

    const dispatch = useDispatch()
    const location = useLocation()

    const {
        errorCreateComment,
        successCreateComment,
        loadingCreateComment,
      } =  useSelector(state => state.commentStore)

    const [form, setForm] = useState({
        text: ""
    })

    useEffect(() => {
        if(successCreateComment){
          dispatch({type: CREATE_COMMENT_RESET})

          setForm({text: ""})
        }
      }, [dispatch, successCreateComment])

    const handleChange = e => {
        const {name,value} = e.target
        setForm({...form, [name]: value})
    }

    const handleSubmit = e => {
        form.text && dispatch(createComment(form,storyId))
    }

    return (
        <div className={`${styles.comment_section}`}>
            <div>
                {
                    comments.length > 0 && comments.map(comment => (
                        <React.Fragment key={comment._id}>
                            <CommentCard currentUser={currentUser} storyId={storyId} comment={comment} />
                        </React.Fragment>
                    ) )
                }
            </div>
            <div className={`${styles.post_section}`}>
               <div className={`${styles.input_section}`}>
                    <div className={`${styles.image}`}>
                        <img src={userPic} alt="userPic" />
                        <div className={`${styles.image_line}`}></div>
                    </div>
                    <textarea onChange={handleChange} row={1} value={form.text} name="text" placeholder="Add Comment..." />
                </div>
                {loadingCreateComment && <Spinner />}
                {
                    currentUser._id ?
                    <>
                        <div className={styles.post_button_small_screen}>
                            <Button block={true} disabled={!form.text} onClick={handleSubmit}  variant="primary">Post <RiSendPlaneFill /> </Button>
                        </div>

                        <div className={`${styles.post_button_big_screen} ${!form.text && styles.post_button_big_screen_disabled}`}>
                            <RiSendPlaneFill disabled={!form.text}  onClick={handleSubmit} />
                        </div>
                    </> :
                    <Button type="link" href={`/signin/?redirect=${location.pathname}`}  variant="primary">Post</Button> 
                }
            </div>
            {errorCreateComment && <MessageBox variant="danger">{errorCreateComment} </MessageBox>}
        </div>
    )
}

export default CommentSection