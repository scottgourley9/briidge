import Link from 'next/link'
import { GrUp } from 'react-icons/gr';

import styles from './HowItWorks.module.scss';

const Investors = () => {
    return (
        <section className={`${styles['investors-wrapper']} ${styles['page-wrapper']}`}>
            <Link href="howItWorks">
                <a className={styles['go-back']}>
                    <GrUp />
                </a>
            </Link>
            <h2 className={styles['main-title']}>Investors</h2>
            <h3>How We Can Help</h3>
            <p>Provide a hands-off business ownership/investment opportunity to investors Provide a convenient place for investors to find operator partners</p>
            <p>Provide multiple opportunities for investors to invest in</p>
            <h2>Frequently Asked Questions</h2>
            <p>Q) What is briidge?</p>
            <p>A) briidge is a social marketplace that helps operators, aspiring business owners, and future franchisees to conveniently connect with investors and create successful partnerships. It’s more than just a social network. It’s a place to connect with the goal of forming a partnership and becoming your own boss. Our mission statement is simple: CONNECT WITH PURPOSE.</p>
            <p>A) Having worked with several food and beverage franchise brands (Jimmy John’s, Crumbl Cookies, Cupbop Korean BBQ, Spilled Milk Ice Cream & Cereal Bar) we have seen first-hand the challenge of putting all of the right pieces together to successfully become a franchise owner, the two biggest pieces being, (1) a great hands-on operator and, (2) the capital investment to actually get the doors open. We realized that there wasn’t a place to find all of the missing pieces. So we’re helping you briidge the gap.</p>

            <p>Q) How does it work for operators?</p>
            <p>A) briidge allows investors and operators to conveniently connect through the social marketplace. Investors can search for operators and filter their search criteria by franchise brand, location, willingness to re-locate, operator experience, and several other factors. This allows the investor to start the conversation with the perfect candidates for their operating partners.</p>
            <p>Q) How do I structure the partnership?</p>
            <p>A) The beauty of briidge is that it allows you and your partner to structure the partnership however it makes the most sense for you. Each situation is going to be different so you have the flexibility to find what works for you. We will help guide you through starting the conversation and through any negotiations if you request it.</p>

            <p>Q) Why did you choose the name briidge?</p>
            <p>A) Becoming a business or franchise owner is no easy task. It takes a lot of hard work and a little bit of luck and good fortune. In our experience, we realized that there are several aspiring business and franchise owners that aren’t able to accomplish their goal because they lack certain pieces needed to make ownership a reality. Often times it was an operator that lacked the necessary capital and didn’t know someone they could go to as an investor OR it was an investor who lacked a partner that was willing to operate and handle the day-to-day management. We decided we wanted to help “bridge” that gap between operators and investors. The following definitions of a bridge really helped us decide on the name; “Something that is intended to reconcile or form a connection between two things.” & “To make (a difference between two groups) smaller or less significant.”</p>

            <p>Q) How is this different from working with a franchise broker?</p>
            <p>A) Franchise broker: A franchise broker will charge you significant fees when they connect you with a franchise brand. In addition to the fees, a franchise broker is typically only wanting to work with specific clients who already have franchise experience and who already have all of the pieces put together (operator, operating plan, capital, etc.).</p>

            <p>Q) How much does it cost to use briidge?</p>
            <p>A) briidge is currently FREE to operators and investors. It is free to create a profile and free to connect and find a partner to own/operate a franchise with you.</p>

            <p>Q) How do I stand out as an investor?</p>
            <p>A) Operators are looking for qualified partners who can provide the capital needed to become a business/franchise owner. They are also interested in an investor that can truly be a partner and provide more value than just $$. Be authentic and be yourself. There are several investors who can provide the required capital. What other intangibles can you provide?</p>
            <p>Q) What qualities do I need to be a great investor?</p>
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

export default Investors;
