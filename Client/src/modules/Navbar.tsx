import { Link } from "react-router-dom";
export default function NavBar(): JSX.Element {
  return (
    <header className="bg-base-100 shadow-md">
      <div className="container mx-auto px-4">
        <div className="navbar">
          <div className="navbar-start">
            <a className="btn btn-ghost normal-case text-xl">MyApp</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="list-none flex space-x-4">
              <Links />
            </ul>
          </div>
          <div className="navbar-end">
            <a className="btn">Login</a>
          </div>
          <div className="navbar-end lg:hidden">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 list-none"
              >
                <Links />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Links() {
  return (
    <>
      <li>
        <Link to="/create-customer">Opret Kunde</Link>
      </li>
      <li>
        <a>About</a>
      </li>
      <li>
        <a>Services</a>
      </li>
      <li>
        <a>Contact</a>
      </li>
    </>
  );
}
