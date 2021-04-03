import styles from './Button.module.scss';

export const Button = ({
    btnType = 'default', // 'default', 'secondary'
    type = 'submit',
    className,
    children,
    ...props
}) => {
    return (
        <button
            type={type === 'submit' ? 'submit' : 'button'}
            className={`${styles.button} ${className} ${styles[btnType]}`}
            {...props}>
            {children}
        </button>
    );
};
