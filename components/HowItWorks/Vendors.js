import Link from 'next/link'
import { GrUp } from 'react-icons/gr';

import styles from './HowItWorks.module.scss';

const Vendors = () => {
    return (
        <section className={`${styles['vendors-wrapper']} ${styles['page-wrapper']}`}>
            <Link href="howItWorks">
                <a className={styles['go-back']}>
                    <GrUp />
                </a>
            </Link>
            <h2 className={styles['main-title']}>Vendors & Brokers</h2>
            <h3>How We Can Help</h3>
            <p>Establish a network of business owners and partners and a marketplace for them to offer and provide their services</p>
            <p>Provide multiple franchise opportunities for them to choose from</p>
            <h2>Frequently Asked Questions</h2>

            <p>Q) What is briidge?</p>
            <p>A) briidge is a social marketplace that helps operators, aspiring business owners, and future franchisees to conveniently connect with investors and create successful partnerships. It’s more than just a social network. It’s a place to connect with the goal of forming a partnership and becoming your own boss. Our mission statement is simple: CONNECT WITH PURPOSE.</p>
            <p>A) Having worked with several food and beverage franchise brands (Jimmy John’s, Crumbl Cookies, Cupbop Korean BBQ, Spilled Milk Ice Cream & Cereal Bar) we have seen first-hand the challenge of putting all of the right pieces together to successfully become a franchise owner, the two biggest pieces being, (1) a great hands-on operator and, (2) the capital investment to actually get the doors open. We realized that there wasn’t a place to find all of the missing pieces. So we’re helping you briidge the gap.</p>

            <p>Q) How does it work for me as a vendor/broker?</p>
            <p>A) briidge is a social marketplace that helps operators, aspiring business owners, and future franchisees to conveniently connect with investors and create successful partnerships. These partnerships will be the future franchisees for a wide variety of brands and they will need to have relationships with vendors and brokers. Likewise, several franchise brands will be a part of this marketplace providing you a great opportunity to market your products or services to franchisees and franchisors alike.</p>

            <p>Q) Why did you choose the name briidge?</p>
            <p>A) Becoming a business or franchise owner is no easy task. It takes a lot of hard work and a little bit of luck and good fortune. In our experience, we realized that there are several aspiring business and franchise owners that aren’t able to accomplish their goal because they lack certain pieces needed to make ownership a reality. Often times it was an operator that lacked the necessary capital and didn’t know someone they could go to as an investor OR it was an investor who lacked a partner that was willing to operate and handle the day-to-day management. We decided we wanted to help “bridge” that gap between operators and investors. The following definitions of a bridge really helped us decide on the name; “Something that is intended to reconcile or form a connection between two things.” & “To make (a difference between two groups) smaller or less significant.”</p>

            <p>Q) How much does it cost to use briidge?</p>
            <p>A) briidge is currently FREE to operators and investors. It is also free for franchise brands to create a profile and market to all users on the platform - brands will pay a commission when they get applicants from the briidge platform. Vendors/brokers will be charged a monthly subscription in order to create a profile on the platform and market their services.</p>
        </section>
    );
};

export default Vendors;
