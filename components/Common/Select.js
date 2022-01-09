import Chevron from '../SVG/Chevron';

import styles from './Select.module.scss';

const Select = ({
    className,
    placeholder,
    options,
    onChange,
    defaultValue,
    message,
    messageType,
    size = 'lg',
    onFocus,
    value
}) => {
    return (
        <div className={styles['select-wrapper']}>
            <Chevron className={styles['select-chevron']}/>
            <select value={value} onFocus={onFocus} onChange={onChange} defaultValue={defaultValue} className={`${size === 'lg' ? styles['large-select'] : ''} ${messageType === 'error' ? styles['error-state'] : ''} ${className}`.trim()}>
                <option value="" disabled selected>{placeholder}</option>
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
