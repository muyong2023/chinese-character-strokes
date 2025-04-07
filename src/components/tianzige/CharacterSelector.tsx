'use client';

import React, { useState, useEffect } from 'react';

interface CharacterSelectorProps {
  onSelectCharacter: (character: string) => void;
}

// 常用汉字列表
const commonCharacters = [
  '永', '我', '你', '他', '她', '好', '爱', 
  '中', '国', '人', '大', '小', '上', '下',
  '天', '地', '山', '水', '火', '木', '金',
  '日', '月', '星', '风', '云', '雨', '雪',
  '花', '草', '树', '鸟', '鱼', '虫', '马',
  '牛', '羊', '狗', '猫', '学', '习', '写',
  '读', '说', '听', '看', '吃', '喝', '走'
];

// 按笔画数分类的汉字
const charactersByStrokeCount: Record<number, string[]> = {
  1: ['一', '乙'],
  2: ['二', '十', '人', '入', '八', '几'],
  3: ['三', '口', '山', '千', '川', '土', '士', '工', '才', '寸', '下', '大', '丈', '与', '万', '上', '小', '个'],
  4: ['四', '火', '天', '文', '方', '日', '月', '木', '水', '王', '牛', '手', '气', '毛', '心', '比', '爪', '父', '片', '户'],
  5: ['五', '六', '车', '田', '由', '史', '央', '右', '左', '石', '布', '平', '东', '北', '半', '出', '生', '目', '且', '业'],
  6: ['六', '百', '米', '而', '至', '臣', '舌', '竹', '老', '交', '光', '共', '各', '考', '过', '自', '血', '行', '列', '先'],
  7: ['七', '言', '见', '走', '足', '身', '豆', '谷', '弟', '兵', '克', '免', '典', '冷', '序', '坐', '志', '局', '床', '否'],
  8: ['八', '雨', '青', '京', '亭', '亮', '采', '事', '来', '使', '其', '直', '具', '果', '味', '固', '居', '届', '刷', '制'],
  9: ['九', '相', '查', '便', '俩', '叫', '城', '度', '律', '星', '科', '秋', '则', '首', '既', '恒', '姿', '柱', '奏', '甚'],
  10: ['十', '真', '原', '展', '师', '息', '神', '家', '除', '校', '党', '站', '疾', '风', '院', '高', '席', '座', '准', '案'],
  11: ['百', '常', '张', '强', '教', '理', '清', '情', '晚', '球', '最', '接', '深', '淡', '混', '淋', '添', '粗', '细', '率'],
  12: ['千', '街', '景', '湖', '温', '港', '游', '换', '提', '塔', '握', '揭', '敬', '斯', '期', '朝', '森', '棵', '椅', '焦'],
  13: ['万', '集', '靠', '预', '饭', '馆', '鼓', '摘', '暖', '极', '构', '榜', '漫', '煤', '睡', '碗', '种', '稍', '稀', '绿'],
  14: ['亿', '境', '满', '睛', '算', '管', '精', '绝', '肆', '腊', '需', '静', '领', '额', '嘴', '熊', '僵', '瘦', '碰', '碧'],
  15: ['兆', '增', '慧', '摧', '撒', '暴', '模', '横', '潮', '灯', '熟', '薄', '薪', '衡', '质', '踢', '蹄', '醒', '镜', '霞'],
  16: ['璃', '环', '璧', '瓢', '疆', '矫', '磨', '禧', '穗', '簸', '繁', '膀', '臂', '舞', '蔼', '蔽', '蕊', '蕴', '薯', '藏'],
  17: ['丰', '壁', '攀', '整', '檐', '激', '壤', '缰', '缴', '联', '膝', '臆', '藤', '藻', '觉', '议', '蹈', '蹋', '蹦', '蹬'],
  18: ['鞋', '鞍', '鞭', '韵', '题', '额', '颊', '颖', '颗', '颜', '额', '飘', '翼', '翻', '职', '聪', '联', '膝', '臆', '藤'],
  19: ['鲜', '鲤', '鲫', '鳄', '鳍', '鳎', '鳖', '鳗', '鳝', '鸡', '鸣', '鸥', '鸦', '鸭', '鸯', '鸳', '鸵', '鸽', '鸿', '鹃'],
  20: ['鹅', '鹊', '鹏', '鹤', '鹰', '麦', '麸', '麻', '黄', '黍', '黎', '黑', '鼎', '鼓', '鼠', '鼻', '齐', '齿', '龄', '龙']
};

const CharacterSelector: React.FC<CharacterSelectorProps> = ({ onSelectCharacter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStrokeCount, setSelectedStrokeCount] = useState<number | null>(null);
  const [filteredCharacters, setFilteredCharacters] = useState<string[]>(commonCharacters);

  useEffect(() => {
    if (selectedStrokeCount !== null) {
      setFilteredCharacters(charactersByStrokeCount[selectedStrokeCount] || []);
    } else if (searchTerm) {
      // 如果有搜索词，则过滤包含该搜索词的汉字
      const allChars = Object.values(charactersByStrokeCount).flat();
      setFilteredCharacters(
        allChars.filter(char => 
          char.includes(searchTerm) || 
          commonCharacters.includes(char)
        )
      );
    } else {
      // 默认显示常用汉字
      setFilteredCharacters(commonCharacters);
    }
  }, [searchTerm, selectedStrokeCount]);

  const handleCharacterClick = (character: string) => {
    onSelectCharacter(character);
  };

  const handleStrokeCountClick = (strokeCount: number) => {
    setSelectedStrokeCount(prevCount => prevCount === strokeCount ? null : strokeCount);
    setSearchTerm('');
  };

  return (
    <div className="p-4 border rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-4">汉字选择</h2>
      
      {/* 搜索框 - 移除，改为直接选择 */}
      {/* <div className="mb-4">
        <input
          type="text"
          placeholder="搜索汉字..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedStrokeCount(null);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div> */}
      
      {/* 笔画数选择 */}
      <div className="mb-4">
        <h3 className="text-md font-medium mb-2">按笔画数选择：</h3>
        <div className="flex flex-wrap gap-2">
          {Object.keys(charactersByStrokeCount).map((strokeCount) => (
            <button
              key={strokeCount}
              onClick={() => handleStrokeCountClick(parseInt(strokeCount))}
              className={`px-2 py-1 border rounded-md ${
                selectedStrokeCount === parseInt(strokeCount)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              {strokeCount}
            </button>
          ))}
        </div>
      </div>
      
      {/* 汉字网格 */}
      <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto">
        {filteredCharacters.map((character) => (
          <button
            key={character}
            onClick={() => handleCharacterClick(character)}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
          >
            {character}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelector;
