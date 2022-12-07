// offline
// export const backend_url = "http://localhost:5000/api"
// export const frontend_url = "http://localhost:3000/"

// online
export const backend_url = "https://surpluswap.onrender.com/api"
export const frontend_url =  "https://surpluswap.vercel.app/"

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

//  clientId = 179116266006-dmhoh73l8ri7gh2ms9q99dfu1d0oaeqb.apps.googleusercontent.com
// secret = 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