import React, { useEffect, useState } from 'react';

import { GrClose } from 'react-icons/gr';

import styles from './Modal.module.scss';

const Modal = ({
    children,
    isOpen,
    onClose,
    title,
    footer
}) => {
    const [isMounted, updatedIsMounted] = useState(false);
    const [ableToBeShown, updateAbleToBeShown] = useState(false);

    useEffect(() => {
        updatedIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && isOpen) {
            updateAbleToBeShown(true);
        }
    }, [isOpen]);

    return (
        <>
            <div onClick={onClose} className={`${styles['modal-background']} ${styles['animate__animated']} ${isOpen ? styles['animate__fadeIn'] : ableToBeShown ? styles['animate__fadeOut'] : ''}`.trim()}/>
            <div className={`${styles['common-modal']} ${styles['animate__animated']} ${isOpen ? styles['animate__fadeInDown'] : ableToBeShown ? styles['animate__fadeOutUp'] : ''}`.trim()}>
                {title &&
                    <div className={styles['title-section']}>
                        <h3>{title}</h3>
                        <GrClose onClick={onClose} />
                    </div>
                }
                <div className={styles.content}>
                    {children}
                </div>
                {footer &&
                    <div className={styles.footer}>
                        {footer}
                    </div>
                }
            </div>
        </>
    )
}

export default React.memo(Modal);
