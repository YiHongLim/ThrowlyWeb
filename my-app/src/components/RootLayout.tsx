import Navbar from '../components/home/NavBar';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main>{children}</main>
        </div>
    );

}
export default RootLayout;