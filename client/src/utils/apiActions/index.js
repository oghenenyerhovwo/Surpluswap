// offline
// export const backend_url = "http://localhost:5000/api"
// export const frontend_url = "http://localhost:3000/"

// 
export const backend_url = process.env.NODE_ENV === "development" ? "http://localhost:5000/api": "https://surpluswap.herokuapp.com/"
export const frontend_url = process.env.NODE_ENV === "development" ? "http://localhost:3000/": "https://surpluswap.vercel.app/"

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