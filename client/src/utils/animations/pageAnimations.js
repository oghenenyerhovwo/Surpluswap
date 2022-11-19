const swipeRight = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {type: "spring", bounce: 0.3},
  },
  exit: {
    x: "100vw",
    transition: { ease: "easeInOut"},
  },
  
}

const swipeLeft = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {type: "spring", bounce: 0.3},

  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut"},
  },
}

const swipeLeftRight = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {type: "spring", bounce: 0.3},

  },
  exit: {
    x: "100vw",
    transition: { ease: "easeInOut"},
  },
}

const pageAnimations = {
  swipeRight,
  swipeLeft,
  swipeLeftRight,
}

export default pageAnimations

