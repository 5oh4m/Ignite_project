import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, onLogout }) => {
    return (
        <div className="min-h-screen flex flex-col bg-soft-white">
            <Navbar onLogout={onLogout} />
            <main className="flex-grow pt-20">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
