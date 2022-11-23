const fullTurn = {
    hidden: {
      rotate: -180,
    },
    visible: {
      rotate: 0,
      transition: {duration: 0.1, ease: "easeInOut"},
    },
    exit: {
      rotate: 180,
      transition: {duration: 0.1, ease: "easeInOut"},
    },
    
  }
  
  const rotateAnimations = {
    fullTurn,
  }
  
  export default rotateAnimations
  
  