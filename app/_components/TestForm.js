"use client";
import React, { useState } from 'react';

export default function TestForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `http://localhost:3000/api/form`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Form submitted successfully! Thank you.');
                setError('');
                setFormData({ name: '', email: '', message: "" }); 
            } else {
                throw new Error(data.message || 'Something went wrong');
            }
        } catch (error) {
            setError(error.message);
            setMessage('');
        }
        return true;
    };

    return (
        <section className="test-section">
            <h1>Test Form</h1>
            <form onSubmit={handleSubmit} method='POST'>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Message:
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit" className="contact-submit">Submit</button>
            </form>
            {message && <div style={{ color: 'green', marginTop: '10px' }}>{message}</div>}
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </section>
    );
}
