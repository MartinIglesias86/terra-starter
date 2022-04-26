import { Link } from 'react-router-dom';

const menu_options = [
    { name: 'Play', link: '/play' },
    { name: 'Leaderboard', link: '/leaderboard' },
    { name: 'How to play', link: '/guide' },
];

const Menu = () => {

    const renderMenu = () => {
    return menu_options.map((mb, index) => {

        const { name, link } = mb;
    
        return (
        <Link to={link} key={index} className="menu-item">
            <span className="item-text">{name}</span>
        </Link>
        );
    });
    };

    return <div className="game-menu">{renderMenu()}</div>;
};

export default Menu;