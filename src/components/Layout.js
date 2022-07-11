import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Layout = (props) => {
  return (
    <Fragment>
      <nav>
        <Link to={'/'}>
          <h1 className="logo">NutriCalc</h1>
        </Link>
      </nav>
      <section>{props.children}</section>
      <footer>
        <p className="footer-credit">
          Created by{' '}
          <a
            href="https://www.linkedin.com/in/robertjmoss/"
            className="linkedin-hyperlink"
          >
            Robert J. Moss
          </a>
        </p>
      </footer>
    </Fragment>
  );
};

export default Layout;
