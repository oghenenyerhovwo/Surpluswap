import jwt from 'jsonwebtoken';

export const generateToken= (userData) => {
    return jwt.sign({
      _id: userData.user._id,
      fullName: userData.user.fullName,
      isVerified: userData.user.isVerified,
      email: userData.user.email,
      role:  userData.user.role,
      tokenType:  userData.tokenType,
    },
    process.env.JWT_SECRET, 
    {
      expiresIn: "30d"
    }
    )
  }
  
  // middle-wares
  export const isAuth = (req, res, next) => {
      const authorization= req.headers.authorization
      
      if(authorization){
          const token = authorization.slice(7, authorization.length)
          jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if(err){
              res.status(401).send({message: "Invalid or expired token"})
            } else {
              req.user= decode
              next()
            }
          })
  
      } else {
        res.status(401).send({message: "No token"})
      }
  }

export const isNotBlocked = (req, res, next) => {
    if(!req.user.isBlocked){
      next()
    } else {
      res.status(401).send({message: "This account has been blocked, contact admin"})
    }
}

export const isVerified = (req, res, next) => {
    if(req.user.isVerified){
      next()
    } else {
      res.status(401).send({message: "This user has not been verified"})
    }
}

export const isAdmin = (req, res, next) => {
    if(req.user.role == "admin"){
      next()
    } else {
      res.status(401).send({message: "Only admin can access this route"})
    }
}

export const isSuperAdmin=(user) => {
  return user.adminRole == "super"
}

export const isAuthor=(user, author) => {
  return String(user._id) === String(author._id)
}