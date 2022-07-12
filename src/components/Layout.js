import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = (props) => {
  return (
    <Fragment>
      <nav className={styles['layout__nav']}>
        <div className={styles['layout__wrapper']}>
          <Link to={'/'}>
            <h1 className="logo">NutriCalc</h1>
          </Link>
        </div>
      </nav>
      <section>{props.children}</section>
      <footer className={styles['layout__footer']}>
        <div className={styles['layout__wrapper']}>
          <p>
            Created by{' '}
            <a
              href="https://www.linkedin.com/in/robertjmoss/"
              className="linkedin hyperlink"
            >
              Robert J. Moss
            </a>
          </p>
        </div>
      </footer>
    </Fragment>
  );
};

export default Layout;
