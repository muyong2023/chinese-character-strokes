'use client';

import React, { useEffect, useRef } from 'react';

interface TianzigeGridProps {
  character?: string;
  size?: number;
  strokeColor?: string;
  backgroundColor?: string;
  gridColor?: string;
  showAnimation?: boolean;
}

const TianzigeGrid: React.FC<TianzigeGridProps> = ({
  character = '永',
  size = 300,
  strokeColor = '#333',
  backgroundColor = '#f5f5f5',
  gridColor = '#ddd',
  showAnimation = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<any>(null);

  useEffect(() => {
    // 动态加载Hanzi Writer脚本
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js';
    script.async = true;
    
    script.onload = () => {
      if (containerRef.current && window.HanziWriter) {
        // 清除之前的内容
        if (containerRef.current.firstChild) {
          containerRef.current.innerHTML = '';
        }
        
        // 创建新的Hanzi Writer实例
        writerRef.current = window.HanziWriter.create(containerRef.current, character, {
          width: size,
          height: size,
          padding: 5,
          strokeColor: strokeColor,
          strokeWidth: 8,
          outlineColor: '#ddd',
          backgroundColor: backgroundColor,
          delayBetweenStrokes: 300,
        });
        
        // 如果需要显示动画，则播放动画
        if (showAnimation) {
          writerRef.current.animateCharacter();
        }
      }
    };
    
    document.body.appendChild(script);
    
    return () => {
      // 清理脚本
      document.body.removeChild(script);
    };
  }, [character, size, strokeColor, backgroundColor, showAnimation]);

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

  return (
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
  );
};

export default TianzigeGrid;
