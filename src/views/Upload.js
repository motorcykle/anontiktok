import React, { useEffect, useRef, useState } from 'react';
import firebase from 'firebase';
import { ArrowCircleRightIcon } from '@heroicons/react/solid';
import { useAuthState } from 'react-firebase-hooks/auth';
import db, { auth, storage } from '../firebase';


const Upload = () => {
  const [user, loading, error] = useAuthState(auth);
  const audioNameRef = useRef(null);
  const descRef = useRef(null);
  const filepickerRef = useRef(null);
  const [videoToPost, setVideoToPost] = useState(null);

  function uploadVideo (e) {
    e.preventDefault();
    
    const userUploadsRef = db.collection('users').doc(user.uid).collection('uploads');
    if (videoToPost && user.uid) {
      userUploadsRef.add({
        uid: user.uid,
        audio_name: audioNameRef.current.value || 'original sound - anonymous',
        description: descRef.current.value || '#anontiktok',
        likes: [],
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then((doc) => {
        const uploadTask = storage.ref(`uploads/${user.uid}/${doc.id}`).putString(videoToPost, 'data_url')
        setVideoToPost(null);
        uploadTask.on('state_change', null, error => alert(error), () => {
          storage.ref(`uploads/${user.uid}/${doc.id}`).getDownloadURL().then(url => {
            userUploadsRef.doc(doc.id).set({
              video_url: url
            }, { merge: true })
          })
        })
      })
    }
    e.target.reset();
  }

  const addVideoToPost = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setVideoToPost(readerEvent.target.result)
    }

  }

  return (
    <div className="flex items-center justify-center py-8 h-full flex-col space-y-8">
      <p className="text-4xl text-gray-500">Upload a video! 🎬</p>
      <form className="flex flex-col space-y-8 w-full sm:w-6/12 flex-1" onSubmit={uploadVideo} >
        <div onClick={() => filepickerRef.current.click()} className="bg-gray-100 flex items-center justify-center h-2/6 cursor-pointer rounded-3xl shadow-md text-gray-400 text-xl">
          <input type="file" className="hidden" ref={filepickerRef} onChange={addVideoToPost} />
          {videoToPost ? <p>Video Selected 🥳</p> : <p>Click & Select a video ✅</p>}
        </div>
        <textarea ref={descRef} className="bg-gray-100 rounded-3xl h-1/4 focus:outline-none p-4 text-gray-500 text-lg shadow-md"></textarea>
        <input ref={audioNameRef} type="text" placeholder="Song/audio name" className="focus:outline-none bg-gray-100 rounded-3xl text-xl p-4 shadow-md pl-6"/>
        <button className="rounded-full border-2 w-min mx-auto">
          <ArrowCircleRightIcon className="text-gray-400 h-10" />
        </button>
      </form>
    </div>
  );
}

export default Upload;
