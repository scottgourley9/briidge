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

    const handleEnterSiteClick = () => {
        onSaveUserData();
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
                        value={[type === 'investor' ? investorLinks : operatorLinks].facebook}
                        onChange={e => handleUpdate(e.target.value, 'facebook')}
                        placeholder="Facebook profile"
                    />
                </div>
                <div className={styles['input-section']}>
                    <LinkedIn />
                    <Input
                        value={[type === 'investor' ? investorLinks : operatorLinks].linkedin}
                        onChange={e => handleUpdate(e.target.value, 'linkedin')}
                        placeholder="LinkedIn profile"
                    />
                </div>
                <div className={styles['input-section']}>
                    <LinkIcon />
                    <Input
                        value={[type === 'investor' ? investorLinks : operatorLinks].website}
                        onChange={e => handleUpdate(e.target.value, 'website')}
                        placeholder="personal website"
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
                <Alert>
                    We apologize, but we are unable to create your profile at this time, please try again later.
                </Alert>
            }
        </section>
    );
}

export default SocialLinks;
