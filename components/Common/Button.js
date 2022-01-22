import styles from './Button.module.scss';

const Button = ({
    onClick,
    className,
    size = 'lg',
    message,
    messageType,
    selected,
    children,
    type = 'button',
    onFocus,
    containerClassName
}) => {
    return (
        <div className={`${styles['button-section']} ${containerClassName || ''}`}>
            <button
                onFocus={onFocus}
                onClick={onClick}
                className={`${size === 'lg' ? styles['large-button'] : ''} ${size === 'sm' ? styles['small-button'] : ''} ${selected ? styles['selected-button'] : ''} ${className || ''}`.trim()}
                type={type}
            >
                {children}
            </button>
            {message &&
                <p className={`${styles['button-message']} ${messageType ? styles['error-message'] : ''}`.trim()}>{message}</p>
            }
        </div>

    )
}

export default Button;
