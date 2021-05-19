import Link from 'next/link'
import { GrUp } from 'react-icons/gr';

import styles from './HowItWorks.module.scss';

const Operators = () => {
    return (
        <section className={`${styles['operators-wrapper']} ${styles['page-wrapper']}`}>
            <Link href="howItWorks">
                <a className={styles['go-back']}>
                    <GrUp />
                </a>
            </Link>
            <h2 className={styles['main-title']}>Operators</h2>
            <h3>How We Can Help</h3>
            <p>Provide an opportunity to be a business owner</p>
            <p>Provide a convenient place for operators to connect with investors Require investors to be accredited</p>
            <p>Provide coaching, support, and guidance on marketing and presenting themselves and their skills to investors</p>
            <p>Work with a business/life coach</p>
            <p>Provide book recommendations and other development opportunities Earn badges/certifications that can be added to their profile to help them standout to potential investor partners</p>
            <h2>Frequently Asked Questions</h2>
            <p>Q) What is briidge?</p>
            <p>A) briidge is a social marketplace that helps operators, aspiring business owners, and future franchisees to conveniently connect with investors and create successful partnerships. It’s more than just a social network. It’s a place to connect with the goal of forming a partnership and becoming your own boss. Our mission statement is simple: CONNECT WITH PURPOSE.</p>
            <p>A) Having worked with several food and beverage franchise brands (Jimmy John’s, Crumbl Cookies, Cupbop Korean BBQ, Spilled Milk Ice Cream & Cereal Bar) we have seen first-hand the challenge of putting all of the right pieces together to successfully become a franchise owner, the two biggest pieces being, (1) a great hands-on operator and, (2) the capital investment to actually get the doors open. We realized that there wasn’t a place to find all of the missing pieces. So we’re helping you briidge the gap.</p>

            <p>Q) How does it work for operators?</p>
            <p>A) briidge allows operators and investors to conveniently connect through the social marketplace. Operators can search for investors and filter their search criteria by franchise brand, location, investor experience, and several other factors. This allows the operator to start the conversation with the perfect candidates for their investor partners.</p>
            <p>Q) How do I structure the partnership?</p>
            <p>A) The beauty of briidge is that it allows you and your partner to structure the partnership however it makes the most sense for you. Each situation is going to be different so you have the flexibility to find what works for you. We will help guide you through starting the conversation and through any negotiations if you request it.</p>

            <p>Q) Why did you choose the name briidge?</p>
            <p>A) Becoming a business or franchise owner is no easy task. It takes a lot of hard work and a little bit of luck and good fortune. In our experience, we realized that there are several aspiring business and franchise owners that aren’t able to accomplish their goal because they lack certain pieces needed to make ownership a reality. Often times it was an operator that lacked the necessary capital and didn’t know someone they could go to as an investor OR it was an investor who lacked a partner that was willing to operate and handle the day-to-day management. We decided we wanted to help “bridge” that gap between operators and investors. The following definitions of a bridge really helped us decide on the name; “Something that is intended to reconcile or form a connection between two things.” & “To make (a difference between two groups) smaller or less significant.”</p>

            <p>Q) How is this different from working with a franchise broker or lender?</p>
            <p>A) Franchise broker: A franchise broker will charge you significant fees when they connect you with a franchise brand. A franchise broker is typically only working with specific clients who already have franchise experience as well as the operations and capital required to open a franchise.</p>
            <p>A) A lender, whether through the SBA or a local bank, will also charge significant fees. The other drawback to a lender is all of the hoops that you have to jump through in order to get through underwriting and be qualified for a loan - you often have to have significant amounts of cash for a down payment and will have to have real estate collateral as well in order to secure the loan.</p>

            <p>Q)How much does it cost to use briidge?</p>
            <p>A) briidge is currently FREE to operators and investors. It is free to create a profile and free to connect and find a partner to own/operate a franchise with you.</p>

            <p>Q) How do I stand out as an operator?</p>
            <p>A) Investors are looking for qualified partners who are willing to work hard and protect their investment and operate a successful business. Be authentic and be yourself. They are investing in YOU as an individual just as much as they are investing in the franchise brand.</p>
            <p>Q) What qualities do I need to be a great operator?</p>
            <p>A) You should try to highlight the following character traits and how you’ve developed those in your career (this is not a complete list):</p>
            <ul>
                <li>Honesty</li>
                <li>Integrity</li>
                <li>Enthusiasm</li>
                <li>Ambition</li>
                <li>Grit</li>
                <li>Creativity</li>
                <li>Mindfulness</li>
                <li>Persistence</li>
                <li>Empathy</li>
                <li>Happiness</li>
                <li>Leadership</li>
            </ul>
        </section>
    );
};

export default Operators;
