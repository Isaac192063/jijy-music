import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import formatTime from '@/shared/utils/FormatTime';
import { RowSong } from '../components/RowSong';
import { useSongStorage } from '@/store/SongStorage';

// Componente principal
const SongList = () => {
  // Datos de ejemplo (estos vendrían del backend)

  
  const { songs, fetchSongs, loading, error } = useSongStorage();

  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(()=>{
    const fetchSongsEfect = async () => {
      try {
        await fetchSongs();
      } catch (error) {
        console.log("Error al cargar las canciones:", error);
      }
    }
    fetchSongsEfect();
  }, [])
  
  useEffect(() => {
    if (currentSongIndex !== null && audioRef.current) {
      audioRef.current.src = songs[currentSongIndex].url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSongIndex, songs]);


  // Control de reproducción
  const togglePlayPause = (index: number) => {
    if (currentSongIndex === index) {
      // Toggle play/pause para la canción actual
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    } else {
      // Reproducir una nueva canción
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };
  
  const handleSeek = (newValue: number[]) => {
    if (audioRef.current) {
      const newTime = newValue[0];
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  const handleVolumeChange = (newValue: number[]) => {
    const newVolume = newValue[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };
  
  const handleSongEnd = () => {
    if (currentSongIndex !== null && currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  if (error) return <p className="text-red-500 text-center">{error}</p>;


  if(loading){
    return <div className='text-center'>Cargando...</div>
  }

  return (
    <div className="w-full p-4 bg-gray-100 rounded-xl shadow-md">
  {/* Player controls */}
  <div className="mb-4 p-4 bg-gradient-to-r from-orange-300 to-orange-200 rounded-lg text-gray-800 shadow">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <Music size={20} className="mr-2 text-gray-700" />
        <h2 className="text-lg font-bold">
          {currentSongIndex !== null ? songs[currentSongIndex].title : "Selecciona una canción"}
        </h2>
      </div>
      <div className="flex items-center">
        <button 
          onClick={toggleMute}
          className="p-2 text-gray-600 hover:text-gray-800 transition"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <Slider
          value={[isMuted ? 0 : volume]}
          min={0}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-24 ml-2"
        />
      </div>
    </div>

    {currentSongIndex !== null && (
      <>
        <p className="text-sm mb-2 text-gray-700">
          {songs[currentSongIndex].artist} • {songs[currentSongIndex].album}
        </p>
        
        <Slider
          value={[currentTime]}
          min={0}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          className="mb-1"
        />
        
        <div className="flex justify-between text-xs text-gray-600">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </>
    )}

    {/* Hidden audio element */}
    <audio 
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onEnded={handleSongEnd}
    />
  </div>

  {/* Songs table */}
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="min-w-full divide-y divide-gray-300">
      {/* Table Header */}
      <div className="bg-gray-200 border-b border-gray-300">
        <div className="flex text-orange-700 text-left text-sm font-medium">
          <div className="w-14 py-3 px-3"></div>
          <div className="px-3 py-3 flex-1">Título</div>
          <div className="px-3 py-3 flex-1 hidden md:block">Artista</div>
          <div className="px-3 py-3 flex-1 hidden md:block">Álbum</div>
          <div className="px-3 py-3 flex-1 hidden md:block">Géneros</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="bg-white divide-y divide-gray-300">
        {songs.map((song, index) => (
         
          <RowSong
            key={song.id}
            song={song}
            currentSongIndex={currentSongIndex}
            index={index}
            togglePlayPause={togglePlayPause}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  </div>
</div>

  );
};

export default SongList;