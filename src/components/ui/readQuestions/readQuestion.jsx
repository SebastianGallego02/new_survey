import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faRedoAlt } from "@fortawesome/free-solid-svg-icons";

const AudioPlayer = ({ audio }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      audioElement
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("Audio playback failed:", error);
          setIsPlaying(false);
        });
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
      <div className="flex justify-center">
        <button
          onClick={toggleAudio}
          disabled={isPlaying}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-white transition-colors ${
            isPlaying
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-400 hover:bg-blue-600"
          }`}
        >
          <FontAwesomeIcon 
            icon={isPlaying ? faRedoAlt : faCirclePlay} 
            className="text-sm" 
          />
        </button>
      </div>

      <audio
        ref={audioRef}
        src={audio}
        className="mt-2 w-full"
        preload="metadata"
        onEnded={handleAudioEnd}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default AudioPlayer;