import React, {useState, useEffect} from 'react';

const API = process.env.REACT_APP_API;

function Users() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [id, setId] = useState('');

    const [editing, setEditing] = useState(false);

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
        if (!editing){
            const res = await fetch(`${API}/users`, {
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
        }
        else {
            const res = await fetch(`${API}/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });
            const data = await res.json();
            console.log(data);
            setEditing(false);
            setId('');
        }
        await getUsers();
        setName('');
        setEmail('');
        setPassword('');
    };

    const getUsers = async () => {
        const res = await fetch(`${API}/users`);
        const data = await res.json();
        setUsers(data);
    };

    useEffect(() => {getUsers();}, []);

    const deleteUser = async (id) => {
        const userResponse = window.confirm('¿Quieres eliminar esto?');
        if (userResponse){
            const res = await fetch(`${API}/user/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            console.log(data);
            await getUsers();
        }
    };

    const editUser = async (id) => {
        const res = await fetch(`${API}/user/${id}`);
        const data = await res.json();
        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);
        setEditing(true);
        setId(data._id);
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
                    <button className='btn btn-primary btn-block'>
                        {editing ? 'Editar' : 'Crear'}
                    </button>
                </form>
            </div>
            <div className='col-md-8'>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>
                                    {user.name}
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {user.password}
                                </td>
                                <td>
                                    <button 
                                        className='btn btn-secondary btn-sm btn-block'
                                        onClick={() => {editUser(user._id);}} >
                                        Editar
                                    </button>
                                    <button 
                                        className='btn btn-danger btn-sm btn-block'
                                        onClick={() => {deleteUser(user._id);}} >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;