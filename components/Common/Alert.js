import styles from './Alert.module.scss';

const Alert = ({
    className,
    size = "lg",
    children,
    type
}) => {
    return (
        <div className={`${styles.alert} ${className || ''} ${size === 'lg' ? styles['large-alert'] : styles['small-alert']} ${type ? styles[`${type}-alert`] : ''}`.trim()}>
            {children}
        </div>
    )
}

export default Alert;
