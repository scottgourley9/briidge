import axios from 'axios';

import { useSaveUserData } from '../hooks/useSaveUserData';

import {
    useOnBoardState,
    useInvestorState,
    useOperatorState
} from '../StateProvider';

import Input from '../../Common/Input';
import Button from '../../Common/Button';
import Spinner from '../../Common/Spinner';
import Alert from '../../Common/Alert';

import FacebookCircle from '../../SVG/FacebookCircle';
import LinkedIn from '../../SVG/LinkedIn';
import LinkIcon from '../../SVG/LinkIcon';

import styles from './SocialLinks.module.scss';

const SocialLinks = ({ user }) => {
    const [onBoardState, updateOnBoardState] = useOnBoardState();

    const { onSaveUserData, isLoading: saveUserDataLoading, isError: saveUserDataIsError } = useSaveUserData();

    const {
        type,
        step
    } = onBoardState || {};

    const [investorState, updateInvestorState] = useInvestorState();
    const [operatorState, updateOperatorState] = useOperatorState();

    const {
        socialMediaLinks: investorLinks = {}
    } = investorState || {};

    const {
        socialMediaLinks: operatorLinks = {}
    } = operatorState || {};

    const isValidURL = url => {
        try {
            return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(url)
        } catch (e) {
            return url;
        }
    }

    const setLinkErrors = (socialLinksObj, updateState) => {
        const links = Object.entries(socialLinksObj || {});
        const errorObj = links.reduce((acc, curr) => {
            if (curr[1] && !isValidURL(curr[1])) {
                acc[`${curr[0]}ErrorObj`] = {
                    messageType: 'error',
                    message: 'Invalid URL, please update or remove'
                }
            }

            return acc;
        }, {});
        const hasErrors = Boolean(Object.values(errorObj)?.length);
        if (hasErrors) {
            updateState(errorObj);
        }

        return hasErrors;
    }

    const handleEnterSiteClick = () => {
        let hasError = false;
        if (type === 'investor') {
            hasError = setLinkErrors(investorState?.socialMediaLinks, updateInvestorState);
        } else if (type === 'operator') {
            hasError = setLinkErrors(operatorState?.socialMediaLinks, updateOperatorState);
        }
        if (!hasError) {
            onSaveUserData();
        }
    }

    const handleUpdate = (value, linkType) => {
        if (type === 'investor') {
            updateInvestorState({ socialMediaLinks: { ...investorLinks, [linkType]: value } })
        }
        if (type === 'operator') {
            updateOperatorState({ socialMediaLinks: { ...operatorLinks, [linkType]: value } })
        }
    }

    return (
        <section className={`${styles.step} ${styles['social-links']} ${step === 4 ? styles['active-step'] : ''}`.trim()}>
            <h2>Almost done!</h2>

            <h3>Add your social accounts so people can see how cool you are.</h3>

            <div className={styles.links}>
                <div className={styles['input-section']}>
                    <FacebookCircle />
                    <Input
                        onFocus={() => {
                            if (type === 'investor') {
                                updateInvestorState({
                                    facebookErrorObj: {
                                        messageType: '',
                                        message: ''
                                    }
                                });
                            } else {
                                updateOperatorState({
                                    facebookErrorObj: {
                                        messageType: '',
                                        message: ''
                                    }
                                });
                            }
                        }}
                        value={[type === 'investor' ? investorLinks : operatorLinks].facebook}
                        onChange={e => handleUpdate(e.target.value, 'facebook')}
                        placeholder="Facebook profile"
                        messageType={type === 'investor' ? (investorState?.facebookErrorObj?.messageType) : (operatorState?.facebookErrorObj?.messageType)}
                        message={type === 'investor' ? (investorState?.facebookErrorObj?.message) : (operatorState?.facebookErrorObj?.message)}
                    />
                </div>
                <div className={styles['input-section']}>
                    <LinkedIn />
                    <Input
                        onFocus={() => {
                            if (type === 'investor') {
                                updateInvestorState({
                                    linkedinErrorObj: {
                                        messageType: '',
                                        message: ''
                                    }
                                });
                            } else {
                                updateOperatorState({
                                    linkedinErrorObj: {
                                        messageType: '',
                                        message: ''
                                    }
                                });
                            }
                        }}
                        value={[type === 'investor' ? investorLinks : operatorLinks].linkedin}
                        onChange={e => handleUpdate(e.target.value, 'linkedin')}
                        placeholder="LinkedIn profile"
                        messageType={type === 'investor' ? (investorState?.linkedinErrorObj?.messageType) : (operatorState?.linkedinErrorObj?.messageType)}
                        message={type === 'investor' ? (investorState?.linkedinErrorObj?.message) : (operatorState?.linkedinErrorObj?.message)}
                    />
                </div>
                <div className={styles['input-section']}>
                    <LinkIcon />
                    <Input
                        onFocus={() => {
                            if (type === 'investor') {
                                updateInvestorState({
                                    websiteErrorObj: {
                                        messageType: '',
                                        message: ''
                                    }
                                });
                            } else {
                                updateOperatorState({
                                    websiteErrorObj: {
                                        messageType: '',
                                        message: ''
                                    }
                                });
                            }
                        }}
                        value={[type === 'investor' ? investorLinks : operatorLinks].website}
                        onChange={e => handleUpdate(e.target.value, 'website')}
                        placeholder="personal website"
                        messageType={type === 'investor' ? (investorState?.websiteErrorObj?.messageType) : (operatorState?.websiteErrorObj?.messageType)}
                        message={type === 'investor' ? (investorState?.websiteErrorObj?.message) : (operatorState?.websiteErrorObj?.message)}
                    />
                </div>
            </div>
            <div className={styles['button-actions']}>
                <Button
                    containerClassName={styles['back-button-section']}
                    size="sm"
                    onClick={() => updateOnBoardState({ step: step - 1 })}
                >
                    Back
                </Button>
                {saveUserDataLoading
                    ?
                    <Button className={styles['enter-site']} size="sm" selected={true} onClick={() => {}}>
                        <Spinner />
                    </Button>
                    :
                    <Button
                        className={styles['enter-site']}
                        size="sm"
                        selected={true}
                        onClick={handleEnterSiteClick}
                    >
                        Enter Site
                    </Button>
                }
            </div>
            {saveUserDataIsError &&
                <Alert type="error" size="sm">
                    We apologize, but we are unable to create your profile at this time, please try again later.
                </Alert>
            }
        </section>
    );
}

export default SocialLinks;
