import MicRecorder from "mic-recorder-to-mp3";
import { useEffect, useState, useRef } from "react";

const App = () => {
  const recorder = useRef(null); //Recorder
  const audioPlayer = useRef(null); //Ref for HTML Audio tag
  const timer = useRef(null); //Ref for interval object
  const time = useRef(0); //Stores the value of time
  const displayTime = useRef(null); //Stores dom ref for div to be used to display time

  const [blobURL, setBlobUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    //Declares the recorder object and stores it in ref
    recorder.current = new MicRecorder({ bitRate: 128 });
  }, []);

  const startRecording = () => {
    //start() returns a promise incase if audio is not blocked by browser
    recorder.current.start().then(() => {
      setIsRecording(true);
    });
  };

  const stopRecording = () => {
    recorder.current
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const newBlobUrl = URL.createObjectURL(blob); //generates url from blob
        setBlobUrl(newBlobUrl); //refreshes the page
        setIsRecording(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    //start/stops timer depending on recording state
    if (isRecording) {
      startTimer();
    } else {
      stopTimer();
    }
  }, [isRecording]);

  const playPause = () => {
    //Handle play/pause of audio on click of play/pause button
    const player = audioPlayer.current;

    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
    setPlay(!play);
  };

  const handlePrev = () => {
    //sets the playback time to 0 when clicked on previous button
    audioPlayer.current.currentTime = 0;
  };

  const startTimer = () => {
    //sets interval that updates time on UI every second
    time.current = 0;
    timer.current = setInterval(() => {
      time.current = time.current + 1;
      displayTime.current.innerText = time.current;
      //Displays time by updating the DOM directly
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timer.current);
  };

  const setTime = () => {
    if (audioPlayer.current) {
      displayTime.current.innerText = Math.floor(audioPlayer.current.duration);
      //Displays time by updating the DOM directly
      //Note: Math.floor is used since audio time is in decimal and player only displays floor values
      //eg 3.86 will be displayed as 3 seconds in player
    }
  };

  return (
    <div>
      <button onClick={startRecording} disabled={isRecording}>
        Record
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop
      </button>
      <audio
        ref={audioPlayer}
        src={blobURL}
        controls="controls"
        onLoadedMetadata={setTime} //fethches metadata info like duration
        onTimeUpdate={setTime} //event handler whenever time progresses on player
        onEnded={() => setPlay(false)} //event handler when audio has stopped playing
      />
      <button onClick={playPause} disabled={!blobURL}>
        {play ? "Pause" : "Play"}
      </button>{" "}
      {/*handle play/pause*/}
      <button onClick={handlePrev} disabled={!blobURL}>
        Previous
      </button>{" "}
      {/*handle previous*/}
      <p ref={displayTime}>Time {timer.current}</p> {/*Displays time*/}
    </div>
  );
};

export default App;
