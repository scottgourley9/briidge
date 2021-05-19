import Link from 'next/link'
import { GrUp } from 'react-icons/gr';

import styles from './HowItWorks.module.scss';

const Brands = () => {
    return (
        <section className={`${styles['brands-wrapper']} ${styles['page-wrapper']}`}>
            <Link href="howItWorks">
                <a className={styles['go-back']}>
                    <GrUp />
                </a>
            </Link>
            <h2 className={styles['main-title']}>Brands</h2>
            <h3>How We Can Help</h3>
            <p>An additional avenue for franchise sales for a franchisor. Most franchisors are unable to capture these opportunities currently</p>
            <p>A Career Path for All Employees:</p>
            <p>One of the most important drivers for employee engagement and retaining talent is by having a clearly defined Career Path</p>
            <p>Franchisees, through BRIDGE, can provide a path for all employees that leads to them eventually owning their own franchise. This is not an option for a lot of young employees on their own. BRIDGE will help these operators form a relationship and partner with experienced investors.</p>

            <h2>Frequently Asked Questions</h2>
            <p>Q) What is briidge?</p>
            <p>A) briidge is a social marketplace that helps operators, aspiring business owners, and future franchisees to conveniently connect with investors and create successful partnerships. It’s more than just a social network. It’s a place to connect with the goal of forming a partnership and becoming your own boss. Our mission statement is simple: CONNECT WITH PURPOSE.</p>
            <p>A) Having worked with several food and beverage franchise brands (Jimmy John’s, Crumbl Cookies, Cupbop Korean BBQ, Spilled Milk Ice Cream & Cereal Bar) we have seen first-hand the challenge of putting all of the right pieces together to successfully become a franchise owner, the two biggest pieces being, (1) a great hands-on operator and, (2) the capital investment to actually get the doors open. We realized that there wasn’t a place to find all of the missing pieces. So we’re helping you briidge the gap.</p>

            <p>Q) How does it work for my brand?</p>
            <p>A) briidge will work as a channel-partner for your franchise brand. Without briidge, it is extremely likely that you are missing out on great franchise partners because they lack either the financial capital or an operating partner when they apply to become a franchisee of your brand. By partnering with briidge, we will help those individuals connect, form a partnership, and come back through your application process as a qualified applicant - thus opening another channel of sales for you. More qualified franchisees = more store locations = more royalties and brand recognition for your brand.</p>

            <p>Q) Why did you choose the name briidge?</p>
            <p>A) Becoming a business or franchise owner is no easy task. It takes a lot of hard work and a little bit of luck and good fortune. In our experience, we realized that there are several aspiring business and franchise owners that aren’t able to accomplish their goal because they lack certain pieces needed to make ownership a reality. Often times it was an operator that lacked the necessary capital and didn’t know someone they could go to as an investor OR it was an investor who lacked a partner that was willing to operate and handle the day-to-day management. We decided we wanted to help “bridge” that gap between operators and investors. The following definitions of a bridge really helped us decide on the name; “Something that is intended to reconcile or form a connection between two things.” & “To make (a difference between two groups) smaller or less significant.”</p>

            <p>Q) How is this different from working with a franchise broker?</p>
            <p>A) Franchise broker: A franchise broker will charge you significant fees before they will connect you with a qualified franchisee. Often, this means you will need to significantly increase your franchise fee so that you can pay a brokers commission - in turn making your offering less appealing to a potential franchisee. By partnering with briidge, we can help keep your initial fees and costs to a franchisee low and competitive with other brands.</p>

            <p>Q)How much does it cost to use briidge?</p>
            <p>A) briidge is currently FREE to operators and investors. It is also free for franchise brands to create a profile and market to all users on the platform - this includes all operators and investors. As a channel partner, briidge will work with you to receive a commission for the qualified franchise applicants that they direct to your brand.</p>
        </section>
    );
};

export default Brands;
