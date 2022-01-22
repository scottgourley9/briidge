import styles from './Alert.module.scss';

const Alert = ({
    className,
    size = "sm",
    children
}) => {
    return (
        <div className={`${styles.alert} ${className || ''} ${size === 'sm' ? styles['small-alert'] : ''}`}>
            {children}
        </div>
    )
}

export default Alert;
