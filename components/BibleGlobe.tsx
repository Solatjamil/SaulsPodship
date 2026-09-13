
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MapPoint } from '../types';

interface BibleGlobeProps {
  points: MapPoint[];
  activePointId: string | null;
  onPointClick: (point: MapPoint) => void;
}

const BibleGlobe: React.FC<BibleGlobeProps> = ({ points, activePointId, onPointClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const markersRef = useRef<{ mesh: THREE.Mesh; point: MapPoint }[]>([]);
  const requestRef = useRef<number>(0);

  // Mapping 2D % coordinates to spherical coordinates on the globe
  // Focusing on the biblical world: Lon -10 to 70, Lat 10 to 50
  const mapToSpherical = (x: number, y: number) => {
    const lon = (x / 100) * 80 - 10;
    const lat = 50 - (y / 100) * 40;
    
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180); 

    const r = 5.05; // Radius slightly above surface
    const vx = -(r * Math.sin(phi) * Math.cos(theta));
    const vz = (r * Math.sin(phi) * Math.sin(theta));
    const vy = (r * Math.cos(phi));

    return new THREE.Vector3(vx, vy, vz);
  };

  const createParchmentTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.Texture();

    // Base Antique Parchment Color
    const gradient = ctx.createLinearGradient(0, 0, 0, 1024);
    gradient.addColorStop(0, '#F4ECD8');
    gradient.addColorStop(0.5, '#EBE5CE');
    gradient.addColorStop(1, '#D8D0B0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 2048, 1024);

    // Fine Paper Grain & Age Spots
    for (let i = 0; i < 120000; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? '#C1B791' : '#FFFFFF';
        ctx.globalAlpha = Math.random() * 0.05;
        ctx.beginPath();
        const x = Math.random() * 2048;
        const y = Math.random() * 1024;
        ctx.arc(x, y, Math.random() * 1.5, 0, Math.PI * 2);
        ctx.fill();
    }

    // Historical Cartographic Grid (Sepia)
    ctx.strokeStyle = '#8B5A2B';
    ctx.lineWidth = 1.0;
    ctx.globalAlpha = 0.15;
    
    // Meridians
    for(let i=0; i<=2048; i+= 2048/24) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 1024);
      ctx.stroke();
    }

    // Parallels
    for(let i=0; i<=1024; i+= 1024/12) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(2048, i);
      ctx.stroke();
    }

    // Faded Continent Outlines (Abstracted for "sacred world" feel)
    ctx.globalAlpha = 0.08;
    ctx.strokeStyle = '#1D2D50';
    ctx.lineWidth = 2.0;
    // Just some decorative scribbles to suggest landmasses
    for(let j=0; j<15; j++) {
        ctx.beginPath();
        ctx.moveTo(Math.random()*2048, Math.random()*1024);
        for(let k=0; k<10; k++) {
            ctx.lineTo(Math.random()*2048, Math.random()*1024);
        }
        ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    return texture;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1c); 
    
    // Distant Ethereal Starfield
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1200;
    const posArray = new Float32Array(starsCount * 3);
    for(let i=0; i<starsCount*3; i++) {
        posArray[i] = (Math.random() - 0.5) * 60; 
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starsMaterial = new THREE.PointsMaterial({
        size: 0.06, 
        color: 0xEEE8AA, 
        transparent: true, 
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });
    const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsMesh);

    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15); 
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.04;
    controls.rotateSpeed = 0.7;
    controls.minDistance = 8;
    controls.maxDistance = 18;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controlsRef.current = controls;

    // GLOBE
    const sphereGeometry = new THREE.SphereGeometry(5, 64, 64);
    const texture = createParchmentTexture();
    const sphereMaterial = new THREE.MeshStandardMaterial({ 
      map: texture,
      roughness: 0.8,
      metalness: 0.05,
      color: 0xffffff,
    });
    const earth = new THREE.Mesh(sphereGeometry, sphereMaterial);
    earth.rotation.y = Math.PI * 0.5; // Initial adjustment
    scene.add(earth);

    // ATMOSPHERIC RIM GLOW
    const glowGeometry = new THREE.SphereGeometry(5.2, 64, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xD4AF37,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide,
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    // MARKERS
    const markerGeometry = new THREE.SphereGeometry(0.14, 16, 16);
    const markerMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B1E3F, 
      roughness: 0.2,
      emissive: 0x4a0a1f,
      emissiveIntensity: 0.3
    }); 
    const stemGeometry = new THREE.CylinderGeometry(0.015, 0.01, 0.5);
    const stemMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1D2D50,
        metalness: 0.5,
        roughness: 0.2
    });

    markersRef.current = points.map(point => {
      const pos = mapToSpherical(point.x, point.y);
      
      const markerGroup = new THREE.Group();
      markerGroup.position.copy(pos);
      markerGroup.lookAt(new THREE.Vector3(0,0,0)); 
      
      const mesh = new THREE.Mesh(markerGeometry, markerMaterial.clone());
      mesh.position.set(0, 0, -0.5); 
      
      const stem = new THREE.Mesh(stemGeometry, stemMaterial);
      stem.rotation.x = Math.PI / 2; 
      stem.position.set(0, 0, -0.25); 

      mesh.userData = { id: point.id, pointData: point };

      markerGroup.add(mesh);
      markerGroup.add(stem);
      scene.add(markerGroup);

      return { mesh, point }; 
    });

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
    sunLight.position.set(5, 5, 5);
    scene.add(sunLight);

    const warmFill = new THREE.PointLight(0xD4AF37, 1.5);
    warmFill.position.set(-10, -5, 5);
    scene.add(warmFill);

    const backRim = new THREE.PointLight(0x1D2D50, 2.0);
    backRim.position.set(0, 0, -15);
    scene.add(backRim);

    // RAYCASTER
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markersRef.current.map(m => m.mesh));

      if (intersects.length > 0) {
        const clickedMarker = intersects[0].object;
        onPointClick(clickedMarker.userData.pointData);
        controls.autoRotate = false;
      }
    };

    renderer.domElement.addEventListener('click', onMouseClick);
    controls.addEventListener('start', () => { controls.autoRotate = false; });

    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.domElement.removeEventListener('click', onMouseClick);
      renderer.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      texture.dispose();
      markerGeometry.dispose();
      markerMaterial.dispose();
      stemGeometry.dispose();
      stemMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
    };
  }, [points]);

  useEffect(() => {
    markersRef.current.forEach(({ mesh, point }) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (point.id === activePointId) {
        mat.color.setHex(0xFFD700); 
        mat.emissive.setHex(0xFFD700);
        mat.emissiveIntensity = 0.8;
        mesh.scale.setScalar(1.6);
      } else {
        mat.color.setHex(0x8B1E3F); 
        mat.emissive.setHex(0x4a0a1f);
        mat.emissiveIntensity = 0.3;
        mesh.scale.setScalar(1);
      }
    });
  }, [activePointId]);

  return (
    <div className="relative w-full h-full group bg-black/5">
       <div ref={containerRef} className="w-full h-full cursor-move" title="Rotate to Explore Ancient Worlds" />
       
       <div className="absolute top-4 left-4 pointer-events-none flex flex-col gap-1">
          <div className="bg-[#1D2D50]/90 backdrop-blur text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-[#D4AF37]/30 shadow-lg flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
             Biblical World Atlas
          </div>
       </div>

       <div className="absolute bottom-4 right-4 pointer-events-none opacity-40">
          <span className="text-[8px] font-bold uppercase tracking-widest text-[#1D2D50]">Historical 3D Projection</span>
       </div>
    </div>
  );
};

export default BibleGlobe;
