'use client';

import React, { useEffect, useRef, useState } from 'react';

interface StrokeAnimationProps {
  character: string;
  size?: number;
  strokeColor?: string;
  backgroundColor?: string;
  gridColor?: string;
  autoPlay?: boolean;
}

const StrokeAnimation: React.FC<StrokeAnimationProps> = ({
  character,
  size = 300,
  strokeColor = '#333',
  backgroundColor = '#f5f5f5',
  gridColor = '#ddd',
  autoPlay = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStroke, setCurrentStroke] = useState<number>(0);
  const [totalStrokes, setTotalStrokes] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 初始化Hanzi Writer
  useEffect(() => {
    // 动态加载Hanzi Writer脚本
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js';
    script.async = true;
    
    script.onload = () => {
      if (containerRef.current && window.HanziWriter) {
        setIsLoading(true);
        setError(null);
        
        // 清除之前的内容
        if (containerRef.current.firstChild) {
          containerRef.current.innerHTML = '';
        }
        
        try {
          // 创建新的Hanzi Writer实例
          writerRef.current = window.HanziWriter.create(containerRef.current, character, {
            width: size,
            height: size,
            padding: 5,
            strokeColor: strokeColor,
            strokeWidth: 8,
            outlineColor: '#ddd',
            backgroundColor: backgroundColor,
            delayBetweenStrokes: 1000,
            radicalColor: '#168F16', // 部首颜色
          });
          
          // 获取总笔画数
          window.HanziWriter.loadCharacterData(character).then((data: any) => {
            setTotalStrokes(data.strokes.length);
            setIsLoading(false);
            
            // 如果设置了自动播放，则开始动画
            if (autoPlay) {
              setTimeout(() => {
                playAnimation();
              }, 500);
            }
          }).catch((err: Error) => {
            console.error('Failed to load character data:', err);
            setError(`无法加载"${character}"的笔画数据`);
            setIsLoading(false);
          });
        } catch (err) {
          console.error('Error initializing Hanzi Writer:', err);
          setError('初始化Hanzi Writer时出错');
          setIsLoading(false);
        }
      }
    };
    
    script.onerror = () => {
      setError('无法加载Hanzi Writer库');
      setIsLoading(false);
    };
    
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [character, size, strokeColor, backgroundColor, autoPlay]);

  // 播放动画
  const playAnimation = () => {
    if (writerRef.current && !isPlaying) {
      setIsPlaying(true);
      setCurrentStroke(0);
      
      writerRef.current.animateCharacter({
        onComplete: () => {
          setIsPlaying(false);
        },
        onProgress: (progress: { strokes: number[] }) => {
          setCurrentStroke(progress.strokes.length);
        }
      });
    }
  };

  // 停止动画
  const stopAnimation = () => {
    if (writerRef.current && isPlaying) {
      writerRef.current.cancelAnimation();
      setIsPlaying(false);
    }
  };

  // 重置动画
  const resetAnimation = () => {
    if (writerRef.current) {
      stopAnimation();
      writerRef.current.reset();
      setCurrentStroke(0);
    }
  };

  // 逐笔演示
  const showNextStroke = () => {
    if (writerRef.current && !isPlaying && currentStroke < totalStrokes) {
      writerRef.current.animateStroke(currentStroke, {
        onComplete: () => {
          setCurrentStroke(prev => prev + 1);
        }
      });
    }
  };

  // 田字格样式
  const gridStyle: React.CSSProperties = {
    position: 'relative',
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: backgroundColor,
    border: `2px solid ${gridColor}`,
    boxSizing: 'border-box',
  };

  // 田字格内部线条样式
  const horizontalLineStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '1px',
    backgroundColor: gridColor,
    left: 0,
    top: '50%',
  };

  const verticalLineStyle: React.CSSProperties = {
    position: 'absolute',
    width: '1px',
    height: '100%',
    backgroundColor: gridColor,
    left: '50%',
    top: 0,
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-40">加载中...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 border rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-4">笔画书写动画 - {character}</h2>
      
      <div className="flex flex-col items-center mb-4">
        <div style={{ position: 'relative' }}>
          <div style={gridStyle}>
            <div style={horizontalLineStyle}></div>
            <div style={verticalLineStyle}></div>
            <div 
              ref={containerRef} 
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                zIndex: 2 
              }}
            ></div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-600 mb-2">
            当前进度: {currentStroke} / {totalStrokes} 笔
          </div>
          
          <div className="flex justify-center space-x-2 mt-2">
            <button
              onClick={playAnimation}
              disabled={isPlaying}
              className={`px-4 py-2 rounded-md ${
                isPlaying ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              播放全部
            </button>
            
            <button
              onClick={stopAnimation}
              disabled={!isPlaying}
              className={`px-4 py-2 rounded-md ${
                !isPlaying ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              停止
            </button>
            
            <button
              onClick={resetAnimation}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              重置
            </button>
            
            <button
              onClick={showNextStroke}
              disabled={isPlaying || currentStroke >= totalStrokes}
              className={`px-4 py-2 rounded-md ${
                isPlaying || currentStroke >= totalStrokes
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              下一笔
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrokeAnimation;
