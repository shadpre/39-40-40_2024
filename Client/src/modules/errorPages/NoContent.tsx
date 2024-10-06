import { Link } from "react-router-dom";
export default function NoContent(): JSX.Element {
  return (
    <div>
      <h1>204</h1>
      <h2>No content</h2>
      <Link to="/">Back to home</Link>
    </div>
  );
}
