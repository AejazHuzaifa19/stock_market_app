import axios from 'axios'

// Register user
const fetchFileNames = async (email_address) => {
    return await axios.get(`/api/process/getUploadedFiles?email=${email_address}`);
}

const authService = {
    fetchFileNames,
}

export default authService