import { Footer } from './Footer';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
    return (
        <>
            <Header />
            
            <main>
                <Outlet />
            </main>
            
            <Footer />
        </>
    );
};