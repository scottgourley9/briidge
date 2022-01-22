import Chevron from '../SVG/Chevron';

import styles from './Select.module.scss';

const Select = ({
    className,
    placeholder,
    options,
    onChange,
    message,
    messageType,
    size = 'lg',
    onFocus,
    containerClassName,
    ...rest
}) => {
    return (
        <div className={`${styles['select-wrapper']} ${containerClassName || ''}`}>
            <Chevron className={styles['select-chevron']}/>
            <select {...rest} onFocus={onFocus} onChange={onChange} className={`${size === 'lg' ? styles['large-select'] : styles['small-select']} ${messageType === 'error' ? styles['error-state'] : ''} ${className || ''}`.trim()}>
                {placeholder &&
                    <option value="" disabled selected>{placeholder}</option>
                }
                {options.map((option, i) => {
                    return (
                        <option key={i} value={option.value}>{option.description}</option>
                    )
                })}
            </select>
            {message &&
                <p className={`${styles['select-message']} ${messageType === 'error' ? styles['error-message'] : ''}`.trim()}>{message}</p>
            }
        </div>
    )
}

export default Select;
