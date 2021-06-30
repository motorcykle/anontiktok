import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import FeedItem from '../components/FeedItem';
import db from '../firebase';


const Home = () => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {

    db.collection('users').get().then(data => {
      data.docs.forEach(user => {
        user.ref.collection('uploads').get().then(data => {
          setUploads(prev => [...prev, ...data.docs.map(upload => ({  id: upload.id, ...upload.data()}))])
        }).catch(err => console.log(err))
      })
    }).catch(err => console.log(err))

  }, [])

  return (
    <div className="h-full overflow-scroll bg-gray-600 snap snap-y snap-mandatory container mx-auto">
      { uploads?.map(upload => (
        <FeedItem data={upload} key={upload.id} />
      )) }
    </div>
  );
}

export default Home;
