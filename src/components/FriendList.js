import styles from '../styles/home.module.css';
import {useAuth} from '../hooks';
import { Link } from 'react-router-dom';



const FriendList = () => {
    const auth = useAuth();
    const { friends = [] } = auth.user;


    return (
        <div className={styles.friendsList}>
            <div className={styles.header}>
                {friends && friends.length === 0 && (
                    <div className={styles.noFriends}>No friends found</div>
                )}

                {friends && friends.map( friend => <div key={`friend-${friend._id}`}>
                    <Link className={styles.friendsItem} to={`/user/${friend._id}`}>
                        <div className={styles.postAvatar}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/1177/1177568.png"
                                alt=""
                            />
                        </div> 
                        <div className={styles.friendsName}>{friend.to_user.email}</div>   
                    </Link> 
                    </div>   
                )}

            </div>

        </div>
    );
};

export default FriendList;