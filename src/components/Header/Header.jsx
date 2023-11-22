import './_Header.scss';

// maybe add theme switcher into header__nav

// maybe add topic picker to change laguages into header__nav
/* <li>
    <select name="topicPicker" id="topicPicker">
        <option value="">pick a topic</option>
        <option value="english">english</option>
        <option value="spanish">spanish</option>
    </select>
</li> */

export function Header() {
    return (
        <div className="header">
            <a href="../../pages/MainPage.jsx" className="header__link">
                <h1 className="title">another learning app</h1>
            </a>
            <ul className="header__nav">
                <li className="nav__item">cards</li>
                <li className="nav__item">word list</li>
            </ul>
        </div>
    );
}
