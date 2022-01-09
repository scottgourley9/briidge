import {
    useOnBoardState,
    useOperatorState
} from '../StateProvider';

import Select from '../../Common/Select';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import TextArea from '../../Common/TextArea';

import styles from './Operator.module.scss';

const Step2 = () => {
    const [onBoardState, updateOnBoardState] = useOnBoardState();

    const {
        type,
        step
    } = onBoardState || {};

    const [operatorState, updateOperatorState] = useOperatorState();

    const {
        preferredLocation,
        preferredLocationErrorObj,
        investmentType,
        investmentTypeErrorObj,
        timeframe,
        timeframeErrorObj,
        idealInvestorDescription,
        idealInvestorDescriptionErrorObj,
        timeframeSelected
    } = operatorState || {};

    const handleNextClick = () => {
        if (!preferredLocation || !investmentType || !timeframe || !idealInvestorDescription) {
            updateOperatorState({
                preferredLocationErrorObj: {
                    message: !preferredLocation ? 'Missing field' : '',
                    messageType: !preferredLocation ? 'error' : '',
                },
                investmentTypeErrorObj: {
                    message: !investmentType ? 'Missing field' : '',
                    messageType: !investmentType ? 'error' : '',
                },
                timeframeErrorObj: {
                    message: !timeframe ? 'Missing field' : '',
                    messageType: !timeframe ? 'error' : '',
                },
                idealInvestorDescriptionErrorObj: {
                    message: !idealInvestorDescription ? 'Missing field' : '',
                    messageType: !idealInvestorDescription ? 'error' : '',
                }
            });
        } else {
            updateOnBoardState({ step: step + 1 });
        }
    }

    const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    return (
        <section className={`${styles.step} ${step === 3 && type === 'operator' ? styles['active-step'] : ''}`.trim()}>
            <div className={styles.row}>
                <div className={styles.left}>
                    <h3>Preferred Location</h3>
                    <Select
                        onFocus={() => updateOperatorState({
                            preferredLocationErrorObj: {
                                message: '',
                                messageType: ''
                            }
                        })}
                        defaultValue={preferredLocation}
                        onChange={e => updateOperatorState({ preferredLocation: e.target.value })}
                        placeholder="Choose State"
                        options={states.map(state => ({
                            value: state, description: state
                        }))}
                        message={preferredLocationErrorObj.message}
                        messageType={preferredLocationErrorObj.messageType}
                    />
                </div>
                <div className={styles.right}>
                    <h3>Investment type</h3>
                    <Select
                        onFocus={() => updateOperatorState({
                            investmentTypeErrorObj: {
                                message: '',
                                messageType: ''
                            }
                        })}
                        defaultValue={investmentType}
                        onChange={e => updateOperatorState({ investmentType: e.target.value })}
                        placeholder="Choose category"
                        options={[
                            { value: 'Debt Investment', description: 'Debt Investment' },
                            { value: 'Convertible Note', description: 'Convertible Note' },
                            { value: 'Equity Partnership', description: 'Equity Partnership' },
                            { value: 'Other', description: 'Other' }
                        ]}
                        message={investmentTypeErrorObj.message}
                        messageType={investmentTypeErrorObj.messageType}
                    />
                </div>
            </div>
            <h3>Timeframe</h3>
            <div className={styles.row}>
                <Select
                    onFocus={() => updateOperatorState({
                        timeframeErrorObj: {
                            message: '',
                            messageType: ''
                        }
                    })}
                    value={timeframeSelected ? timeframe : ''}
                    defaultValue={timeframe}
                    onChange={e => updateOperatorState({
                        timeframe: e.target.value,
                        timeframeSelected: true
                    })}
                    placeholder="Choose timeframe"
                    options={[
                        { value: 'ASAP (within 30 days)', description: 'ASAP (within 30 days)' },
                        { value: '1-2 months', description: '1-2 months' },
                        { value: '2-6 months', description: '2-6 months' },
                        { value: '6 months +', description: '6 months +' }
                    ]}
                    message={timeframeErrorObj.message}
                    messageType={timeframeErrorObj.messageType}
                />
                <Input
                    onFocus={() => {
                        updateOperatorState({
                            timeframeErrorObj: {
                                message: '',
                                messageType: ''
                            }
                        });
                        if (timeframeSelected) {
                            updateOperatorState({
                                timeframeSelected: false,
                                timeframe: ''
                            });
                        }
                    }}
                    value={timeframeSelected ? '' : timeframe}
                    onChange={e => updateOperatorState({ timeframe: e.target.value })}
                    placeholder="Other"
                    message={timeframeErrorObj.message}
                    messageType={timeframeErrorObj.messageType}
                />
            </div>
            <h3>Describe your ideal investor</h3>
            <div className={styles.row}>
                <TextArea
                    onFocus={() => updateOperatorState({
                        idealInvestorDescriptionErrorObj: {
                            message: '',
                            messageType: ''
                        }
                    })}
                    value={idealInvestorDescription}
                    onChange={e => updateOperatorState({ idealInvestorDescription: e.target.value })}
                    className={styles['ideal-partner']}
                    placeholder="Start typing here..."
                    messageType={idealInvestorDescriptionErrorObj.messageType}
                    message={idealInvestorDescriptionErrorObj.message}
                />
            </div>
            <div className={styles['button-actions']}>
                <Button
                    onClick={() => updateOnBoardState({ step: step - 1 })}
                    size="sm"
                >
                    Back
                </Button>
                <div className={styles.right}>
                    <Button
                        onClick={() => updateOnBoardState({ step: step + 1 })}
                        size="sm"
                        className={styles['margined-button']}
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

export default Step2;
