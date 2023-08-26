import { useEffect,useState } from 'react';
import {Comment, Loader,FriendList} from '../components';
import { getPosts } from '../api';
import {useAuth} from '../hooks';
import styles from '../styles/home.module.css';
import { Link } from 'react-router-dom';


const Home = () => {
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(true);
  const auth = useAuth();


  useEffect(() =>{

    const fetchPosts = async () =>{
      const response = await getPosts();
      console.log('response',response);
      
      if(response.success){
        setPosts(response.data.posts);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if(loading){
    return <Loader/>
  }


  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        {posts.map((post) => (
          <div className={styles.postWrapper} key={`post-${post._id}`}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1177/1177568.png"
                  alt=""
                />
                <div>
                  <Link
                    to={{
                      pathname: `/user/${post.user._id}`,
                      state: {
                        user: post.user,
                      },
                    }}
                    className={styles.postAuthor}
                  >
                    {post.user.name}
                  </Link>
                  <span className={styles.postTime}>a minute ago</span>
                </div>
              </div>
              <div className={styles.postContent}>{post.conent}</div>

              <div className={styles.postActions}>
                <div className={styles.postLike}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
                    alt="likes-icon"
                  />
                  <span>5</span>
                </div>

                <div className={styles.postCommentsIcon}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/1380/1380338.png"
                    alt="comments-icon"
                  />
                  <span>{post.comments.length}</span>
                </div>
              </div>
              <div className={styles.postCommentBox}>
                <input placeholder="Start typing a comment" />
              </div>

              <div className={styles.postCommentsList}>
                {post.comments.map((comment) => (
                  <Comment comment={comment} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {auth.user && <FriendList />}
    </div>
  );
};

export default Home;
