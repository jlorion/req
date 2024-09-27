
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    let response;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Simulate login logic
        if (email && password) {
            await axios.post('http://localhost:8080/api/user/login',{
                email: email,
                password: password
            }, {withCredentials: true}).then((res)=>{
                console.log(res);
                response = res;
                alert('Login successful!');
                navigate('/')
                
            }).catch(err => alert(err.response.data.error))
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    {error && <div className="mb-4 text-red-500">{error}</div>}
                    <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Login
                    </button>
                </form>
                <a href="/signup" className='mt-5 text-teal-500'>don't have an account?</a>
            </div>
        </div>
    );
};

export default Login;