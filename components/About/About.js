import { Fragment } from 'react';

import styles from './About.module.scss';

const About = () => (
    <Fragment>
        <div className={styles['golden-gate']} />
        <section className={styles['about-page-wrapper']}>
            About
        </section>
    </Fragment>
);

export default About;
