import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from "./commentcard.module.css"
import { ButtonMenu, MenuItem } from 'react-rainbow-components';
import { userPic } from "../../assets"
import { FaEllipsisV } from 'react-icons/fa';
import Spinner from "../Spinner"
import MessageBox from "../MessageBox"

// type
import { deleteComment } from "../../actions"
import { DELETE_COMMENT_RESET } from "../../constants/commentConstants"


const CommentCard = props => {
    const {
        currentUser,
        storyId,
        comment,
    } = props


    const dispatch = useDispatch()

    const {
        errorDeleteComment,
        successDeleteComment,
        loadingDeleteComment,
        idObjDeleteComment,
    } =  useSelector(state => state.commentStore)

    useEffect(() => {
        if(successDeleteComment && idObjDeleteComment.commentId === comment._id ){
          dispatch({type: DELETE_COMMENT_RESET})
        }
    }, [dispatch, successDeleteComment, idObjDeleteComment,  comment._id ])

    const handleDelete = e => {
        dispatch(deleteComment(storyId,comment._id))
    }


    return (
        <div className={styles.commentcard}>
            <div className={`${styles.image}`}>
                <img src={userPic} alt="userPic" />
                <div className={`${styles.image_line}`}></div>
            </div>
            <div className={`${styles.text_section}`}>
                <h3 className="spacing-md">{comment.author && comment.author.fullName} </h3>
                <p className="spacing-md">{comment.text} </p>

                {
                    idObjDeleteComment.commentId === comment._id && (
                        <>
                            {errorDeleteComment && <MessageBox variant="danger">{errorDeleteComment} </MessageBox>}
                            {loadingDeleteComment && <Spinner />}
                        </>
                    )
                }

                {
                    (currentUser._id && comment.author && (comment.author._id === currentUser._id) ) && (
                        <div className={styles.menu}>
                            <ButtonMenu
                                menuSize="extra-small"
                                icon={<FaEllipsisV/>}
                            >
                                <MenuItem onClick={handleDelete}  label="Delete"/>
                            </ButtonMenu>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CommentCard