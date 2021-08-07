import axios from 'axios'

export const createProduct = async (product, authtoken) => {
    return await axios.get(`${process.env.REACT_APP_API}/product`, product, {
        headers: {
            authtoken
        }
    })
}
