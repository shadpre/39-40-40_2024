import { Link } from 'react-router-dom';
export default function Forbidden(): JSX.Element {
  return (
    <div>
      <h1>403</h1>
      <h2>Adgang nægtet</h2>
      <Link to="/">Tilbage til forsiden</Link>
    </div>
  );
}