import "./siderbar.css";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faBars,
  faBuilding,
  faFileAlt,
  faMinusSquare,
  faPowerOff,
  faTachometerAlt,
  faTasks,
  faTimes,
  faUserCircle,
  faUserCog,
  faUsersCog,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import PermissionComponent from "../PermissionComponent";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  function logOut() {
    localStorage.clear();
  }

  const userLogado = localStorage.getItem("UserLogado")

  return (
    <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <h1>SysEnergy</h1>
        </div>
        <i onClick={() => closeSidebar()} id="sidebarIcon" aria-hidden="true">
          <FontAwesomeIcon icon={faTimes} />
        </i>
      </div>
      <div className="side__title" >
        <h3>Seja Bem Vindo:  </h3> 
      </div>
      <div className="side__user"><p>{userLogado}</p></div>
      <div className="sidebar__menu">
        <div className="sidebar__link active_menu_link">
          <i>
            <FontAwesomeIcon icon={faMinusSquare} />
          </i>
          <a href="/dashboard">Home</a>
        </div>
        <PermissionComponent role="ROLE_ADMIN,ROLE_USER">
          <h2>ADMIN</h2>
        </PermissionComponent>
        <PermissionComponent role="ROLE_ADMIN,ROLE_USER">
          <div className="sidebar__link" >
            <i>
              <FontAwesomeIcon icon={faTachometerAlt} />
            </i>
            <a href="#!">Clientes</a>
          </div>
        </PermissionComponent>
        <div className="sidebar__link" style={{ display: "none" }}>
          <i>
            <FontAwesomeIcon icon={faBuilding} />
          </i>
          <a href="#!">Lojas</a>
        </div>
        <div className="sidebar__link" style={{ display: "none" }}>
          <i>
            <FontAwesomeIcon icon={faArchive} />
          </i>
          <a href="#!">Produtos</a>
        </div>
        <div className="sidebar__link" style={{ display: "none" }}>
          <i>
            <FontAwesomeIcon icon={faBars} />
          </i>
          <a href="#!">Categorias</a>
        </div>
        <div className="sidebar__link" style={{ display: "none" }}>
          <i>
            <FontAwesomeIcon icon={faUtensils} />
          </i>
          <a href="#!">Pedidos</a>
        </div>
        <PermissionComponent role="ROLE_ADMIN">
          <h2>PESSOAS</h2>
        </PermissionComponent>
        <PermissionComponent role="ROLE_ADMIN">
          <div className="sidebar__link">
            <i>
              <FontAwesomeIcon icon={faUserCircle} />
            </i>
            <a href="/usuarios">Usuários</a>
          </div>
        </PermissionComponent>
        <PermissionComponent role="ROLE_ADMIN">
          <div className="sidebar__link">
            <i>
              <FontAwesomeIcon icon={faUsersCog} />
            </i>
            <a href="/roles">Perfis</a>
          </div>
        </PermissionComponent>
        <PermissionComponent role="ROLE_ADMIN">
          <div className="sidebar__link">
            <i>
              <FontAwesomeIcon icon={faUserCog} />
            </i>
            <a href="/permissoes">Permissões</a>
          </div>
        </PermissionComponent>
        <div className="sidebar__link" style={{ display: "none" }}>
          <i>
            <FontAwesomeIcon icon={faTasks} />
          </i>
          <a href="#!">A plataforma</a>
        </div>
        <div className="sidebar__link" style={{ display: "none" }}>
          <i>
            <FontAwesomeIcon icon={faFileAlt} />
          </i>
          <a href="#!">Politica de privacidade</a>
        </div>
        <div className="sidebar__logout">
          <i>
            <FontAwesomeIcon icon={faPowerOff} />
          </i>
          <a href="/" onClick={logOut}>
            Log out{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
