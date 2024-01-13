import React,{useState,useEffect} from "react";
import ProfileTab from "../components/ProfileTab";
import Layout from "../components/Layout";
import { ref,onValue } from 'firebase/database';
import { database } from '../config';
const profileData = [
  {
    name: "John Doe",
    following: 100,
    followers: 200,
    posts: 300,
  },
];
const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [followerLength, setFollowerLength] = useState(0);
  const [followingLength, setFollowingLength] = useState(0);
  useEffect(() => {
    
    const followersRef = ref(database, `Followers/${user.uid}`);
    const followingRef = ref(database, `Following/${user.uid}`);
    onValue(followersRef, (snapshot) => {
      if (snapshot.exists()) {
        const followersData = Object.keys(snapshot.val());
        setFollowerLength(followersData.length);
      }
    });
    onValue(followingRef, (snapshot) => {
      if (snapshot.exists()) {
        const followingData = Object.keys(snapshot.val());
        setFollowingLength(followingData.length);
      }
    });
  })
  return (
    <Layout>
    <div className="max-w-2xl mx-auto my-6 px-5">
      {profileData.map((profile) => (
        <div className="flex flex-col items-center  sm:flex-row">
          <img
            src={user.photoURL}
            onError={(e) => (e.target.src = "/defaultImg.png")}
            className="size-20 sm:size-28  sm:mr-20 rounded-full border object-cover border-gray-600"
            alt="author-img"
          />
          <div className="mt-4 sm:mt-6">
            <h1 className="text-xl text-gray-600 font-semibold text-center sm:text-start">
              {user.displayName}
            </h1>
            <div className="flex justify-between sm:justify-start gap-10 text-gray-400 my-6 font-light">
              <p>Following: {followingLength}</p>
              <p> Followers: {followerLength}</p>
              <p>Posts: {localStorage.getItem('userPostCount')} </p>
            </div>
          </div>
        </div>
      ))}
          <ProfileTab/>

    </div>
    </Layout>
  );
};

export default Profile;
