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
    containerClassName,
    ...rest
}) => {
    return (
        <div className={`${styles['input-section']} ${containerClassName || ''}`}>
            <input
                {...rest}
                onFocus={onFocus}
                value={value}
                onChange={onChange}
                className={`${size === 'lg' ? styles['large-input'] : ''} ${size === 'sm' ? styles['small-input'] : ''} ${size === 'xs' ? styles['xs-input'] : ''} ${messageType === 'error' ? styles['error-state'] : ''} ${className || ''}`.trim()}
                placeholder={placeholder}
            />
            {message &&
                <p className={`${styles['input-message']} ${messageType === 'error' ? styles['error-message'] : ''} ${size === 'lg' ? styles['large-message'] : ''} ${size !== 'lg' ? styles['input-message-small'] : ''}`.trim()}>{message}</p>
            }
        </div>

    )
}

export default Input;
