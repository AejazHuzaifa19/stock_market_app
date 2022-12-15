import axios from 'axios'

const API_URL = '/api/process/'

// Register user
const fetchFileNames = async (email_address) => {
    return await axios.get(`/api/process/getUploadedFiles?email=${email_address}`);
}


const authService = {
    fetchFileNames,
}

export default authService