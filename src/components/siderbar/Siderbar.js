import './siderbar.css'
import logo from '../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive, faBriefcase, faBuilding, faCalendarCheck, faFile, faHandshake, faHome, faMoneyBill, faPowerOff, faQuestion, faSignOutAlt, faTimes, faUserSecret, faWrench } from '@fortawesome/free-solid-svg-icons'


const Sidebar = ({sidebarOpen, closeSidebar}) => {
    return(
        <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
           <div className="sidebar__title">
               <div className="sidebar__img">
                   <img src={logo} alt="logo" />
                   <h1>SysEnergy</h1>
               </div>
               <i id="sidebarIcon" onClick={() => closeSidebar()}>
                   <FontAwesomeIcon icon={faTimes} />
               </i>
           </div>
            <div className="sidebar__menu">
                <div className="sidebar__link active_menu_link">
                    <i><FontAwesomeIcon icon={faHome} /></i>
                    <a href="#">Dashboard</a>
                </div>
                <h2>MNG</h2>
                <div className="sidebar__link">
                    <i><FontAwesomeIcon icon={faUserSecret} /></i>
                    <a href="#">Admin Management</a>
                </div>
                <div className="sidebar__link">
                    <i><FontAwesomeIcon icon={faBuilding} /></i>
                    <a href="#">Company Management</a>
                </div>
                <div className="sidebar__link">
                    <i><FontAwesomeIcon icon={faWrench} /></i>
                    <a href="#">Employee Management</a>
                </div>
                <div className="sidebar__link">
                    <i><FontAwesomeIcon icon={faArchive} /></i>
                    <a href="#">Warehouse</a>
                </div>
                <div className="sidebar__link">
                    <i><FontAwesomeIcon icon={faHandshake} /></i>
                    <a href="#">Contracts</a>
                </div>
                <h2>LEAVE</h2>
                <div className="sidebar__link">
                    <i><FontAwesomeIcon icon={faQuestion} /></i>
                    <a href="#">Requests</a>
                </div>
                <div className="sidebar__link">
                    <i><FontAwesomeIcon icon={faSignOutAlt} /></i>
                    <a href="#">Leave Policy</a>
                </div>
                <div className="sidebar__link">
                    <i><FontAwesomeIcon icon={faCalendarCheck} /></i>
                    <a href="#">Special Days</a>
                </div>
                <div className="sidebar__link">
                    <i><FontAwesomeIcon icon={faFile} /></i>
                    <a href="#">Apply for leave</a>
                </div>
                <h2>Payroll</h2>
                <div className="sidebar__link">
                    <i><FontAwesomeIcon icon={faMoneyBill} /></i>
                    <a href="#">Payroll</a>
                </div>
                <div className="sidebar__link">
                    <i><FontAwesomeIcon icon={faBriefcase} /></i>
                    <a href="#">Paygrade</a>
                </div>
                <div className="sidebar__link">
                    <i><FontAwesomeIcon icon={faPowerOff} /></i>
                    <a href="#">Log out</a>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;