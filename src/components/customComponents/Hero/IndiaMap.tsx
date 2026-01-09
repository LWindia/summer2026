// app/demo.tsx
"use client";
import { IndiaMap } from "@/components/ui/India-map";

export function Demo() {
  return (
    <div className="p-8 bg-gray-100  h-full dark:bg-gray-900">
      <IndiaMap
        connections={[
          {
            start: { lat: 30.6139, lng: 80.209, label: "Delhi" },
            end: { lat: 10, lng: 78.8777, label: "Mumbai" }
          },
          {
            start: { lat: 22.9726, lng: 85.3639, label: "Kolkata" },
            end: { lat: 15.0827, lng: 80.2707, label: "Chennai" }
          },
          {
            start: { lat: 12.9716, lng: 81.5946, label: "Bengaluru" },
            end: { lat: 2.3850, lng: 78.4867, label: "Hyderabad" }
          }
        ]}
      />
    </div>
  );
}