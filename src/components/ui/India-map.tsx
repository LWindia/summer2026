// components/india-map.tsx
"use client";

import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";

interface Connection {
  start: { lat: number; lng: number; label: string };
  end: { lat: number; lng: number; label: string };
}

export function IndiaMap({ connections }: { connections: Connection[] }) {
  const { theme } = useTheme();

  // India-focused map
  const map = new DottedMap({
    countries: ['IND'], // ISO code for India
    height: 100,
    region: {
      lat: { min: 6, max: 36 },   // India's bounds
      lng: { min: 68, max: 98 }
    },
    grid: "diagonal"
  });

  map.addPin({
    lat: 40.73061,
    lng: -73.935242,
    svgOptions: { color: '#d6ff79', radius: 0.4 },
  });

  const svgMap = map.getSVG({
    radius: 0.2,
    color: theme === "dark" ? "#ffffff" : "#ffffff",
    backgroundColor: "transparent"
  });

  // Corrected projection function
  const project = (lat: number, lng: number) => {
    const INDIA_BOUNDS = {
      lat: { min: 6, max: 36 },
      lng: { min: 68, max: 98 }
    };

    const x = ((lng - INDIA_BOUNDS.lng.min) / (INDIA_BOUNDS.lng.max - INDIA_BOUNDS.lng.min)) * 800;
    const y = ((INDIA_BOUNDS.lat.max - lat) / (INDIA_BOUNDS.lat.max - INDIA_BOUNDS.lat.min)) * 400;

    return { x, y };
  };

  // Create curved path
  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50; // Adjust curvature here
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="relative w-full aspect-[2/1] h-[300px]">
      {/* Base Map */}
      <img 
        src={`data:image/svg+xml,${encodeURIComponent(svgMap)}`} 
        className="absolute inset-0 w-full h-96 "
        alt="India Map"
      />

      {/* Animated Connections */}
      <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full">
        {connections.map((conn, i) => {
          const start = project(conn.start.lat, conn.start.lng);
          const end = project(conn.end.lat, conn.end.lng);
          const path = createCurvedPath(start, end);

          return (
            <g key={i}>
              {/* Animated Curved Line */}
              <motion.path
                d={path}
                stroke="#3b82f6"
                strokeWidth="1.2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: i * 0.2 }}
              />

              {/* Start Dot */}
              <motion.circle
                cx={start.x}
                cy={start.y}
                r={4}
                fill="#3b82f6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.2 }}
              />

              {/* Start City Label */}
              <text
                x={start.x}
                y={start.y + 15} // Position below the dot
                textAnchor="middle"
                fill={theme === 'dark' ? 'white' : 'black'}
                fontSize="10"
              >
                {conn.start.label}
              </text>

              {/* End Dot */}
              <motion.circle
                cx={end.x}
                cy={end.y}
                r={4}
                fill="#3b82f6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.2 + 0.5 }}
              />

              {/* End City Label */}
              <text
                x={end.x}
                y={end.y + 15} // Position below the dot
                textAnchor="middle"
                fill={theme === 'dark' ? 'white' : 'black'}
                fontSize="10"
              >
                {conn.end.label}
              </text>

              {/* Connection Label */}
              {/* <motion.text
                x={(start.x + end.x) / 2}
                y={Math.min(start.y, end.y) - 60} // Position above the curve
                textAnchor="middle"
                fill={theme === 'dark' ? 'white' : 'black'}
                fontSize="12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.2 + 0.8 }}
              >
                {conn.start.label} → {conn.end.label}
              </motion.text> */}
            </g>
          );
        })}
      </svg>
    </div>
  );
}