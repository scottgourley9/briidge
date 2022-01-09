import {
    useOnBoardState,
    useInvestorState
} from '../StateProvider';

import Select from '../../Common/Select';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import TextArea from '../../Common/TextArea';

import styles from './Investor.module.scss';

const Step2 = () => {
    const [onBoardState, updateOnBoardState] = useOnBoardState();

    const {
        type,
        step
    } = onBoardState || {};

    const [investorState, updateInvestorState] = useInvestorState();

    const {
        preferredLocation,
        preferredLocationErrorObj,
        investmentType,
        investmentTypeErrorObj,
        investmentTimeframe,
        investmentTimeframeErrorObj,
        idealOperatorDescription,
        idealOperatorDescriptionErrorObj,
        timeframeSelected
    } = investorState || {};

    const handleNextClick = () => {
        if (!preferredLocation || !investmentType || !investmentTimeframe || !idealOperatorDescription) {
            updateInvestorState({
                preferredLocationErrorObj: {
                    message: !preferredLocation ? 'Missing field' : '',
                    messageType: !preferredLocation ? 'error' : '',
                },
                investmentTypeErrorObj: {
                    message: !investmentType ? 'Missing field' : '',
                    messageType: !investmentType ? 'error' : '',
                },
                investmentTimeframeErrorObj: {
                    message: !investmentTimeframe ? 'Missing field' : '',
                    messageType: !investmentTimeframe ? 'error' : '',
                },
                idealOperatorDescriptionErrorObj: {
                    message: !idealOperatorDescription ? 'Missing field' : '',
                    messageType: !idealOperatorDescription ? 'error' : '',
                }
            });
        } else {
            updateOnBoardState({ step: step + 1 });
        }
    }

    const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    return (
        <section className={`${styles.step} ${step === 3 && type === 'investor' ? styles['active-step'] : ''}`.trim()}>
            <div className={styles.row}>
                <div className={styles.left}>
                    <h3>Preferred Location</h3>
                    <Select
                        onFocus={() => updateInvestorState({
                            preferredLocationErrorObj: {
                                message: '',
                                messageType: ''
                            }
                        })}
                        defaultValue={preferredLocation}
                        onChange={e => updateInvestorState({ preferredLocation: e.target.value })}
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
                        onFocus={() => updateInvestorState({
                            investmentTypeErrorObj: {
                                message: '',
                                messageType: ''
                            }
                        })}
                        defaultValue={investmentType}
                        onChange={e => updateInvestorState({ investmentType: e.target.value })}
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
            <h3>Investment timeframe</h3>
            <div className={styles.row}>
                <Select
                    onFocus={() => updateInvestorState({
                        investmentTimeframeErrorObj: {
                            message: '',
                            messageType: ''
                        }
                    })}
                    value={timeframeSelected ? investmentTimeframe : ''}
                    defaultValue={investmentTimeframe}
                    onChange={e => updateInvestorState({
                        investmentTimeframe: e.target.value,
                        timeframeSelected: true
                    })}
                    placeholder="Choose timeframe"
                    options={[
                        { value: 'ASAP (within 30 days)', description: 'ASAP (within 30 days)' },
                        { value: '1-2 months', description: '1-2 months' },
                        { value: '2-6 months', description: '2-6 months' },
                        { value: '6 months +', description: '6 months +' }
                    ]}
                    message={investmentTimeframeErrorObj.message}
                    messageType={investmentTimeframeErrorObj.messageType}
                />
                <Input
                    onFocus={() => {
                        updateInvestorState({
                            investmentTimeframeErrorObj: {
                                message: '',
                                messageType: ''
                            }
                        });
                        if (timeframeSelected) {
                            updateInvestorState({
                                timeframeSelected: false,
                                investmentTimeframe: ''
                            });
                        }
                    }}
                    value={timeframeSelected ? '' : investmentTimeframe}
                    onChange={e => updateInvestorState({ investmentTimeframe: e.target.value })}
                    placeholder="Other"
                    message={investmentTimeframeErrorObj.message}
                    messageType={investmentTimeframeErrorObj.messageType}
                />
            </div>
            <h3>Describe your ideal operator</h3>
            <div className={styles.row}>
                <TextArea
                    onFocus={() => updateInvestorState({
                        idealOperatorDescriptionErrorObj: {
                            message: '',
                            messageType: ''
                        }
                    })}
                    value={idealOperatorDescription}
                    onChange={e => updateInvestorState({ idealOperatorDescription: e.target.value })}
                    className={styles['ideal-partner']}
                    placeholder="Start typing here..."
                    message={idealOperatorDescriptionErrorObj.message}
                    messageType={idealOperatorDescriptionErrorObj.messageType}
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
