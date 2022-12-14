import React, { useState } from 'react'

function Register(props) {
    const [email, setEmail] = useState('');

    return (
        <div>
            <div className="form-group">
            <form>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type='search' className='btn btn-block' onClick={(e) => props.onRegister(e,email)}>
                    Register
                </button>
                </form>
            </div>
        </div>
    )
}

export default Register