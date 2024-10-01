import React, { useEffect, useState } from 'react';

export default function MessageOne({ item }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (item) {
            const { firstname = '', lastname = '', email = '', phone = '', message = '' } = item;
            const formattedFirstName = `${firstname[0].toUpperCase()}${firstname.slice(1).toLowerCase()}`;
            // Ensure lastname is in lowercase
            const formattedLastName = lastname.toLowerCase();
            setFullName(`${formattedFirstName} ${formattedLastName}`);
            setEmail(email);
            setPhone(phone);
            setMessage(message);
        }
    }, [item]);

    return (
        <div className="bg-orange-50 p-4 rounded-lg shadow-md  w-full mx-auto mt-1">
            <p className="text-lg font-semibold mb-2">Name: <span className="font-normal">{fullName}</span></p>
            <p className="text-lg font-semibold mb-2">Email: <span className="font-normal">{email}</span></p>
            <p className="text-lg font-semibold mb-2">Phone: <span className="font-normal">{phone}</span></p>
            <p className="text-lg font-semibold">Query: <span className="font-normal">{message}</span></p>
        </div>
    );
}
