import styles from './TextArea.module.scss';

const TextArea = ({
    value,
    onChange,
    className,
    placeholder,
    size = 'lg',
    message,
    messageType,
    onFocus
}) => {
    return (
        <div className={styles['textarea-section']}>
            <textarea
                onFocus={onFocus}
                value={value}
                onChange={onChange}
                className={`${size === 'lg' ? styles['large-textarea'] : ''} ${messageType === 'error' ? styles['error-state'] : ''} ${className}`.trim()}
                placeholder={placeholder}
            />
            {message &&
                <p className={`${styles['textarea-message']} ${messageType === 'error' ? styles['error-message'] : ''}`.trim()}>{message}</p>
            }
        </div>

    )
}

export default TextArea;
