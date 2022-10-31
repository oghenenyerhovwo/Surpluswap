  // middle-wares
export const isAdmin=(user) => {
    return user.role === "admin"
}

export const isSuperAdmin=(user) => {
  return user.role === "superAdmin"
}

export const isAuthor=(user, author) => {
  return String(user._id) === String(author._id)
}