import React, { useState } from 'react'

function UploadFile(props) {
    const [file, setFile] = useState(null);
    const [filename, setFileName] = useState(null);

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
        fetch('http://localhost:5000/api/process/upload', {
            method: 'POST',
            body: formData
        }).then(resp => resp.json()
        ).then(data => {
            props.updateUploadedFiles(data.filename);
        });
    }

    return (
        <div>
            <input type="file" onChange={handleFileSelect} />
            <button onClick={(e) => handleUpload(e)}>Upload</button>
        </div>
    );
}

export default UploadFile
