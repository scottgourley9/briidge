import React, { useState, useEffect } from 'react';

import { useSendMessage } from './hooks/useSendMessage';

import Modal from '../Common/Modal';
import Button from '../Common/Button';
import Select from '../Common/Select';
import Input from '../Common/Input';
import TextArea from '../Common/TextArea';
import Alert from '../Common/Alert';

import styles from './ContactUs.module.scss';

const ContactUs = ({
    user
}) => {
    const [message, updateMessage] = useState('');
    const [firstName, updateFirstName] = useState(user?.first_name || '');
    const [lastName, updateLastName] = useState(user?.last_name || '');
    const [email, updateEmail] = useState(user?.email || '');
    const [successMessage, updateSuccessMessage] = useState('');
    const [errorMessage, updateErrorMessage] = useState('');

    const { onSendMessage, isLoading, isSuccess, isError, data } = useSendMessage();

    useEffect(() => {
        if (isSuccess) {
            updateSuccessMessage('Message sent! We will get back to you as soon as possible');
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            updateErrorMessage('We apologize, the message was not sent');
        }
    }, [isError]);

    const handleSendMessage = async () => {
        const payload = {
            fromName: `${firstName} ${lastName}`,
            fromEmail: email,
            message: message
        }

        if (!firstName || !lastName || !email || !message) {
            updateErrorMessage('Please fill out required fields');

            return null;
        }

        onSendMessage(payload);
    };

    const removeErrors = () => {
        updateErrorMessage('');
    }

    return (
        <div className={styles['contact-page-wrapper']}>
            <h1>What&apos;s on your mind...</h1>
            <div className={styles['contact-us-form']}>
                {errorMessage &&
                    <Alert size="sm" type="error">{errorMessage}</Alert>
                }
                {successMessage ?
                    <Alert size="sm" type="success">{successMessage}</Alert>
                    :
                    <>
                        <div className={styles.names}>
                            <div>
                                <label>First Name</label>
                                <Input onFocus={removeErrors} containerClassName={styles['first-name']} size="sm" type="text" onChange={e => updateFirstName(e?.target?.value)} value={firstName} />
                            </div>
                            <div>
                                <label>Last Name</label>
                                <Input onFocus={removeErrors} containerClassName={styles['last-name']} size="sm" type="text" onChange={e => updateLastName(e?.target?.value)} value={lastName} />
                            </div>
                        </div>
                        <label>Your Email</label>
                        <Input onFocus={removeErrors} containerClassName={styles.email} size="sm" type="email" onChange={e => updateEmail(e?.target?.value)} value={email} />
                        <label>Message to briidge Customer Service</label>
                        <TextArea onFocus={removeErrors} containerClassName={styles['text-area-container']} size="sm" type="textarea" onChange={e => updateMessage(e?.target?.value)} value={message} resize="none" maxLength="500" />
                        <div className={styles['buttons']}>
                            <Button size="sm" selected={true} onClick={handleSendMessage}>Send</Button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default ContactUs;
