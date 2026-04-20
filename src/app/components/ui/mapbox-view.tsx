/// <reference types="vite/client" />
import React, { useRef, useState, useCallback, useEffect } from 'react';
import Map, { Marker, Layer, Source, MapRef } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapboxViewProps {
  className?: string;
  viewMode?: '2d' | '3d';
}

export function MapboxView({ className, viewMode = '3d' }: MapboxViewProps) {
  const mapRef = useRef<MapRef>(null);
  const [viewState, setViewState] = useState({
    longitude: 72.8777, // Mumbai coordinates
    latitude: 19.0760,
    zoom: viewMode === '3d' ? 16 : 14,
    pitch: viewMode === '3d' ? 60 : 0,
    bearing: viewMode === '3d' ? -17.6 : 0
  });

  const mapboxToken = import.meta.env.VITE_MAPBOX_API_TOKEN;

  // Refined 3D Building Style for high-accuracy and Digital Twin feel
  const buildingLayer: any = {
    id: 'add-3d-buildings',
    source: 'composite',
    'source-layer': 'building',
    filter: ['==', 'extrude', 'true'],
    type: 'fill-extrusion',
    minzoom: 12, // Lower the zoom limit to see them sooner
    paint: {
      // Logic for building color: Holographic Cyan in 3D, Solid Steel in 2D
      'fill-extrusion-color': [
        'interpolate',
        ['linear'],
        ['get', 'height'],
        0, viewMode === '3d' ? '#00f0ff' : '#d1d5db',
        100, viewMode === '3d' ? '#0077ff' : '#9ca3af'
      ],
      'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        12, 0,
        12.05, ['get', 'height']
      ],
      'fill-extrusion-base': [
        'interpolate',
        ['linear'],
        ['zoom'],
        12, 0,
        12.05, ['get', 'min_height']
      ],
      'fill-extrusion-opacity': 0.7,
      'fill-extrusion-vertical-gradient': true
    }
  };

  const onStyleData = useCallback(() => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();
    
    // Configure Light to add depth and shadows to 3D buildings
    map.setLight({
      anchor: 'viewport',
      color: 'white',
      intensity: 0.4,
      position: [1.15, 210, 30]
    });
  }, []);

  if (!mapboxToken) {
    return (
      <div className={`flex items-center justify-center h-full ${className}`}>
        <div className="text-center">
          <p className="text-red-500 mb-2">Mapbox API token not found</p>
          <p className="text-sm text-gray-500">Please set VITE_MAPBOX_API_TOKEN in your .env file</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden rounded-xl ${className}`}>
      <Map
        ref={mapRef}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        onStyleData={onStyleData}
        style={{ width: '100%', height: '100%' }}
        // Keep satellite skin as requested, but we improve accuracy with layer settings
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        mapboxAccessToken={mapboxToken}
        terrain={viewMode === '3d' ? { source: 'mapbox-dem', exaggeration: 1.5 } : undefined}
        antialias={true}
      >
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
        />
        
        {/* Render 3D buildings on top of satellite imagery */}
        <Layer {...buildingLayer} />
        
        {/* Add a "holographic grid" effect in 3D view mode */}
        {viewMode === '3d' && (
          <Layer
            id="sky"
            type="sky"
            paint={{
              'sky-type': 'atmosphere',
              'sky-atmosphere-sun': [0.0, 90.0],
              'sky-atmosphere-sun-intensity': 15
            }}
          />
        )}

        <Marker longitude={72.8777} latitude={19.0760} anchor="bottom">
          <div className="w-4 h-4 bg-cyan-400 rounded-full border-2 border-white shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-pulse"></div>
        </Marker>
      </Map>
    </div>
  );
}