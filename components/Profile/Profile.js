import styles from './Profile.module.scss';

const Profile = ({ user }) => {
    return (
        <section className={styles['profile-page-wrapper']}>
        {user &&
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <a href="/api/auth/logout">Logout</a>
            </div>
        }
        </section>
    );
}

export default Profile;
