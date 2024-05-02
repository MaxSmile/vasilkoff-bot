"use client";
import React, { useRef, useState } from 'react';

export default function TestForm() {
    const formRef = useRef(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const formObject = {};
        formData.forEach((value, key) => { formObject[key] = value; });

        const url = `/api/form`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Form submitted successfully! Thank you.');
                setError('');
                // Clear the form fields if needed
                formRef.current.reset();
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
            <form ref={formRef} onSubmit={handleSubmit} method='POST'>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="clientID"
                    />
                </label>
                <label>
                    Message:
                    <textarea
                        name="message"
                    />
                </label>
                <input type="hidden" name="chatID" value='test1' />
                <button type="submit" className="contact-submit">Submit</button>
            </form>
            {message && <div style={{ color: 'green', marginTop: '10px' }}>{message}</div>}
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </section>
    );
}
