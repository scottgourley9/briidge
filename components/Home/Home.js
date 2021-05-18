import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import Slider from "react-slick";
import { GrUp } from 'react-icons/gr';

import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";

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
    const [marketingMarker8, marketingMarkerInView8] = useInView({ threshold: 1, triggerOnce: true });

    const NextArrow = props => {
        const { className, style, onClick } = props;

        return (
            <div
                className={`${styles['next-button-container']} ${styles['slick-button']}`}
                onClick={onClick}
            >
                <GrUp />
            </div>
        )
    }

    const PrevArrow = props => {
        const { className, style, onClick } = props;

        return (
            <div
                className={`${styles['prev-button-container']} ${styles['slick-button']}`}
                onClick={onClick}
            >
                <GrUp />
            </div>
        )
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <section className={styles['home-page-wrapper']}>
            <div className={styles['cover-image-section']}>
                <div className={styles['call-to-action-box']}>
                    <h1>Connect With Purpose</h1>
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
            <h3 id="purposeStart" className={styles['marketing-for-title']}>We&apos;re more than a social networking site - we are a marketplace for</h3>
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
            <div ref={marketingMarker8} />
            <div className={`${styles['slider-container']} ${marketingMarkerInView8 ? styles['fade-in-up'] : ''}`}>
                <Slider {...settings}>
                    <div className={styles['slider-slide']}>
                        <div className={styles['call-to-action-box']}>
                            <h1>Vendors</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed orci erat, commodo nec lacus nec, tristique tempus enim. Donec arcu tortor, eleifend vel lacus sit amet, iaculis consectetur nibh. Mauris.</p>
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
                        <div className={styles['image-container']}>
                            <Image
                                src="/two-men.jpg"
                                layout="fill"
                                quality={10}
                            />
                        </div>
                    </div>
                    <div className={styles['slider-slide']}>
                        <div className={styles['call-to-action-box']}>
                            <h1>Brokers</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed orci erat, commodo nec lacus nec, tristique tempus enim. Donec arcu tortor, eleifend vel lacus sit amet, iaculis consectetur nibh. Mauris.</p>
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
                        <div className={styles['image-container']}>
                            <Image
                                src="/phone-point.jpg"
                                layout="fill"
                                quality={10}
                            />
                        </div>
                    </div>
                    <div className={styles['slider-slide']}>
                        <div className={styles['call-to-action-box']}>
                            <h1>Suppliers</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed orci erat, commodo nec lacus nec, tristique tempus enim. Donec arcu tortor, eleifend vel lacus sit amet, iaculis consectetur nibh. Mauris.</p>
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
                        <div className={styles['image-container']}>
                            <Image
                                src="/graphs.jpg"
                                layout="fill"
                                quality={10}
                            />
                        </div>
                    </div>
                    <div className={styles['slider-slide']}>
                        <div className={styles['call-to-action-box']}>
                            <h1>Agents</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed orci erat, commodo nec lacus nec, tristique tempus enim. Donec arcu tortor, eleifend vel lacus sit amet, iaculis consectetur nibh. Mauris.</p>
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
                        <div className={styles['image-container']}>
                            <Image
                                src="/hand-shake.jpg"
                                layout="fill"
                                quality={10}
                            />
                        </div>
                    </div>
                </Slider>
            </div>
            <div className={styles['big-red-box-section']}>
                <div className={styles.holes}>
                    <div ref={marketingMarker4} className={`${styles['bridge-hole']} ${marketingMarkerInView4 ? styles['fade-in-up'] : ''}`}>Met, consectetur adipiscing elit. Sed orci erat, commodo nec lacus nec, tris dcksjndc I bcbjhsd</div>
                    <div ref={marketingMarker5} className={`${styles['bridge-hole']} ${marketingMarkerInView5 ? styles['fade-in-up'] : ''}`}>Onsectetur adipiscing elit. Sed orci erat, commodo nec lacus nec, tri met, consectetur adipiscing elit. Sed orci erat, commodo nec lacus nec, tris</div>
                </div>
                <div className={styles['call-to-action-box']}>
                    <h1>Why briidge?</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed orci erat, commodo nec lacus nec, tristique tempus enim. Donec arcu tortor. Commodo nec lacus nec, tristique tempus enim. Donec arcu tortor, eleifend vel lacus sit amet, iaculis consectetur nibh. Mauris.
                    </p>
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
                <div className={styles.holes}>
                    <div ref={marketingMarker6} className={`${styles['bridge-hole']} ${marketingMarkerInView6 ? styles['fade-in-up'] : ''}`}>Donsectetur adipiscing elit. Sed orci erat, commodo nec lacus nec, tris</div>
                    <div ref={marketingMarker7} className={`${styles['bridge-hole']} ${marketingMarkerInView7 ? styles['fade-in-up'] : ''}`}>Ectetur adipiscing elit. Sed orci erat, commodo nec lacus nec, tris kdjn I commodo nec lacus nec, tris</div>
                </div>
            </div>
            <h3 className={styles['marketing-for-title']}>Follow @briidge</h3>
        </section>
    )
};

export default Home;
