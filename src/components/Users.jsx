import React, {useState} from 'react';

const API = process.env.REACT_APP_API;

function Users() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const manejarName = e => {
        setName(e.target.value);
    };

    const manejarEmail = e => {
        setEmail(e.target.value);
    };

    const manejarPassword = e => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        const data = await res.json();
        console.log(data);
    };

    return (
        <div className='row'>
            <div className='col-md-4'>
                <form onSubmit={handleSubmit} className='card card-body'>
                    <div className='form-group'>
                        <input 
                            type="text" 
                            onChange={manejarName} 
                            value={name} 
                            className='form-control' 
                            placeholder='Name' 
                            autoFocus />
                    </div>
                    <div className='form-group'>
                        <input 
                            type="email" 
                            onChange={manejarEmail} 
                            value={email} 
                            className='form-control' 
                            placeholder='Email' />
                    </div>
                    <div className='form-group'>
                        <input 
                            type="password" 
                            onChange={manejarPassword} 
                            value={password} 
                            className='form-control' 
                            placeholder='Password' />
                    </div>
                    <button className='btn btn-primary btn-block'>Enviar</button>
                </form>
            </div>
            <div className='col md-8'></div>
        </div>
    );
}

export default Users;