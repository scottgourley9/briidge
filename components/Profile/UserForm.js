import { useState, useEffect } from 'react';

import { useGetUserData } from './hooks/useGetUserData';
import { useUpdateUser } from './hooks/useUpdateUser';

import Button from '../Common/Button';
import Input from '../Common/Input';
import Modal from '../Common/Modal';
import FacebookCircle from '../SVG/FacebookCircle';
import LinkedIn from '../SVG/LinkedIn';
import LinkIcon from '../SVG/LinkIcon';

import styles from './Profile.module.scss';

const UserForm = ({
    userData,
    onCancel,
    updateData,
    updateUserDataToDisplay,
    updateShowUserForm,
    showUserForm
}) => {
    const {
        id,
        email,
        email_error_obj,
        first_name,
        first_name_error_obj,
        last_name,
        last_name_error_obj,
        facebook,
        linkedin,
        website
    } = userData || {};

    const { onGetUserData, isLoading: getUserIsLoading, data: getUserData, isSuccess: getUserSuccess, isError: getUserError } = useGetUserData();
    const { onUpdateUser, isLoading: updateUserIsLoading, data: updateUserData, isSuccess: updateUserSuccess, isError: updateUserError } = useUpdateUser();

    useEffect(() => {
        if (updateUserSuccess) {
            onGetUserData({ userId: id });
        }
    }, [updateUserSuccess]);

    useEffect(() => {
        if (getUserSuccess) {
            updateUserDataToDisplay(getUserData?.data);
            onCancel();
        }
    }, [getUserSuccess]);

    const handleDataUpdate = obj => {
        updateData({
            ...userData,
            ...obj
        });
    }

    const handleSave = () => {
        if (!email || !first_name || !last_name) {
            handleDataUpdate({
                email_error_obj: {
                    message: !email ? 'Missing field' : '',
                    messageType: !email ? 'error' : '',
                },
                first_name_error_obj: {
                    message: !first_name ? 'Missing field' : '',
                    messageType: !first_name ? 'error' : '',
                },
                last_name_error_obj: {
                    message: !last_name ? 'Missing field' : '',
                    messageType: !last_name ? 'error' : '',
                }
            });
        } else {
            onUpdateUser(userData);
        }
    }

    return (
        <Modal
            onClose={() => {
                updateShowUserForm(false);
            }}
            isOpen={showUserForm}
            title={
                <h3>
                    Edit Your Profile
                </h3>
            }
            footer={
                <div className={`${styles.row} ${styles['form-save-cancel-buttons']}`.trim()}>
                    <Button size="sm" onClick={onCancel}>Cancel</Button>
                    <Button size="sm" selected={true} onClick={handleSave}>Save</Button>
                </div>
            }
        >
            <div className={styles['user-form']}>
                <div className={styles.row}>
                    <Input
                        onFocus={() => {
                            handleDataUpdate({
                                first_name_error_obj: {
                                    message: '',
                                    messageType: ''
                                }
                            });
                        }}
                        value={first_name || ''}
                        onChange={e => handleDataUpdate({ first_name: e.target.value })}
                        placeholder="First Name"
                        message={first_name_error_obj?.message}
                        messageType={first_name_error_obj?.messageType}
                    />
                    <Input
                        onFocus={() => {
                            handleDataUpdate({
                                last_name_error_obj: {
                                    message: '',
                                    messageType: ''
                                }
                            });
                        }}
                        value={last_name || ''}
                        onChange={e => handleDataUpdate({ last_name: e.target.value })}
                        placeholder="Last Name"
                        message={last_name_error_obj?.message}
                        messageType={last_name_error_obj?.messageType}
                    />
                </div>
                <div className={styles['row-single']}>
                    <Input
                        onFocus={() => {
                            handleDataUpdate({
                                email_error_obj: {
                                    message: '',
                                    messageType: ''
                                }
                            });
                        }}
                        value={email || ''}
                        onChange={e => handleDataUpdate({ email: e.target.value })}
                        placeholder="Email"
                        message={email_error_obj?.message}
                        messageType={email_error_obj?.messageType}
                    />
                </div>
                <div className={styles.links}>
                    <div className={styles['input-section']}>
                        <FacebookCircle />
                        <Input
                            value={facebook || ''}
                            onChange={e => handleDataUpdate({ facebook: e.target.value })}
                            placeholder="Facebook profile"
                        />
                    </div>
                    <div className={styles['input-section']}>
                        <LinkedIn />
                        <Input
                            value={linkedin || ''}
                            onChange={e => handleDataUpdate({ linkedin: e.target.value })}
                            placeholder="LinkedIn profile"
                        />
                    </div>
                    <div className={styles['input-section']}>
                        <LinkIcon />
                        <Input
                            value={website || ''}
                            onChange={e => handleDataUpdate({ website: e.target.value })}
                            placeholder="personal website"
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default UserForm;
