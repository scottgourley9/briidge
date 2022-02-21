import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { useGetUserData } from './hooks/useGetUserData';
import { useUpdateOperator } from './hooks/useUpdateOperator';
import { useAddOperator } from './hooks/useAddOperator';

import { camelCaseObj } from '../../helpers/camelCaseObj';

import configs from '../../configs';

import Button from '../Common/Button';
import Select from '../Common/Select';
import Input from '../Common/Input';
import TextArea from '../Common/TextArea';
import Modal from '../Common/Modal';

import styles from './Profile.module.scss';

const OperatorForm = ({
    userId,
    operatorData,
    onCancel,
    updateData,
    updateUserDataToDisplay,
    updateShowEditOperatorForm,
    showEditOperatorForm,
    hasIncompleteOperators
}) => {
    const {
        need = '',
        need_error_obj = {},
        capital_selected = false,
        capital_amount_min = '',
        capital_amount_max = '',
        capital_amount_min_error_obj = {},
        capital_amount_max_error_obj = {},
        operating_category = '',
        category_selected = false,
        operating_category_error_obj = {},
        preferred_location = '',
        preferred_location_error_obj = {},
        investment_type = '',
        investment_type_error_obj = {},
        timeframe_selected = false,
        timeframe = '',
        timeframe_error_obj = {},
        ideal_investor_description = '',
        ideal_investor_description_error_obj = {},
    } = operatorData || {};

    const router = useRouter();

    const { onGetUserData, isLoading: getUserIsLoading, data: getUserData, isSuccess: getUserSuccess, isError: getUserError } = useGetUserData();
    const { onUpdateOperator, isLoading: updateOperatorIsLoading, data: updateOperatorData, isSuccess: updateOperatorSuccess, isError: updateOperatorError } = useUpdateOperator();
    const { onAddOperator, isLoading: addOperatorIsLoading, data: addOperatorData, isSuccess: addOperatorSuccess, isError: addOperatorError } = useAddOperator();

    useEffect(() => {
        if (updateOperatorSuccess || addOperatorSuccess) {
            onGetUserData({ userId });
        }
    }, [updateOperatorSuccess, addOperatorSuccess]);

    useEffect(() => {
        if (getUserSuccess) {
            updateUserDataToDisplay(getUserData?.data);
            onCancel();
            if (hasIncompleteOperators) {
                router.replace(router.asPath);
            }
        }
    }, [getUserSuccess]);

    const handleDataUpdate = obj => {
        updateData({
            ...operatorData,
            ...obj
        });
    }

    const handleSave = () => {
        if (!need || !capital_amount_min || !capital_amount_max || !operating_category || !preferred_location || !investment_type || !timeframe || !ideal_investor_description) {
            handleDataUpdate({
                need_error_obj: {
                    message: !need ? 'Missing field' : '',
                    messageType: !need ? 'error' : '',
                },
                capital_amount_min_error_obj: {
                    message: !capital_amount_min ? 'Missing field' : '',
                    messageType: !capital_amount_min ? 'error' : '',
                },
                capital_amount_max_error_obj: {
                    message: !capital_amount_max ? 'Missing field' : '',
                    messageType: !capital_amount_max ? 'error' : '',
                },
                operating_category_error_obj: {
                    message: !operating_category ? 'Missing field' : '',
                    messageType: !operating_category ? 'error' : '',
                },
                preferred_location_error_obj: {
                    message: !preferred_location ? 'Missing field' : '',
                    messageType: !preferred_location ? 'error' : '',
                },
                investment_type_error_obj: {
                    message: !investment_type ? 'Missing field' : '',
                    messageType: !investment_type ? 'error' : '',
                },
                timeframe_error_obj: {
                    message: !timeframe ? 'Missing field' : '',
                    messageType: !timeframe ? 'error' : '',
                },
                ideal_investor_description_error_obj: {
                    message: !ideal_investor_description ? 'Missing field' : '',
                    messageType: !ideal_investor_description ? 'error' : '',
                }
            });
        } else {
            const casingChangedData = camelCaseObj(operatorData);
            if (casingChangedData?.id) {
                onUpdateOperator(casingChangedData);
            } else {
                onAddOperator({
                    userId,
                    ...casingChangedData
                });
            }
        }
    }

    const franchiseCategoriesOptions = useMemo(() => {
        return configs['franchise.categories'].map(v => ({ value: v, description: v }));
    }, []);

    const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    return (
        <Modal
            onClose={() => {
                updateShowEditOperatorForm(false);
            }}
            isOpen={showEditOperatorForm}
            title="Operator Opportunity"
            footer={
                <div className={`${styles.row} ${styles['form-save-cancel-buttons']}`.trim()}>
                    <Button size="sm" onClick={onCancel}>Cancel</Button>
                    <Button size="sm" selected={true} onClick={handleSave}>Save</Button>
                </div>
            }
        >
            <div className={styles['operator-form']}>
                <h3>What are you looking for?</h3>
                <div className={styles.row}>
                    <Button
                        onFocus={() => handleDataUpdate({
                            need_error_obj: {
                                message: '',
                                messageType: ''
                            }
                        })}
                        onClick={() => handleDataUpdate({ need: 'loan' })}
                        selected={need === 'loan'}
                        type="button"
                        size="sm"
                        message={need_error_obj?.message}
                        messageType={need_error_obj?.messageType}
                    >
                        A loan
                    </Button>
                    <Button
                        onFocus={() => handleDataUpdate({
                            need_error_obj: {
                                message: '',
                                messageType: ''
                            }
                        })}
                        onClick={() => handleDataUpdate({ need: 'private investor' })}
                        selected={need === 'private investor'}
                        type="button"
                        size="sm"
                        message={need_error_obj?.message}
                        messageType={need_error_obj?.messageType}
                    >
                        A private investor
                    </Button>
                </div>
                <h3>How much capital do you need?</h3>
                <div className={styles.row}>
                    <Select
                        id="selectInvestment"
                        onFocus={() => handleDataUpdate({
                            capital_amount_min_error_obj: {
                                message: '',
                                messageType: ''
                            },
                            capital_amount_max_error_obj: {
                                message: '',
                                messageType: ''
                            }
                        })}
                        onChange={e => {
                            const a = e.target.value.split('-');
                            handleDataUpdate({
                                capital_amount_min: a[0],
                                capital_amount_max: a[1],
                                capital_selected: true
                            });
                        }}
                        size="sm"
                        value={capital_selected ? `${capital_amount_min}-${capital_amount_max}` : ''}
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
                        message={capital_amount_min_error_obj?.message || capital_amount_max_error_obj?.message}
                        messageType={capital_amount_min_error_obj?.messageType || capital_amount_max_error_obj?.messageType}
                    />
                    <div>
                        <div className={`${styles['min-max-other']} ${(capital_amount_min_error_obj?.message || capital_amount_max_error_obj?.message) ? styles['min-max-error'] : ''}`.trim()}>
                            <Input
                                onFocus={() => {
                                    handleDataUpdate({
                                        capital_amount_min_error_obj: {
                                            message: '',
                                            messageType: ''
                                        },
                                        capital_amount_max_error_obj: {
                                            message: '',
                                            messageType: ''
                                        }
                                    });
                                    if (capital_selected) {
                                        handleDataUpdate({
                                            capital_amount_min: '',
                                            capital_amount_max: '',
                                            capital_selected: false
                                        });
                                    }
                                }}
                                size="sm"
                                value={capital_selected ? '' : capital_amount_min}
                                onChange={e => handleDataUpdate({ capital_amount_min: e.target.value })}
                                placeholder="Min Other"
                            />
                            <span>-</span>
                            <Input
                                onFocus={() => {
                                    handleDataUpdate({
                                        capital_amount_min_error_obj: {
                                            message: '',
                                            messageType: ''
                                        },
                                        capital_amount_max_error_obj: {
                                            message: '',
                                            messageType: ''
                                        }
                                    });
                                    if (capital_selected) {
                                        handleDataUpdate({
                                            capital_amount_min: '',
                                            capital_amount_max: '',
                                            capital_selected: false
                                        });
                                    }
                                }}
                                size="sm"
                                value={capital_selected ? '' : capital_amount_max}
                                onChange={e => {
                                    handleDataUpdate({
                                        capital_amount_max: e.target.value,
                                        capital_selected: false
                                    });
                                }}
                                placeholder="Max Other"
                            />
                        </div>
                        {(capital_amount_min_error_obj?.message || capital_amount_max_error_obj?.message) &&
                            <p className={styles['min-and-max-error']}>{capital_amount_max_error_obj?.message}</p>
                        }
                    </div>
                </div>
                <h3>What category are you operating in?</h3>
                <div className={styles.row}>
                    <Select
                        onFocus={() => handleDataUpdate({
                            operating_category_error_obj: {
                                message: '',
                                messageType: ''
                            }
                        })}
                        onChange={e => {
                            handleDataUpdate({
                                operating_category: e.target.value,
                                category_selected: true
                            });
                        }}
                        size="sm"
                        placeholder="Choose category"
                        value={category_selected ? operating_category : ''}
                        options={franchiseCategoriesOptions}
                        message={operating_category_error_obj?.message}
                        messageType={operating_category_error_obj?.messageType}
                    />
                    <Input
                        onFocus={() => {
                            handleDataUpdate({
                                operating_category_error_obj: {
                                    message: '',
                                    messageType: ''
                                }
                            });
                            if (category_selected) {
                                handleDataUpdate({
                                    operating_category: '',
                                    category_selected: false
                                });
                            }
                        }}
                        size="sm"
                        value={category_selected ? '' : operating_category}
                        onChange={e => handleDataUpdate({ operating_category: e.target.value })}
                        placeholder="Other"
                        message={operating_category_error_obj?.message}
                        messageType={operating_category_error_obj?.messageType}
                    />
                </div>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <h3>Preferred Location</h3>
                        <Select
                            onFocus={() => handleDataUpdate({
                                preferred_location_error_obj: {
                                    message: '',
                                    messageType: ''
                                }
                            })}
                            size="sm"
                            value={preferred_location}
                            onChange={e => handleDataUpdate({ preferred_location: e.target.value })}
                            placeholder="Choose State"
                            options={states.map(state => ({
                                value: state, description: state
                            }))}
                            message={preferred_location_error_obj?.message}
                            messageType={preferred_location_error_obj?.messageType}
                        />
                    </div>
                    <div className={styles.right}>
                        <h3>Investment type</h3>
                        <Select
                            onFocus={() => handleDataUpdate({
                                investment_type_error_obj: {
                                    message: '',
                                    messageType: ''
                                }
                            })}
                            size="sm"
                            value={investment_type}
                            onChange={e => handleDataUpdate({ investment_type: e.target.value })}
                            placeholder="Choose category"
                            options={[
                                { value: 'Debt Investment', description: 'Debt Investment' },
                                { value: 'Convertible Note', description: 'Convertible Note' },
                                { value: 'Equity Partnership', description: 'Equity Partnership' },
                                { value: 'Other', description: 'Other' }
                            ]}
                            message={investment_type_error_obj?.message}
                            messageType={investment_type_error_obj?.messageType}
                        />
                    </div>
                </div>
                <h3>Timeframe</h3>
                <div className={styles.row}>
                    <Select
                        onFocus={() => handleDataUpdate({
                            timeframe_error_obj: {
                                message: '',
                                messageType: ''
                            }
                        })}
                        size="sm"
                        value={timeframe_selected ? timeframe : ''}
                        onChange={e => handleDataUpdate({
                            timeframe: e.target.value,
                            timeframe_selected: true
                        })}
                        placeholder="Choose timeframe"
                        options={[
                            { value: 'ASAP (within 30 days)', description: 'ASAP (within 30 days)' },
                            { value: '1-2 months', description: '1-2 months' },
                            { value: '2-6 months', description: '2-6 months' },
                            { value: '6 months +', description: '6 months +' }
                        ]}
                        message={timeframe_error_obj?.message}
                        messageType={timeframe_error_obj?.messageType}
                    />
                    <Input
                        onFocus={() => {
                            handleDataUpdate({
                                timeframe_error_obj: {
                                    message: '',
                                    messageType: ''
                                }
                            });
                            if (timeframe_selected) {
                                handleDataUpdate({
                                    timeframe_selected: false,
                                    timeframe: ''
                                });
                            }
                        }}
                        size="sm"
                        value={timeframe_selected ? '' : timeframe}
                        onChange={e => handleDataUpdate({ timeframe: e.target.value })}
                        placeholder="Other"
                        message={timeframe_error_obj?.message}
                        messageType={timeframe_error_obj?.messageType}
                    />
                </div>
                <h3>Describe your ideal investor</h3>
                <div className={styles['row-single']}>
                    <TextArea
                        onFocus={() => handleDataUpdate({
                            ideal_investor_description_error_obj: {
                                message: '',
                                messageType: ''
                            }
                        })}
                        size="sm"
                        value={ideal_investor_description}
                        onChange={e => handleDataUpdate({ ideal_investor_description: e.target.value })}
                        className={styles['ideal-partner']}
                        placeholder="Start typing here..."
                        message={ideal_investor_description_error_obj?.message}
                        messageType={ideal_investor_description_error_obj?.messageType}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default OperatorForm;
