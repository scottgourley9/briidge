import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

import { useUploadPhoto } from './hooks/useUploadPhoto';

import { ensureAbsolutePath } from '../../helpers/ensureAbsolutePath';

import Button from '../Common/Button';
import FacebookCircle from '../SVG/FacebookCircle';
import LinkedIn from '../SVG/LinkedIn';
import LinkIcon from '../SVG/LinkIcon';
import LocationIcon from '../SVG/LocationIcon';
import Alert from '../Common/Alert';
import Spinner from '../Common/Spinner';

import styles from './User.module.scss';

const User = ({
    user,
    handleConnectClick,
    isEditable,
    handleEdit,
    children,
    onGetUserData,
    getUserSuccess,
    getUserError
}) => {
    const imageInputRef = useRef();

    const [photoErrorMessage, updatePhotoErrorMessage] = useState('');
    const [showPhotoLoading, updateShowPhotoLoading] = useState(false);

    const { onUploadPhoto, isSuccess, isError, data } = useUploadPhoto();

    useEffect(() => {
        if (data && isSuccess) {
            onGetUserData({ userId: user?.id });
        } else if (isError) {
            updateShowPhotoLoading(false);
            updatePhotoErrorMessage("We're sorry, there was an issue uploading you photo.");
        }
    }, [data]);

    useEffect(() => {
        let timeout;
        if (showPhotoLoading) {
            timeout = setTimeout(() => {
                updateShowPhotoLoading(false);
            }, 500);
        }

        return () => {
            clearTimeout(timeout);
        }
    }, [getUserSuccess, getUserError]);

    const previewFile = () => {
        updatePhotoErrorMessage('');
        const file = (imageInputRef?.current?.files?.[0]);

        if (!file) {
            return;
        } else if (file?.size > 5000000) {
            updatePhotoErrorMessage('This photo is too large. Please ensure the photo is less than 5MB');

            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            const ext = file.name.split('.');
            updateShowPhotoLoading(true);
            onUploadPhoto({
                imageName: file.name,
                imageBody: reader.result,
                imageExtension: ext[ext.length - 1],
                userId: user?.id
            });
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const additionalOpportunites = user?.allOpportunities?.slice(1) || [];

    return (
        <div className={styles['entire-profile-container']}>
            {photoErrorMessage &&
                <Alert size="sm" type="error">{photoErrorMessage}</Alert>
            }
            <div className={styles['list-user']}>
                <div className={styles['img-and-details']}>
                    <div className={styles['image-section']}>
                        {showPhotoLoading ?
                            <div className={styles['loading-img']}>
                                <Spinner />
                            </div>
                            :
                            <div className={styles['image-container']}>
                                <Image layout="fill" alt="profile pic" src={user?.picture || 'https://getbriidge.s3-accelerate.amazonaws.com/073f282ce936a53931fb3c24114431bb0ecb5c25.png'} quality={100} />
                            </div>
                        }
                        {isEditable && (
                            <>
                                <label htmlFor="changePhotoInput">
                                    <u className={styles['edit-action']}>Change Photo</u>
                                </label>
                                <input className={styles['file-input-hidden']} type="file" id="changePhotoInput" ref={imageInputRef} onChange={previewFile} accept='image/*' />
                            </>
                        )}
                    </div>
                    <div className={styles['short-details']}>
                        {user?.first_name &&
                            <div className={styles['name-and-connect']}>
                                <h3 className={styles['name']}>{user?.first_name} {user?.last_name}</h3>
                                {!isEditable ?
                                    <Button
                                        containerClassName={styles['user-connect-button']}
                                        type="button"
                                        size="xs"
                                        onClick={() => {
                                            handleConnectClick(user);
                                        }}
                                    >
                                        Connect
                                    </Button>
                                    :
                                    <div className={styles['connect-buttons']}>
                                        <Button
                                            containerClassName={styles['user-connect-button']}
                                            type="button"
                                            size="xs"
                                            onClick={() => {
                                                handleEdit(user, 'user');
                                            }}
                                        >
                                            Edit Profile
                                        </Button>
                                        <Button
                                            containerClassName={styles['user-connect-button']}
                                            type="button"
                                            size="xs"
                                            onClick={() => { if (typeof window === 'object') window?.location?.href = '/api/auth/logout' }}
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                }
                            </div>
                        }
                        {user?.preferred_location &&
                            <p><LocationIcon />&nbsp;<span className={styles['inner-text']}>{user?.preferred_location}, US</span></p>
                        }
                        {user?.facebook &&
                            <a href={ensureAbsolutePath(user?.facebook)} target="__blank" rel="noopener noreferrer"><FacebookCircle />&nbsp;<span className={styles['inner-text']}>Facebook</span></a>
                        }
                        {user?.linkedin &&
                            <a href={ensureAbsolutePath(user?.linkedin)} target="__blank" rel="noopener noreferrer"><LinkedIn />&nbsp;<span className={styles['inner-text']}>LinkedIn</span></a>
                        }
                        {user?.website &&
                            <a href={ensureAbsolutePath(user?.website)} target="__blank" rel="noopener noreferrer"><LinkIcon className={styles['link-icon']} />&nbsp;<span className={styles['inner-text']}>{isEditable ? 'Your' : `${user?.first_name}'s`} Website</span></a>
                        }
                        {!isEditable ?
                            <Button
                                containerClassName={styles['user-connect-button-mobile']}
                                type="button"
                                size="xs"
                                onClick={() => {
                                    handleConnectClick(user);
                                }}
                            >
                                Connect
                            </Button>
                            :
                            <>
                                <Button
                                    containerClassName={styles['user-connect-button-mobile']}
                                    type="button"
                                    size="xs"
                                    onClick={() => {
                                        handleEdit(user, 'user');
                                    }}
                                >
                                    Edit Profile
                                </Button>
                                <Button
                                    containerClassName={styles['user-connect-button-mobile']}
                                    type="button"
                                    size="xs"
                                    onClick={() => { if (typeof window === 'object') window?.location?.href = '/api/auth/logout' }}
                                >
                                    Logout
                                </Button>
                            </>
                        }
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}

export default User;
