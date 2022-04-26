import React from 'react';
import Auth from '../../components/Auth/Auth';
import './home.css';

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Auth permissions={[1, 2, 3, 4]}>
                <h1>admin</h1>
            </Auth>
        </div>
    )
}
