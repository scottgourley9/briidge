import React, { useState, useEffect } from 'react';

import { useSendConnectRequest } from './hooks/useSendConnectRequest';

import Modal from '../Common/Modal';

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
        if (sendConnectRequestSuccess && !sendConnectRequestError) {
            updateSuccessMessage('Connect request sent!');
            timeout = setTimeout(() => {
                updateShowModal(false);
            }, 3000);
        } else if (!sendConnectRequestSuccess && sendConnectRequestError) {
            updateErrorMessage('There was an error');
        }

        return () => {
            clearTimeout(timeout);
        }
    }, [sendConnectRequestSuccess, sendConnectRequestError]);

    const handleSendConnectionClick = async () => {
        const payload = {
            toEmail: selectedConnect?.email,
            fromName: `${user?.first_name} ${user?.last_name}`,
            fromEmail: user?.email,
            message: connectMessage,
            phoneNumber: connectPhoneNumber,
            contactMethods: howToConnectData
        }

        try {
            const response = await onSendConnectRequest(payload);
            // handle success UI
        } catch (e) {
            // handle errr UI
        }
    };

    const handleConnectDataChange = e => {
        const value = e?.target?.value;
        updateHowToConnectData({
            ...howToConnectData,
            [value]: e?.target?.checked
        });
    }

    return (
        <Modal
            onClose={() => updateShowModal(false)}
            isOpen={showModal}
            title={`Invite ${selectedConnect?.first_name} ${selectedConnect?.last_name?.[0]}. to connect`}
            footer={
                <div>
                    <button onClick={() => updateShowModal(false)}>Cancel</button>
                    <button onClick={handleSendConnectionClick}>Send</button>
                </div>
            }
        >
            <div className={styles['modal-content']}>
                <input type="textarea" onChange={e => updateConnectMessage(e?.target?.value)} value={connectMessage} resize="none" maxLength="500" />
                <p>How would you like to be contacted?</p>
                <input type="checkbox" onChange={handleConnectDataChange} value="useEmail" checked={true} /> Email
                <input type="checkbox" onChange={handleConnectDataChange} value="useText" /> Text
                <input type="checkbox" onChange={handleConnectDataChange} value="useCall" /> Call
                {(howToConnectData?.useText || howToConnectData?.useCall) &&
                    <input type="tel" onChange={e => updateConnectPhoneNumber(e?.target?.value)} value={connectPhoneNumber} />
                }
                <p>We do not save your phone number</p>
            </div>
            {successMessage &&
                <div>{successMessage}</div>
            }
            {errorMessage &&
                <div>{errorMessage}</div>
            }
        </Modal>
    )
}

export default ConnectModal;
