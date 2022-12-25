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

export const isAdmin=(user) => {
    return user.role == "admin"
}

export const isSuperAdmin=(user) => {
  return user.role == "superAdmin"
}

export const isAuthor=(user, author) => {
  return String(user._id) === String(author._id)
}