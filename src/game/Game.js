import React, { useState, useEffect, useContext, useCallback, useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { useReferredState } from '../utils/hooks'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { unmountCanvas } from "../utils/canvas";
import { ctx } from '../context'
import { init } from './core'
import './Game.css'

const Game = () => {
    const { state } = useLocation();
    const { data, level } = state;
    
    const {username} = useContext(ctx);
    const navigate = useNavigate();

    const [cutsCount, cutsCountRef, setCutsCount] = useReferredState(0);
    const [cutsLimit, cutsLimitRef, setCutsLimit] = useReferredState(null);
    const [partsCount, partsCountRef, setPartsCount] = useReferredState(1);
    const [timeLeft, timeLeftRef, setTimeLeft] = useReferredState(data.timeLimit)
    const [isEnded, setIsEnded] = useState(false)
    const [endMessage, setEndMessage] = useState('')
    const [isWin, setIsWin] = useState(false)
    const [isStarted, setIsStarted] = useState(false)

    const timerRef = React.useRef()

    useEffect(() => {
        if (!isStarted) return
        const myInterval = setInterval(() => {
            if (timeLeft <= 0) {
                handleEnd(false, 'Время вышло')
                clearInterval(myInterval)
                return
            }
            setTimeLeft(timeLeftRef.current-1)
        }, 1000)
        timerRef.current = myInterval

        return () => clearInterval(myInterval)
    }, [isStarted, timeLeft])

    useEffect(() => {
        if (!username) navigate('/')
        setCutsLimit(data.cutsLimit)
        init(data, handleCut)
        return () => unmountCanvas()
    }, [])

    const onExit = () => {
        navigate('/levels')
    }

    const handleEnd = (isWin, message, score=0) => {
        clearInterval(timerRef.current)

        const data = JSON.parse(localStorage.getItem('cuttingData')) || {}
        data[username] = data[username] || new Array(12)
        data[username][level] = score
        localStorage.setItem('cuttingData', JSON.stringify(data));

        setIsWin(isWin)
        setEndMessage(message)
        setIsEnded(true)
    }
   
    const handleCut = (areas, cutsCnt) => {
        const partsCnt = areas.length
        setCutsCount(cutsCountRef.current+1)
        setPartsCount(partsCnt)
        if (cutsCnt > data.cutsLimit) {
            handleEnd(false, 'Cлишком много разрезов')
        }
        else if (partsCnt > data.cutsCount) {
            handleEnd(false, 'Cлишком много частей')
        }
        else if (partsCnt === data.cutsCount) {
            handleEnd(true, `Вы набрали ${getScore(areas)} очков`, getScore(areas))
        }
    }

    const getScore = (areas) => {
        const min = areas.reduce((min, curr) => curr < min ? curr : min)
        const max = areas.reduce((min, curr) => curr > min ? curr : min)
        return Math.round(min/max*100)
    }

    return (
        <div className="interface">
            <button onClick={onExit}>Выйти</button>
            <div className="cuts-count">
                <span>{cutsCount}</span> разрезов
            </div>
            <div className="parts-count">
                <span>{partsCount}</span> частей
            </div>
            <div className="timer">{timeLeft}</div>


            <Modal show={isEnded} onHide={onExit}>
                <Modal.Header closeButton>
                <Modal.Title>{isWin ? 'Уровень пройден': 'Провал'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {endMessage}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={onExit}>
                    К результатам
                </Button>
                </Modal.Footer>
            </Modal>



            <Modal show={!isStarted} onHide={() => setIsStarted(true)}>
                <Modal.Header closeButton>
                <Modal.Title>Правила уровня</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вам нужно разрезать данную фигугу на {data.cutsCount} за {data.timeLimit} секунд. {cutsLimit && (<>лимит разрезов - {cutsLimit}</>)}</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={() => setIsStarted(true)}>
                    Понятно
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
        
    )
}

export default Game