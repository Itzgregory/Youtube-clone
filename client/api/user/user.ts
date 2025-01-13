import axios from 'axios'

const base = process.env.NEXT_PUBLIC_API_ENDPOINT

export const getUserLoged = async () => {
    try {
        const res = await axios.get(`${base}/user`,{
            withCredentials: true    
        })
        return res.data
    } catch {
        return null
    }
}

export const LogoutUser = async () => {
    try {
      await axios.get(`${base}/logout`,{
        withCredentials: true          
    })
            
        return true
    } catch {
        return null
    }
}

