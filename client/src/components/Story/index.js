import React, { useState } from 'react' 
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import htmlToText from "html-to-formatted-text"

import styles from "./story.module.css"

import { navigateHistory } from "../../actions"

import { AiOutlineDoubleRight } from "react-icons/ai"
import Card from "../Card"
import Button from "../Button"

import { userPic, amenPicture } from "../../assets"
import { truncate } from "../../utils"


const StoryCard = props => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const { story } = props 

    const [displayViewersList, setDisplayViewersList] = useState(false)

    const toggleViewersList = () => setDisplayViewersList(prevToggle => !prevToggle)

    return (
        <Card.Container>
            <Card.Head>
                <Card.Image src={story.image || story.video || amenPicture} alt="crossImg" />
            </Card.Head>
            <Card.Body>
            <div className={styles.author}>
                <img src={userPic} alt="crossImg" />
                <div>
                    <Card.SubHeading>{story.author && story.author.fullName}</Card.SubHeading>
                    <p> {String(new Date(story.createdAt)).slice(0, 15)}</p>
                </div>
            </div>
            <Card.Heading>{story.title}</Card.Heading>
            <Card.Paragraph>{truncate(htmlToText(story.content), 200)}&hellip; </Card.Paragraph>
            {
                story.views && story.views.length > 0 && (
                    <div className={styles.views}>
                        <Card.Paragraph>
                            <span onClick={toggleViewersList}>{`${story.views.length} ${story.views.length > 1 ? "views": "view"} `}</span>
                        </Card.Paragraph>
                        
                        {
                            displayViewersList && (
                                <div className={styles.viewers_list}>
                                    {
                                        story.views.map(viewer => {
                                            const directToShowEventDetail = () => {
                                                dispatch(navigateHistory(location.pathname, navigate(`/profile/${viewer._id}`)))
                                            }
                                            return (
                                                <div onClick={directToShowEventDetail} key={viewer._id} className={`${styles.viewer} flex`}>
                                                    <img src={userPic} alt="crossImg" />
                                                    <p>{viewer.fullName} </p>
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
            <Button type="link" variant="primary" href={`/story/${story._id}`} block={true}>Read More<AiOutlineDoubleRight /></Button>
            </Card.Body>
            
        </Card.Container>
    )
}

export default StoryCard