import React, { useState, useEffect } from 'react'

function FileDropdown(props) {

    const handleChange = (event) => {
        props.onSelect(event);
    }

    return (
        <select name="filename" onChange={handleChange} disable={props.disabled}>
            <option key="default">Select a file</option>
            {!(Array.isArray(props.uploadedFiles) && props.uploadedFiles.length > 0) ?
                <option></option> :
                props.uploadedFiles.map((item, index) => (
                    <option key={index}>{item}</option>
                ))}
        </select>
    );
}

export default FileDropdown