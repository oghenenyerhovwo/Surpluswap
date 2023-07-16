  // middle-wares
export const isAdmin=(user) => {
    return user.role === "admin"
}

export const isSuperAdmin=(user) => {
  return user.adminRole === "super"
}

export const isAuthor=(user, author) => {
  return String(user._id) === String(author._id)
}