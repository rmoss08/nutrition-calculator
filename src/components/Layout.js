import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = (props) => {
  return (
    <Fragment>
      <header className={styles['layout__header']}>
        <div className={styles['layout__header-wrapper']}>
          <Link to={'/'}>
            <h1 className="logo">NutriCalc</h1>
          </Link>
        </div>
      </header>
      <section className={styles['layout__section-wrapper']}>{props.children}</section>
      <footer className={styles['layout__footer']}>
        <div className={styles['layout__footer-wrapper']}>
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
