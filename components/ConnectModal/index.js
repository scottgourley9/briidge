import React, { useState, useEffect } from 'react';

import { useSendConnectRequest } from './hooks/useSendConnectRequest';

import Modal from '../Common/Modal';
import Button from '../Common/Button';
import Select from '../Common/Select';
import Input from '../Common/Input';
import TextArea from '../Common/TextArea';
import Alert from '../Common/Alert';

import styles from './ConnectModal.module.scss';

const ConnectModal = ({
    updateShowModal,
    showModal,
    updateSelectedConnect,
    selectedConnect,
    user
}) => {
    const [howToConnectData, updateHowToConnectData] = useState({
        useEmail: true,
        useText: false,
        useCall: false
    });
    const [connectPhoneNumber, updateConnectPhoneNumber] = useState('');
    const [connectMessage, updateConnectMessage] = useState('');
    const [successMessage, updateSuccessMessage] = useState('');
    const [errorMessage, updateErrorMessage] = useState('');
    const [connectEmail, updateConnectEmail] = useState(user?.email || '');

    const { onSendConnectRequest, isLoading: sendConnectRequestLoading, isSuccess: sendConnectRequestSuccess, isError: sendConnectRequestError, data: sendConnectRequestData } = useSendConnectRequest();

    useEffect(() => {
        if (!showModal) {
            updateHowToConnectData({
                useEmail: true,
                useText: false,
                useCall: false
            });
            updateConnectPhoneNumber('');
            updateConnectMessage('');
            updateSuccessMessage('');
            updateErrorMessage('');
        }
    }, [showModal]);

    useEffect(() => {
        let timeout;
        let canceled = false;
        if (!canceled) {
            if (sendConnectRequestSuccess && !sendConnectRequestError) {
                updateSuccessMessage('Connect request sent!');
                timeout = setTimeout(() => {
                    updateShowModal(false);
                }, 3000);
            } else if (!sendConnectRequestSuccess && sendConnectRequestError) {
                updateErrorMessage('We apologize, Connect request not sent');
            }
        }

        return () => {
            clearTimeout(timeout);
            canceled = true;
        }
    }, [sendConnectRequestSuccess, sendConnectRequestError]);

    const handleSendConnectionClick = async () => {
        const payload = {
            toEmail: selectedConnect?.email,
            fromName: `${user?.first_name} ${user?.last_name}`,
            fromEmail: connectEmail,
            message: connectMessage,
            phoneNumber: connectPhoneNumber,
            contactMethods: howToConnectData
        }

        if (
            (!howToConnectData?.useEmail && !howToConnectData?.useText && !howToConnectData?.useCall) ||
            (howToConnectData?.useEmail && !connectEmail) ||
            ((howToConnectData?.useText || howToConnectData.useCall) && !connectPhoneNumber) ||
            !connectMessage
        ) {
            updateErrorMessage('Please fill out required fields');

            return null;
        }

        try {
            const response = await onSendConnectRequest(payload);
            updateSuccessMessage('Connect request sent!');
        } catch (e) {
            updateErrorMessage('We apologize, Connect request not sent');
        }
    };

    const handleConnectDataChange = e => {
        const value = e?.target?.value;
        updateHowToConnectData({
            ...howToConnectData,
            [value]: e?.target?.checked
        });
    }

    const removeErrors = () => {
        updateErrorMessage('');
    }

    return (
        <Modal
            onClose={() => updateShowModal(false)}
            isOpen={showModal}
            title={
                <div>
                    Invite {selectedConnect?.first_name} {selectedConnect?.last_name?.[0]}.&nbsp;<span className={styles['hide-when-small']}>to connect</span>
                </div>
            }
            footer={
                <div className={styles['buttons']}>
                    <Button containerClassName={styles['cancel-button']} size="xs" onClick={() => updateShowModal(false)}>Cancel</Button>
                    <Button size="xs" selected={true} onClick={handleSendConnectionClick}>Send</Button>
                </div>
            }
        >
            <div className={styles['modal-content']}>
                {errorMessage &&
                    <Alert size="sm" type="error">{errorMessage}</Alert>
                }
                {successMessage &&
                    <Alert size="sm" type="success">{successMessage}</Alert>
                }
                <label>How would you like to be contacted?</label>
                <div className={styles['contact-section']}>
                    <div className={styles['contact-line']}>
                        <input onFocus={removeErrors} id="connectEmailCheckbox" type="checkbox" onChange={handleConnectDataChange} value="useEmail" checked={howToConnectData.useEmail} /> <label htmlFor="connectEmailCheckbox">Email</label>
                    </div>
                    <div className={styles['contact-line']}>
                        <input onFocus={removeErrors} id="connectTextCheckbox" type="checkbox" onChange={handleConnectDataChange} value="useText" /> <label htmlFor="connectTextCheckbox">Text</label>
                    </div>
                    <div className={styles['contact-line']}>
                        <input onFocus={removeErrors} id="connectCallCheckbox" type="checkbox" onChange={handleConnectDataChange} value="useCall" /> <label htmlFor="connectCallCheckbox">Call</label>
                    </div>
                </div>
                <label>Message to {selectedConnect?.first_name}</label>
                <TextArea onFocus={removeErrors} containerClassName={styles['text-area-container']} placeholder="" size="sm" type="textarea" onChange={e => updateConnectMessage(e?.target?.value)} value={connectMessage} resize="none" maxLength="500" />
                <label>Your Email</label>
                <Input onFocus={removeErrors} containerClassName={styles.email} size="xs" placeholder="Email" type="email" onChange={e => updateConnectEmail(e?.target?.value)} value={connectEmail} />
                <div className={`${styles['phone-input-section']} ${howToConnectData?.useText || howToConnectData?.useCall ? styles['show-phone'] : ''}`.trim()}>
                    <label>Your Phone Number</label>
                    <Input onFocus={removeErrors} containerClassName={styles['phone-number']} size="xs" placeholder="Phone number" type="tel" onChange={e => updateConnectPhoneNumber(e?.target?.value)} value={connectPhoneNumber} />
                </div>
            </div>
        </Modal>
    )
}

export default ConnectModal;
