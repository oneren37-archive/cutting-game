import React from "react";
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { unmountCanvas } from '../utils/canvas'
import './Raiting.css'

const Raiting = () => {

    const [s, setS] = React.useState(null)
    const navigate = useNavigate()

    React.useEffect(() => {
        unmountCanvas()

        const s = JSON.parse(localStorage.getItem('cuttingData'))
        setS(s)
    }, [])

    return (
        <div className="raiting-container">
            <Modal.Dialog xs={12} md={8}>            
                <Modal.Header>
                    <Modal.Title className="title">Рейтинг игроков <button onClick={() => navigate('/levels')}>назад</button></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {s ? (
                        <div className="Raiting-container">
                            {Object.keys(s).filter(e => e!=='undefined').map(key =>
                                <RaitingCard 
                                    user={key}
                                    data={s[key]}
                                />
                            )}
                        </div>
                    ) : (
                        <span>Пока никто не играл</span> 
                    )}
                </Modal.Body>
            </Modal.Dialog>
        </div>
    )
}

const RaitingCard = (props) => {
    const {user, data} = props

    return (
        <Col 
            className="raiting-card" 
            xs={12} 
            md={5} 
        >
            <span>{user} - {data.reduce((sum, curr) => sum+curr, 0)}</span>
        </Col>
    )
}


export default Raiting