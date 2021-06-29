import React, { useEffect, useRef, useState } from 'react';
import Ticker from 'react-ticker';
import { MusicNoteIcon, HeartIcon, ChatIcon, ShareIcon } from '@heroicons/react/solid';



const FeedItem = ({ data }) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

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
        ref={videoRef}
        src={data.video_url}
        className="h-full mx-auto object-contain">
        </video>
      </div>
      <div className="videoInfo__container overflow-hidden absolute sm:static top-0 left-0 w-full h-full p-6 space-x-3 flex items-end justify-end sm:space-y-9 sm:flex-col">

        {/* DIVIDE THE BELLOW TO TWO COMPONENTS */}
        {/* DIVIDE THE BELLOW TO TWO COMPONENTS */}
        {/* DIVIDE THE BELLOW TO TWO COMPONENTS */}
        {/* DIVIDE THE BELLOW TO TWO COMPONENTS */}
        {/* DIVIDE THE BELLOW TO TWO COMPONENTS */}
        {/* DIVIDE THE BELLOW TO TWO COMPONENTS */}
        {/* DIVIDE THE BELLOW TO TWO COMPONENTS */}

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

        <div className="videoInfo__sidebar flex flex-col sm:flex-row sm:justify-between sm:w-full space-y-3 items-center">
          <div className="user_follow">
            <button className="relative">
              <div className="h-10 w-10 bg-white border-2 rounded-full"></div>
              <p className="h-5 w-5 rounded-full text-white bg-red-500 flex justify-center items-center pb-1 absolute -bottom-2 left-1/4 font-bold">
                +
              </p>
            </button>
          </div>
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
