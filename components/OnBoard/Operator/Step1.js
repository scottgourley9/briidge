import { useMemo } from 'react';

import {
    useOnBoardState,
    useOperatorState
} from '../StateProvider';

import configs from '../../../configs';

import Select from '../../Common/Select';
import Input from '../../Common/Input';
import Button from '../../Common/Button';

import styles from './Operator.module.scss';

const Step1 = () => {
    const [onBoardState, updateOnBoardState] = useOnBoardState();

    const {
        type,
        step
    } = onBoardState || {};

    const [operatorState, updateOperatorState] = useOperatorState();

    const {
        need,
        needErrorObj,
        capitalAmountMin,
        capitalAmountMinErrorObj,
        capitalAmountMax,
        capitalAmountMaxErrorObj,
        operatingCategory,
        operatingCategoryErrorObj,
        capitalSelected,
        categorySelected
    } = operatorState || {};

    const handleNextClick = () => {
        if (!need || !capitalAmountMin || !capitalAmountMax || !operatingCategory) {
            updateOperatorState({
                needErrorObj: {
                    message: !need ? 'Missing field' : '',
                    messageType: !need ? 'error' : '',
                },
                capitalAmountMinErrorObj: {
                    message: !capitalAmountMin ? 'Missing field' : '',
                    messageType: !capitalAmountMin ? 'error' : '',
                },
                capitalAmountMaxErrorObj: {
                    message: !capitalAmountMax ? 'Missing field' : '',
                    messageType: !capitalAmountMax ? 'error' : '',
                },
                operatingCategoryErrorObj: {
                    message: !operatingCategory ? 'Missing field' : '',
                    messageType: !operatingCategory ? 'error' : '',
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
        <section className={`${styles.step} ${step === 2 && type === 'operator' ? styles['active-step'] : ''}`.trim()}>
            <h3>What are you looking for?</h3>
            <div className={styles.row}>
                <Button
                    containerClassName={styles['form-field']}
                    onFocus={() => updateOperatorState({
                        needErrorObj: {
                            message: '',
                            messageType: ''
                        }
                    })}
                    onClick={() => updateOperatorState({ need: 'loan' })}
                    selected={need === 'loan'}
                    messageType={needErrorObj.messageType}
                    message={needErrorObj.message}
                >
                    A loan
                </Button>
                <Button
                    containerClassName={styles['form-field']}
                    onFocus={() => updateOperatorState({
                        needErrorObj: {
                            message: '',
                            messageType: ''
                        }
                    })}
                    onClick={() => updateOperatorState({ need: 'private investor' })}
                    selected={need === 'private investor'}
                    messageType={needErrorObj.messageType}
                    message={needErrorObj.message}
                >
                    A private investor
                </Button>
            </div>
            <h3>How much capital do you need?</h3>
            <div className={styles.row}>
                <Select
                    containerClassName={styles['form-field']}
                    id="selectCapital"
                    onFocus={() => updateOperatorState({
                        capitalAmountMinErrorObj: {
                            message: '',
                            messageType: ''
                        },
                        capitalAmountMaxErrorObj: {
                            message: '',
                            messageType: ''
                        }
                    })}
                    onChange={e => {
                        const a = e.target.value.split('-');
                        updateOperatorState({
                            capitalAmountMin: a[0],
                            capitalAmountMax: a[1],
                            capitalSelected: true
                        });
                    }}
                    value={capitalSelected ? `${capitalAmountMin}-${capitalAmountMax}` : ''}
                    placeholder="Capital Amount"
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
                    message={capitalAmountMinErrorObj.message || capitalAmountMaxErrorObj.message}
                    messageType={capitalAmountMinErrorObj.messageType || capitalAmountMaxErrorObj.messageType}
                />
                <div className={styles['min-max-other']}>
                    <Input
                        containerClassName={styles['form-field']}
                        onFocus={() => {
                            updateOperatorState({
                                capitalAmountMinErrorObj: {
                                    message: '',
                                    messageType: ''
                                }
                            });
                            if (capitalSelected) {
                                updateOperatorState({
                                    capitalAmountMin: '',
                                    capitalAmountMax: '',
                                    capitalSelected: false
                                });
                            }
                        }}
                        value={capitalSelected ? '' : capitalAmountMin}
                        onChange={e => updateOperatorState({ capitalAmountMin: e.target.value })}
                        placeholder="Min Other"
                    />
                    <span>-</span>
                    <Input
                        containerClassName={styles['form-field']}
                        onFocus={() => {
                            updateOperatorState({
                                capitalAmountMaxErrorObj: {
                                    message: '',
                                    messageType: ''
                                }
                            });
                            if (capitalSelected) {
                                updateOperatorState({
                                    capitalAmountMin: '',
                                    capitalAmountMax: '',
                                    capitalSelected: false
                                });
                            }
                        }}
                        value={capitalSelected ? '' : capitalAmountMax}
                        onChange={e => {
                            updateOperatorState({
                                capitalAmountMax: e.target.value,
                                capitalSelected: false
                            });
                        }}
                        placeholder="Max Other"
                    />
                </div>
            </div>
            <h3>What category are you operating in?</h3>
            <div className={styles.row}>
                <Select
                    containerClassName={styles['form-field']}
                    onFocus={() => updateOperatorState({
                        operatingCategoryErrorObj: {
                            message: '',
                            messageType: ''
                        }
                    })}
                    onChange={e => {
                        updateOperatorState({
                            operatingCategory: e.target.value,
                            categorySelected: true
                        });
                    }}
                    placeholder="Choose category"
                    value={categorySelected ? operatingCategory : ''}
                    options={franchiseCategoriesOptions}
                    message={operatingCategoryErrorObj.message}
                    messageType={operatingCategoryErrorObj.messageType}
                />
                <Input
                    containerClassName={styles['form-field']}
                    onFocus={() => {
                        updateOperatorState({
                            operatingCategoryErrorObj: {
                                message: '',
                                messageType: ''
                            }
                        });
                        if (categorySelected) {
                            updateOperatorState({
                                operatingCategory: '',
                                categorySelected: false
                            });
                        }
                    }}
                    value={categorySelected ? '' : operatingCategory}
                    onChange={e => updateOperatorState({ operatingCategory: e.target.value })}
                    placeholder="Other"
                    message={operatingCategoryErrorObj.message}
                    messageType={operatingCategoryErrorObj.messageType}
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
                        containerClassName={styles['margined-button']}
                        onClick={() => updateOnBoardState({ step: step + 1 })}
                        size="sm"
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
