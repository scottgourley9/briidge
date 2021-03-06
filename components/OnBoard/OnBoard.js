import { useState, useEffect } from 'react';
import { GrFormPrevious } from 'react-icons/gr';

import { useOnBoardState } from './StateProvider';

import Logo from '../Logo/Logo';
import Investor from './Investor/Investor';
import Operator from './Operator/Operator';
import SocialLinks from './SocialLinks/SocialLinks';
import Button from '../Common/Button';
import Chevron from '../SVG/Chevron';
import Input from '../Common/Input';

import styles from './OnBoard.module.scss';

const OnBoard = ({
    user
}) => {
    const [onBoardState, updateOnBoardState] = useOnBoardState();

    useEffect(() => {
        updateOnBoardState({ user });
    }, []);

    const handleTypeClick = type => {
        const firstNameValid = onBoardState?.user?.first_name;
        const lastNameValid = onBoardState?.user?.last_name;
        if (!firstNameValid || !lastNameValid) {
            updateOnBoardState({
                firstNameErrorObj: {
                    messageType: !firstNameValid ? 'error' : '',
                    message: !firstNameValid ? 'First name is required' : ''
                },
                lastNameErrorObj: {
                    messageType: !lastNameValid ? 'error' : '',
                    message: !lastNameValid ? 'Last name is required' : ''
                }
            });
        } else if (firstNameValid && lastNameValid) {
            updateOnBoardState({
                type,
                step: 2
            });
        }
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
                    <button type="button" onClick={() => updateOnBoardState({ step: step - 1 })} className={styles['back-svg-container']}>
                        <GrFormPrevious className={styles['onboard-back-chevron']} /> Back
                    </button>
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
                        <h2>Welcome! Let???s set up your profile and get you started.</h2>

                        {(!user?.first_name || !user?.last_name) ?
                            <>
                                <h3>First, tell us your name and select an account type</h3>
                                <div className={styles['name-row']}>
                                    <Input
                                        containerClassName={styles['form-field']}
                                        onFocus={() => {
                                            updateOnBoardState({
                                                firstNameErrorObj: {
                                                    messageType: '',
                                                    message: ''
                                                }
                                            });
                                        }}
                                        value={onBoardState?.user?.first_name}
                                        onChange={e => updateOnBoardState({
                                            user: {
                                                ...(onBoardState?.user || {}),
                                                first_name: e?.target?.value
                                            }
                                        })}
                                        placeholder="First Name"
                                        message={onBoardState?.firstNameErrorObj?.message}
                                        messageType={onBoardState?.firstNameErrorObj?.messageType}
                                    />
                                    <Input
                                        containerClassName={styles['form-field']}
                                        onFocus={() => {
                                            updateOnBoardState({
                                                lastNameErrorObj: {
                                                    messageType: '',
                                                    message: ''
                                                }
                                            });
                                        }}
                                        value={onBoardState?.user?.last_name}
                                        onChange={e => updateOnBoardState({
                                            user: {
                                                ...(onBoardState?.user || {}),
                                                last_name: e?.target?.value
                                            }
                                        })}
                                        placeholder="Last Name"
                                        message={onBoardState?.lastNameErrorObj?.message}
                                        messageType={onBoardState?.lastNameErrorObj?.messageType}
                                    />
                                </div>
                            </>
                            :
                            <h3>First, select an account type</h3>
                        }

                        <div className={styles['main-type-buttons']}>
                            <div className={styles.left}>
                                <Button
                                    containerClassName={styles['button-container']}
                                    onClick={() => handleTypeClick('investor')}
                                >
                                    Investor
                                </Button>
                                <span>???I want to invest in a franchise???</span>
                                <span>???I need a day-to-day operator???</span>
                            </div>
                            <div className={styles.right}>
                                <Button
                                    containerClassName={styles['button-container']}
                                    onClick={() => handleTypeClick('operator')}
                                >
                                    Operator
                                </Button>
                                <span>???I want to operate a franchise???</span>
                                <span>???I need a capital partner???</span>
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
