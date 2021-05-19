import styles from './Blog.module.scss';

const Blog = () => (
    <section className={styles['blog-page-wrapper']}>
        <div className={styles['blog-section']}>Blog</div>
        <div className={styles['blog-boxes']}>
            <div className={styles['blog-box']}>Blog</div>
            <div className={styles['blog-box']}>Blog</div>
            <div className={styles['blog-box']}>Blog</div>
            <div className={styles['blog-box']}>Blog</div>
            <div className={styles['blog-box']}>Blog</div>
            <div className={styles['blog-box']}>Blog</div>
        </div>
    </section>
);

export default Blog;
