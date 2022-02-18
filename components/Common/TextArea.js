import styles from './TextArea.module.scss';

const TextArea = ({
    value,
    onChange,
    className,
    placeholder,
    size = 'lg',
    message,
    messageType,
    onFocus,
    containerClassName
}) => {
    return (
        <div className={`${styles['textarea-section']} ${containerClassName || ''}`}>
            <textarea
                onFocus={onFocus}
                value={value}
                onChange={onChange}
                className={`${size === 'lg' ? styles['large-textarea'] : styles['small-textarea']} ${messageType === 'error' ? styles['error-state'] : ''} ${className || ''}`.trim()}
                placeholder={placeholder}
            />
            {message &&
                <p className={`${styles['textarea-message']} ${messageType === 'error' ? styles['error-message'] : ''} ${size === 'lg' ? styles['large-message'] : ''}`.trim()}>{message}</p>
            }
        </div>

    )
}

export default TextArea;
