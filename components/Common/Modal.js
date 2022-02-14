import React, { useEffect, useState, useRef } from 'react';

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

    const ref = useRef();

    useEffect(() => {
        updatedIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && isOpen) {
            updateAbleToBeShown(true);
            ref.current.scrollTop = 0;
            document.body.style.top = `-${window.pageYOffset}px`;
            document.body.style.position = 'fixed';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
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
                <div ref={ref} className={styles.content}>
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
