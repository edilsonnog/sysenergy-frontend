import './siderbar.css'
import logo from '../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive, faBars, faBriefcase, faBuilding, faCalendarCheck, faCut, faFile, faFileAlt, faHandshake, faHome, faMale, faMinusSquare, faMoneyBill, faMoneyBillWave, faPowerOff, faQuestion, faSignOutAlt, faTachometerAlt, faTasks, faTimes, faUserCircle, faUserSecret, faUtensils, faWrench } from '@fortawesome/free-solid-svg-icons'
import { faCuttlefish } from '@fortawesome/free-brands-svg-icons'


const Sidebar = ({ sidebarOpen, closeSidebar }) => {
    return (
        <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
            <div className="sidebar__title">
                <div className="sidebar__img">
                    <img src={logo} alt="logo" />
                    <h1>SysEnergy</h1>
                </div>
                <i  onClick={() => closeSidebar()}
                    id="sidebarIcon"
                    aria-hidden="true">
                        <FontAwesomeIcon icon={faTimes} />
                </i>
            </div>
            <div className="sidebar__menu">
                <div className="sidebar__link active_menu_link">
                    <i>
                        <FontAwesomeIcon icon={faMinusSquare} />
                    </i>
                    <a href="#">Home</a>
                </div>
                <h2>ADMIN</h2>
                <div className="sidebar__link">
                    <i>
                        <FontAwesomeIcon icon={faTachometerAlt} />
                    </i>
                    <a href="#">Area Administrativa</a>
                </div>
                <div className="sidebar__link">
                    <i>
                        <FontAwesomeIcon icon={faBuilding} />
                    </i>
                    <a href="#">Lojas</a>
                </div>
                <div className="sidebar__link">
                    <i>
                        <FontAwesomeIcon icon={faArchive} />
                    </i>
                    <a href="#">Produtos</a>
                </div>
                <div className="sidebar__link">
                    <i>
                        <FontAwesomeIcon icon={faBars} />
                    </i>
                    <a href="#">Categorias</a>
                </div>
                <div className="sidebar__link">
                    <i>
                        <FontAwesomeIcon icon={faUtensils} />
                    </i>
                    <a href="#">Pedidos</a>
                </div>
                <h2>PESSOAS</h2>
                <div className="sidebar__link">
                    <i>
                        <FontAwesomeIcon icon={faMale} />
                    </i>
                    <a href="#">Administradores</a>
                </div>
                <div className="sidebar__link">
                    <i>
                        <FontAwesomeIcon icon={faUserCircle} />
                    </i>
                    <a href="#">Usuários</a>
                </div>
                <div className="sidebar__link">
                    <i>
                        <FontAwesomeIcon icon={faMoneyBillWave} />
                    </i>
                    <a href="#">Pagamentos e custos</a>
                </div>
                <div className="sidebar__link">
                    <i>
                        <FontAwesomeIcon icon={faTasks} />
                    </i>
                    <a href="#">A plataforma</a>
                </div>
                <div className="sidebar__link">
                    <i>
                        <FontAwesomeIcon icon={faFileAlt} />
                    </i>
                    <a href="#">Politica de privacidade</a>
                </div>
                <div className="sidebar__logout">
                    <i>
                        <FontAwesomeIcon icon={faPowerOff} />
                    </i>
                    <a href="#">Log out </a>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;