import Link from 'next/link';
import Image from 'next/image';

import styles from './Home.module.scss';

const UserCard = ({ user }) => {
    const {
        photo,
        name,
        type,
        need,
        description,
        width,
        height
    } = user || {};

    return (
        <div className={styles['user-card']}>
            <div className={styles['card-image']} style={{ height, flex: `0 0 ${width}px` }}>
                <Image
                    src={photo}
                    width={width || 150}
                    height={height || 165}
                />
            </div>
            <div className={styles.details}>
                <h3 className={styles['card-title']}>{name}</h3>
                <h4 className={styles['card-subtitle']}>
                    <span>{type}&nbsp;</span><span>{need}</span>
                </h4>
                <p className={styles['card-description']}>{description}</p>
            </div>
        </div>
    )
}

export default UserCard;
