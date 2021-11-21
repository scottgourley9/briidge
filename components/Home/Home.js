import Link from 'next/link';
import Image from 'next/image';

import { Button } from '../shared/Button/Button';
import UserCard from './UserCard';
import Connecting from '../SVG/Connecting';
import LineUp from '../SVG/LineUp';
import X from '../SVG/X';
import Circle from '../SVG/Circle';
import Square from '../SVG/Square';
import Hexagon from '../SVG/Hexagon';

import { getFakeUserData } from './fakeUserData';

import styles from './Home.module.scss';

const Home = () => {
    const fakeUserData = getFakeUserData();

    return (
        <section className={styles['home-page-wrapper']}>
            <div className={styles['top-section']}>
                <div className={styles.left}>
                    <Connecting />
                    <div className={styles.push}>
                        <h2 className={styles.title}>FRANCHISE OPERATORS & INVESTORS</h2>
                        <p className={styles.subtitle}>Opening the door to franchise ownership.</p>
                        <Button>
                            View Opportunities
                        </Button>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles['top-image']}>
                        <Image
                            src="/mancoffee.png"
                            width={500}
                            height={500}
                            quality={75}
                        />
                        <LineUp />
                    </div>
                </div>
            </div>
            <div className={styles['connect-with-purpose']}>
                <h2 className={styles.title}>CONNECT WITH PURPOSE</h2>
                <p className={styles.subtitle}>Operators and investors can connect with the single purpose of partnering together to own a franchise.</p>
            </div>
            <div className={styles['user-cards']}>
                {fakeUserData.map((user, i) => {
                    return <UserCard key={i} user={user} />
                })}
            </div>
            <Button className={styles['join-now']}>
                Join Now to See More
            </Button>
            <div className={styles['the-easy-way-section']}>
                <div className={styles.left}>
                    <h2 className={styles.title}>THE EASY WAY TO PARTNER</h2>
                    <p className={styles.subtitle}>Learn about franchise opportunities. Search brands, locations or investment amounts. Find the best fit for your goals.</p>
                </div>
                <div className={styles.right}>
                    <Image
                        src="/womanoncomputer.png"
                        height={554}
                        width={619}
                    />
                </div>
            </div>
            <div className={styles['ways-to-do-section']}>
                <div className={styles.way}>
                    <h3 className={styles.subtitle}>
                        The <span className={styles['colored-blue']}>EASY</span> way to find a partner and financing
                    </h3>
                    <ul className={styles.numbered}>
                        <li><div className={styles.marker}>1)</div><span>Create a profile on Briidge</span></li>
                        <li><div className={styles.marker}>2)</div><span>Search for an operator or investor</span></li>
                        <li><div className={styles.marker}>3)</div><span>Connect, partner and realize the dream of franchise ownership</span></li>
                    </ul>
                </div>
                <div className={styles.way}>
                    <h3 className={styles.subtitle}>
                        The <span className={styles['colored-orange']}>HARD</span> way to find a partner
                    </h3>
                    <ul className={styles['x-ed']}>
                        <li><X /><span>Spend months building a network of potential partners.</span></li>
                        <li><X /><span>Have endless meetings and phone calls to determine if there’s a good fit.</span></li>
                        <li><X /><span>Negotiate back and forth.</span></li>
                        <li><X /><span>Ask all of your old high school friends</span></li>
                        <li><X /><span>Get set up by your mom (when does that ever work?)</span></li>
                    </ul>
                </div>
                <div className={styles.way}>
                    <h3 className={styles.subtitle}>
                        The <span className={styles['colored-orange']}>HARD</span> way to secure financing
                    </h3>
                    <ul className={styles['x-ed']}>
                        <li><X /><span>Go through months of underwriting and jump through the endless hoops of the SBA loan process only to realize you don’t qualify or you’d have to collateralize your home and put up 50% of the capital.</span></li>
                        <li><X /><span>Work through your local bank or any broker and realize the same thing</span></li>
                    </ul>
                </div>
            </div>
            <div className={styles['what-we-do']}>
                <h2 className={styles.title}>BRIIDGE CONNECTS THE INVESTORS AND OPERATORS</h2>
            </div>
            <div className={styles.who}>
                <div className={styles['who-card']}>
                    <div className={styles.symbol}>
                        <Circle />
                    </div>
                    <h3 className={styles.title}>
                        Investor
                    </h3>
                    <p className={styles.details}>
                        Investors are looking for new opportunities for their money.
                    </p>
                    <p className={styles.details}>
                        They need a great operating partner to successfully handle the day-to-day management and take accountability for the operations.
                    </p>
                </div>
                <div className={styles['who-card']}>
                    <div className={styles.symbol}>
                        <Square />
                    </div>
                    <h3 className={styles.title}>
                        Operator
                    </h3>
                    <p className={styles.details}>
                        Aspiring business owners/operators have very limited options for financing. A private capital partner provides a new, alternative option to financing your franchise.
                    </p>
                </div>
                <div className={styles['who-card']}>
                    <div className={styles.symbol}>
                        <Hexagon />
                    </div>
                    <h3 className={styles.title}>
                        Franchisor
                    </h3>
                    <p className={styles.details}>
                        Franchisors are always looking to grow and expand their brand.
                    </p>
                    <p className={styles.details}>
                        Briidge connects the operators and investors, opening the door for both franchisor and franchisee.
                    </p>
                </div>
            </div>
            <Button className={styles['opportunities-now']}>
                View Opportunities Now
            </Button>
        </section>
    )
};

export default Home;
