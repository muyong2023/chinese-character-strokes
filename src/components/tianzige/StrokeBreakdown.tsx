'use client';

import React, { useEffect, useRef, useState } from 'react';

interface StrokeBreakdownProps {
  character: string;
  size?: number;
  strokeColor?: string;
  backgroundColor?: string;
}

interface StrokeData {
  strokeNum: number;
  path: string;
}

const StrokeBreakdown: React.FC<StrokeBreakdownProps> = ({
  character,
  size = 300,
  strokeColor = '#333',
  backgroundColor = '#f5f5f5',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [strokes, setStrokes] = useState<StrokeData[]>([]);
  const [totalStrokes, setTotalStrokes] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // 动态加载Hanzi Writer脚本
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js';
    script.async = true;
    
    script.onload = () => {
      if (window.HanziWriter) {
        setLoading(true);
        setError(null);
        
        // 使用Hanzi Writer的加载器获取汉字数据
        window.HanziWriter.loadCharacterData(character)
          .then((charData: any) => {
            // 提取笔画数据
            const strokesData = charData.strokes.map((stroke: string, index: number) => ({
              strokeNum: index + 1,
              path: stroke
            }));
            
            setStrokes(strokesData);
            setTotalStrokes(strokesData.length);
            setLoading(false);
          })
          .catch((err: Error) => {
            console.error('Failed to load character data:', err);
            setError(`无法加载"${character}"的笔画数据`);
            setLoading(false);
          });
      }
    };
    
    script.onerror = () => {
      setError('无法加载Hanzi Writer库');
      setLoading(false);
    };
    
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [character]);

  // 渲染单个笔画
  const renderStroke = (stroke: StrokeData, isActive: boolean = false) => {
    const svgSize = size / 2 - 10; // 每个笔画SVG的大小
    
    return (
      <div 
        key={stroke.strokeNum} 
        className={`relative border rounded-md p-2 ${isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        style={{ width: svgSize, height: svgSize }}
      >
        <div className="absolute top-1 left-1 bg-white bg-opacity-70 px-1 rounded text-xs">
          {stroke.strokeNum}
        </div>
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 1024 1024"
        >
          <path 
            d={stroke.path} 
            fill="none" 
            stroke={strokeColor} 
            strokeWidth="32" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  };

  if (loading) {
    return <div className="flex justify-center items-center h-40">加载中...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 border rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-4">笔画拆分 - {character} ({totalStrokes}画)</h2>
      
      <div className="flex flex-wrap gap-4 justify-center">
        {strokes.map((stroke) => renderStroke(stroke))}
      </div>
      
      {totalStrokes === 0 && (
        <div className="text-center text-gray-500 my-4">
          没有找到"{character}"的笔画数据
        </div>
      )}
    </div>
  );
};

export default StrokeBreakdown;
