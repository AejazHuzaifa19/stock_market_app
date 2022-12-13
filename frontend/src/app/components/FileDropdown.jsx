import React, { useState, useEffect } from 'react'

function FileDropdown(props) {
    // JSON data
    const [response, setResponse] = useState(null);

    // Use the useEffect hook to fetch data when the component loads
    useEffect(() => {
        fetch("http://localhost:5000/api/process/getUploadedFiles")
            .then(res => res.json())
            .then(data => setResponse(data));
    }, []);

    // Use the useState hook to store the selected value
    const [selectedValue, setSelectedValue] = useState(null);

    // Handle the change event of the dropdown
    const handleChange = (event) => {
        props.onSelect(event);
    }
    if (!(Array.isArray(response) && response.length > 0)) {
        return <></>
    }
    return (
        <select name="filename" onChange={handleChange}>
            <option key="default">Select a file</option>
            {response.map((item, index) => (
                <option key={index}>{item.filename}</option>
            ))}
        </select>
    );
}

export default FileDropdown