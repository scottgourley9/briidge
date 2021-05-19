import Link from 'next/link';
import { GiArchBridge } from 'react-icons/gi';
import { GiCableStayedBridge } from 'react-icons/gi';
import { GiSuspensionBridge } from 'react-icons/gi';
import { GiTowerBridge } from 'react-icons/gi';

import styles from './HowItWorks.module.scss';

const HowItWorks = () => (
    <section className={styles['how-it-works-page-wrapper']}>
        <h1 className={styles['main-title']}>How It Works</h1>
        <div className={styles['user-type-boxes']}>
            <div className={styles['left-boxes']}>
                <Link href="/operatorsInfo">
                    <a className={styles['user-type-box']}>
                        Operators
                        <GiArchBridge />
                    </a>
                </Link>
                <Link href="/investorsInfo">
                    <a className={styles['user-type-box']}>
                        Investors
                        <GiCableStayedBridge />
                    </a>
                </Link>
            </div>
            <div className={styles['right-boxes']}>
                <Link href="/brandsInfo">
                    <a className={styles['user-type-box']}>
                        Brands
                        <GiSuspensionBridge />
                    </a>
                </Link>
                <Link href="/vendorsInfo">
                    <a className={styles['user-type-box']}>
                        Vendors/Brokers
                        <GiTowerBridge />
                    </a>
                </Link>
            </div>
        </div>
    </section>
);

export default HowItWorks;
