import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/appSlice';
import db, { auth } from '../firebase';

const Profile = () => {
  const userInfo = useSelector(selectUser);
  const [user] = useAuthState(auth);
  const [uploads, loading, error] = useCollection(db.collection('users').doc(user?.uid).collection('uploads'));

  return (
    <div className="">
      <div className="profile__info flex flex-col items-center p-10 border-b-2">
        <div className="profile__infoImg-wrapper h-32 w-32 rounded-full overflow-hidden flex items-center">
          <img src="https://ih1.redbubble.net/image.379005698.8794/flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg" className="" alt="" />
        </div>
        <p className="text-bold text-2xl mt-3 mb-7">@anonymous</p>
        <div className="user__info flex space-x-12">
          <div className="text-center">
            <p className="text-lg font-semibold -mb-2">{userInfo?.followers.length || '0'}</p>
            <small>FOLLOWERS</small>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold -mb-2">{userInfo?.following.length || '0'}</p>
            <small>FOLLOWING</small>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold -mb-2">{uploads?.docs.length || '0'}</p>
            <small>UPLOADS</small>
          </div>
        </div>
      </div>

      <div className="my__uploads grid grid-cols-3 gap-3 p-3">
        {uploads?.docs.map(data => ({ id: data.id, ...data.data()})).map(upload => (
          <video key={upload.id} src={upload.video_url} alt="" />
        ))}
      </div>
      
    </div>
  );
}

export default Profile;
