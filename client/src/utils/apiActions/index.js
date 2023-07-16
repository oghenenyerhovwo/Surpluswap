// offline
// export const backend_url = "http://localhost:5000/api"
// export const frontend_url = "http://localhost:3000/"

// online
export const backend_url = "https://surpluswap.onrender.com/api"
export const frontend_url =  "https://secure-rent.vercel.app/"

export const setError = (err) => {
    return err.response && err.response.data.message ? err.response.data.message : err.message
}

export const setHeader = (token) => {
  return {
    headers: {
        Authorization: `Bearer ${token}`
    }
  }
 }
