import React from 'react'
import Sidenav from './_components/Sidenav';
import Header from './_components/Header';

const DashboardLayout = ({ children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='bg-slate-200 h-screen'>
            <div className='md:w-64 hidden md:block fixed' >
                <Sidenav/>
            </div>
        <div className='md:ml-64'>
            <Header/>
           {children}
        </div>
        </div>
    )
}

export default DashboardLayout