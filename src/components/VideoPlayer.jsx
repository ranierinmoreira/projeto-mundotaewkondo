import { useEffect, useRef, useState } from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ video, onClose }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFallback, setShowFallback] = useState(!video.isYouTube);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('ended', handleEnded);

    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const videoElement = videoRef.current;
    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
  };

  const handleSeek = (e) => {
    const videoElement = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    videoElement.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const videoElement = videoRef.current;
    if (isMuted) {
      videoElement.volume = volume;
      setIsMuted(false);
    } else {
      videoElement.volume = 0;
      setIsMuted(true);
    }
  };

  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate);
    videoRef.current.playbackRate = rate;
    setShowSettings(false);
  };

  const toggleFullscreen = () => {
    const videoElement = videoRef.current;
    if (!isFullscreen) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(showControls);
    setTimeout(() => setShowControls(false), 3000);
  };

  if (!video) return null;

  return (
    <div className="video-player-modal" onClick={onClose}>
      <div className="video-player-container" onClick={(e) => e.stopPropagation()}>
        <div className="video-wrapper" onMouseMove={handleMouseMove}>
          {video.isYouTube ? (
            <iframe
              className="video-element youtube-video"
              src={video.videoUrl}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="video-container">
              {!showFallback && (
                <video
                  ref={videoRef}
                  className="video-element"
                  src={video.videoUrl}
                  poster={video.thumbnail}
                  onClick={togglePlay}
                  onError={() => {
                    console.log('Erro ao carregar vídeo, mostrando fallback');
                    setShowFallback(true);
                  }}
                />
              )}
              {showFallback && (
                <div className="video-fallback">
                  <div className="fallback-content">
                    <div className="fallback-icon">🎬</div>
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                    <div className="fallback-info">
                      <span>👨‍🏫 {video.instructor}</span>
                      <span>📊 {video.difficulty}</span>
                      <span>⏱️ {video.duration}</span>
                    </div>
                    <button className="fallback-play-btn" onClick={() => {
                      setShowFallback(false);
                      setTimeout(() => {
                        if (videoRef.current) {
                          videoRef.current.play().catch(console.error);
                        }
                      }, 100);
                    }}>
                      ▶️ Reproduzir Vídeo
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {showControls && !video.isYouTube && (
            <div className="video-controls">
              <div className="progress-bar" onClick={handleSeek}>
                <div 
                  className="progress-fill" 
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
                <div 
                  className="progress-handle" 
                  style={{ left: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              
              <div className="controls-row">
                <div className="left-controls">
                  <button className="control-btn" onClick={togglePlay}>
                    {isPlaying ? '⏸️' : '▶️'}
                  </button>
                  
                  <div className="volume-control">
                    <button className="control-btn" onClick={toggleMute}>
                      {isMuted ? '🔇' : '🔊'}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="volume-slider"
                    />
                  </div>
                  
                  <span className="time-display">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                
                <div className="right-controls">
                  <button 
                    className="control-btn" 
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    ⚙️
                  </button>
                  
                  <button className="control-btn" onClick={toggleFullscreen}>
                    {isFullscreen ? '🔲' : '⛶'}
                  </button>
                  
                  <button className="control-btn close-btn" onClick={onClose}>
                    ✕
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {showSettings && (
            <div className="settings-panel">
              <h4>Velocidade de Reprodução</h4>
              <div className="speed-options">
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
                  <button
                    key={speed}
                    className={`speed-btn ${playbackRate === speed ? 'active' : ''}`}
                    onClick={() => changePlaybackRate(speed)}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="video-info-panel">
          <h3>{video.title}</h3>
          <p>{video.description}</p>
          <div className="video-details">
            <span>👨‍🏫 {video.instructor}</span>
            <span>📊 {video.difficulty}</span>
            <span>⏱️ {video.duration}</span>
            <span>👁️ {video.views} visualizações</span>
            <span>❤️ {video.likes} curtidas</span>
          </div>
          {video.tags && (
            <div className="video-tags">
              {video.tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
