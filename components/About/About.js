import { Fragment } from 'react';

import styles from './About.module.scss';

const About = () => (
    <Fragment>
        <div className={styles['golden-gate']} />
        <section className={styles['about-page-wrapper']}>
            <h1>CONNECT WITH PURPOSE MISSION</h1>
            <p>Bridge aims to help operators and investors conveniently find, connect with, and create long-lasting business partnerships and partner on an opportunity to pursue together.</p>
            <ul>
                <li>
                    <strong>OPPORTUNITY</strong>
                </li>
                <li>
                    <strong>OPERATOR</strong>
                </li>
                <li>
                    <strong>INVESTOR</strong>
                </li>
            </ul>
            <h1>BRIDGE:</h1>
            <i>“Something that is intended to reconcile or form a connection between two things. To make (a difference between two groups) smaller or less significant”</i>
            <h1>MARKET</h1>
            <p>Data Published by Statista Research Department, Nov 4, 2020</p>
            <strong>Number of franchise establishments in the U.S. 2007-2020</strong>
            <p>- In 2019, there were 773,603 franchise establishments in the United States</p>
            <strong>Number of employees in U.S. franchise establishments 2007-2020</strong>
            <p>- In 2019, an estimated number of 8.43 million people were employed by franchise businesses.</p>
            <h3>Of those 8.43 million employees, a large majority of them would WANT to own/ operate a business, but need an investor partner to make that happen.</h3>
            <strong>Start up costs</strong>
            <p>Start up costs for a food & beverage franchise range from $100,000 - $3M</p>
            <strong>Output of franchise establishments in the U.S. by business line 2007-2020</strong>
            <p>In 2019, the output of quick service restaurant franchise establishments was estimated at almost 268 billion U.S. dollars.</p>
            <strong>Franchising in the U.S.</strong>
            <p>Franchises are available through different types of establishments. However, the franchise industry is most commonly known for its fast food sector. 30 percent of those interested in opening a franchise in the United States indicated that they are most interested in opening a quick service fast food franchise.</p>
            <h1>BENEFITS</h1>
            <h2>FOR OPERATORS</h2>
            <p>Provide an opportunity to be a business owner</p>
            <p>Provide a convenient place for operators to connect with investors Require investors to be accredited</p>
            <p>Provide coaching, support, and guidance on marketing and presenting themselves and their skills to investors</p>
            <p>Work with a business/life coach</p>
            <p>Provide book recommendations and other development opportunities Earn badges/certifications that can be added to their profile to help them standout to potential investor partners</p>
            <h2>FOR INVESTORS</h2>
            <p>Provide a hands-off business ownership/investment opportunity to investors Provide a convenient place for investors to find operator partners</p>
            <p>Provide multiple opportunities for investors to invest in</p>
            <h2>FOR FRANCHISORS / FRANCHISEES</h2>
            <p>An additional avenue for franchise sales for a franchisor. Most franchisors are unable to capture these opportunities currently</p>
            <p>A Career Path for All Employees:</p>
            <p>One of the most important drivers for employee engagement and retaining talent is by having a clearly defined Career Path</p>
            <p>Franchisees, through BRIDGE, can provide a path for all employees that leads to them eventually owning their own franchise. This is not an option for a lot of young employees on their own. BRIDGE will help these operators form a relationship and partner with experienced investors.</p>
            <h2>FOR VENDORS, BROKERS, SUPPLIERS</h2>
            <p>Establish a network of business owners and partners and a marketplace for them to offer and provide their services</p>
            <p>Provide multiple franchise opportunities for them to choose from</p>
        </section>
    </Fragment>
);

export default About;
