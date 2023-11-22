import '../styles/_MainPage.scss';

// import { Button } from '../components/Button/Button.jsx';
// import { words } from '../data/data.js';

export function MainPage() {
    return (
        <div className="main">
            <h2 className="title">pick type of training</h2>
            <div className="blocks">
                {/* page navigation doesn't work yet */}
                <a href="./CardPage.js" className="block">
                    <div>learn with cards</div>
                </a>
                <a href="./ListPage.js" className="block">
                    <div>check word list</div>
                </a>
            </div>
        </div>
    );
}
