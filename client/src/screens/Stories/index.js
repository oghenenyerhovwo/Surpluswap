import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// components
import { Spinner, MessageBox, StoryCard, Button } from "../../components"

// css
import styles from "./stories.module.css"

// functions
import { getStories} from "../../actions"

// type
import { GET_STORIES_RESET } from "../../constants/storyConstants"



const Stories = () => {
  const dispatch = useDispatch()

  // state
  const {
    successGetStories,
    loadingGetStories,
    errorGetStories,
    stories,
  } =  useSelector(state => state.storyStore)

  useEffect(() => {
    dispatch(getStories())
  }, [dispatch])

  useEffect(() => {
    if(successGetStories){
      dispatch({type: GET_STORIES_RESET})
    }
  }, [dispatch, successGetStories])  

  return (
    <div className={`container`}>
      {loadingGetStories && <Spinner />} 
      {errorGetStories && <MessageBox variant="danger">{errorGetStories} </MessageBox>}

      <div className={styles.stories_button}>
        <Button type="link" href="/story/create" variant="primary">Create A Post</Button>
      </div>

      <div className={`${styles.stories}`}>
          {
            stories.length > 0 ?
            <>
                {
                  stories.map(story => (
                    <React.Fragment key={story._id}>
                        <StoryCard story={story} />
                    </React.Fragment>
                  ))
                }
              
            </>: <></>
          }   
      </div>
      
    </div>
  )
}

export default Stories