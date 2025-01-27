import React, { useState } from 'react';

const NotificationForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await fetch('/sendNotification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, body })
        });

        if (response.ok) {
            console.log('Notification sent successfully.');
        } else {
            console.error('Failed to send notification.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <br />
            <label htmlFor="body">Body:</label>
            <input
                type="text"
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
            />
            <br />
            <button type="submit">Send Notification</button>
        </form>
    );
};

export default NotificationForm;
