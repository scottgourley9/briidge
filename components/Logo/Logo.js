import Link from 'next/link';

import styles from './Logo.module.scss';

const Logo = ({ inverted }) => (
    <Link href="/">
        <div className={`${styles['logo-section']} ${inverted ? styles['logo-section-inverted'] : ''}`.trim()}>
            <div className={styles.logo}>
                ii
            </div>
            <span>
                briidge
            </span>
        </div>
    </Link>
);

export default Logo;
