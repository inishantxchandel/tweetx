import { Fragment } from "react";
import { useState,useEffect } from "react";
import { Tab } from "@headlessui/react";
import PostList from "../components/PostList";
import UserList from "./UserList";
import { get,ref,onValue } from 'firebase/database';
import { database } from '../config';

export default function ProfileTab() {
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user.uid
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  useEffect(() => {
    const dbRef = ref(database, `posts/${userId}`);
    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.userId === userId){
        records.push(childData);
        }
      })
      localStorage.setItem('userPostCount',records.length);
      setPosts(records);
    });
    const followersRef = ref(database, `Followers/${userId}`);
    const followingRef = ref(database, `Following/${userId}`);
    onValue(followersRef, (snapshot) => {
      if (snapshot.exists()) {
        const followersData = Object.keys(snapshot.val());
        followersData.forEach(async (followerId) => {
          const followerUserRef = ref(database, `users/${followerId}`);

          const followerUserSnapshot = await get(followerUserRef);
          if(followerUserSnapshot.exists()){
            const followerUserData = followerUserSnapshot.val();
            setFollowers((prevFollowers) => [...prevFollowers, followerUserData]);
          }
        })
      } else {
        setFollowers([]);
      }
    });

    // Fetch user's following
    onValue(followingRef, (snapshot) => {
      if (snapshot.exists()) {
        const followingData = Object.keys(snapshot.val());
        
        followingData.forEach(async (followingId) => {
          const followingUserRef = ref(database, `users/${followingId}`);
          const followingUserSnapshot = await get(followingUserRef);
          if(followingUserSnapshot.exists()){
            const followingUserData = followingUserSnapshot.val();
            followingUserData["isFollowed"] = true;
            setFollowing((prevFollowing) => [...prevFollowing, followingUserData]);
          }
    
        })
      } else {
        setFollowing([]);
      }
    });
  }, [userId]);

  return (
    <>
      {/* Tabs: Default Justified */}
      <div className=" mt-12">
        <Tab.Group>
          {/* Nav Tabs */}
          <Tab.List className="flex items-center border-t border-gray-200/75 text-sm">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`-mb-px flex grow items-center justify-center space-x-2 border-t-2 px-3 py-3 font-medium focus:outline-none  md:px-5 ${
                    selected
                      ? "border-gray-700 text-gray-600"
                      : "border-transparent text-gray-200 "
                      
                  }hover:btext-gray-700`}
                >
                  Posts
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`-mb-px flex grow items-center justify-center space-x-2 border-t-2 px-3 py-3 font-medium focus:outline-none  md:px-5 ${
                    selected
                      ? "border-gray-700 text-gray-600"
                      : "border-transparent text-gray-200 "
                  }
                  hover:text-gray-700` }
                >
                  Followers
                </button>
              )}
            </Tab>{" "}
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`-mb-px flex grow items-center justify-center space-x-2 border-t-2 px-3 py-3 font-medium focus:outline-none  md:px-5 ${
                    selected
                      ? "border-gray-700 text-gray-600"
                      : "border-transparent text-gray-200 "
                  } hover:text-gray-700`}
                >
                  Following
                </button>
              )}
            </Tab>
          </Tab.List>
          {/* END Nav Tabs */}

          {/* Tab Content */}
          <Tab.Panels className="py-6">
            <Tab.Panel>
              <PostList feedData={posts} />
            </Tab.Panel>
            <Tab.Panel>
              <UserList userData={followers} />
            </Tab.Panel>
            <Tab.Panel>
              <UserList userData={following}/>
            </Tab.Panel>
          </Tab.Panels>
          {/* END Tab Content */}
        </Tab.Group>
      </div>
      {/* END Tabs: Default Justified */}
    </>
  );
}
