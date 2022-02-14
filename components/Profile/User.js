import Link from 'next/link';
import Image from 'next/image';

import Button from '../Common/Button';
import FacebookCircle from '../SVG/FacebookCircle';
import LinkedIn from '../SVG/LinkedIn';
import LinkIcon from '../SVG/LinkIcon';
import LocationIcon from '../SVG/LocationIcon';

import styles from './User.module.scss';

const User = ({
    user,
    handleConnectClick,
    isEditable,
    handleEdit,
    children
}) => {
    const additionalOpportunites = user?.allOpportunities?.slice(1) || [];
    return (
        <div className={styles['entire-profile-container']}>
            <div className={styles['list-user']}>
                <div className={styles['img-and-details']}>
                    <div className={styles['image-container']}>
                        <img src={user?.picture} alt="profile pic" />
                        {isEditable && <u className={styles['edit-action']} onClick={() => {}}>Change Photo</u>}
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
                            <a href={user?.facebook} target="__blank" rel="noopener noreferrer"><FacebookCircle />&nbsp;<span className={styles['inner-text']}>{user?.facebook}</span></a>
                        }
                        {user?.linkedin &&
                            <a href={user?.linkedin} target="__blank" rel="noopener noreferrer"><LinkedIn />&nbsp;<span className={styles['inner-text']}>{user?.linkedin}</span></a>
                        }
                        {user?.website &&
                            <a href={user?.website} target="__blank" rel="noopener noreferrer"><LinkIcon className={styles['link-icon']} />&nbsp;<span className={styles['inner-text']}>{user?.website}</span></a>
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
