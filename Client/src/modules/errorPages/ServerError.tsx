import { Link } from 'react-router-dom';
export default function ServerError(): JSX.Element {
    return (
        <div>
        <h1>500</h1>
        <h2>Serverfejl</h2>
        <Link to="/">Tilbage til forsiden</Link>
        </div>
    );
    }