import { createContext, ReactNode } from "react";
import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

interface CountdownContextData {
    minutes: number,
    seconds: number,
    hasFinished: boolean,
    isActive: boolean,
    startCountdown: () => void,
    resetCountdown: () => void
};

interface CountdownProviderProps {
    children: ReactNode;
};

export const CountdownContext = createContext({} as CountdownContextData);

const UM_MINUTO_EM_SEGUNDOS = 60;
const VINTE_CINCO_MINUTO_EM_SEGUNDOS = 0.3 * UM_MINUTO_EM_SEGUNDOS;
let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }) {


    const { startNewChallenge } = useContext(ChallengesContext);
    const [time, setTime] = useState(VINTE_CINCO_MINUTO_EM_SEGUNDOS);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHashFinished] = useState(false);

    const minutes = Math.floor(time / UM_MINUTO_EM_SEGUNDOS);
    const seconds = time % UM_MINUTO_EM_SEGUNDOS;


    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(VINTE_CINCO_MINUTO_EM_SEGUNDOS)
        setHashFinished(false);
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
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    );
}