import { useParams,useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Loader } from '../components';
import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { addFriend, fetchUserProfile,removeFriend } from '../api';


const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading,setLoading] = useState(true);
  const [requestInProgress,setRequestInProgress] = useState(false);
  const { userId } = useParams();
  const {addToast} = useToasts();
  const history = useNavigate();
  const auth = useAuth();

  
  useEffect( () => {
    const getUser = async () =>{

      const response = await fetchUserProfile(userId);
     
      if(response.success){
        setUser(response.data.user);
        
      } else {
          addToast(response.message,{appearance:'error'});
          return history('/');
      }
      setLoading(false);
    };
    getUser();
  },[userId,history,addToast]);

  if(loading){
    return <Loader />
  }

  const checkIfUserIsAFriend = () => {
    const friends  = auth.user.friends;

    const friendIds = friends && friends.map(friend => friend.to_user._id);
    const index = friendIds && friendIds.indexOf(userId);

    if(index !== -1){
      return true;
    }
    return false;
  }


  const handleRemoveFriendClick =async () => {
    setRequestInProgress(true);

    const response = await removeFriend(userId);

    if(response.success){
      const friendship = auth.user.friends.filter(friend => 
        friend.to_user._id === userId
        );
      
      auth.updateUserFriends(false, friendship[0]);
      addToast('friend removed successfully!!',{appearance:'success'});
    } else {
      addToast(response.message,{appearance:'error'});
    }

    setRequestInProgress(false);
  };

  const handleAddFriendClick =async () => {
    
    setRequestInProgress(true);

    const response = await addFriend(userId);

    if(response.success){
      const{friendship} = response.data;
      
      auth.updateUserFriends(true, friendship);
      addToast('friend added successfully!!',{appearance:'success'});
    } else {
      addToast(response.message,{appearance:'error'});
    }

    setRequestInProgress(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/1177/1177568.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
         <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
          >
            {requestInProgress ? 'Removing friend...' : 'Remove friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Adding friend...' : 'Add friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
