const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" },
    },
  }

  const pathAnimations = {
    pathVariants,
  }
  
  export default pathAnimations