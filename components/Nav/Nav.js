import { Fragment, useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GrMenu } from 'react-icons/gr';
import { GrClose } from 'react-icons/gr';
import { GrInstagram } from 'react-icons/gr';
import { GrFacebook } from 'react-icons/gr';
import { GrTwitter } from 'react-icons/gr';
import { GrPinterest } from 'react-icons/gr';

import { disableBackgroundScroll } from '../../helpers/disableBackgroundScroll';

import Logo from '../Logo/Logo';
import Button from '../Common/Button';

import styles from './Nav.module.scss';
import animate from '../../styles/animate.module.css';

const Nav = ({ user }) => {
    const navRef = useRef();
    const [showing, toggleMenu] = useState(false);
    const [notAtTop, toggleNotAtTop] = useState(false);
    const [mounted, updateMounted] = useState(false);
    const [scrollingUp, updateScrollingUp] = useState(false);
    const [scrolledPastHeader, updateScrolledPastHeader] = useState(false);
    const [setFixed, updateSetFixed] = useState(false);

    const router = useRouter();

    const handleOnScroll = () => {
        if (window.pageYOffset > 0) {
            toggleNotAtTop(true);
        } else if (notAtTop) {
            toggleNotAtTop(false);
            updateScrolledPastHeader(false);
            updateSetFixed(false);
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
            } else {
                updateScrollingUp(true);
            }
            if (scrollTop > navHeight) {
                updateScrolledPastHeader(true);
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
    }, []);

    useEffect(() => {
        window.onscroll = handleOnScroll;
    }, [notAtTop]);

    useEffect(() => {
        if (notAtTop && scrollingUp && scrolledPastHeader) {
            updateSetFixed(true);
        }
    }, [notAtTop, scrollingUp, scrolledPastHeader])

    const handleToggleMenu = () => {
        if (window.innerWidth <= 767) {
            toggleMenu(!showing);
            if (!showing) {
                disableBackgroundScroll(true);
            } else {
                disableBackgroundScroll(false);
            }
        }
    }

    const showNav = notAtTop && scrollingUp && scrolledPastHeader;
    const hideNav = notAtTop && !scrollingUp && scrolledPastHeader;

    return (
        <Fragment>
            <div onClick={handleToggleMenu} className={`${styles['nav-overlay']} ${showing ? styles['nav-overlay-showing'] : ''}`.trim()}/>
            <nav ref={navRef} className={`${styles['nav-wrapper']} ${setFixed ? styles['nav-fixed'] : ''} ${hideNav ? styles['nav-up'] : ''} ${showNav ? styles['nav-down'] : ''}`.trim()}>
                <div className={`${styles['logo-and-ham']} ${showNav ? styles['show-shadow'] : ''}`.trim()}>
                    <Logo />
                    <div onClick={handleToggleMenu} className={styles['menu-icon']}>
                        <span>Menu</span><GrMenu />
                    </div>
                </div>
                <ul className={`${styles['nav-list-wrapper']} ${showing ? styles.showing : ''} ${mounted ? styles['display-it'] : ''} ${showNav ? styles['nav-show-shadow'] : ''}`.trim()}>
                    <div onClick={handleToggleMenu} className={`${styles['logo-and-close']} ${showNav ? styles['show-shadow'] : ''}`.trim()}>
                        <Logo inverted={true} />
                        <GrClose className={styles['close-icon']} onClick={handleToggleMenu} />
                    </div>
                    <li className={styles['briidge-logo-section']}>
                        <Logo />
                    </li>
                    {user && user?.registered &&
                        <Fragment>
                            <li onClick={handleToggleMenu} className={router?.pathname === '/operators' ? styles['on-page'] : ''}>
                                <Link href="/operators">
                                    <a>Operators</a>
                                </Link>
                            </li>
                            <li onClick={handleToggleMenu} className={router?.pathname === '/investors' ? styles['on-page'] : ''}>
                                <Link href="/investors">
                                    <a>Investors</a>
                                </Link>
                            </li>
                        </Fragment>
                    }
                    <li onClick={handleToggleMenu} className={router?.pathname === '/faq' ? styles['on-page'] : ''}>
                        <Link href="/faq">
                            <a>FAQ</a>
                        </Link>
                    </li>
                    <li onClick={handleToggleMenu} className={router?.pathname === '/about' ? styles['on-page'] : ''}>
                        <Link href="/about">
                            <a>About</a>
                        </Link>
                    </li>
                    <li onClick={handleToggleMenu} className={router?.pathname === '/contactus' ? styles['on-page'] : ''}>
                        <Link href="/contactus">
                            <a>Contact</a>
                        </Link>
                    </li>
                    {user ?
                        <li onClick={handleToggleMenu} className={`${styles['log-in']} ${router?.pathname === '/profile' ? styles['on-page'] : ''}`}>
                            <Link href="/profile">
                                <a>{(user?.has_incomplete_investors || user?.has_incomplete_operators) && <div className={styles['complete-profile']}>!</div>}{user?.first_name || user?.email}</a>
                            </Link>
                        </li>
                        :
                        <Fragment>
                            <li className={styles['log-in']} onClick={handleToggleMenu}>
                                <a href="/api/auth/login?returnTo=/profile">Log in</a>
                            </li>
                            <li className={styles['last-list-item']} onClick={handleToggleMenu}>
                                <a href="/api/auth/login?returnTo=/profile&screen_hint=signup">
                                    <Button
                                        size="sm"
                                        selected={true}
                                        className={styles['sign-up']}
                                    >
                                        Sign up
                                    </Button>
                                </a>
                            </li>
                            <li className={styles['last-list-item-mobile']} onClick={handleToggleMenu}>
                                <a href="/api/auth/login?returnTo=/profile&screen_hint=signup">
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
