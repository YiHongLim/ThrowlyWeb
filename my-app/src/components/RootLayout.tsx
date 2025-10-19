import Navbar from '../components/home/NavBar';
import Footer from './Footer';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <header>
                <Navbar />
            </header>
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
        </div>
    );

}
export default RootLayout;