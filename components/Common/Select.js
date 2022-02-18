import { useState } from 'react';

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
    const [optionSelected, updateOptionSelected] = useState(false);

    if (!rest.hasOwnProperty('value')) {
        rest.defaultValue = '';
    }

    const handleChange = e => {
        onChange(e);
        updateOptionSelected(true);
    }

    return (
        <div className={`${styles['select-wrapper']} ${containerClassName || ''} ${size === 'lg' ? styles['large-select'] : ''} ${size === 'sm' ? styles['small-select'] : ''} ${size === 'xs' ? styles['xs-select'] : ''}`}>
            <Chevron className={styles['select-chevron']}/>
            <select {...rest} onFocus={onFocus} onChange={handleChange} className={`${!optionSelected && placeholder ? styles['default-select'] : ''} ${messageType === 'error' ? styles['error-state'] : ''} ${className || ''}`.trim()}>
                {placeholder &&
                    <option value="" disabled>{placeholder}</option>
                }
                {options.map((option, i) => {
                    return (
                        <option key={i} value={option.value}>{option.description}</option>
                    )
                })}
            </select>
            {message &&
                <p className={`${styles['select-message']} ${messageType === 'error' ? styles['error-message'] : ''} ${size === 'lg' ? styles['large-message'] : ''}`.trim()}>{message}</p>
            }
        </div>
    )
}

export default Select;
