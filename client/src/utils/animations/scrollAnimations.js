const rotateImgVariant = {
    hidden: {
        rotate: -90,
      },
    scrollVisible: {
        rotate: 0,
        transition: { duration: 1, },
    },
    viewport: {once: false},
}

const translateImgVariant = {
    hidden: {
        y: 40,
      },
    scrollVisible: {
        y: -40,
        transition: { duration: 1, },
    },
    viewport: {once: false},
}

const scrollAnimations = {
    rotateImgVariant,
    translateImgVariant,
}

export default scrollAnimations