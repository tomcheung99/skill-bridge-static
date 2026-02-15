'use client';

import { useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  NodeProps,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { skills, edges, Skill } from '@/lib/skills';

// 類別顏色映射
const categoryColors: Record<string, string> = {
  Technical: '#3b82f6', // blue-500
  Creative: '#ec4899',  // pink-500
  Analytical: '#10b981', // emerald-500
  Social: '#f97316',     // orange-500
  Business: '#8b5cf6',   // purple-500
};

// 自定義節點組件
function SkillNode({ data, selected }: NodeProps<Skill>) {
  return (
    <div
      className={`px-4 py-2 rounded-lg border-2 transition-all cursor-pointer ${
        selected ? 'border-white shadow-lg scale-110' : 'border-transparent'
      }`}
      style={{
        backgroundColor: `${categoryColors[data.category]}20`,
        borderColor: selected ? categoryColors[data.category] : 'transparent',
        boxShadow: selected ? `0 0 20px ${categoryColors[data.category]}50` : 'none',
      }}
    >
      <div className="text-white font-semibold text-sm text-center">{data.name}</div>
      <div className="text-xs text-slate-300 text-center mt-1">{data.category}</div>
      <div className="flex justify-center mt-1">
        {Array.from({ length: data.level }).map((_, i) => (
          <span key={i} className="text-xs">★</span>
        ))}
      </div>
    </div>
  );
}

const nodeTypes = {
  skill: SkillNode,
};

interface SkillGraphProps {
  onNodeClick?: (skill: Skill) => void;
  highlightSkill?: string;
  relatedSkills?: string[];
}

export default function SkillGraph({ 
  onNodeClick, 
  highlightSkill,
  relatedSkills = [] 
}: SkillGraphProps) {
  // 計算節點位置（力導向佈局）
  const initialNodes: Node<Skill>[] = useMemo(() => {
    const nodes: Node<Skill>[] = [];
    const categories = [...new Set(skills.map(s => s.category))];
    const skillsPerCategory = categories.map(cat => skills.filter(s => s.category === cat));
    
    categories.forEach((category, catIndex) => {
      const catSkills = skillsPerCategory[catIndex];
      const angleStep = (2 * Math.PI) / categories.length;
      const baseAngle = angleStep * catIndex;
      const radius = 300;
      
      // 類別中心點
      const centerX = Math.cos(baseAngle) * radius;
      const centerY = Math.sin(baseAngle) * radius;
      
      catSkills.forEach((skill, skillIndex) => {
        const subAngle = (2 * Math.PI / catSkills.length) * skillIndex;
        const subRadius = 80 + skill.level * 20;
        
        nodes.push({
          id: skill.id,
          type: 'skill',
          position: {
            x: centerX + Math.cos(subAngle) * subRadius,
            y: centerY + Math.sin(subAngle) * subRadius,
          },
          data: skill,
          style: {
            opacity: highlightSkill 
              ? (skill.id === highlightSkill || relatedSkills.includes(skill.id) ? 1 : 0.3)
              : 1,
          },
        });
      });
    });
    
    return nodes;
  }, [highlightSkill, relatedSkills]);

  // 創建連接
  const initialEdges: Edge[] = useMemo(() => {
    const edgeList: Edge[] = [];
    
    Object.entries(edges).forEach(([sourceId, connections]) => {
      connections.forEach((edge, index) => {
        const isHighlighted = highlightSkill === sourceId || highlightSkill === edge.to;
        const isRelated = relatedSkills.includes(sourceId) && relatedSkills.includes(edge.to);
        
        edgeList.push({
          id: `${sourceId}-${edge.to}-${index}`,
          source: sourceId,
          target: edge.to,
          animated: isHighlighted,
          style: {
            stroke: isHighlighted ? '#22d3ee' : '#64748b',
            strokeWidth: isHighlighted ? 3 : 1,
            opacity: highlightSkill 
              ? (isHighlighted || isRelated ? 1 : 0.1)
              : 0.5,
          },
          label: `${edge.similarity}%`,
          labelStyle: {
            fill: isHighlighted ? '#22d3ee' : '#94a3b8',
            fontSize: 10,
          },
          labelBgStyle: {
            fill: '#0f172a',
          },
          labelBgPadding: [4, 4],
          labelBgBorderRadius: 4,
        });
      });
    });
    
    return edgeList;
  }, [highlightSkill, relatedSkills]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [flowEdges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleNodeClick = (_: React.MouseEvent, node: Node<Skill>) => {
    if (onNodeClick) {
      onNodeClick(node.data);
    }
  };

  return (
    <div className="w-full h-[600px] bg-slate-900/50 rounded-xl border border-slate-700">
      <ReactFlow
        nodes={nodes}
        edges={flowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={2}
      >
        <Background color="#1e293b" gap={20} size={1} />
        <Controls className="bg-slate-800 border-slate-600" />
        <MiniMap
          nodeColor={(node) => categoryColors[node.data?.category] || '#64748b'}
          className="bg-slate-800 border-slate-600 rounded-lg"
          maskColor="#0f172a80"
        />
      </ReactFlow>
      
      {/* 圖例 */}
      <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur p-4 rounded-lg border border-slate-600">
        <h4 className="text-white font-semibold mb-2 text-sm">技能類別</h4>
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} className="flex items-center gap-2 mb-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-slate-300 text-xs">{category}</span>
          </div>
        ))}
        <div className="mt-3 text-xs text-slate-400">
          <div>★ = 難度等級 (1-5)</div>
          <div className="mt-1">點擊節點查看詳情</div>
        </div>
      </div>
    </div>
  );
}
