import { Footer } from './Footer';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-full'>
            <Header />
            
            <main className='min-h-full'>
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
};