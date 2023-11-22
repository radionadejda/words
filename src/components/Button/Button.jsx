import './_Button.scss';

export function Button(props) {
    return <button className={`button ${props.name}`}>{props.name}</button>;
}
