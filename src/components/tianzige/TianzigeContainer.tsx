'use client';

import React, { useState } from 'react';
import TianzigeGrid from './TianzigeGrid';
import TianzigeControls from './TianzigeControls';

const TianzigeContainer: React.FC = () => {
  const [character, setCharacter] = useState('永');
  const [size, setSize] = useState(300);
  const [strokeColor, setStrokeColor] = useState('#333');
  const [backgroundColor, setBackgroundColor] = useState('#f5f5f5');
  const [gridColor, setGridColor] = useState('#ddd');
  const [showAnimation, setShowAnimation] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4">
      <div className="flex-1 flex justify-center items-center">
        <TianzigeGrid
          character={character}
          size={size}
          strokeColor={strokeColor}
          backgroundColor={backgroundColor}
          gridColor={gridColor}
          showAnimation={showAnimation}
        />
      </div>
      <div className="w-full md:w-64">
        <TianzigeControls
          onCharacterChange={setCharacter}
          onSizeChange={setSize}
          onStrokeColorChange={setStrokeColor}
          onBackgroundColorChange={setBackgroundColor}
          onGridColorChange={setGridColor}
          onShowAnimationChange={setShowAnimation}
        />
      </div>
    </div>
  );
};

export default TianzigeContainer;
