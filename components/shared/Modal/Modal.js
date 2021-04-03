import cx from 'classnames';
import { useEffect, useState } from 'react';
import styles from './Modal.module.scss';

export const Modal = ({ size = 'md', onClose, show, children, ...props }) => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        setInit(show);
    }, [show]);

    return show ? (
        <>
            <div
                className={cx(styles.modalOverlay, {
                    [styles.visible]: init && show,
                })}
                onClick={onClose}
            />
            <div
                {...props}
                className={cx(
                    styles.modal,
                    styles[`size-${size}`],
                    {
                        [styles.visible]: init && show,
                    }
                )}>
                {children}
            </div>
        </>
    ) : null;
};
