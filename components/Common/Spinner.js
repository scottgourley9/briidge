import styles from './Spinner.module.scss';

const Spinner = ({
    className,
    size = "sm"
}) => {
    return (
        <div className={`${styles.spinner} ${className || ''} ${size === 'sm' ? styles['small-spinner'] : ''}`} />
    )
}

export default Spinner;
