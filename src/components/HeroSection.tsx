import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
} from 'lucide-react';
import { Language } from '../types';
import { IMAGES, VIDEOS } from '../data/content';

interface HeroSectionProps {
  language: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const isArabic = language === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((err) => {
        console.warn('Playback prevented:', err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newVol = parseFloat(e.target.value);
    if (!videoRef.current) return;
    videoRef.current.volume = newVol;
    setVolume(newVol);
    if (newVol === 0) {
      videoRef.current.muted = true;
      setIsMuted(true);
    } else if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(console.warn);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch((err) => {
        console.warn('Fullscreen request failed:', err);
      });
    } else {
      document.exitFullscreen?.().catch((err) => {
        console.warn('Exit fullscreen failed:', err);
      });
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center px-3 sm:px-8 py-6 sm:py-8 lg:py-12 bg-surface"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center my-auto gap-5 sm:gap-8">
        {/* Monumental, Impactful Headline */}
        <h1 className="font-display-hero text-2xl min-[360px]:text-3xl sm:text-5xl md:text-6xl lg:text-[68px] lg:leading-[74px] xl:text-[76px] xl:leading-[82px] tracking-tight text-on-surface uppercase text-center px-1">
          {isArabic ? (
            <>
              اصنع هوية <span className="italic font-normal text-secondary">ابتسامتك.</span>
            </>
          ) : (
            <>
              BRAND YOUR <span className="italic font-normal text-secondary">SMILE.</span>
            </>
          )}
        </h1>

        {/* Generous 4:3 Aspect Ratio Video Frame */}
        <div
          ref={containerRef}
          id="hero-video-frame"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative aspect-[4/3] w-full max-w-[340px] min-[380px]:max-w-[360px] sm:max-w-[520px] md:max-w-[620px] lg:max-w-[700px] xl:max-w-[760px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg bg-white border border-outline-variant/40 group select-none"
        >
          {/* HTML5 Video Element with 4:3 Presentation & Doctor Consultation Thumbnail */}
          <video
            ref={videoRef}
            loop
            playsInline
            preload="metadata"
            poster={IMAGES.heroChair}
            onPlay={() => {
              setIsPlaying(true);
              setHasStarted(true);
            }}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onClick={() => togglePlay()}
            className="w-full h-full object-cover object-center bg-white cursor-pointer"
          >
            <source src={VIDEOS.heroCinematic} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* High-Fidelity Initial Thumbnail Poster */}
          {!hasStarted && (
            <img
              src={IMAGES.heroChair}
              alt="Crystal Dental Center Consultation"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-500"
            />
          )}

          {/* Central Play/Pause Overlay Button */}
          <div
            onClick={() => togglePlay()}
            className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 pointer-events-auto cursor-pointer ${
              !isPlaying
                ? 'bg-black/20'
                : isHovered
                ? 'bg-black/20'
                : 'bg-transparent pointer-events-none'
            }`}
          >
            {(!isPlaying || isHovered) && (
              <button
                id="hero-video-center-toggle"
                type="button"
                onClick={togglePlay}
                aria-label={
                  isPlaying
                    ? isArabic ? 'إيقاف مؤقت' : 'Pause video'
                    : isArabic ? 'تشغيل الفيديو' : 'Play video'
                }
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-surface/90 hover:bg-surface text-on-surface hover:text-secondary backdrop-blur-md border border-outline-variant/40 flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 sm:w-8 sm:h-8 fill-current" />
                ) : (
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current translate-x-0.5 rtl:-translate-x-0.5 text-on-surface" />
                )}
              </button>
            )}
          </div>

          {/* Comprehensive Video Controls Bar (Seek, Fullscreen, Volume, Mute, Restart) */}
          <div
            className={`absolute bottom-0 inset-x-0 p-2.5 sm:p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2 transition-opacity duration-300 ${
              isPlaying && !isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            {/* Seek Progress Bar */}
            <div className="w-full flex items-center gap-2">
              <input
                id="hero-video-seek"
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                aria-label="Seek video position"
                className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-secondary focus:outline-none hover:h-2 transition-all"
                style={{
                  background: `linear-gradient(to right, #b49b67 ${progressPercent}%, rgba(255,255,255,0.25) ${progressPercent}%)`,
                }}
              />
            </div>

            {/* Bottom Actions Row: Mobile-Optimized */}
            <div className="flex items-center justify-between text-white text-xs sm:text-sm">
              {/* Left Controls: Play/Pause, Restart, Time */}
              <div className="flex items-center gap-1.5 sm:gap-3">
                <button
                  id="hero-video-play-btn"
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="p-2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-md hover:text-secondary transition-colors cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  )}
                </button>

                <button
                  id="hero-video-restart-btn"
                  type="button"
                  onClick={handleRestart}
                  aria-label="Restart video"
                  className="p-2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-md hover:text-secondary transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <span className="font-mono text-[11px] sm:text-xs text-white/85 tabular-nums">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Right Controls: Volume + Fullscreen */}
              <div className="flex items-center gap-1.5 sm:gap-3">
                {/* Volume & Mute */}
                <div className="flex items-center gap-1.5">
                  <button
                    id="hero-video-mute-btn"
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="p-2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-md hover:text-secondary transition-colors cursor-pointer"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>

                  <input
                    id="hero-video-volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    aria-label="Adjust volume"
                    className="hidden min-[480px]:block w-14 sm:w-20 h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-secondary focus:outline-none"
                  />
                </div>

                {/* Fullscreen Toggle */}
                <button
                  id="hero-video-fullscreen-btn"
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  className="p-2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-md hover:text-secondary transition-colors cursor-pointer"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
