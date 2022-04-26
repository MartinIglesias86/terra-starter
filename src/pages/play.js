import React, { useState, useEffect } from "react";
import * as execute from '../contract/execute';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import LoadingIndicator from '../components/LoadingIndicator';

const Play = () => {
    const connectedWallet = useConnectedWallet();
    // Configures the duration of the round
    const playTime = 30;

    const [time, setTime] = useState(playTime);
    const [gameOver, setGameOver] = useState(false);
    // We use this to track where the target is on the screen
    const [targetPosition, setTargetPosition] = useState({ top: "15%", left: "50%" });
    const [loading, setLoading] = useState(false);
    const [score, setScore] = useState(0);
    
    // Every second we're going to lower the value of time.
    useEffect(() => {
        const unsubscribe = setInterval(() => {
        setTime(time => time > 0 ? time - 1 : 0);
        }, 1000);
        return unsubscribe;
    }, []);
    
    useEffect(() => {
        if (time === 0) {
        setTargetPosition({ display: 'none' });
        // Show alert to let user know it's game over
        alert(`Game Over! Your score is ${score}. Please confirm transaction to submit score.`);
        submitScore();
        }
    }, [time]);

    const submitScore = async () => {
        if (connectedWallet && connectedWallet.network.name === 'testnet') {
        setLoading(true);
        const tx = await execute.setScore(connectedWallet, score);
        console.log(tx);
        // Once the transaction is confirmed, we let the user know and navigate to the leaderboard
        alert('Score submitted!');
        setLoading(false);
        window.location.href = '/leaderboard';
        }
    };

    const handleClick = () => {
        
        let audio = new Audio("/Zergling_explodes.mp3");
        
        // Controls volume
        audio.volume = 0.2;
        audio.play();

        setScore(score => score + 1);
        
        // Use this to control bounds!
        setTargetPosition({
        top: `${Math.floor(Math.random() * 80)}%`,
        left: `${Math.floor(Math.random() * 80)}%`
        });
    };

    return (
        <div className="score-board-container">
        <div className="play-container">
            <span>Score: {score}</span>
            <span>Grab it!</span>
            <span>Time left: {time} s</span>
        </div>

        {/* Render loading or game container */}
        {loading ? (
            <LoadingIndicator />
        ) : (
            <div className="game-container">
            <img src={"Terra.png"} id="target" alt="Target" style={{ ...targetPosition }} onClick={handleClick} />
            <img src="wallet.png" id="marine-img" alt="Hero" />
            </div>
        )}
        </div>
    );
};

export default Play;