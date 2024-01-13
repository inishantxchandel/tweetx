import WriteText from "../components/WriteText";
import PostList from "../components/PostList";
import Layout from '../components/Layout';
import { get,ref,onValue } from 'firebase/database';
import { database } from '../config';
import { useState,useEffect } from "react";

const Feed = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user.uid
  const [feedData, setFeedData] = useState([]);
  let has10Posts = 0;
  const fetchData = async () => {
    const followingRef = ref(database, `Following/${userId}`);
    const snapshot = await get(followingRef);
    if (!snapshot.exists()) {
      setFeedData([]);
      return;
    }
    const followingData = Object.keys(snapshot.val());
  
    let newFeedData = [];
  
    for (const followingId of followingData) {
      const followingPostRef = ref(database, `posts/${followingId}`);
      const followingPostSnapshot = await get(followingPostRef);
  
      if (followingPostSnapshot.exists() && followingPostSnapshot.size >= 10 && has10Posts < 3) {
        has10Posts++;
        newFeedData = newFeedData.concat(Object.values(followingPostSnapshot.val()));
      }
  
      if (has10Posts >= 3) {
        break;  // Break out of the loop if the condition is met
      }
    }
  
    if (has10Posts < 3) {
      setFeedData([]);
    } else {
      setFeedData(newFeedData);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  if(!has10Posts>=3){
    setFeedData([]);


  }
  feedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return (
    <Layout>
    <WriteText isOpen={isOpen} setIsOpen={setIsOpen}/>
    <div className="max-w-2xl mx-auto my-6 px-5">
      <button onClick={() => setIsOpen(true)} className="bg-rose-400 hover:bg-rose-500 px-6 py-2 text-white rounded-md font-medium">
        Write
      </button>
      <PostList feedData={feedData}/>

    </div>
    </Layout>
  );
};

export default Feed;
