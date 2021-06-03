import "./main.css";
import hello from "../../assets/hello.svg";
import Chart from "../charts/Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArchive,
  faBars,
  faChartArea,
  faDollarSign,
  faMoneyBillAlt,
  faUser,
  } from "@fortawesome/free-solid-svg-icons";

const Main = () => {
  return (
    <main>
      <div className="main__container">
        <div className="main__title">
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>Hello Codersbite</h1>
            <p>Wellcom to your admin dashboard</p>
          </div>
        </div>
        <div className="main__cards">
          <div className="card">
            <i>
              <FontAwesomeIcon icon={faUser} className="fa-2x text-lightblue" />
            </i>
            <div className="card_inner">
              <p className="text-primary-p">Número de Pedidos</p>
              <span className="font-bold text-title">578</span>
            </div>
          </div>
          <div className="card">
            <i><FontAwesomeIcon icon={faMoneyBillAlt} className="fa-2x text-red" /></i>
            <div className="card_inner">
              <p className="text-primary-p">Pagamentos</p>
              <span className="font-bold text-title">R$ 2.467</span>
            </div>
          </div>
          <div className="card">
            <i>
              <FontAwesomeIcon
                icon={faArchive}
                className="fa-2x text-yellow"
              />
            </i>
            <div className="card_inner">
              <p className="text-primary-p">Número de produtos</p>
              <span className="font-bold text-title">670</span>
            </div>
          </div>
          <div className="card">
            <i>
              <FontAwesomeIcon
                icon={faBars}
                className="fa-2x text-green"
              />
            </i>
            <div className="card_inner">
              <p className="text-primary-p">Categorias</p>
              <span className="font-bold text-title">40</span>
            </div>
          </div>
        </div>
        <div className="charts">
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Daily Reports</h1>
                <p>Cupertino, California, USA</p>
              </div>
              <i>
                <FontAwesomeIcon icon={faDollarSign} />
              </i>
            </div>
            <Chart />
          </div>
          <div className="charts__right">
            <div className="charts__right__title">
              <div>
                <h1>Stats Reports</h1>
                <p>Cupertino, California, USA</p>
              </div>
              <i>
                <FontAwesomeIcon icon={faChartArea} />
              </i>
            </div>
            <div className="charts__right__cards">
              <div className="card1">
                <h1>Lucro</h1>
                <p>R$ 2.500,00</p>
              </div>
              <div className="card2">
                <h1>Pagamentos</h1>
                <p>R$ 250,00</p>
              </div>
              <div className="card3">
                <h1>Custo de hospedagem</h1>
                <p>R$ 150,00</p>
              </div>
              <div className="card4">
                <h1>Banco de Dados</h1>
                <p>R$ 180,00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Main;
