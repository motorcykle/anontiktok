import React, { useEffect, useRef, useState } from 'react';
import firebase from 'firebase';
import Ticker from 'react-ticker';
import { MusicNoteIcon, HeartIcon, ChatIcon, ShareIcon, CheckIcon } from '@heroicons/react/solid';
import { useAuthState } from 'react-firebase-hooks/auth';
import db, { auth } from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/appSlice';



const FeedItem = ({ data }) => {
  const [user] = useAuthState(auth);
  const userInfo = useSelector(selectUser);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  function followToggle () {
    const refTing = db.collection('users');
    if (userInfo?.following.includes(data?.uid)) {
      refTing.doc(user?.uid).update({
        following: firebase.firestore.FieldValue.arrayRemove(data?.uid)
      });
      refTing.doc(data?.uid).update({
        followers: firebase.firestore.FieldValue.arrayRemove(user?.uid)
      });
    } else {
      refTing.doc(user?.uid).update({
        following: firebase.firestore.FieldValue.arrayUnion(data?.uid)
      });
      refTing.doc(data?.uid).update({
        followers: firebase.firestore.FieldValue.arrayUnion(user?.uid)
      });
    }
  }

  function onVideoPress () {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  }

  return (
    <div className="h-full snap-start sm:grid grid-cols-2 relative overflow-hidden">
      <div className="video__container overflow-hidden bg-black flex items-center h-full">
        <video
        onClick={onVideoPress}
        loop
        controls
        ref={videoRef}
        src={data.video_url}
        className="h-full mx-auto object-contain">
        </video>
      </div>
      <div onClick={onVideoPress} className="videoInfo__container overflow-hidden absolute sm:static top-0 left-0 w-full h-full p-6 space-x-3 flex items-end justify-end sm:space-y-9 sm:flex-col">

        <div className="videoInfo__text text-white w-full overflow-hidden">
          <p className="font-bold">@anonymous</p>
          <p className="my-2">{data.description}</p>
          <div className="videoFooter__ticker flex items-center">
            <MusicNoteIcon className="videoFooter__icon text-gray-200 h-5" />

            <Ticker>
                {({ index }) => (
                    <>
                        <p className="mr-3">{data.audio_name}</p>
                    </>
                )}
            </Ticker>

          </div>
        </div>

        <div onClick={(e) => e.stopPropagation()} className="videoInfo__sidebar flex flex-col sm:flex-row sm:justify-between sm:w-full space-y-3 items-center">
          {user?.uid !== data?.uid && <div className="user_follow">
            <button className="relative" onClick={followToggle}>
              <div className="h-10 w-10 bg-white border-2 rounded-full"></div>
              <p className="h-5 w-5 rounded-full text-white bg-red-500 flex justify-center items-center absolute -bottom-2 left-1/4 font-bold">
                {userInfo?.following.includes(data?.uid) ? <CheckIcon className="h-3" /> : '+'}
              </p>
            </button>
          </div>}
          <div className="video_like grid place-items-center">
            <button>
              <HeartIcon className="h-10 text-white" />
            </button>
            <small className="text-white font-semibold">123.1k</small>
          </div>
          <div className="video_comment grid place-items-center">
            <button>
              <ChatIcon className="h-10 text-white" />
            </button>
            <small className="text-white font-semibold">123.1k</small>
          </div>
          <div className="video_share grid place-items-center">
            <button>
              <ShareIcon className="h-10 text-white" />
            </button>
            <small className="text-white font-semibold">123.1k</small>
          </div>
          <div className="relative">
            <MusicNoteIcon className="text-gray-200 h-4 absolute -left-5 animate-pulse" />
            <MusicNoteIcon className="text-gray-200 h-4 absolute -left-4 -top-5 animate-pulse" />
            <MusicNoteIcon className="text-gray-200 h-4 absolute -left-8 -top-8 animate-ping" />
            <img className="videoFooter__record h-12 object-contain animate-spin" src="https://static.thenounproject.com/png/934821-200.png" alt=""/>
          </div>
        </div>

      </div>

    </div>
  );
}

export default FeedItem;
