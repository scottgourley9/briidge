import styles from './Layout.module.scss';

const Layout = ({ children }) => (
    <main className={styles.layout}>{children}</main>
);

export default Layout;
