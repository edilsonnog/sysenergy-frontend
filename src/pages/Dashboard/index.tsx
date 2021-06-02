import { useState } from 'react'
import Main from '../../components/main/Main';
import Navbar from '../../components/navbar/NavBar';
import Sidebar from '../../components/siderbar/Siderbar';
import './dashboard.css';


const Dashboard = () => {
    const [sideBarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen(true);
    }
    const closeSidebar = () => {
        setSidebarOpen(false);
    }
    return (
        <div className="dash_container">
            <Navbar sideBarOpen={sideBarOpen} openSiderbar={openSidebar} />
            <Main />
            <Sidebar sidebarOpen={sideBarOpen} closeSidebar={closeSidebar} />
        </div>
    );
};

export default Dashboard;