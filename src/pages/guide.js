import { Link } from 'react-router-dom';


const Guide = () => {
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
            <h3>How to play</h3>
            
            <div>
            <span className="help">
                Click as many coins as you can within 30 seconds!
            </span>
            </div>
            <Link to="/" className="home-link">
            <span className="help">
                <p>Go Back</p>
            </span>
            </Link>
        </div>
        </main>
    );
};

export default Guide;