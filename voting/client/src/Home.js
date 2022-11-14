import React from 'react';
import './App.css';
import Register from './components/Registe';

function Home() {
    return (
        <div>
            <header className='bg-primary p-3'>
                <h4 className='text-white text-center'>Online Voting System</h4>
            </header>
            <Register />
        </div>
    );
}

export default Home;
