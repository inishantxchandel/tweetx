import React,{useState,useEffect} from 'react'
import UserList from '../components/UserList'
import Layout from '../components/Layout'
import { ref,onValue } from 'firebase/database';
import { database } from '../config';
const Users = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user.uid
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const dbRef = ref(database, 'users');

    onValue(dbRef, (snapshot) => {
      let records = [];

      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.uid !== userId){
          records.push(childData);
          
          

        }
      })
      setUsers(records);
    });
  }, [userId]);
  return (
    <Layout>
    <div className="max-w-2xl mx-auto my-6 px-5">

   <UserList userData={users}/>


    </div>
    </Layout>
  )
}

export default Users