import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface ScrollImageSequenceProps {
  images: string[];
  height?: string;
  onFrameChange?: (frameIndex: number) => void;
}

/**
 * ScrollImageSequence Component
 * 
 * Renders a canvas-based image sequence that syncs with scroll progress.
 * Images are preloaded and rendered efficiently on a canvas element.
 * 
 * Design: Futuristic Dark Theme
 * - Uses canvas for GPU-accelerated rendering
 * - Smooth frame transitions based on scroll position
 * - Responsive sizing
 */
export const ScrollImageSequence: React.FC<ScrollImageSequenceProps> = ({
  images,
  height = '100vh',
  onFrameChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Preload all images
  useEffect(() => {
    const loadImages = async () => {
      const loaded: HTMLImageElement[] = [];
      const promises = images.map((src, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loaded[index] = img;
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load image: ${src}`);
            resolve();
          };
        });
      });

      await Promise.all(promises);
      setLoadedImages(loaded.filter(Boolean));
      setIsLoading(false);
    };

    if (images.length > 0) {
      loadImages();
    }
  }, [images]);

  // Transform scroll progress to frame index
  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.max(0, loadedImages.length - 1)]
  );

  // Draw frame on canvas
  useEffect(() => {
    if (!canvasRef.current || loadedImages.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match the first image
    if (loadedImages[0]) {
      canvas.width = loadedImages[0].width;
      canvas.height = loadedImages[0].height;
    }

    const drawFrame = (index: number) => {
      const frameIdx = Math.floor(index);
      if (loadedImages[frameIdx]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(loadedImages[frameIdx], 0, 0);
      }
    };

    const unsubscribe = frameIndex.onChange((latest) => {
      drawFrame(latest);
      setCurrentFrame(Math.floor(latest));
      onFrameChange?.(Math.floor(latest));
    });

    return () => unsubscribe();
  }, [loadedImages, frameIndex, onFrameChange]);

  return (
    <div
      ref={containerRef}
      style={{ height: `${(loadedImages.length + 1) * 100}vh` }}
      className="relative w-full"
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#0a0e27',
          overflow: 'hidden',
        }}
      >
        {isLoading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            <p className="mt-4 text-cyan-400">Loading animation...</p>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ScrollImageSequence;
