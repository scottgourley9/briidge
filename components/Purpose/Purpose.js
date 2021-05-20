import { Fragment, useEffect } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { GiArchBridge } from 'react-icons/gi';
import { GiCableStayedBridge } from 'react-icons/gi';
import { GiSuspensionBridge } from 'react-icons/gi';
import { GiTowerBridge } from 'react-icons/gi';

import styles from './Purpose.module.scss';

const Purpose = () => {

    const [imgsRef, imgsRefInView] = useInView({ threshold: 0.75, triggerOnce: false });
    const [boxRef1, boxRef1InView] = useInView({ threshold: 0.75, triggerOnce: true });
    const [boxRef2, boxRef2InView] = useInView({ threshold: 0.75, triggerOnce: true });
    const [boxRef3, boxRef3InView] = useInView({ threshold: 0.75, triggerOnce: true });
    const [boxRef4, boxRef4InView] = useInView({ threshold: 0.75, triggerOnce: true });
    const [boxRef5, boxRef5InView] = useInView({ threshold: 0.75, triggerOnce: true });
    const [boxRef6, boxRef6InView] = useInView({ threshold: 0.75, triggerOnce: true });
    const [boxRef7, boxRef7InView] = useInView({ threshold: 0.75, triggerOnce: true });
    const [boxRef8, boxRef8InView] = useInView({ threshold: 0.75, triggerOnce: true });
    const [boxRef9, boxRef9InView] = useInView({ threshold: 0.75, triggerOnce: true });
    const [boxRef10, boxRef10InView] = useInView({ threshold: 0.75, triggerOnce: true });
    const [boxRef11, boxRef11InView] = useInView({ threshold: 0.75, triggerOnce: true });

    return (
    <Fragment>
        <section className={styles['purpose-page-wrapper']}>
            <h1 className={styles['main-title']}>Connect With Purpose Mission</h1>
            <div ref={imgsRef} />
            <div className={styles.hands}>
                <p ref={boxRef1} className={`${styles['aims-to']} ${styles['messaging-box']} ${boxRef1InView ? styles.bubble : ''}`}>Bridge aims to help operators and investors conveniently find, connect with, and create long-lasting business partnerships and partner on an opportunity to pursue together.</p>
                <div className={`${styles['img-container']} ${imgsRefInView ? styles['slide-in-left'] : ''}`}>
                    <Image
                        src="/HandLeft.png"
                        layout="fill"
                        quality={30}
                    />
                </div>
                <div className={`${styles['img-container']} ${imgsRefInView ? styles['slide-in-right'] : ''}`}>
                    <Image
                        src="/HandRight.png"
                        layout="fill"
                        quality={30}
                    />
                </div>
                <h1>Bridge</h1>
                <p ref={boxRef2} className={`${styles['bridge-def']} ${styles['messaging-box']} ${boxRef2InView ? styles.bubble : ''}`}>“Something that is intended to reconcile or form a connection between two things. To make (a difference between two groups) smaller or less significant”</p>
            </div>
            <div className={styles['user-type-box']}>
                Market
                <GiArchBridge />
            </div>
            <div className={styles['box-section']}>
                <div className={`${styles['messaging-box']} ${boxRef4InView ? styles.bubble : ''}`}>
                    <p ref={boxRef4}>Data Published by Statista Research Department, Nov 4, 2020</p>
                    <p>Number of franchise establishments in the U.S. 2007-2020</p>
                    <p>- In 2019, there were 773,603 franchise establishments in the United States</p>
                    <p>Number of employees in U.S. franchise establishments 2007-2020</p>
                    <p>- In 2019, an estimated number of 8.43 million people were employed by franchise businesses.</p>
                </div>
                <div className={`${styles['messaging-box']} ${boxRef5InView ? styles.bubble : ''}`}>
                    <p ref={boxRef5}>Of those 8.43 million employees, a large majority of them would WANT to own/ operate a business, but need an investor partner to make that happen.</p>
                </div>
                <div className={`${styles['messaging-box']} ${boxRef6InView ? styles.bubble : ''}`}>
                    <p ref={boxRef6}>Start up costs</p>
                    <p>Start up costs for a food & beverage franchise range from $100,000 - $3M</p>
                    <p>Output of franchise establishments in the U.S. by business line 2007-2020</p>
                    <p>In 2019, the output of quick service restaurant franchise establishments was estimated at almost 268 billion U.S. dollars.</p>
                </div>
                <div className={`${styles['messaging-box']} ${boxRef7InView ? styles.bubble : ''}`}>
                    <p ref={boxRef7}>Franchising in the U.S.</p>
                    <p>Franchises are available through different types of establishments. However, the franchise industry is most commonly known for its fast food sector. 30 percent of those interested in opening a franchise in the United States indicated that they are most interested in opening a quick service fast food franchise.</p>
                </div>
            </div>
            <div className={styles['user-type-box']}>
                Benefits For Operators
                <GiArchBridge />
            </div>
            <div className={`${styles['messaging-box']} ${boxRef8InView ? styles.bubble : ''}`}>
                <p ref={boxRef8}>Provide an opportunity to be a business owner</p>
                <p>Provide a convenient place for operators to connect with investors Require investors to be accredited</p>
                <p>Provide coaching, support, and guidance on marketing and presenting themselves and their skills to investors</p>
                <p>Work with a business/life coach</p>
                <p>Provide book recommendations and other development opportunities Earn badges/certifications that can be added to their profile to help them standout to potential investor partners</p>
            </div>
            <div className={styles['user-type-box']}>
                Benefits For Investors
                <GiCableStayedBridge />
            </div>
            <div className={`${styles['messaging-box']} ${boxRef9InView ? styles.bubble : ''}`}>
                <p ref={boxRef9}>Provide a hands-off business ownership/investment opportunity to investors Provide a convenient place for investors to find operator partners</p>
                <p>Provide multiple opportunities for investors to invest in</p>
            </div>
            <div className={styles['user-type-box']}>
                Benefits For Franchisors & Franchisees
                <GiSuspensionBridge />
            </div>
            <div className={`${styles['messaging-box']} ${boxRef10InView ? styles.bubble : ''}`}>
                <p ref={boxRef10}>An additional avenue for franchise sales for a franchisor. Most franchisors are unable to capture these opportunities currently</p>
                <p>A Career Path for All Employees:</p>
                <p>One of the most important drivers for employee engagement and retaining talent is by having a clearly defined Career Path</p>
                <p>Franchisees, through BRIDGE, can provide a path for all employees that leads to them eventually owning their own franchise. This is not an option for a lot of young employees on their own. BRIDGE will help these operators form a relationship and partner with experienced investors.</p>
            </div>
            <div className={styles['user-type-box']}>
                Benefits For Vendors & Brokers & Suppliers
                <GiTowerBridge />
            </div>
            <div ref={boxRef11} className={`${styles['messaging-box']} ${boxRef11InView ? styles.bubble : ''}`}>
                <p>Establish a network of business owners and partners and a marketplace for them to offer and provide their services</p>
                <p>Provide multiple franchise opportunities for them to choose from</p>
            </div>
        </section>
    </Fragment>
);
}

export default Purpose;
