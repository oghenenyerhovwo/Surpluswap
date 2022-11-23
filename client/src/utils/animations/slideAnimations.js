const slideUp = {
    hidden: {
      opacity: 0,
      y: "-100%",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {ease: "easeInOut", type: "spring", bounce: 0.3},
    },
    exit: {
      y: "-100%",
      transition: { ease: "easeInOut"},
    },
    
  }
  
const slideDown = {
    hidden: {
      opacity: 0,
      y: "100%",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {ease: "easeInOut", type: "spring", bounce: 0.3},
  
    },
    exit: {
      y: "100%",
      transition: { ease: "easeInOut"},
    },
  }

const rollDown = {
    hidden: {
        height: "0%",
    },
    visible: {
        height: "auto",
        transition: {ease: "easeInOut",},

    },
    exit: {
        height: "0%",
        transition: { ease: "easeInOut"},
    },
}
  
  const slideAnimations = {
    slideUp,
    slideDown,
    rollDown,
  }
  
  export default slideAnimations
  
  