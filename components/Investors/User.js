import Link from 'next/link';
import Image from 'next/image';

import { ensureAbsolutePath } from '../../helpers/ensureAbsolutePath';

import Button from '../Common/Button';
import FacebookCircle from '../SVG/FacebookCircle';
import LinkedIn from '../SVG/LinkedIn';
import LinkIcon from '../SVG/LinkIcon';
import LocationIcon from '../SVG/LocationIcon';

import styles from './User.module.scss';

const User = ({
    investor,
    handleConnectClick
}) => {
    // const additionalOpportunites = investor?.allOpportunities?.slice(1) || [];
    return (
        <div className={styles['list-user']}>
            <div className={styles['img-and-details']}>
                <Link href={`/profile/${investor?.user_id}`}>
                    <div className={styles['image-container']}>
                        <Image priority={true} layout="fill" alt="profile pic" src={investor?.picture || 'https://getbriidge.s3-accelerate.amazonaws.com/073f282ce936a53931fb3c24114431bb0ecb5c25.png'} quality={50} />
                    </div>
                </Link>
                <div className={styles['short-details']}>
                    {investor?.first_name &&
                        <Link href={`/profile/${investor?.user_id}`}>
                            <h3 className={styles['inner-text']}>{investor?.first_name} {investor?.last_name}</h3>
                        </Link>
                    }
                    {investor?.preferred_location &&
                        <p><LocationIcon />&nbsp;<span className={styles['inner-text']}>{investor?.preferred_location}, US</span></p>
                    }
                    {investor?.facebook &&
                        <a href={ensureAbsolutePath(investor?.facebook)} target="__blank" rel="noopener noreferrer"><FacebookCircle />&nbsp;<span className={styles['inner-text']}>Facebook</span></a>
                    }
                    {investor?.linkedin &&
                        <a href={ensureAbsolutePath(investor?.linkedin)} target="__blank" rel="noopener noreferrer"><LinkedIn />&nbsp;<span className={styles['inner-text']}>LinkedIn</span></a>
                    }
                    {investor?.website &&
                        <a href={ensureAbsolutePath(investor?.website)} target="__blank" rel="noopener noreferrer"><LinkIcon className={styles['link-icon']} />&nbsp;<span className={styles['inner-text']}>{investor?.first_name}&apos;s Website</span></a>
                    }
                    <Button
                        type="button"
                        size="xs"
                        onClick={() => {
                            handleConnectClick(investor);
                        }}
                    >
                        Connect
                    </Button>
                </div>
            </div>
            <div className={styles['long-details']}>
                {investor?.need &&
                    <p className={styles['inner-text']}>Looking for {investor?.need}</p>
                }
                {investor?.investment_amount_max &&
                    (investor?.investment_amount_max < 9999999999
                        ?
                        <p className={styles['inner-text']}>{investor?.investment_amount_min && investor?.investment_amount_max ? `$${Number(investor?.investment_amount_min)?.toLocaleString()} - $${Number(investor?.investment_amount_max)?.toLocaleString()}` : `$${Number(investor?.investment_amount_max)?.toLocaleString()}`} available for investment</p>
                        :
                        <p className={styles['inner-text']}>(No investment amount specified)</p>
                    )
                }
                {investor?.investment_category &&
                    <p className={styles['inner-text']}>Interested in {investor?.investment_category}</p>
                }
                {investor?.ideal_operator_description &&
                    <p className={styles['inner-text-long']}>{investor?.ideal_operator_description}</p>
                }
                {/*additionalOpportunites?.length > 0 &&
                    <Link href={`/profile/${investor?.user_id}`}>
                        <a className={styles['additional-opportunities']}>Additional Opportunities</a>
                    </Link>
                */}
                <Link href={`/profile/${investor?.user_id}`}>
                    <a className={styles['additional-opportunities']}>See all opportunities</a>
                </Link>
            </div>
        </div>
    )
}

export default User;
