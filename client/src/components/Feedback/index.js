
import styles from "./feedback.module.css"
import Button from "../Button"

const Feedback = () => {

  return (
   <div className={`${styles.feedback}`}>
      <div className={`container ${styles.feedback_container}`}> 

      <h4 className="spacing-md">Stay up to date with the works of the mission</h4>

      <div className={`${styles.feedback_input}`}>
          <input placeholder="email@example.com" />
          <Button href="#" block={true} variant="secondary">Contact Us</Button>
      </div>

      </div>  

    </div>
  )
}

export default Feedback