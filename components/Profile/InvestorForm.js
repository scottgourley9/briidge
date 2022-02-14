import { useState, useEffect, useMemo } from 'react';

import { useGetUserData } from './hooks/useGetUserData';
import { useUpdateInvestor } from './hooks/useUpdateInvestor';
import { useAddInvestor } from './hooks/useAddInvestor';

import { camelCaseObj } from '../../helpers/camelCaseObj';

import configs from '../../configs';

import Button from '../Common/Button';
import Select from '../Common/Select';
import Input from '../Common/Input';
import TextArea from '../Common/TextArea';
import Modal from '../Common/Modal';

import styles from './Profile.module.scss';

const InvestorForm = ({
    userId,
    investorData,
    onCancel,
    updateData,
    updateUserDataToDisplay,
    updateShowEditInvestorForm,
    showEditInvestorForm
}) => {
    const {
        need,
        need_error_obj = {},
        investment_selected,
        investment_amount_min,
        investment_amount_max,
        investment_amount_min_error_obj,
        investment_amount_max_error_obj,
        investment_category,
        category_selected,
        investment_category_error_obj,
        preferred_location,
        preferred_location_error_obj,
        investment_type,
        investment_type_error_obj,
        timeframe_selected,
        investment_timeframe,
        investment_timeframe_error_obj,
        ideal_operator_description,
        ideal_operator_description_error_obj,
    } = investorData || {};

    const { onGetUserData, isLoading: getUserIsLoading, data: getUserData, isSuccess: getUserSuccess, isError: getUserError } = useGetUserData();
    const { onUpdateInvestor, isLoading: updateInvestorIsLoading, data: updateInvestorData, isSuccess: updateInvestorSuccess, isError: updateInvestorError } = useUpdateInvestor();
    const { onAddInvestor, isLoading: addInvestorIsLoading, data: addInvestorData, isSuccess: addInvestorSuccess, isError: addInvestorError } = useAddInvestor();

    useEffect(() => {
        if (updateInvestorSuccess || addInvestorSuccess) {
            onGetUserData({ userId });
        }
    }, [updateInvestorSuccess, addInvestorSuccess]);

    useEffect(() => {
        if (getUserSuccess) {
            updateUserDataToDisplay(getUserData?.data);
            onCancel();
        }
    }, [getUserSuccess]);

    const handleDataUpdate = obj => {
        updateData({
            ...investorData,
            ...obj
        });
    }

    const handleSave = () => {
        if (!need || !investment_amount_min || !investment_amount_max || !investment_category || !preferred_location || !investment_type || !investment_timeframe || !ideal_operator_description) {
            handleDataUpdate({
                need_error_obj: {
                    message: !need ? 'Missing field' : '',
                    messageType: !need ? 'error' : '',
                },
                investment_amount_min_error_obj: {
                    message: !investment_amount_min ? 'Missing field' : '',
                    messageType: !investment_amount_min ? 'error' : '',
                },
                investment_amount_max_error_obj: {
                    message: !investment_amount_max ? 'Missing field' : '',
                    messageType: !investment_amount_max ? 'error' : '',
                },
                investment_category_error_obj: {
                    message: !investment_category ? 'Missing field' : '',
                    messageType: !investment_category ? 'error' : '',
                },
                preferred_location_error_obj: {
                    message: !preferred_location ? 'Missing field' : '',
                    messageType: !preferred_location ? 'error' : '',
                },
                investment_type_error_obj: {
                    message: !investment_type ? 'Missing field' : '',
                    messageType: !investment_type ? 'error' : '',
                },
                investment_timeframe_error_obj: {
                    message: !investment_timeframe ? 'Missing field' : '',
                    messageType: !investment_timeframe ? 'error' : '',
                },
                ideal_operator_description_error_obj: {
                    message: !ideal_operator_description ? 'Missing field' : '',
                    messageType: !ideal_operator_description ? 'error' : '',
                }
            });
        } else {
            const casingChangedData = camelCaseObj(investorData);
            if (casingChangedData?.id) {
                onUpdateInvestor(casingChangedData);
            } else {
                onAddInvestor({
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
                updateShowEditInvestorForm(false);
            }}
            isOpen={showEditInvestorForm}
            title="Investor Opportunity"
            footer={
                <div className={`${styles.row} ${styles['form-save-cancel-buttons']}`.trim()}>
                    <Button size="sm" onClick={onCancel}>Cancel</Button>
                    <Button size="sm" selected={true} onClick={handleSave}>Save</Button>
                </div>
            }
        >
            <div className={styles['investor-form']}>
                <h3>What are you looking for?</h3>
                <div className={styles.row}>
                    <Button
                        onFocus={() => handleDataUpdate({
                            need_error_obj: {
                                message: '',
                                messageType: ''
                            }
                        })}
                        onClick={() => handleDataUpdate({ need: 'operating partner' })}
                        selected={need === 'operating partner'}
                        type="button"
                        size="lg"
                        message={need_error_obj?.message}
                        messageType={need_error_obj?.messageType}
                    >
                        An operating partner
                    </Button>
                    <Button
                        onFocus={() => handleDataUpdate({
                            need_error_obj: {
                                message: '',
                                messageType: ''
                            }
                        })}
                        onClick={() => handleDataUpdate({ need: 'manager' })}
                        selected={need === 'manager'}
                        type="button"
                        size="lg"
                        message={need_error_obj?.message}
                        messageType={need_error_obj?.messageType}
                    >
                        A manager
                    </Button>
                </div>
                <h3>How much do you want to invest?</h3>
                <div className={styles.row}>
                    <Select
                        id="selectInvestment"
                        onFocus={() => handleDataUpdate({
                            investment_amount_min_error_obj: {
                                message: '',
                                messageType: ''
                            },
                            investment_amount_max_error_obj: {
                                message: '',
                                messageType: ''
                            }
                        })}
                        onChange={e => {
                            const a = e.target.value.split('-');
                            handleDataUpdate({
                                investment_amount_min: a[0],
                                investment_amount_max: a[1],
                                investment_selected: true
                            });
                        }}
                        value={investment_selected ? `${investment_amount_min}-${investment_amount_max}` : ''}
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
                        message={investment_amount_min_error_obj?.message || investment_amount_max_error_obj?.message}
                        messageType={investment_amount_min_error_obj?.messageType || investment_amount_max_error_obj?.messageType}
                    />
                    <div className={styles['min-max-other']}>
                        <Input
                            onFocus={() => {
                                handleDataUpdate({
                                    investment_amount_min_error_obj: {
                                        message: '',
                                        messageType: ''
                                    }
                                });
                                if (investment_selected) {
                                    handleDataUpdate({
                                        investment_amount_min: '',
                                        investment_amount_max: '',
                                        investment_selected: false
                                    });
                                }
                            }}
                            value={investment_selected ? '' : investment_amount_min}
                            onChange={e => handleDataUpdate({ investment_amount_min: e.target.value })}
                            placeholder="Min Other"
                        />
                        <span>-</span>
                        <Input
                            onFocus={() => {
                                handleDataUpdate({
                                    investment_amount_max_error_obj: {
                                        message: '',
                                        messageType: ''
                                    }
                                });
                                if (investment_selected) {
                                    handleDataUpdate({
                                        investment_amount_min: '',
                                        investment_amount_max: '',
                                        investment_selected: false
                                    });
                                }
                            }}
                            value={investment_selected ? '' : investment_amount_max}
                            onChange={e => {
                                handleDataUpdate({
                                    investment_amount_max: e.target.value,
                                    investment_selected: false
                                });
                            }}
                            placeholder="Max Other"
                        />
                    </div>
                </div>
                <h3>Preferred Investment category</h3>
                <div className={styles.row}>
                    <Select
                        onFocus={() => handleDataUpdate({
                            investment_category_error_obj: {
                                message: '',
                                messageType: ''
                            }
                        })}
                        onChange={e => {
                            handleDataUpdate({
                                investment_category: e.target.value,
                                category_selected: true
                            });
                        }}
                        defaultValue={investment_category}
                        placeholder="Choose category"
                        value={category_selected ? investment_category : ''}
                        options={franchiseCategoriesOptions}
                        message={investment_category_error_obj?.message}
                        messageType={investment_category_error_obj?.messageType}
                    />
                    <Input
                        onFocus={() => {
                            handleDataUpdate({
                                investment_category_error_obj: {
                                    message: '',
                                    messageType: ''
                                }
                            });
                            if (category_selected) {
                                handleDataUpdate({
                                    investment_category: '',
                                    category_selected: false
                                });
                            }
                        }}
                        value={category_selected ? '' : investment_category}
                        onChange={e => handleDataUpdate({ investment_category: e.target.value })}
                        placeholder="Other"
                        message={investment_category_error_obj?.message}
                        messageType={investment_category_error_obj?.messageType}
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
                            defaultValue={preferred_location}
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
                            defaultValue={investment_type}
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
                <h3>Investment timeframe</h3>
                <div className={styles.row}>
                    <Select
                        onFocus={() => handleDataUpdate({
                            investment_timeframe_error_obj: {
                                message: '',
                                messageType: ''
                            }
                        })}
                        value={timeframe_selected ? investment_timeframe : ''}
                        defaultValue={investment_timeframe}
                        onChange={e => handleDataUpdate({
                            investment_timeframe: e.target.value,
                            timeframe_selected: true
                        })}
                        placeholder="Choose timeframe"
                        options={[
                            { value: 'ASAP (within 30 days)', description: 'ASAP (within 30 days)' },
                            { value: '1-2 months', description: '1-2 months' },
                            { value: '2-6 months', description: '2-6 months' },
                            { value: '6 months +', description: '6 months +' }
                        ]}
                        message={investment_timeframe_error_obj?.message}
                        messageType={investment_timeframe_error_obj?.messageType}
                    />
                    <Input
                        onFocus={() => {
                            handleDataUpdate({
                                investment_timeframe_error_obj: {
                                    message: '',
                                    messageType: ''
                                }
                            });
                            if (timeframe_selected) {
                                handleDataUpdate({
                                    timeframe_selected: false,
                                    investment_timeframe: ''
                                });
                            }
                        }}
                        value={timeframe_selected ? '' : investment_timeframe}
                        onChange={e => handleDataUpdate({ investment_timeframe: e.target.value })}
                        placeholder="Other"
                        message={investment_timeframe_error_obj?.message}
                        messageType={investment_timeframe_error_obj?.messageType}
                    />
                </div>
                <h3>Describe your ideal operator</h3>
                <div className={styles['row-single']}>
                    <TextArea
                        onFocus={() => handleDataUpdate({
                            ideal_operator_description_error_obj: {
                                message: '',
                                messageType: ''
                            }
                        })}
                        value={ideal_operator_description}
                        onChange={e => handleDataUpdate({ ideal_operator_description: e.target.value })}
                        className={styles['ideal-partner']}
                        placeholder="Start typing here..."
                        message={ideal_operator_description_error_obj?.message}
                        messageType={ideal_operator_description_error_obj?.messageType}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default InvestorForm;
