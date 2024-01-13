import React, { useState, useEffect } from 'react';
import { ref, update, get } from 'firebase/database';
import { database } from '../config';

const UserList = ({ userData }) => {
  console.log(userData)
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.uid;

  const [isFollowedStatus, setIsFollowedStatus] = useState([]);
  const [followingCount, setFollowingCount] = useState([]);
  async function followUser(userId, targetUserId,index) {
    try {
      setIsFollowedStatus(prevState => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      })
      const followersRef = ref(database, `Followers/${targetUserId}`);
      const followingRef = ref(database, `Following/${userId}`);

      await update(followersRef, { [userId]: true });

      // Update the following relationship in Following table
      await update(followingRef, { [targetUserId]: true });

      console.log(`User ${userId} is now following ${targetUserId}`);
      // Trigger a re-render by updating the isFollowedStatus state
    } catch (error) {
      console.error('Error following user:', error);
      alert('Error following user: ' + error.message);
    }
  }

  async function fetchFollowStatus(userId, targetUserId) {
    try {
      const followingRef = ref(database, `Following/${userId}`);
      const followingSnapshot = await get(followingRef);
      return followingSnapshot.exists() && followingSnapshot.val()[targetUserId] !== undefined;
    } catch (error) {
      console.error('Error checking if user is followed:', error);
      alert('Error checking if user is followed: ' + error.message);
      return false;
    }
  }
  async function fetchFollowingCount(targetUserId) {
    try {
      const followingRef = ref(database, `Following/${targetUserId}`);
      const followingSnapshot = await get(followingRef);
      return followingSnapshot.exists() ? Object.keys(followingSnapshot.val()).length : 0;
    } catch (error) {
      console.error('Error fetching following count:', error);
      alert('Error fetching following count: ' + error.message);
      return 0;
    }
  }

  useEffect(() => {
    Promise.all(userData.map(user => fetchFollowStatus(userId, user.uid)))
      .then(results => setIsFollowedStatus(results));
  }, [userId, userData]);
  useEffect(() => {
    Promise.all(userData.map(user => fetchFollowingCount(user.uid)))
      .then(results => setFollowingCount(results));
  }, [userId, userData]);

  return (
    <div className="flex flex-col gap-6 mt-6">
      {userData.map((user, index) => (
        <div key={user.uid} className="flex justify-between items-center border-b border-gray-300 pb-10 pt-4 px-8 relative overflow-hidden">
          <div className='flex flex-col sm:flex-row'>
            <div>
              <img
                src={user.photoURL}
                onError={(e) => (e.target.src = "/defaultImg.png")}
                className="size-12 md:size-16 mr-4 rounded-full border object-cover border-gray-600"
                alt="author-img"
              />
            </div>
            <div className="flex flex-col md:mt-4">
              <h4 className="text-lg font-medium text-gray-600">
                {user.displayName}
              </h4>
              <p className="text-gray-400 font-light">Following: {followingCount[index]}</p>
            </div>
          </div>
          {isFollowedStatus[index] ?
            <button
            className={`text-gray-400 px-6 py-2  rounded-md font-medium`}>
            Following
          </button>:
          <button
          onClick={() => followUser(userId, user.uid,index)}
          className={`text-white bg-rose-400 px-6 py-2  rounded-md font-medium`}>
          Follow
        </button>}
        </div>
      ))}
    </div>
  );
};

export default UserList;
