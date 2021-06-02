import { useState } from 'react'
import Main from '../../components/main/Main';
import Navbar from '../../components/navbar/NavBar';
import Sidebar from '../../components/siderbar/Siderbar';
import './dashboard.css';


const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const openSidebar = () => {
        setSidebarOpen(true);
    };
    const closeSidebar = () => {
        setSidebarOpen(false);
    }
    return (
        <div className="dash_container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
            <Navbar sidebarOpen={sidebarOpen} openSiderbar={openSidebar} />
            <Main />
        </div>
    );
};

export default Dashboard;