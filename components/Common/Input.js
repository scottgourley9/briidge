import styles from './Input.module.scss';

const Input = ({
    value,
    onChange,
    className,
    placeholder,
    size = 'lg',
    message,
    messageType,
    onFocus,
    ...rest
}) => {
    return (
        <div className={styles['input-section']}>
            <input
                {...rest}
                onFocus={onFocus}
                value={value}
                onChange={onChange}
                className={`${size === 'lg' ? styles['large-input'] : ''} ${messageType === 'error' ? styles['error-state'] : ''} ${className}`.trim()}
                placeholder={placeholder}
            />
            {message &&
                <p className={`${styles['input-message']} ${messageType === 'error' ? styles['error-message'] : ''}`.trim()}>{message}</p>
            }
        </div>

    )
}

export default Input;
