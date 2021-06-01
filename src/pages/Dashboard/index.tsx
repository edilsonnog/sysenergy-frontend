import React, {useState} from 'react'
import Navbar from '../../components/navbar/NavBar';
import Sidebar from '../../components/siderbar/Siderbar';
import './styles.css';


const Dashboard: React.FC = () => {
    const [sideBarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen(true);
    }
    const closeSidebar = () => {
        setSidebarOpen(false);
    }
    return(
        <div className="container">
            <Navbar  sideBarOpen={sideBarOpen} openSiderbar={openSidebar} />
            <h1>SysEnergy Dashboard</h1>
            <Sidebar sidebarOpen={sideBarOpen} closeSidebar={closeSidebar}/>
        </div>
    );
};

export default Dashboard;