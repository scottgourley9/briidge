import Link from 'next/link';
import Image from 'next/image';

import Button from '../Common/Button';
import FacebookCircle from '../SVG/FacebookCircle';
import LinkedIn from '../SVG/LinkedIn';
import LinkIcon from '../SVG/LinkIcon';
import LocationIcon from '../SVG/LocationIcon';

import styles from './User.module.scss';

const User = ({
    operator,
    handleConnectClick
}) => {
    // const additionalOpportunites = operator?.allOpportunities?.slice(1) || [];
    return (
        <div className={styles['list-user']}>
            <div className={styles['img-and-details']}>
                <Link href={`/profile/${operator?.user_id}`}>
                    <img src={operator?.picture} alt="profile pic" />
                </Link>
                <div className={styles['short-details']}>
                    {operator?.first_name &&
                        <Link href={`/profile/${operator?.user_id}`}>
                            <h3 className={styles['inner-text']}>{operator?.first_name} {operator?.last_name}</h3>
                        </Link>
                    }
                    {operator?.preferred_location &&
                        <p><LocationIcon />&nbsp;<span className={styles['inner-text']}>{operator?.preferred_location}, US</span></p>
                    }
                    {operator?.facebook &&
                        <a href={operator?.facebook} target="__blank" rel="noopener noreferrer"><FacebookCircle />&nbsp;<span className={styles['inner-text']}>{operator?.facebook}</span></a>
                    }
                    {operator?.linkedin &&
                        <a href={operator?.linkedin} target="__blank" rel="noopener noreferrer"><LinkedIn />&nbsp;<span className={styles['inner-text']}>{operator?.linkedin}</span></a>
                    }
                    {operator?.website &&
                        <a href={operator?.website} target="__blank" rel="noopener noreferrer"><LinkIcon className={styles['link-icon']} />&nbsp;<span className={styles['inner-text']}>{operator?.website}</span></a>
                    }
                    <Button
                        type="button"
                        size="xs"
                        onClick={() => {
                            handleConnectClick(operator);
                        }}
                    >
                        Connect
                    </Button>
                </div>
            </div>
            <div className={styles['long-details']}>
                {operator?.need &&
                    <p className={styles['inner-text']}>Looking for {operator?.need}</p>
                }
                {operator?.capital_amount_max &&
                    (operator?.capital_amount_max < 9999999999
                        ?
                        <p className={styles['inner-text']}>{operator?.capital_amount_min && operator?.capital_amount_max ? `$${Number(operator?.capital_amount_min)?.toLocaleString()} - $${Number(operator?.capital_amount_max)?.toLocaleString()}` : `$${Number(operator?.capital_amount_max)?.toLocaleString()}`} needed</p>
                        :
                        <p className={styles['inner-text']}>(No capital amount specified)</p>
                    )
                }
                {operator?.operating_category &&
                    <p className={styles['inner-text']}>Interested in {operator?.operating_category}</p>
                }
                {operator?.ideal_investor_description &&
                    <p className={styles['inner-text-long']}>{operator?.ideal_investor_description}</p>
                }
                {/* additionalOpportunites?.length > 0 &&
                    <Link href={`/profile/${operator?.user_id}`}>
                        <a className={styles['additional-opportunities']}>Additional Opportunities</a>
                    </Link>
                */}
                <Link href={`/profile/${operator?.user_id}`}>
                    <a className={styles['additional-opportunities']}>See all opportunities</a>
                </Link>
            </div>
        </div>
    )
}

export default User;
