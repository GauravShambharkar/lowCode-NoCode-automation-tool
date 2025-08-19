import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useRef, useState } from "react";

export default function App() {
  const initialNodes = [
    { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" } },
    { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
  ];

  const initialEdges = [
    {
      id: "n1-n2",
      source: "n1",
      target: "n2",
      type: "step",
      // label: "connects with",
    },
  ];

  const [edgeType, setEdgeType] = useState();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const [varients, setVariant] = useState("dots");

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }} className="relative p-2">
      <div className=" flex flex-col absolute z-10 gap-2 top-4 left-4 border border-[#d0d0d0] p-4 rounded-lg bg-[#ffffff28] backdrop-blur-md shadow-2xl ">
        <h1 className="font-medium">Background Variants</h1>
        <div className="flex gap-3">
          <button className="btn" onClick={() => setVariant("dots")}>
            Dots
          </button>
          <button className="btn" onClick={() => setVariant("lines")}>
            Lines
          </button>
          <button className="btn" onClick={() => setVariant("blank")}>
            Blank
          </button>
        </div>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={varients} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
