'use client';

import React, { useState, useEffect, useRef } from 'react';
import TianzigeGrid from './TianzigeGrid';

interface SimpleTianzigeProps {
  initialCharacter?: string;
  size?: number;
}

const SimpleTianzige: React.FC<SimpleTianzigeProps> = ({
  initialCharacter = '永',
  size = 300,
}) => {
  const [character, setCharacter] = useState(initialCharacter);
  const [inputValue, setInputValue] = useState(initialCharacter);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // 如果输入了汉字，则更新显示的汉字
    if (value && /[\u4e00-\u9fa5]/.test(value)) {
      // 取最后一个汉字
      const lastChar = Array.from(value).filter(char => /[\u4e00-\u9fa5]/.test(char)).pop();
      if (lastChar) {
        setCharacter(lastChar);
      }
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 按回车键时，如果有汉字，则更新显示的汉字
    if (e.key === 'Enter') {
      const chineseChars = Array.from(inputValue).filter(char => /[\u4e00-\u9fa5]/.test(char));
      if (chineseChars.length > 0) {
        const lastChar = chineseChars[chineseChars.length - 1];
        setCharacter(lastChar);
        // 保留当前汉字在输入框中，而不是清空
        setInputValue(lastChar);
      }
    }
  };

  // 确保输入框可以获取焦点
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-md mb-6">
        <label 
          htmlFor="character-input" 
          className="block text-lg font-medium text-gray-700 mb-2"
          onClick={focusInput}
        >
          请输入汉字（支持拼音输入）:
        </label>
        
        {/* 输入框容器 */}
        <div 
          className="border border-gray-300 rounded-md p-2 bg-white cursor-text"
          onClick={focusInput}
        >
          <input
            ref={inputRef}
            id="character-input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 text-2xl font-bold border-none outline-none"
            placeholder="输入汉字..."
            style={{ 
              caretColor: 'black',  // 确保光标可见
              color: 'black',       // 确保文字颜色可见
              background: 'transparent'
            }}
          />
        </div>
        
        <p className="mt-2 text-sm text-gray-500">
          提示：输入汉字后按回车键确认，或直接使用拼音输入法选择汉字
        </p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center mb-4">当前汉字: {character}</h2>
        <TianzigeGrid
          character={character}
          size={size}
          strokeColor="#333"
          backgroundColor="#f5f5f5"
          gridColor="#ddd"
          showAnimation={true}
        />
      </div>
    </div>
  );
};

export default SimpleTianzige;
