import axios from 'axios'

const API_SERVICE ='/api/process/';

const registerUser = async (userData) => {
    return await axios.post(API_SERVICE + `registerEmail`, userData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    });
}

const fetchFileNames = async (email_address) => {
    return await axios.get(API_SERVICE + `getUploadedFiles?email=${email_address}`);
}

const getFileData = async (filename) => {
    console.log(API_SERVICE + `?filename=${filename}`);
    return await axios.get(API_SERVICE + `?filename=${filename}`);
}

const getFilteredFileData = async (query_param,filename) => {
    return await axios.get(API_SERVICE + `filter?stock=${query_param}&filename=${filename}`);
}

const uploadFile = async (fileData) => {
    return await axios.post(API_SERVICE + `upload`, fileData);
}

const apiService = {
    fetchFileNames,
    registerUser,
    getFileData,
    getFilteredFileData,
    uploadFile
}

export default apiService