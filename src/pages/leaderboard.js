import { Link } from 'react-router-dom';
import * as query from '../contract/query';
import { useState, useEffect } from 'react';
import { useConnectedWallet } from '@terra-money/wallet-provider';

const Leaderboard = () => {
  const [scores, setScores] = useState();
  const [loading, setLoading] = useState(true);
  const connectedWallet = useConnectedWallet();

  useEffect(() => {
    setLoading(true);
    const fetchScores = async () => {
      if (connectedWallet && connectedWallet.network.name === 'testnet') {      
        return (await query.getScores(connectedWallet)).scores;
      }
    };

    fetchScores().then(scores => {
      setScores(scores);
      setLoading(false);
    });
  }, [connectedWallet]);

  const renderScores = (scores) => {
    if (!scores || scores.length < 1) {
      return <div> No scores available :( </div>;
    }

    return scores.map((score, index) => {
      return (
        <div key={index} className="score">
          {/* Format is address: score */}
          {/* Slice address to first 5 and last 4 digits so it looks like terra...a1b2*/}
          <span>
            {score[0].slice(0, 5) + '...' + score[0].slice(-4)}:{' '}
            {score[1].toString().padStart(2, '0')}
          </span>
        </div>
      );
    });
  };

  return (
    <main className="App">
      <header>
        <Link to="/" className="home-link">
          <div className="header-titles">
            <h1>⚔️ Grab the Luna ⚔️</h1>
            <p>Come join the revolution!</p>
          </div>
        </Link>
      </header>

      <div className="score-board-container">
        <h3>Scoreboard</h3>
        {/* If loading, show loading, else render */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          renderScores(scores)
        )}
        
        <div>
        <Link to="/" className="home-link">
            <span className="help">
                <p>Go Back</p>
            </span>
            </Link>
        </div>
      </div>
    </main>
  );
};

export default Leaderboard;