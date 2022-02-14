import { useState, useMemo } from 'react';

import {
    useOnBoardState,
    useInvestorState
} from '../StateProvider';

import configs from '../../configs';

import Select from '../../Common/Select';
import Input from '../../Common/Input';
import Button from '../../Common/Button';

import styles from './Investor.module.scss';

const Step1 = () => {
    const [onBoardState, updateOnBoardState] = useOnBoardState();

    const {
        type,
        step
    } = onBoardState || {};

    const [investorState, updateInvestorState] = useInvestorState();

    const {
        need,
        needErrorObj,
        investmentAmountMin,
        investmentAmountMinErrorObj,
        investmentAmountMax,
        investmentAmountMaxErrorObj,
        investmentCategory,
        investmentCategoryErrorObj,
        investmentSelected,
        categorySelected
    } = investorState || {};

    const handleNextClick = () => {
        if (!need || !investmentAmountMin || !investmentAmountMax || !investmentCategory) {
            updateInvestorState({
                needErrorObj: {
                    message: !need ? 'Missing field' : '',
                    messageType: !need ? 'error' : '',
                },
                investmentAmountMinErrorObj: {
                    message: !investmentAmountMin ? 'Missing field' : '',
                    messageType: !investmentAmountMin ? 'error' : '',
                },
                investmentAmountMaxErrorObj: {
                    message: !investmentAmountMax ? 'Missing field' : '',
                    messageType: !investmentAmountMax ? 'error' : '',
                },
                investmentCategoryErrorObj: {
                    message: !investmentCategory ? 'Missing field' : '',
                    messageType: !investmentCategory ? 'error' : '',
                }
            });
        } else {
            updateOnBoardState({ step: step + 1 });
        }
    }

    const franchiseCategoriesOptions = useMemo(() => {
        return configs['franchise.categories'].map(v => ({ value: v, description: v }));
    }, []);

    return (
        <section className={`${styles.step} ${step === 2 && type === 'investor' ? styles['active-step'] : ''}`.trim()}>
            <h3>What are you looking for?</h3>
            <div className={styles.row}>
                <Button
                    containerClassName={styles['form-field']}
                    onFocus={() => updateInvestorState({
                        needErrorObj: {
                            message: '',
                            messageType: ''
                        }
                    })}
                    onClick={() => updateInvestorState({ need: 'operating partner' })}
                    selected={need === 'operating partner'}
                    type="button"
                    size="lg"
                    message={needErrorObj.message}
                    messageType={needErrorObj.messageType}
                >
                    An operating partner
                </Button>
                <Button
                    containerClassName={styles['form-field']}
                    onFocus={() => updateInvestorState({
                        needErrorObj: {
                            message: '',
                            messageType: ''
                        }
                    })}
                    onClick={() => updateInvestorState({ need: 'manager' })}
                    selected={need === 'manager'}
                    type="button"
                    size="lg"
                    message={needErrorObj.message}
                    messageType={needErrorObj.messageType}
                >
                    A manager
                </Button>
            </div>
            <h3>How much do you want to invest?</h3>
            <div className={styles.row}>
                <Select
                    containerClassName={styles['form-field']}
                    id="selectInvestment"
                    onFocus={() => updateInvestorState({
                        investmentAmountMinErrorObj: {
                            message: '',
                            messageType: ''
                        },
                        investmentAmountMaxErrorObj: {
                            message: '',
                            messageType: ''
                        }
                    })}
                    onChange={e => {
                        const a = e.target.value.split('-');
                        updateInvestorState({
                            investmentAmountMin: a[0],
                            investmentAmountMax: a[1],
                            investmentSelected: true
                        });
                    }}
                    value={investmentSelected ? `${investmentAmountMin}-${investmentAmountMax}` : ''}
                    placeholder="Investment Amount"
                    options={[
                        { value: '$0-$50,000', description: '$0-$50,000' },
                        { value: '$50,000-$100,000', description: '$50,000-$100,000' },
                        { value: '$100,000-$150,000', description: '$100,000-$150,000' },
                        { value: '$150,000-$200,000', description: '$150,000-$200,000' },
                        { value: '$200,000-$250,000', description: '$200,000-$250,000' },
                        { value: '$250,000-$300,000', description: '$250,000-$300,000' },
                        { value: '$300,000-$350,000', description: '$300,000-$350,000' },
                        { value: '$350,000-$400,000', description: '$350,000-$400,000' },
                        { value: '$400,000-$450,000', description: '$400,000-$450,000' },
                        { value: '$450,000-$500,000', description: '$450,000-$500,000' },
                        { value: '$500,000+-No Max', description: '$500,000+' }
                    ]}
                    message={investmentAmountMinErrorObj.message || investmentAmountMaxErrorObj.message}
                    messageType={investmentAmountMinErrorObj.messageType || investmentAmountMaxErrorObj.messageType}
                />
                <div className={styles['min-max-other']}>
                    <Input
                        containerClassName={styles['form-field']}
                        onFocus={() => {
                            updateInvestorState({
                                investmentAmountMinErrorObj: {
                                    message: '',
                                    messageType: ''
                                }
                            });
                            if (investmentSelected) {
                                updateInvestorState({
                                    investmentAmountMin: '',
                                    investmentAmountMax: '',
                                    investmentSelected: false
                                });
                            }
                        }}
                        value={investmentSelected ? '' : investmentAmountMin}
                        onChange={e => updateInvestorState({ investmentAmountMin: e.target.value })}
                        placeholder="Min Other"
                    />
                    <span>-</span>
                    <Input
                        containerClassName={styles['form-field']}
                        onFocus={() => {
                            updateInvestorState({
                                investmentAmountMaxErrorObj: {
                                    message: '',
                                    messageType: ''
                                }
                            });
                            if (investmentSelected) {
                                updateInvestorState({
                                    investmentAmountMin: '',
                                    investmentAmountMax: '',
                                    investmentSelected: false
                                });
                            }
                        }}
                        value={investmentSelected ? '' : investmentAmountMax}
                        onChange={e => {
                            updateInvestorState({
                                investmentAmountMax: e.target.value,
                                investmentSelected: false
                            });
                        }}
                        placeholder="Max Other"
                    />
                </div>
            </div>
            <h3>Preferred Investment category</h3>
            <div className={styles.row}>
                <Select
                    containerClassName={styles['form-field']}
                    onFocus={() => updateInvestorState({
                        investmentCategoryErrorObj: {
                            message: '',
                            messageType: ''
                        }
                    })}
                    onChange={e => {
                        updateInvestorState({
                            investmentCategory: e.target.value,
                            categorySelected: true
                        });
                    }}
                    defaultValue={investmentCategory}
                    placeholder="Choose category"
                    value={categorySelected ? investmentCategory : ''}
                    options={franchiseCategoriesOptions}
                    message={investmentCategoryErrorObj.message}
                    messageType={investmentCategoryErrorObj.messageType}
                />
                <Input
                    containerClassName={styles['form-field']}
                    onFocus={() => {
                        updateInvestorState({
                            investmentCategoryErrorObj: {
                                message: '',
                                messageType: ''
                            }
                        });
                        if (categorySelected) {
                            updateInvestorState({
                                investmentCategory: '',
                                categorySelected: false
                            });
                        }
                    }}
                    value={categorySelected ? '' : investmentCategory}
                    onChange={e => updateInvestorState({ investmentCategory: e.target.value })}
                    placeholder="Other"
                    message={investmentCategoryErrorObj.message}
                    messageType={investmentCategoryErrorObj.messageType}
                />
            </div>
            <div className={styles['button-actions']}>
                <Button
                    containerClassName={styles['back-button-section']}
                    onClick={() => updateOnBoardState({ step: step - 1 })}
                    size="sm"
                >
                    Back
                </Button>
                <div className={styles.right}>
                    <Button
                        onClick={() => updateOnBoardState({ step: step + 1 })}
                        size="sm"
                        containerClassName={styles['margined-button']}
                    >
                        Finish later
                    </Button>
                    <Button
                        onClick={handleNextClick}
                        size="sm"
                        selected={true}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default Step1;
