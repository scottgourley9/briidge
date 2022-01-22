import React from 'react';

import { GrClose } from 'react-icons/gr';

import styles from './Modal.module.scss';

let initialAnimationHasOccured = false;

const Modal = ({
    children,
    isOpen,
    onClose,
    title,
    footer
}) => {

    if (isOpen) {
        initialAnimationHasOccured = true;
    }

    return (
        <>
            <div onClick={onClose} className={`${styles['modal-background']} ${styles['animate__animated']} ${isOpen ? styles['animate__fadeIn'] : initialAnimationHasOccured ? styles['animate__fadeOut'] : ''}`.trim()}/>
            <div className={`${styles['common-modal']} ${styles['animate__animated']} ${isOpen ? styles['animate__fadeInDown'] : initialAnimationHasOccured ? styles['animate__fadeOutUp'] : ''}`.trim()}>
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
