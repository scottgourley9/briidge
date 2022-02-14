import { Fragment } from 'react';
import Link from 'next/link';

import Button from '../Common/Button';

import styles from './About.module.scss';

const About = () => (
    <section className={styles['about-page-wrapper']}>
        <div className={`${styles['point-one']} ${styles.point}`.trim()}>
            <div className={styles.banner}>
                Opening the Door to Franchise Ownership
            </div>
        </div>
        <h4 className={styles.subtitle}>
            Briidge is the community that connects operators & investors, opening the door to franchise ownership.
        </h4>
        <img className={styles['point-two-img']} alt="two men talking" src="./two-men.jpg" />
        <div className={`${styles['point-two']} ${styles.point}`.trim()}>
            <h3>Why Briidge?</h3>
            <p>In order to successfully become a franchise owner you need 3 things: Capital, Knowledge, Hustle. If you don’t have either of these pieces you need to find them or partner with someone who has them. Most common is lacking capital or lacking an operating partner. We want to help briidge the gap between those two groups.</p>
            <Link href="/profile">
                <Button size="sm" selected={true}>See How</Button>
            </Link>
        </div>
        <div className={`${styles.row} ${styles['row-reverse']}`.trim()}>
            <img className={styles['point-three-img']} alt="two men talking" src="./phone-point.jpg" />
            <div className={`${styles['point-three']} ${styles.point}`.trim()}>
                <h3>Our Mission</h3>
                <p> We aim to Briidge the gap and help you CONNECT WITH PURPOSE. We will simplify the process and minimize the amount of time and effort it takes for you to find a partner.</p>
                <Link href="/profile">
                    <Button size="sm" selected={true}>Learn More</Button>
                </Link>
            </div>
        </div>
        <div className={styles.row}>
            <img className={styles['point-four-img']} alt="two men talking" src="./hand-shake.jpg" />
            <div className={`${styles['point-four']} ${styles.point}`.trim()}>
                <h3>Future Projects</h3>
                <p>We aim to be the all-in-one platform for franchise ownership. We will become that by adding educational and support features to help you with all of the following:</p>
                <ul>
                    <li>Entity structure and operating agreements.</li>
                    <li>Not only finding a partner, but also finding vendors, brokers, and franchise opportunities.</li>
                    <li>Finding your franchise location, getting the doors open, and helping you be successful.</li>
                </ul>
                <Link href="/profile">
                    <Button size="sm" selected={true}>Join Our Community</Button>
                </Link>
            </div>
        </div>
    </section>
);

export default About;
