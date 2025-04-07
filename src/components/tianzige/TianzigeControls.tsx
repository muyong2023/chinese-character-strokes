'use client';

import React, { useState } from 'react';
import TianzigeGrid from './TianzigeGrid';

interface TianzigeControlsProps {
  onCharacterChange: (character: string) => void;
  onSizeChange: (size: number) => void;
  onStrokeColorChange: (color: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onGridColorChange: (color: string) => void;
  onShowAnimationChange: (show: boolean) => void;
}

const TianzigeControls: React.FC<TianzigeControlsProps> = ({
  onCharacterChange,
  onSizeChange,
  onStrokeColorChange,
  onBackgroundColorChange,
  onGridColorChange,
  onShowAnimationChange,
}) => {
  const [character, setCharacter] = useState('永');
  
  // 常用汉字列表，用于快速选择
  const commonChars = ['永', '我', '你', '他', '好', '中', '国', '人', '大', '小'];
  
  const handleCharacterSelect = (char: string) => {
    setCharacter(char);
    onCharacterChange(char);
  };
  
  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value);
    onSizeChange(size);
  };
  
  const handleStrokeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onStrokeColorChange(e.target.value);
  };
  
  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onBackgroundColorChange(e.target.value);
  };
  
  const handleGridColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onGridColorChange(e.target.value);
  };
  
  const handleShowAnimationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onShowAnimationChange(e.target.checked);
  };
  
  return (
    <div className="flex flex-col space-y-4 p-4 border rounded-lg bg-white">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          当前汉字: {character}
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {commonChars.map(char => (
            <button
              key={char}
              onClick={() => handleCharacterSelect(char)}
              className={`w-8 h-8 flex items-center justify-center border rounded-md ${
                character === char ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
            >
              {char}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          大小 (px)
        </label>
        <input
          type="range"
          min="100"
          max="500"
          defaultValue="300"
          onChange={handleSizeChange}
          className="w-full"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          笔画颜色
        </label>
        <input
          type="color"
          defaultValue="#333333"
          onChange={handleStrokeColorChange}
          className="w-full"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          背景颜色
        </label>
        <input
          type="color"
          defaultValue="#f5f5f5"
          onChange={handleBackgroundColorChange}
          className="w-full"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          网格颜色
        </label>
        <input
          type="color"
          defaultValue="#dddddd"
          onChange={handleGridColorChange}
          className="w-full"
        />
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="showAnimation"
          onChange={handleShowAnimationChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="showAnimation" className="ml-2 block text-sm text-gray-700">
          显示笔画动画
        </label>
      </div>
    </div>
  );
};

export default TianzigeControls;
