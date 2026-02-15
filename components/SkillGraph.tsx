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

// Linear-style color palette
const categoryColors: Record<string, string> = {
  Technical: '#8b5cf6',   // violet-500
  Creative: '#ec4899',    // pink-500
  Analytical: '#10b981',  // emerald-500
  Social: '#f59e0b',      // amber-500
  Business: '#3b82f6',    // blue-500
};

// Custom node component
function SkillNode({ data, selected }: NodeProps<Skill>) {
  const color = categoryColors[data.category];
  
  return (
    <div
      className={`px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
        selected ? 'scale-110' : 'hover:scale-105'
      }`}
      style={{
        backgroundColor: selected ? `${color}30` : `${color}15`,
        border: `1px solid ${selected ? color : `${color}40`}`,
        boxShadow: selected ? `0 0 20px ${color}40` : 'none',
      }}
    >
      <div className="text-white font-medium text-xs text-center truncate max-w-[100px]">
        {data.name}
      </div>
      <div className="flex justify-center mt-1 gap-0.5">
        {Array.from({ length: data.level }).map((_, i) => (
          <span key={i} className="text-[8px]" style={{ color }}>★</span>
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
  const initialNodes: Node<Skill>[] = useMemo(() => {
    const nodes: Node<Skill>[] = [];
    const categories = [...new Set(skills.map(s => s.category))];
    const skillsPerCategory = categories.map(cat => skills.filter(s => s.category === cat));
    
    categories.forEach((category, catIndex) => {
      const catSkills = skillsPerCategory[catIndex];
      const angleStep = (2 * Math.PI) / categories.length;
      const baseAngle = angleStep * catIndex;
      const radius = 300;
      
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
              ? (skill.id === highlightSkill || relatedSkills.includes(skill.id) ? 1 : 0.2)
              : 1,
          },
        });
      });
    });
    
    return nodes;
  }, [highlightSkill, relatedSkills]);

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
            stroke: isHighlighted ? '#a78bfa' : '#3f3f46',
            strokeWidth: isHighlighted ? 2 : 1,
            opacity: highlightSkill 
              ? (isHighlighted || isRelated ? 1 : 0.1)
              : 0.3,
          },
          label: `${edge.similarity}%`,
          labelStyle: {
            fill: isHighlighted ? '#a78bfa' : '#71717a',
            fontSize: 9,
            fontWeight: 500,
          },
          labelBgStyle: {
            fill: '#0a0a0f',
          },
          labelBgPadding: [3, 3],
          labelBgBorderRadius: 3,
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
    <div className="w-full h-[600px] relative">
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
        <Background color="#27272a" gap={40} size={1} />
        <Controls 
          className="!bg-[#0a0a0f] !border-white/[0.08] !shadow-none"
          showInteractive={false}
        />
        <MiniMap
          nodeColor={(node) => categoryColors[node.data?.category] || '#3f3f46'}
          className="!bg-[#0a0a0f] !border-white/[0.08] !rounded-lg"
          maskColor="#0a0a0f80"
          maskStrokeColor="#8b5cf6"
          maskStrokeWidth={2}
        />
      </ReactFlow>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-[#0a0a0f]/90 backdrop-blur p-4 rounded-xl border border-white/[0.08]"
      >
        <h4 className="text-white font-medium mb-3 text-sm">技能類別</h4>
        <div className="space-y-2">
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-zinc-400 text-xs">{category}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-white/[0.06] text-[10px] text-zinc-500">
          <div>★ 難度等級 (1-5)</div>
        </div>
      </div>
    </div>
  );
}
