import React from "react"
import { ctx } from '../context'
import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import { levels } from './config'
import { unmountCanvas } from '../utils/canvas'
import './Levels.css'

const Levels = () => {
    const {username} = useContext(ctx)
    const navigate = useNavigate()

    const [scores, setScores] = React.useState([])

    useEffect(() => {
        if (!username) navigate('/')
        unmountCanvas()

        const s = JSON.parse(localStorage.getItem('cuttingData')) || {}
        s[username] = s[username] || new Array(8)
        setScores(s[username])
    }, [])

    const logOut = () => {
        navigate('/')
    }

    return (
        <div className="Levels-container">
            <Container><Row className="justify-content-md-center"><Col xs={11} md={8}>
            <Modal.Dialog xs={12} md={8}>
            <span>Вы вошли как {username} <button onClick={logOut}>Выйти</button> </span>
            
                <Modal.Header>
                    <Modal.Title className="title">Уровни</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <div className="level-container">
                    {levels.map((l, i) => i%2 === 0 && (
                        <Row key={i} className="justify-content-between">
                            <LevelCard 
                                navigate={navigate} 
                                index={i} 
                                data={levels[i]}
                                score={scores[i]}
                            />
                            <LevelCard 
                                navigate={navigate} 
                                index={i+1} 
                                data={levels[i+1]}
                                score={scores[i+1]}
                            />
                        </Row>
                    )).filter(e => e)}
                </div>
                </Modal.Body>
                {scores && scores.length && <span>Сумма очков - {scores.reduce((acc, cur) => acc+cur, 0)}</span>}
                <button onClick={() => navigate('/raiting')}>Отрыть рейтинг игроков</button>
            </Modal.Dialog>
            </Col></Row>
            
            </Container>
            
        </div>
    )
}

const LevelCard = (props) => {
    const {index, data, score, navigate} = props

    return (
        <Col 
            className="level" 
            xs={12} 
            md={5} 
            onClick={() => {
                navigate('/game', {
                    state: {
                        data: data,
                        level: index
                    }
                })
            }}
        >
            <span>Уровень {index+1}</span><br/>
            {score !== null && score !== undefined  && (
                <span>Последний результат: {score} очков</span>
            )}
        </Col>
    )
}

export default Levels