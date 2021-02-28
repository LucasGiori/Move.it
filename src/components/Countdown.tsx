import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;
const UM_MINUTO_EM_SEGUNDOS = 60;
const VINTE_CINCO_MINUTO_EM_SEGUNDOS = 25 * UM_MINUTO_EM_SEGUNDOS;

export function Countdown() {

    const { startNewChallenge } = useContext(ChallengesContext);
    const [time, setTime] = useState(VINTE_CINCO_MINUTO_EM_SEGUNDOS);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHashFinished] = useState(false);

    const minutes = Math.floor(time / UM_MINUTO_EM_SEGUNDOS);
    const seconds = time % UM_MINUTO_EM_SEGUNDOS;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split('');

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(VINTE_CINCO_MINUTO_EM_SEGUNDOS)
    }

    useEffect(() => {
        if(isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time-1);
            },1000)
        } else if (isActive && time === 0){
            setHashFinished(true);
            setIsActive(false);
            startNewChallenge();
        }   
    }, [isActive, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button 
                    disabled
                    type="button" 
                    className={styles.countdownButton}
                >
                    Ciclo encerrado
                </button>
            ) : (
                <>
                { isActive ? (
                    <button 
                        type="button" 
                        className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                        onClick={resetCountdown}
                    >
                        Abandonar ciclo
                    </button>
                ) : (
                    <button 
                        type="button" 
                        className={styles.countdownButton}
                        onClick={startCountdown}
                    >
                        Iniciar ciclo
                    </button>
                )}
                </>
            )}

            
            
        </div>
    );
}