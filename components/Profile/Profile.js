import styles from './Profile.module.scss';

const Profile = ({ user }) => {
    console.log(user);
    return (
        <section className={styles['profile-page-wrapper']}>
        {user &&
            <div>
                <img src={user.picture} alt={user.first_name} />
                <h2>{user.first_name} {user.last_name}</h2>
                <p>{user.email}</p>
                <a href="/api/auth/logout">Logout</a>
            </div>
        }
        </section>
    );
}

export default Profile;
