import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import './MovieModal.css';

export default function MovieModal({ movie, isOpen, onClose, onAddToList, isInList }: any) {
  const [showTrailer, setShowTrailer] = useState(false);
  if (!movie) return null;

  const handleWatch = () => {
    if (movie.trailer_url) {
      setShowTrailer(true);
    } else {
      alert('Trailer indisponível para este título.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setShowTrailer(false);
            onClose();
          }}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            {!showTrailer ? (
              <>
                <img src={movie.backdropImage || movie.coverImage} className="modal-backdrop" alt="" />
                <div className="modal-info">
                  <h2>{movie.title}</h2>
                  <p>{movie.description}</p>
                  <div className="modal-buttons">
                    <button className="btn-assistir" onClick={handleWatch}>▶ Assistir</button>
                    <button className="btn-lista" onClick={() => onAddToList(movie)}>
                      {isInList ? '✓ Na lista' : '+ Lista'}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="trailer-container">
                <iframe
                  width="100%"
                  height="400"
                  src={movie.trailer_url}
                  title="Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <button className="btn-fechar-trailer" onClick={() => setShowTrailer(false)}>
                  Fechar Trailer
                </button>
              </div>
            )}
            <button className="modal-close" onClick={() => {
              setShowTrailer(false);
              onClose();
            }}>✕</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
