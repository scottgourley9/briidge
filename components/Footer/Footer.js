import Link from 'next/link';
import { GrInstagram } from 'react-icons/gr';
import { GrFacebook } from 'react-icons/gr';
import { GrTwitter } from 'react-icons/gr';
import { GrPinterest } from 'react-icons/gr';

import styles from './Footer.module.scss';
import Logo from '../Logo/Logo';

const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles['footer-top']}>
            <Logo />
            <div className={styles['social-logos']}>
                <GrInstagram />
                <GrFacebook />
                <GrTwitter />
                <GrPinterest />
            </div>
        </div>
        <div className={styles['footer-links']}>
            <Link href="/faq">
                FAQ
            </Link>
            <Link href="/contactus">
                Contact Us
            </Link>
            <Link href="/">
                Terms & Conditions
            </Link>
            <Link href="/">
                Privacy Policy
            </Link>
            <Link href="/">
                Cookie Policy
            </Link>
            <br />
            <br />
            <span className={styles.copyright}>© 2022 briidge | All Rights Reserved</span>
        </div>
    </footer>
);

export default Footer;
