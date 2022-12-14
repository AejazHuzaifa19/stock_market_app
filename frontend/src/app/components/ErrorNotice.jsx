import React from "react";

const ErrorNotice = ({ message }) => {
    return (
        <div>
            <div className="error-notice">
            <div className="error-icon"></div>
                Error: {message}
            </div>
        </div>
    );
};

export default ErrorNotice;
