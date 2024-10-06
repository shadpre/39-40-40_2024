import { Link } from 'react-router-dom';
export default function NotFound(): JSX.Element {
  return (
    <div>
      <h1>404</h1>
      <h2>Side ikke fundet</h2>
      <Link to="/">Tilbage til forsiden</Link>
    </div>
  );
}
