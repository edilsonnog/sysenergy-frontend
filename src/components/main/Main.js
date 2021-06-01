import './styles.css'
import hello from '../../assets/hello.svg'
import Chart from '../charts/Chart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Main = () => {
    return(
        <main>
            <div className="main__container">
                <div className="main__title">
                    <img src={hello} alt="hello" />
                    <div className="main__greeting">
                        <h1>Hello Codersbite</h1>
                        <p>Wellcom to your admin dashboard</p>
                    </div>
                </div>
                <div className="card">
                    <i><FontAwesomeIcon icon={faUser} className="fa-2x text-lightblue"/></i>
                    <div className="card_inner">
                        <p className="text-primary-p">Number of Subscribers</p>
                        <span className="font-bold text-title">578</span>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Main;