import React, { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import FeedItem from '../components/FeedItem';
import db from '../firebase';


const Home = () => {
  const [uploads, loading, error] = useCollection(db.collection('uploads'));

  return (
    <div className="h-full overflow-scroll bg-gray-600 snap snap-y snap-mandatory">
      { uploads?.docs.map(upload => ({ id: upload.id, ...upload.data()})).map(upload => (
        <FeedItem data={upload} key={upload.id} />
      )) }
    </div>
  );
}

export default Home;
