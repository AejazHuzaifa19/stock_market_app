import React, { useState } from 'react'

function UploadFile() {
    const [file, setFile] = useState(null);
    const [filename,setFileName] = useState(null);

    function handleFileSelect(event) {
        event.preventDefault(event.target.files[0]);
        console.log(event.target.files[0])
        setFileName(event.target.files[0].name);
        setFile(event.target.files[0]);
    }

    function handleUpload() {
        // upload the file to a server or do something else with it here
        const formData = new FormData();
        console.log('asd');
        formData.append('filename', filename);
        formData.append('uploadedfile', file);
        console.log(formData)
        return fetch('http://localhost:5000/api/process/upload', {
            method: 'POST',
            body: formData
        }).then(response => console.log(response));
    }

    return (
        <div>
            <input type="file" onChange={handleFileSelect} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default UploadFile
