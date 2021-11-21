import { Fragment, useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import { GrMenu } from 'react-icons/gr';
import { GrClose } from 'react-icons/gr';
import { GrInstagram } from 'react-icons/gr';
import { GrFacebook } from 'react-icons/gr';
import { GrTwitter } from 'react-icons/gr';
import { GrPinterest } from 'react-icons/gr';

import Logo from '../Logo/Logo';
import { Button } from '../shared/Button/Button';

import styles from './Nav.module.scss';
import animate from '../../styles/animate.module.css';

const Nav = ({ user }) => {
    const navRef = useRef();
    const [showing, toggleMenu] = useState(false);
    const [notAtTop, toggleNotAtTop] = useState(false);
    const [mounted, updateMounted] = useState(false);
    const [scrollingUp, updateScrollingUp] = useState(false);
    const [scrolledPastHeader, updateScrolledPastHeader] = useState(false);

    const handleOnScroll = () => {
        if (window.pageYOffset > 0) {
            toggleNotAtTop(true);
        } else if (notAtTop) {
            toggleNotAtTop(false);
        }
    }

    useEffect(() => {
        updateMounted(true);

        let lastScrollTop = window.pageYOffset;
        const navHeight = navRef.current.offsetHeight;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                updateScrollingUp(false);
                if (scrollTop > navHeight) {
                    updateScrolledPastHeader(true);
                }
            } else if (scrollTop > navHeight) {
                updateScrollingUp(true);
                updateScrolledPastHeader(false);
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
    }, []);

    useEffect(() => {
        window.onscroll = handleOnScroll;
    }, [notAtTop]);

    const handleToggleMenu = () => {
        if (window.innerWidth <= 980) {
            toggleMenu(!showing);
            if (!showing) {
                disableBackgroundScroll(true);
            } else {
                disableBackgroundScroll(false);
            }
        }
    }

    const disableBackgroundScroll = disable => {
        const parentElements = document.querySelectorAll('html, body');
        const arr = [].slice.call(parentElements);
        if (disable) {
            arr.forEach(ele => ele.setAttribute('style', 'height: 100vh; overflow: hidden;'));
        } else {
            arr.forEach(ele => ele.removeAttribute('style'));
        }
    }

    return (
        <Fragment>
            <div onClick={handleToggleMenu} className={`${styles['nav-overlay']} ${showing ? styles['nav-overlay-showing'] : ''}`.trim()}/>
            <nav ref={navRef} className={`${styles['nav-wrapper']} ${scrolledPastHeader ? styles['move-nav-up'] : ''}`.trim()}>
                <div className={`${styles['logo-and-ham']} ${notAtTop ? styles['show-shadow'] : ''}`.trim()}>
                    <Link href="/">
                        <Logo />
                    </Link>
                    <GrMenu className={styles['menu-icon']} onClick={handleToggleMenu} />
                </div>
                <ul className={`${styles['nav-list-wrapper']} ${showing ? styles.showing : ''} ${mounted ? styles['display-it'] : ''} ${notAtTop ? styles['nav-show-shadow'] : ''}`.trim()}>
                    <div onClick={handleToggleMenu} className={`${styles['logo-and-close']} ${notAtTop ? styles['show-shadow'] : ''}`.trim()}>
                        <Link href="/">
                            <Logo inverted={true} />
                        </Link>
                        <GrClose className={`${styles['menu-icon']} ${styles['close-icon']}`} onClick={handleToggleMenu} />
                    </div>
                    <Link href="/">
                        <li className={styles['briidge-logo-section']}>
                            <Logo />
                        </li>
                    </Link>
                    <li onClick={handleToggleMenu}>
                        <Link href="/about">
                            <a>About</a>
                        </Link>
                    </li>
                    <li onClick={handleToggleMenu}>
                        <Link href="/contactus">
                            <a>Contact</a>
                        </Link>
                    </li>
                    {user?.given_name ?
                        <li className={styles['log-in']} onClick={handleToggleMenu}>
                            <Link href="/profile">
                                <a>{user.given_name}</a>
                            </Link>
                        </li>
                        :
                        <Fragment>
                            <li className={styles['log-in']} onClick={handleToggleMenu}>
                                <a href="/api/auth/login">Log in</a>
                            </li>
                            <li className={styles['last-list-item']} onClick={handleToggleMenu}>
                                <a href="/api/auth/login">
                                    <Button className={styles['sign-up']}>
                                        Sign up
                                    </Button>
                                </a>
                            </li>
                            <li className={styles['last-list-item-mobile']} onClick={handleToggleMenu}>
                                <a href="/api/auth/login">
                                    Sign up
                                </a>
                            </li>
                        </Fragment>
                    }

                    <div className={styles['social-icons']}>
                        <GrInstagram />
                        <GrFacebook />
                        <GrTwitter />
                        <GrPinterest />
                    </div>
                </ul>
            </nav>
        </Fragment>
    )
}

export default Nav;
