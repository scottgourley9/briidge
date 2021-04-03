import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

import { Button } from '../shared/Button/Button';

import styles from './Home.module.scss';

const Home = () => {
    const [marketingMarker1, marketingMarkerInView1] = useInView({ threshold: 1, triggerOnce: true });
    const [marketingMarker2, marketingMarkerInView2] = useInView({ threshold: 1, triggerOnce: true });
    const [marketingMarker3, marketingMarkerInView3] = useInView({ threshold: 1, triggerOnce: true });
    const [marketingMarker4, marketingMarkerInView4] = useInView({ threshold: 1, triggerOnce: true });
    const [marketingMarker5, marketingMarkerInView5] = useInView({ threshold: 1, triggerOnce: true });
    const [marketingMarker6, marketingMarkerInView6] = useInView({ threshold: 1, triggerOnce: true });
    const [marketingMarker7, marketingMarkerInView7] = useInView({ threshold: 1, triggerOnce: true });

    return (
        <section className={styles['home-page-wrapper']}>
            <div className={styles['cover-image-section']}>
                <div className={styles['call-to-action-box']}>
                    <h1>Bridge The Gap</h1>
                    <p>We'll help you find your missing piece so you can franchise the business you want.</p>
                    <div className={styles.buttons}>
                        <Link href="/formInvestor">
                            <Button>
                                Find an Investor
                            </Button>
                        </Link>
                        <Link href="/formOperator">
                            <Button btnType="secondary">
                                Find an Operator
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <h2 className={styles['connect-with-purpose']}>Connect with Purpose</h2>
            <h3 className={styles['marketing-for-title']}>We&apos;re more than a social networking site - we are a marketplace for</h3>
            <div className={styles['marketing-for-section']}>
                <div ref={marketingMarker1} />
                <div className={`${styles['marketing-for-tile']} ${marketingMarkerInView1 ? styles['fade-in-up'] : ''}`}>
                    <div className={`${styles['marketing-for']} ${styles['green-section']}`}>
                        <div className={`${styles.tag} ${styles['tag-middle']}`}>
                            Operating Partners
                        </div>
                        <div className={styles['marketing-for-img-container']}>
                            <Image
                                src="/phoneImg1.png"
                                layout="fill"
                                quality={10}
                            />
                        </div>
                    </div>
                    <p className={styles.explaination}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eleifend vulputate blandit. Suspendisse scelerisque mi ac lectus finibus, non pretium libero pulvinar. Sed molestie at nibh.
                    </p>
                    <Link href="/formOperator">
                        <Button>
                            Learn More
                        </Button>
                    </Link>
                </div>
                <div ref={marketingMarker2} />
                <div className={`${styles['marketing-for-tile']} ${marketingMarkerInView2 ? styles['fade-in-up'] : ''}`}>
                    <div className={`${styles['marketing-for']} ${styles['orange-section']}`}>
                        <div className={`${styles.tag} ${styles['tag-bottom']}`}>
                            Investment Partners
                        </div>
                        <div className={styles['marketing-for-img-container']}>
                            <Image
                                src="/phoneImg2.png"
                                layout="fill"
                                quality={10}
                            />
                        </div>
                    </div>
                    <p className={styles.explaination}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat molestie tincidunt. Ut arcu orci, aliquam ultricies tincidunt sit amet, consectetur et augue. Donec sed ligula libero. Sed semper ex.
                    </p>
                    <Link href="/formInvestor">
                        <Button>
                            Learn More
                        </Button>
                    </Link>
                </div>
                <div ref={marketingMarker3} />
                <div className={`${styles['marketing-for-tile']} ${marketingMarkerInView3 ? styles['fade-in-up'] : ''}`}>
                    <div className={`${styles['marketing-for']} ${styles['blue-section']}`}>
                        <div className={`${styles.tag} ${styles['tag-top']}`}>
                            Brand Partners
                        </div>
                        <div className={styles['marketing-for-img-container']}>
                            <Image
                                src="/phoneImg3.png"
                                layout="fill"
                                quality={10}
                            />
                        </div>
                    </div>
                    <p className={styles.explaination}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed orci erat, commodo nec lacus nec, tristique tempus enim. Donec arcu tortor, eleifend vel lacus sit amet, iaculis consectetur nibh. Mauris.
                    </p>
                    <Link href="/formInvestor">
                        <Button>
                            Learn More
                        </Button>
                    </Link>
                </div>
            </div>
            <h3 className={styles['marketing-for-title']}>As well as for</h3>
            <div className={styles['also-for-section']}>
                <div ref={marketingMarker4} />
                <div className={`${styles['also-for-tile']} ${styles['also-for-tile-left']} ${marketingMarkerInView4 ? styles['fade-in-up'] : ''}`}>
                    <div className={styles['image-container']}>
                        <Image
                            src="/two-men.jpg"
                            layout="fill"
                            quality={10}
                        />
                    </div>
                    <div className={styles['info-box']}>
                        <div className={styles['title-box']}>
                            Vendor
                        </div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed orci erat, commodo nec lacus nec, tristique tempus enim. Donec arcu tortor, eleifend vel lacus sit amet, iaculis consectetur nibh. Mauris.
                    </div>
                </div>
                <div ref={marketingMarker5} />
                <div className={`${styles['also-for-tile']} ${styles['also-for-tile-right']} ${marketingMarkerInView5 ? styles['fade-in-up'] : ''}`}>
                    <div className={styles['image-container']}>
                        <Image
                            src="/phone-point.jpg"
                            layout="fill"
                            quality={10}
                        />
                    </div>
                    <div className={styles['info-box']}>
                        <div className={styles['title-box']}>
                            Broker
                        </div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed orci erat, commodo nec lacus nec, tristique tempus enim. Donec arcu tortor, eleifend vel lacus sit amet, iaculis consectetur nibh. Mauris.
                    </div>
                </div>
                <div ref={marketingMarker6} />
                <div className={`${styles['also-for-tile']} ${styles['also-for-tile-left']} ${marketingMarkerInView6 ? styles['fade-in-up'] : ''}`}>
                    <div className={styles['image-container']}>
                        <Image
                            src="/graphs.jpg"
                            layout="fill"
                            quality={10}
                        />
                    </div>
                    <div className={styles['info-box']}>
                        <div className={styles['title-box']}>
                            Supplier
                        </div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed orci erat, commodo nec lacus nec, tristique tempus enim. Donec arcu tortor, eleifend vel lacus sit amet, iaculis consectetur nibh. Mauris.
                    </div>
                </div>
                <div ref={marketingMarker7} />
                <div className={`${styles['also-for-tile']} ${styles['also-for-tile-right']} ${marketingMarkerInView7 ? styles['fade-in-up'] : ''}`}>
                    <div className={styles['image-container']}>
                        <Image
                            src="/hand-shake.jpg"
                            layout="fill"
                            quality={10}
                        />
                    </div>
                    <div className={styles['info-box']}>
                        <div className={styles['title-box']}>
                            Agent
                        </div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed orci erat, commodo nec lacus nec, tristique tempus enim. Donec arcu tortor, eleifend vel lacus sit amet, iaculis consectetur nibh. Mauris.
                    </div>
                </div>
            </div>
            <h2 className={styles['marketing-for-title']}>Who we are & why we started briidge</h2>
        </section>
    )
};

export default Home;
