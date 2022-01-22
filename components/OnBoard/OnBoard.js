import { useState, useEffect } from 'react';

import { useOnBoardState } from './StateProvider';

import Logo from '../Logo/Logo';
import Investor from './Investor/Investor';
import Operator from './Operator/Operator';
import SocialLinks from './SocialLinks/SocialLinks';
import Button from '../Common/Button';
import Chevron from '../SVG/Chevron';

import styles from './OnBoard.module.scss';

const OnBoard = ({
    user
}) => {
    const [onBoardState, updateOnBoardState] = useOnBoardState();

    useEffect(() => {
        updateOnBoardState({ user });
    }, []);

    const handleTypeClick = type => {
        updateOnBoardState({
            type,
            step: 2
        })
    }

    const {
        type,
        step
    } = onBoardState || {};

    return (
        <section className={styles['onboard-page-wrapper']}>
            <div className={styles['onboard-logo']}>
                <Logo />
            </div>
            <div className={styles['chevron-and-pills']}>
                {step > 1 &&
                    <div onClick={() => updateOnBoardState({ step: step - 1 })} className={styles['back-svg-container']}>
                        <Chevron className={styles['onboard-back-chevron']} /> Back
                    </div>
                }
                <div className={styles.pills}>
                    <div className={`${styles['step-pill']} ${step >= 1 ? styles['pill-filled'] : ''}`.trim()} />
                    <div className={`${styles['step-pill']} ${step >= 2 ? styles['pill-filled'] : ''}`.trim()} />
                    <div className={`${styles['step-pill']} ${step >= 3 ? styles['pill-filled'] : ''}`.trim()} />
                    <div className={`${styles['step-pill']} ${step >= 4 ? styles['pill-filled'] : ''}`.trim()} />
                </div>
            </div>
            <div className={styles['steps-container']}>
                {step === 1 &&
                    <div className={`${styles.step} ${step === 1 ? styles['active-step'] : ''}`}>
                        <h2>Welcome! Let’s set up your profile and get you started.</h2>

                        <h3>First, select an account type</h3>

                        <div className={styles['main-type-buttons']}>
                            <div className={styles.left}>
                                <Button
                                    containerClassName={styles['button-container']}
                                    onClick={() => handleTypeClick('investor')}
                                >
                                    Investor
                                </Button>
                                <span>“I want to invest in a franchise”</span>
                                <span>“I need a day-to-day operator”</span>
                            </div>
                            <div className={styles.right}>
                                <Button
                                    containerClassName={styles['button-container']}
                                    onClick={() => handleTypeClick('operator')}
                                >
                                    Operator
                                </Button>
                                <span>“I want to operate a franchise”</span>
                                <span>“I need a capital partner”</span>
                            </div>
                        </div>
                    </div>
                }
                {type === 'investor' && (step === 2 || step === 3) &&
                    <Investor />
                }
                {type === 'operator' && (step === 2 || step === 3) &&
                    <Operator />
                }
                {step === 4 &&
                    <SocialLinks user={user} />
                }
            </div>
        </section>
    );
}

export default OnBoard;
