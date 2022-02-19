import Link from 'next/link';

import styles from './Alert.module.scss';

const Alert = ({
    className,
    size = "lg",
    children,
    type,
    title,
    link
}) => {
    if (link) {
        return (
            <Link href={link}>
                <div className={`${styles.alert} ${className || ''} ${styles.link} ${size === 'lg' ? styles['large-alert'] : styles['small-alert']} ${type ? styles[`${type}-alert`] : ''}`.trim()}>
                    {title && <b className={styles.title}>{title}</b>} {children}
                </div>
            </Link>
        )
    }

    return (
        <div className={`${styles.alert} ${className || ''} ${size === 'lg' ? styles['large-alert'] : styles['small-alert']} ${type ? styles[`${type}-alert`] : ''}`.trim()}>
            {title && <b className={styles.title}>{title}</b>} {children}
        </div>
    )
}

export default Alert;
