import React, { useState } from 'react'
import apiService from '../../service/apiService';

function UploadFile(props) {
    const [file, setFile] = useState(null);
    const [filename, setFileName] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(false);

    function handleFileSelect(event) {
        event.preventDefault(event.target.files[0]);
        setFileName(event.target.files[0].name);
        setFile(event.target.files[0]);
    }

    function handleUpload(e) {
        e.preventDefault();
        const formData = new FormData();
        let email = props.email || localStorage.getItem('email');
        formData.append('filename', filename);
        formData.append('uploadedfile', file);
        formData.append('email', email);
        apiService.uploadFile(formData).then(data => {
            setUploadStatus(true);
            props.updateUploadedFiles(data.data.filename);
        });
    }
    return (
        <div>
            <input type="file" onChange={handleFileSelect} />
            <button onClick={(e) => handleUpload(e)}>Upload</button>
            {uploadStatus === true ? <span> File Uploaded Successfully.</span>:<></>}
        </div>
    );
}

export default UploadFile
