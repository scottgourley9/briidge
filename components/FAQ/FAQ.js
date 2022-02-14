import styles from './FAQ.module.scss';

const FAQ = () => {

    return (
        <section className={styles['faq-page-wrapper']}>
            <h2 className={styles['section-title']}>General FAQ</h2>
            <h3 className={styles.question}>Q) What is Briidge?</h3>
            <p className={styles.answer}>
                <b>A)</b> It’s a place for you to find and connect with potential capital partners with the goal of becoming a franchise owner. Our mission statement is simple: CONNECT WITH PURPOSE.
            </p>
            <p className={styles.answer}>
                <b>A)</b> Having worked with several food and beverage franchise brands we have seen first-hand the challenge of putting all of the right pieces together to successfully become a franchise owner, the two biggest pieces being, (1) a great hands-on operator and, (2) the capital to actually get the doors open. Briidge helps simplify the process of bringing those pieces together.
            </p>
            <h3 className={styles.question}>Q) Why did you choose the name briidge?</h3>
            <p className={styles.answer}>
                <b>A)</b> Becoming a business or franchise owner is no easy task. It takes a lot of hard work and a little bit of luck and good fortune. In our experience, we realized that there are several aspiring business and franchise owners that aren’t able to accomplish their goal because they lack certain pieces needed to make ownership a reality. Often times it was an operator that lacked the necessary capital and didn’t know someone they could go to as an investor OR it was an investor who lacked a partner that was willing to operate and handle the day-to-day management. We decided we wanted to help “bridge” that gap between operators and investors. The following definitions of a bridge really helped us decide on the name; “Something that is intended to reconcile or form a connection between two things.” & “To make (a difference between two groups) smaller or less significant.”
            </p>
            <h3 className={styles.question}>Q) How do I structure the partnership?</h3>
            <p className={styles.answer}>
                <b>A)</b> You and your potential partner can choose to structure the partnership however it makes the most sense for you. Each situation is going to be different so you have the flexibility to find what works for you. We’ll help you connect, but whether you get married, and under what terms are up to you.
            </p>
            <h3 className={styles.question}>Q)How much does it cost to use Briidge?</h3>
            <p className={styles.answer}>
                <b>A)</b> Currently FREE to operators and investors. It is free to create a profile and free to connect and find a partner to own/operate a franchise with you.
            </p>

            <h2 className={styles['section-title']}>For Operators FAQ</h2>
            <h3 className={styles.question}>Q) How does it work for operators?</h3>
            <p className={styles.answer}>
                <b>A)</b> Create a profile and add the details of your opportunity. You can then search for investors and filter your search criteria by franchise category/brand, location, available capital, and several other factors. This allows you to find the partner that fits your needs.
            </p>
            <h3 className={styles.question}>Q) How can I stand out as an operator?</h3>
            <p className={styles.answer}>
                <b>A)</b> Investors are looking for qualified partners who are willing to work hard and protect their investment and operate a successful business. Be authentic and be yourself. They are investing in YOU as an individual just as much as they are investing in the franchise brand.
            </p>
            <p className={styles.answer}>
                <b>A)</b> You should try to highlight the following character traits and how you’ve developed those in your career (this is not a complete list):
            </p>
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

            <h2 className={styles['section-title']}>For Investors FAQ</h2>
            <h3 className={styles.question}>Q) How does it work for investors?</h3>
            <p className={styles.answer}>
                <b>A)</b> Create a profile and add the details of your interest and availability to invest in an opportunity. You can then search for operators and filter your search criteria by franchise category/brand, location, willingness to re-locate, operator experience, and several other factors. This allows you to start the conversation with an operating partner that fits your goals.
            </p>
            <h3 className={styles.question}>Q) How do I stand out as an investor?</h3>
            <p className={styles.answer}>
                <b>A)</b> Operators are looking for qualified partners who can provide the capital needed to become a business/franchise owner. They are also interested in an investor that can truly be a partner and provide more value than just $$. Be authentic and be yourself. There are several investors who can provide the required capital. What other intangibles can you provide.
            </p>
            <p className={styles.answer}>
                <b>A)</b> You should try to highlight the following character traits and how you’ve developed those in your career (this is not a complete list):
            </p>
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
}

export default FAQ;
