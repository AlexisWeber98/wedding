import { useState, useEffect } from 'react';

export function Gallery() {
  const photos = [
    "/1.jpeg",
    "/2.jpeg",
    "/3.jpeg",
    "/4.jpeg",
    "/5.jpeg",
    "/6.jpeg",
    "/7.jpeg",
    "/8.jpeg",
    "/9.jpeg",
    "/10.jpeg",
    "/11.jpeg",
    "/12.jpeg",
    "/13.jpeg",
    "/14.jpeg",
   /* "/15.jpeg",
    "/16.jpg",
    "/17.jpg",
    "/18.jpg",
    "/19.jpeg",
    "/20.jpeg",*/
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 4000); // Aumenté a 4 segundos para mejor visualización

    return () => clearInterval(interval);
  }, [photos.length, isPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="gallery">
      <div className="gallery__carousel">
        <div 
          className="gallery__carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {photos.map((src, i) => (
            <div className="gallery__carousel-slide" key={i}>
              <img 
                src={src} 
                alt={`Foto de boda ${i + 1}`} 
                loading={i === 0 ? "eager" : "lazy"}
                onLoad={(e) => {
                  // Asegurar que la imagen se carga correctamente
                  const img = e.target as HTMLImageElement;
                  img.style.opacity = '1';
                }}
                style={{ opacity: 0 }}
              />
            </div>
          ))}
        </div>
        
        {/* Controles de navegación */}
        <button 
          className="gallery__nav gallery__nav--prev"
          onClick={goToPrevious}
          aria-label="Foto anterior"
        >
          <svg viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        
        <button 
          className="gallery__nav gallery__nav--next"
          onClick={goToNext}
          aria-label="Siguiente foto"
        >
          <svg viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
        
        {/* Indicadores */}
        <div className="gallery__indicators">
          {photos.map((_, i) => (
            <button
              key={i}
              className={`gallery__indicator ${i === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(i)}
              aria-label={`Ir a la foto ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

