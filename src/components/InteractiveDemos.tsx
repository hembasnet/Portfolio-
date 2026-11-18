import React, { useState, useEffect, useRef } from 'react';
import { Eye, MessageSquareCode, Activity, Play, RotateCcw, Sliders, CheckCircle2, ChevronRight, Info } from 'lucide-react';

type DemoTab = 'cv' | 'nlp' | 'ml';

interface CVObject {
  id: string;
  label: string;
  score: number;
  box: [number, number, number, number]; // [ymin, xmin, ymax, xmax] as % 0-100
  color: string;
  defectType?: string;
  depthMm?: number;
}

export const InteractiveDemos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DemoTab>('cv');

  // --- Computer Vision Demo State ---
  const [confThreshold, setConfThreshold] = useState<number>(0.65);
  const [iouThreshold, setIouThreshold] = useState<number>(0.50);
  const [showBoxes, setShowBoxes] = useState<boolean>(true);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(false);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [selectedScene, setSelectedScene] = useState<number>(0);
  const [selectedCVObject, setSelectedCVObject] = useState<CVObject | null>(null);

  const scenes = [
    {
      name: 'Industrial Robotics & Assembly',
      image: '/src/assets/images/cv_vision_system_1793719128623.jpg',
      objects: [
        { id: 'obj-1', label: 'Robotic Manipulator (RA-1)', score: 0.98, box: [22, 25, 52, 42], color: '#ec4899', depthMm: 450 },
        { id: 'obj-2', label: 'Gripper End-Effector', score: 0.96, box: [30, 35, 48, 41], color: '#06b6d4', depthMm: 410 },
        { id: 'obj-3', label: 'Calibration Fixture Unit', score: 0.91, box: [51, 35, 68, 48], color: '#10b981', depthMm: 520 },
        { id: 'obj-4', label: 'Component Tray S-04', score: 0.84, box: [47, 29, 62, 35], color: '#3b82f6', depthMm: 580 },
        { id: 'obj-5', label: 'Micro-Actuator Specimen', score: 0.72, box: [53, 44, 60, 49], color: '#f59e0b', depthMm: 510 },
        { id: 'obj-6', label: 'Edge Optical Sensor', score: 0.61, box: [50, 72, 64, 82], color: '#8b5cf6', depthMm: 640 },
      ] as CVObject[],
    },
    {
      name: 'Micro-PCB Defect Quality Inspection',
      image: '/src/assets/images/mlops_cluster_edge_1793719129082.jpg',
      objects: [
        { id: 'pcb-1', label: 'Server Chassis Controller', score: 0.99, box: [23, 38, 38, 60], color: '#10b981', depthMm: 320 },
        { id: 'pcb-2', label: 'Optical Transceiver Port A', score: 0.94, box: [38, 38, 46, 60], color: '#06b6d4', depthMm: 310 },
        { id: 'pcb-3', label: 'PCIe Bus Cable Harness', score: 0.88, box: [60, 54, 90, 68], color: '#ec4899', depthMm: 280 },
        { id: 'pcb-4', label: 'Cooling Duct Anomaly', score: 0.68, box: [73, 38, 88, 60], color: '#f59e0b', depthMm: 340 },
      ] as CVObject[],
    },
  ];

  const currentScene = scenes[selectedScene];
  const filteredObjects = currentScene.objects.filter((obj) => obj.score >= confThreshold);

  // --- NLP Demo State ---
  const samplePrompts = [
    'How does low-latency speculative decoding reduce time-to-first-token in multi-lingual RAG architectures?',
    'The supplier shall indemnify and hold harmless the customer from all direct IP liabilities under Section 14.',
    'Equivariant graph neural networks preserve rotational SE(3) symmetries across protein conformers.',
  ];
  const [nlpInput, setNlpInput] = useState<string>(samplePrompts[0]);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number | null>(1);

  // Tokenization simulation
  const tokens = nlpInput
    .trim()
    .split(/\s+/)
    .slice(0, 16)
    .map((word, idx) => ({
      id: 1000 + idx * 37 + (word.length * 13) % 256,
      text: word,
      length: word.length,
    }));

  // Deterministic attention weight calculation based on token string hash
  const getAttentionWeight = (i: number, j: number) => {
    if (i >= tokens.length || j >= tokens.length) return 0;
    const t1 = tokens[i].text.toLowerCase();
    const t2 = tokens[j].text.toLowerCase();
    if (i === j) return 0.78;
    const diff = Math.abs(i - j);
    let score = Math.max(0.04, 0.65 / (diff + 0.8));
    if ((t1.length + t2.length) % 2 === 0) score += 0.12;
    return Math.min(0.98, Number(score.toFixed(3)));
  };

  // --- ML Loss Optimizer Demo State ---
  const [datasetType, setDatasetType] = useState<'moons' | 'circles' | 'separable'>('moons');
  const [optimizer, setOptimizer] = useState<'adamw' | 'sgd' | 'rmsprop'>('adamw');
  const [learningRate, setLearningRate] = useState<number>(0.02);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [currentEpoch, setCurrentEpoch] = useState<number>(35);
  const [trainingLoss, setTrainingLoss] = useState<number>(0.082);
  const [valAccuracy, setValAccuracy] = useState<number>(97.4);
  const [lossHistory, setLossHistory] = useState<number[]>([
    0.85, 0.72, 0.61, 0.53, 0.44, 0.38, 0.31, 0.25, 0.20, 0.16, 0.13, 0.11, 0.09, 0.082,
  ]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Draw 2D Decision Boundary on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Background gradient for decision boundary
    const gridSize = 8;
    const progressFactor = Math.min(1, currentEpoch / 40);

    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        const nx = (x / width) * 2 - 1;
        const ny = (y / height) * 2 - 1;

        let val = 0;
        if (datasetType === 'circles') {
          const r = Math.sqrt(nx * nx + ny * ny);
          val = Math.sin(r * 4 - progressFactor * 1.5);
        } else if (datasetType === 'moons') {
          val = ny - 0.6 * Math.sin(nx * 3) * progressFactor;
        } else {
          val = nx + ny * 0.8;
        }

        const alpha = Math.min(0.22, Math.abs(val) * 0.25);
        if (val > 0) {
          ctx.fillStyle = `rgba(245, 158, 11, ${alpha})`; // Amber
        } else {
          ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`; // Blue
        }
        ctx.fillRect(x, y, gridSize, gridSize);
      }
    }

    // Draw synthetic data points
    const drawPoint = (cx: number, cy: number, isClassA: boolean) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = isClassA ? '#f59e0b' : '#3b82f6';
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
    };

    // Deterministic points
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI;
      if (datasetType === 'moons') {
        // Moon 1
        const x1 = (Math.cos(angle) * 0.6 + 0.1) * (width * 0.4) + width * 0.45;
        const y1 = (Math.sin(angle) * 0.6 + 0.1) * (height * 0.35) + height * 0.35;
        drawPoint(x1, y1, true);

        // Moon 2
        const x2 = (Math.cos(angle + Math.PI) * 0.6 + 0.6) * (width * 0.4) + width * 0.45;
        const y2 = (Math.sin(angle + Math.PI) * 0.6 + 0.5) * (height * 0.35) + height * 0.35;
        drawPoint(x2, y2, false);
      } else if (datasetType === 'circles') {
        const r1 = 0.25 + (i % 5) * 0.02;
        const r2 = 0.65 + (i % 5) * 0.02;
        const th = (i / 40) * Math.PI * 2;
        drawPoint(width / 2 + Math.cos(th) * r1 * width * 0.4, height / 2 + Math.sin(th) * r1 * height * 0.4, true);
        drawPoint(width / 2 + Math.cos(th) * r2 * width * 0.4, height / 2 + Math.sin(th) * r2 * height * 0.4, false);
      } else {
        const x1 = width * 0.3 + (i % 6) * 16;
        const y1 = height * 0.3 + (i % 7) * 18;
        drawPoint(x1, y1, true);

        const x2 = width * 0.65 + (i % 6) * 16;
        const y2 = height * 0.6 + (i % 7) * 18;
        drawPoint(x2, y2, false);
      }
    }
  }, [datasetType, currentEpoch, optimizer]);

  const handleRunTraining = () => {
    if (isTraining) return;
    setIsTraining(true);
    setCurrentEpoch(1);
    setLossHistory([0.88]);

    let epoch = 1;
    const interval = setInterval(() => {
      epoch += 2;
      setCurrentEpoch(epoch);

      setLossHistory((prev) => {
        const last = prev[prev.length - 1];
        const decay = optimizer === 'adamw' ? 0.035 : optimizer === 'rmsprop' ? 0.028 : 0.018;
        const next = Math.max(0.045, last * (1 - decay * (learningRate / 0.02)));
        return [...prev, Number(next.toFixed(3))];
      });

      setTrainingLoss((prev) => Math.max(0.042, Number((prev * 0.94).toFixed(3))));
      setValAccuracy((prev) => Math.min(99.2, Number((prev + 1.2).toFixed(1))));

      if (epoch >= 50) {
        clearInterval(interval);
        setIsTraining(false);
      }
    }, 100);
  };

  const handleResetTraining = () => {
    setCurrentEpoch(0);
    setTrainingLoss(0.85);
    setValAccuracy(52.1);
    setLossHistory([0.85]);
    setIsTraining(false);
  };

  return (
    <section id="demos" className="py-20 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-amber-600 dark:text-amber-400 mb-2">
              <span>Interactive Engineering Laboratory</span>
              <span aria-hidden="true">·</span>
              <span>Live Client-Side Simulations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white font-display [text-wrap:balance]">
              Test algorithms directly in the browser.
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl">
              Interact with real-time inference simulators across Computer Vision detection, NLP self-attention weight heatmaps, and 2D loss surface convergence.
            </p>
          </div>

          {/* Interactive Filter Tabs (Segmented Control as allowed by §1.A) */}
          <div className="flex items-center gap-1 p-1 bg-zinc-200/80 dark:bg-zinc-800 rounded-lg shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('cv')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                activeTab === 'cv'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Computer Vision</span>
            </button>

            <button
              onClick={() => setActiveTab('nlp')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                activeTab === 'nlp'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
              }`}
            >
              <MessageSquareCode className="w-3.5 h-3.5" />
              <span>NLP Attention Lab</span>
            </button>

            <button
              onClick={() => setActiveTab('ml')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                activeTab === 'ml'
                  ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>ML Loss Optimizer</span>
            </button>
          </div>
        </div>

        {/* ================= TAB 1: COMPUTER VISION SIMULATOR ================= */}
        {activeTab === 'cv' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visual Canvas Display (8 Cols) */}
            <div className="lg:col-span-8 bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-xl">
              {/* Telemetry Bar */}
              <div className="px-5 py-3 border-b border-zinc-800 bg-zinc-950/70 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-200 font-semibold">{currentScene.name}</span>
                  <span aria-hidden="true" className="text-zinc-700">|</span>
                  <span className="text-emerald-400">FPS: 119.4</span>
                  <span aria-hidden="true" className="text-zinc-700">|</span>
                  <span className="text-zinc-300">Latency: 8.3 ms</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <span>Detections:</span>
                  <span className="font-semibold text-amber-400 tabular-nums">{filteredObjects.length}</span>
                </div>
              </div>

              {/* Viewport Frame with Object Bounding Boxes */}
              <div className="relative aspect-[4/3] w-full bg-black select-none overflow-hidden group">
                <img
                  src={currentScene.image}
                  alt={currentScene.name}
                  className="w-full h-full object-cover"
                />

                {/* Optional Simulated Depth / Feature Heatmap Overlay */}
                {showHeatmap && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/25 via-emerald-500/15 to-transparent mix-blend-screen pointer-events-none" />
                )}

                {/* Render Filtered Detections */}
                {showBoxes &&
                  filteredObjects.map((obj) => {
                    const [ymin, xmin, ymax, xmax] = obj.box;
                    const isSelected = selectedCVObject?.id === obj.id;

                    return (
                      <div
                        key={obj.id}
                        onClick={() => setSelectedCVObject(obj)}
                        style={{
                          top: `${ymin}%`,
                          left: `${xmin}%`,
                          width: `${xmax - xmin}%`,
                          height: `${ymax - ymin}%`,
                          borderColor: obj.color,
                        }}
                        className={`absolute border-2 transition-all cursor-pointer ${
                          isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-black bg-white/10' : 'hover:bg-white/5'
                        }`}
                      >
                        {/* Box Header Label */}
                        {showLabels && (
                          <div
                            style={{ backgroundColor: obj.color }}
                            className="absolute -top-6 left-0 px-1.5 py-0.5 text-[10px] font-mono font-bold text-zinc-950 whitespace-nowrap shadow-md flex items-center gap-1.5"
                          >
                            <span>{obj.label}</span>
                            <span className="opacity-80">{(obj.score * 100).toFixed(0)}%</span>
                          </div>
                        )}

                        {/* Center Keypoint */}
                        <div
                          style={{ backgroundColor: obj.color }}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ring-1 ring-black"
                        />
                      </div>
                    );
                  })}
              </div>

              {/* Scene Switcher Bar */}
              <div className="p-3 bg-zinc-950/80 border-t border-zinc-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">Scene Presets:</span>
                  {scenes.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedScene(idx);
                        setSelectedCVObject(null);
                      }}
                      className={`px-2.5 py-1 rounded text-xs transition-colors ${
                        selectedScene === idx
                          ? 'bg-zinc-800 text-white font-medium'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
                <div className="text-zinc-500 text-[11px] font-mono hidden sm:inline">
                  Backbone: INT8 ViT · TensorRT Engine
                </div>
              </div>
            </div>

            {/* Vision Controls & Inspection Drawer (4 Cols) */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-semibold text-zinc-950 dark:text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-amber-500" />
                    <span>Inference Parameters</span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">CUDA Stream 0</span>
                </div>

                {/* Confidence Threshold Slider */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                    <span className="text-zinc-700 dark:text-zinc-300">Confidence Threshold</span>
                    <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold tabular-nums">
                      {(confThreshold * 100).toFixed(0)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.20"
                    max="0.95"
                    step="0.05"
                    value={confThreshold}
                    onChange={(e) => setConfThreshold(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
                    <span>20% (High Recall)</span>
                    <span>95% (High Precision)</span>
                  </div>
                </div>

                {/* IoU NMS Threshold Slider */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                    <span className="text-zinc-700 dark:text-zinc-300">IoU Non-Max Suppression</span>
                    <span className="font-mono text-zinc-700 dark:text-zinc-300 font-semibold tabular-nums">
                      {(iouThreshold * 100).toFixed(0)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.20"
                    max="0.80"
                    step="0.05"
                    value={iouThreshold}
                    onChange={(e) => setIouThreshold(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                {/* Layer Toggles */}
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2.5">
                  <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Visualization Layers
                  </div>

                  <label className="flex items-center justify-between text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                    <span>Bounding Box Geometry</span>
                    <input
                      type="checkbox"
                      checked={showBoxes}
                      onChange={(e) => setShowBoxes(e.target.checked)}
                      className="accent-amber-500 w-4 h-4 rounded cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                    <span>Class Label & Confidence</span>
                    <input
                      type="checkbox"
                      checked={showLabels}
                      onChange={(e) => setShowLabels(e.target.checked)}
                      className="accent-amber-500 w-4 h-4 rounded cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer">
                    <span>Simulated Depth Layer</span>
                    <input
                      type="checkbox"
                      checked={showHeatmap}
                      onChange={(e) => setShowHeatmap(e.target.checked)}
                      className="accent-amber-500 w-4 h-4 rounded cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              {/* Object Inspector Card */}
              <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                  Selected Detection Telemetry
                </div>

                {selectedCVObject ? (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80">
                      <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">OBJECT CLASS</div>
                      <div className="text-sm font-semibold text-zinc-900 dark:text-white mt-0.5">
                        {selectedCVObject.label}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800/60">
                        <span className="text-[10px] text-zinc-400 block">CONFIDENCE</span>
                        <span className="text-amber-500 font-bold">
                          {(selectedCVObject.score * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800/60">
                        <span className="text-[10px] text-zinc-400 block">Z-DEPTH (EST)</span>
                        <span className="text-cyan-400 font-bold">{selectedCVObject.depthMm} mm</span>
                      </div>
                    </div>

                    <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-800/60 text-[11px] text-zinc-600 dark:text-zinc-300">
                      Box [ymin, xmin, ymax, xmax]: [{selectedCVObject.box.join(', ')}]
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 py-6 text-center">
                    Click any detected bounding box on the camera canvas to inspect sub-pixel coordinates and spatial depth.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: NLP TOKENIZER & ATTENTION MATRIX ================= */}
        {activeTab === 'nlp' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left NLP Configuration & Tokenization (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="text-sm font-semibold text-zinc-950 dark:text-white mb-2">
                  Query & Input Prompt
                </div>
                <textarea
                  value={nlpInput}
                  onChange={(e) => setNlpInput(e.target.value)}
                  rows={3}
                  className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono resize-none"
                  placeholder="Enter a prompt to inspect token embeddings..."
                />

                {/* Preset Chips */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="text-[11px] text-zinc-400 self-center mr-1">Presets:</span>
                  {samplePrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setNlpInput(p)}
                      className="px-2 py-1 text-[11px] rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-amber-500 truncate max-w-[200px]"
                    >
                      {p.slice(0, 24)}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Subword BPE Token Breakdown */}
              <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    BPE Token Sequence ({tokens.length} Tokens)
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">Vocab: Llama-3 / GPT-4</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {tokens.map((token, idx) => {
                    const isSelected = selectedTokenIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedTokenIndex(idx)}
                        className={`px-2.5 py-1 rounded text-xs font-mono transition-all border ${
                          isSelected
                            ? 'bg-amber-400 text-zinc-950 border-amber-500 font-bold shadow-sm'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-amber-400'
                        }`}
                      >
                        <span>{token.text}</span>
                        <span className="text-[10px] opacity-60 ml-1">#{token.id}</span>
                      </button>
                    );
                  })}
                </div>

                {selectedTokenIndex !== null && tokens[selectedTokenIndex] && (
                  <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 text-xs font-mono">
                    <div className="text-zinc-500 dark:text-zinc-400 text-[10px]">SELECTED QUERY TOKEN</div>
                    <div className="flex items-center justify-between mt-1 text-zinc-800 dark:text-zinc-200">
                      <span className="font-bold text-amber-500">"{tokens[selectedTokenIndex].text}"</span>
                      <span>Token ID: {tokens[selectedTokenIndex].id}</span>
                      <span>Length: {tokens[selectedTokenIndex].length} chars</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Vector Cosine Similarity Intent Estimator */}
              <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                  Dense Embedding Intent Distance (Cosine)
                </div>
                <div className="space-y-2.5 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-zinc-600 dark:text-zinc-400">System Architecture Query</span>
                      <span className="font-mono text-amber-500 font-semibold">0.912</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: '91.2%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-zinc-600 dark:text-zinc-400">Legal Covenant & Liability</span>
                      <span className="font-mono text-zinc-400">0.428</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-zinc-400 h-full rounded-full" style={{ width: '42.8%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-zinc-600 dark:text-zinc-400">Biochemical Molecular Graph</span>
                      <span className="font-mono text-zinc-400">0.315</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-zinc-400 h-full rounded-full" style={{ width: '31.5%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Multi-Head Attention Heatmap Visualizer (7 cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                    Multi-Head Self-Attention Matrix (Head #4, Layer 11)
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Heatmap of softmax(Q · Kᵀ / √d) attention weights between token pairs. Hover cells to inspect.
                  </p>
                </div>
                <div className="text-xs font-mono px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                  FlashAttention-2
                </div>
              </div>

              {/* Attention Grid */}
              <div className="overflow-x-auto pb-4">
                <div className="inline-block min-w-full">
                  <div className="flex">
                    {/* Corner empty spacer */}
                    <div className="w-16 h-8 shrink-0" />
                    {/* Column Headers (Keys) */}
                    {tokens.slice(0, 10).map((tok, j) => (
                      <div
                        key={j}
                        className="w-10 h-8 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 flex items-center justify-center truncate rotate-45 origin-bottom-left"
                      >
                        {tok.text.slice(0, 5)}
                      </div>
                    ))}
                  </div>

                  {/* Rows (Queries) */}
                  {tokens.slice(0, 10).map((rowTok, i) => (
                    <div key={i} className="flex items-center my-0.5">
                      {/* Row Label (Query) */}
                      <div className="w-16 text-[10px] font-mono text-zinc-600 dark:text-zinc-400 truncate pr-2 text-right">
                        {rowTok.text.slice(0, 7)}
                      </div>

                      {/* Heatmap Cells */}
                      {tokens.slice(0, 10).map((colTok, j) => {
                        const weight = getAttentionWeight(i, j);
                        const isCurrentQuery = selectedTokenIndex === i;

                        return (
                          <div
                            key={j}
                            title={`Query: "${rowTok.text}" -> Key: "${colTok.text}" | Weight: ${weight}`}
                            style={{
                              backgroundColor: `rgba(245, 158, 11, ${weight})`,
                            }}
                            className={`w-10 h-10 m-0.5 rounded flex items-center justify-center text-[10px] font-mono transition-transform hover:scale-110 cursor-pointer ${
                              weight > 0.5 ? 'text-zinc-950 font-bold' : 'text-zinc-500 dark:text-zinc-300'
                            } ${isCurrentQuery ? 'ring-1 ring-amber-400' : ''}`}
                          >
                            {weight.toFixed(2)}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Attention Insight Note */}
              <div className="mt-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-300 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Architectural Insight:</strong> The model places peak cross-token attention (0.78 - 0.95) along the principal diagonal and semantic noun-verb bridges ("speculative" ↔ "decoding", "reduce" ↔ "time-to-first-token"), verifying clean attention routing without token dispersion.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ML LOSS SURFACE & OPTIMIZER ================= */}
        {activeTab === 'ml' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 2D Decision Boundary Canvas (6 cols) */}
            <div className="lg:col-span-6 bg-zinc-950 rounded-2xl border border-zinc-800 p-5 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    2D Non-Linear Classification Decision Surface
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Visualizing neural decision boundary warping in parameter space.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  <span className="text-xs font-mono text-zinc-400">Class A</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block ml-2" />
                  <span className="text-xs font-mono text-zinc-400">Class B</span>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={480}
                  height={320}
                  className="w-full max-w-[480px] h-auto aspect-[3/2] block"
                />
              </div>

              {/* Status bar */}
              <div className="mt-4 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Epoch: <strong className="text-white">{currentEpoch} / 50</strong></span>
                <span>Loss: <strong className="text-amber-400">{trainingLoss}</strong></span>
                <span>Accuracy: <strong className="text-emerald-400">{valAccuracy}%</strong></span>
              </div>
            </div>

            {/* Right Hyperparameter Controls & Loss Convergence Chart (6 cols) */}
            <div className="lg:col-span-6 flex flex-col gap-5">
              <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-semibold text-zinc-950 dark:text-white">
                    Hyperparameters & Architecture
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleResetTraining}
                      disabled={isTraining}
                      className="p-1.5 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                      title="Reset parameters"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleRunTraining}
                      disabled={isTraining}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg shadow-sm transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-zinc-950" />
                      <span>{isTraining ? 'Optimizing...' : 'Train 50 Epochs'}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  {/* Dataset Selector */}
                  <div>
                    <label className="text-zinc-600 dark:text-zinc-400 block mb-1 font-medium">
                      Synthetic Manifold
                    </label>
                    <select
                      value={datasetType}
                      onChange={(e) => setDatasetType(e.target.value as any)}
                      className="w-full p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                    >
                      <option value="moons">Intertwined Moons</option>
                      <option value="circles">Concentric Circles</option>
                      <option value="separable">Linearly Separable</option>
                    </select>
                  </div>

                  {/* Optimizer Selector */}
                  <div>
                    <label className="text-zinc-600 dark:text-zinc-400 block mb-1 font-medium">
                      Optimization Algorithm
                    </label>
                    <select
                      value={optimizer}
                      onChange={(e) => setOptimizer(e.target.value as any)}
                      className="w-full p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                    >
                      <option value="adamw">AdamW (β1=0.9, β2=0.999)</option>
                      <option value="sgd">SGD + Nesterov Momentum</option>
                      <option value="rmsprop">RMSprop (α=0.99)</option>
                    </select>
                  </div>
                </div>

                {/* Learning Rate Slider */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-zinc-700 dark:text-zinc-300">Learning Rate (η)</span>
                    <span className="font-mono text-amber-500 font-semibold">{learningRate}</span>
                  </div>
                  <input
                    type="range"
                    min="0.005"
                    max="0.08"
                    step="0.005"
                    value={learningRate}
                    onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Dynamic Loss Convergence Curve */}
              <div className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Cross-Entropy Loss Trajectory
                  </div>
                  <span className="text-[11px] font-mono text-emerald-500">Converged</span>
                </div>

                {/* SVG Loss Curve Plot */}
                <div className="h-32 w-full pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                    {/* Gridlines */}
                    <line x1="0" y1="20" x2="400" y2="20" stroke="currentColor" strokeOpacity="0.1" />
                    <line x1="0" y1="50" x2="400" y2="50" stroke="currentColor" strokeOpacity="0.1" />
                    <line x1="0" y1="80" x2="400" y2="80" stroke="currentColor" strokeOpacity="0.1" />

                    {/* Polyline Path */}
                    {lossHistory.length > 1 && (
                      <polyline
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={lossHistory
                          .map((val, idx) => {
                            const x = (idx / (lossHistory.length - 1)) * 400;
                            const y = Math.max(5, Math.min(95, 95 - val * 90));
                            return `${x},${y}`;
                          })
                          .join(' ')}
                      />
                    )}
                  </svg>
                </div>

                <div className="flex justify-between text-[11px] text-zinc-400 font-mono mt-1 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <span>Step 0 (Loss: 0.85)</span>
                  <span>Step {currentEpoch} (Loss: {trainingLoss})</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
