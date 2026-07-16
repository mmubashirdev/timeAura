"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import { X, RotateCcw, Loader2 } from "lucide-react";

export default function Product3DViewer({ product, onClose }) {
  const mountRef = useRef(null);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const sceneObjectsRef = useRef({});
  const rafRef = useRef(0);
  const controlsRef = useRef(null);
  const autoRotateRef = useRef(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Palette based on category
    const palette = getPalette(product);

    // ---- Scene / Camera / Renderer ----
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#f7f3ef");

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 2, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // ---- Lights ----
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.3);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffd8a8, 0.6);
    rimLight.position.set(-5, 3, -5);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xffffff, 0.4);
    fillLight.position.set(0, -3, 5);
    scene.add(fillLight);

    // ---- Build model based on product category ----
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    const parts = buildModel(product, palette, modelGroup);

    // Shadow floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.ShadowMaterial({ opacity: 0.25 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3;
    floor.receiveShadow = true;
    scene.add(floor);

    // Orient
    modelGroup.rotation.x = -Math.PI / 8;

    sceneObjectsRef.current = { scene, camera, renderer, modelGroup, parts };

    // ---- Controls ----
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 5;
    controls.maxDistance = 15;
    controls.enablePan = false;
    controlsRef.current = controls;

    // ---- Overlay + panel entrance ----
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 },
    );
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, scale: 0.92, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power3.out" },
    );

    // ---- Assembly timeline ----
    const tl = gsap.timeline({ delay: 0.3 });
    animateAssembly(tl, camera, parts);

    // ---- Animation loop ----
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      if (autoRotateRef.current) modelGroup.rotation.y += 0.004;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // ---- Resize ----
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ---- Pause auto-rotate on user interaction ----
    const stopAuto = () => (autoRotateRef.current = false);
    renderer.domElement.addEventListener("pointerdown", stopAuto);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("pointerdown", stopAuto);
      controls.dispose();
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material))
            obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [product]);

  const handleClose = () => {
    gsap.to(panelRef.current, {
      opacity: 0,
      scale: 0.92,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: onClose,
    });
  };

  const resetView = () => {
    const { camera, modelGroup } = sceneObjectsRef.current;
    if (!camera || !modelGroup) return;
    autoRotateRef.current = true;
    gsap.to(camera.position, {
      x: 0,
      y: 2,
      z: 7,
      duration: 0.8,
      ease: "power2.out",
    });
    gsap.to(modelGroup.rotation, {
      x: -Math.PI / 8,
      y: 0,
      z: 0,
      duration: 0.8,
      ease: "power2.out",
    });
    controlsRef.current?.target.set(0, 0, 0);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl overflow-hidden w-full max-w-5xl h-[85vh] shadow-2xl"
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10 bg-gradient-to-b from-white/95 to-transparent pointer-events-none">
          <div>
            <h3 className="font-serif text-xl text-[#800020]">
              {product.name}
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Interactive 3D View · Drag to rotate · Scroll to zoom
            </p>
          </div>
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={resetView}
              className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:border-[#800020] hover:text-[#800020] transition-colors"
              title="Reset view"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleClose}
              className="w-9 h-9 rounded-full bg-[#800020] text-white flex items-center justify-center hover:bg-[#5c0016] transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Canvas mount */}
        <div ref={mountRef} className="w-full h-full" />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-neutral-500 flex items-center gap-2 pointer-events-none">
          <Loader2 className="w-3 h-3 animate-spin" /> Rendering
        </div>
      </div>
    </div>
  );
}

/* ---------------- Model builders ---------------- */

function getPalette(product) {
  const cat = (product.category || "").toLowerCase();
  if (cat.includes("wallet")) {
    return {
      body: "#5c3a1e",
      accent: "#C9A14A",
      inner: "#2a1a10",
    };
  }
  if (cat.includes("perfume")) {
    return {
      body: "#1a0a10",
      accent: "#C9A14A",
      liquid: "#800020",
    };
  }
  // default = watch
  return {
    caseColor: "#c9a07a",
    dialColor: "#2a1410",
    strapColor: "#5c3a1e",
    accentColor: "#C9A14A",
  };
}

function buildModel(product, palette, group) {
  const cat = (product.category || "").toLowerCase();
  if (cat.includes("wallet")) return buildWallet(palette, group);
  if (cat.includes("perfume")) return buildPerfume(palette, group);
  return buildWatch(palette, group);
}

function buildWatch(palette, watch) {
  const caseMat = new THREE.MeshStandardMaterial({
    color: palette.caseColor,
    metalness: 0.9,
    roughness: 0.2,
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: palette.dialColor,
    metalness: 0.4,
    roughness: 0.5,
  });
  const strapMat = new THREE.MeshStandardMaterial({
    color: palette.strapColor,
    metalness: 0.1,
    roughness: 0.9,
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: palette.accentColor,
    metalness: 1,
    roughness: 0.15,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0,
    transmission: 0.9,
    transparent: true,
    opacity: 0.25,
    thickness: 0.1,
  });

  const watchCase = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.5, 0.4, 64),
    caseMat,
  );
  watchCase.rotation.x = Math.PI / 2;
  watchCase.castShadow = true;
  watch.add(watchCase);

  const bezel = new THREE.Mesh(
    new THREE.TorusGeometry(1.5, 0.12, 24, 64),
    accentMat,
  );
  bezel.position.z = 0.2;
  watch.add(bezel);

  const dial = new THREE.Mesh(
    new THREE.CylinderGeometry(1.35, 1.35, 0.05, 64),
    dialMat,
  );
  dial.rotation.x = Math.PI / 2;
  dial.position.z = 0.22;
  watch.add(dial);

  const markers = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    const marker = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.2, 0.03),
      accentMat,
    );
    const angle = (i / 12) * Math.PI * 2;
    marker.position.set(Math.cos(angle) * 1.15, Math.sin(angle) * 1.15, 0.25);
    marker.rotation.z = -angle + Math.PI / 2;
    markers.add(marker);
  }
  watch.add(markers);

  const hourHand = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.7, 0.02),
    accentMat,
  );
  hourHand.position.set(0, 0.3, 0.27);
  watch.add(hourHand);

  const minuteHand = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 1.0, 0.02),
    accentMat,
  );
  minuteHand.rotation.z = Math.PI / 3;
  minuteHand.position.set(0.15, 0.4, 0.28);
  watch.add(minuteHand);

  const centerCap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.05, 16),
    accentMat,
  );
  centerCap.rotation.x = Math.PI / 2;
  centerCap.position.z = 0.3;
  watch.add(centerCap);

  const glass = new THREE.Mesh(
    new THREE.CylinderGeometry(1.4, 1.4, 0.15, 64),
    glassMat,
  );
  glass.rotation.x = Math.PI / 2;
  glass.position.z = 0.32;
  watch.add(glass);

  const crown = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 0.15, 24),
    caseMat,
  );
  crown.rotation.z = Math.PI / 2;
  crown.position.set(1.55, 0, 0);
  watch.add(crown);

  const upperStrap = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 2.2, 0.15),
    strapMat,
  );
  upperStrap.position.y = 2.2;
  upperStrap.castShadow = true;
  watch.add(upperStrap);

  const lowerStrap = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 2.2, 0.15),
    strapMat,
  );
  lowerStrap.position.y = -2.2;
  lowerStrap.castShadow = true;
  watch.add(lowerStrap);

  return {
    type: "watch",
    watchCase,
    bezel,
    dial,
    markers,
    hourHand,
    minuteHand,
    centerCap,
    glass,
    crown,
    upperStrap,
    lowerStrap,
  };
}

function buildWallet(palette, group) {
  const bodyMat = new THREE.MeshStandardMaterial({
    color: palette.body,
    metalness: 0.1,
    roughness: 0.85,
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: palette.accent,
    metalness: 1,
    roughness: 0.2,
  });
  const innerMat = new THREE.MeshStandardMaterial({
    color: palette.inner,
    roughness: 1,
  });

  const outer = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 0.4), bodyMat);
  outer.castShadow = true;
  group.add(outer);

  const inner = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.8, 0.05), innerMat);
  inner.position.z = 0.21;
  group.add(inner);

  const logo = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.15, 0.01),
    accentMat,
  );
  logo.position.set(0, -0.6, 0.21);
  group.add(logo);

  const stitch = new THREE.Mesh(
    new THREE.TorusGeometry(1.4, 0.02, 8, 40),
    accentMat,
  );
  stitch.scale.set(1, 0.66, 1);
  stitch.position.z = 0.21;
  group.add(stitch);

  return { type: "wallet", outer, inner, logo, stitch };
}

function buildPerfume(palette, group) {
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.05,
    transmission: 0.85,
    transparent: true,
    opacity: 0.7,
    thickness: 0.2,
  });
  const liquidMat = new THREE.MeshStandardMaterial({
    color: palette.liquid,
    metalness: 0.2,
    roughness: 0.4,
    transparent: true,
    opacity: 0.9,
  });
  const capMat = new THREE.MeshStandardMaterial({
    color: palette.body,
    metalness: 0.8,
    roughness: 0.3,
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: palette.accent,
    metalness: 1,
    roughness: 0.15,
  });

  const bottle = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.4, 1.2), glassMat);
  bottle.castShadow = true;
  group.add(bottle);

  const liquid = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1.6, 1.1),
    liquidMat,
  );
  liquid.position.y = -0.35;
  group.add(liquid);

  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.35, 0.3, 32),
    capMat,
  );
  neck.position.y = 1.35;
  group.add(neck);

  const cap = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.9, 0.9), capMat);
  cap.position.y = 1.95;
  cap.castShadow = true;
  group.add(cap);

  const label = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.8, 0.01),
    accentMat,
  );
  label.position.z = 0.62;
  group.add(label);

  return { type: "perfume", bottle, liquid, neck, cap, label };
}

/* ---------------- Assembly animations ---------------- */

function animateAssembly(tl, camera, parts) {
  // Camera dolly-in
  tl.to(camera.position, { z: 6, duration: 1.2, ease: "power2.out" }, 0);

  if (parts.type === "watch") {
    const {
      watchCase,
      bezel,
      dial,
      markers,
      hourHand,
      minuteHand,
      centerCap,
      glass,
      crown,
      upperStrap,
      lowerStrap,
    } = parts;

    // Initial exploded state
    upperStrap.position.y = 6;
    lowerStrap.position.y = -6;
    bezel.scale.setScalar(0);
    dial.scale.setScalar(0);
    glass.position.z = 3;
    glass.material.opacity = 0;
    crown.position.x = 4;
    hourHand.scale.setScalar(0);
    minuteHand.scale.setScalar(0);
    centerCap.scale.setScalar(0);
    markers.children.forEach((m) => m.scale.setScalar(0));
    watchCase.scale.setScalar(0);

    tl.to(
      watchCase.scale,
      { x: 1, y: 1, z: 1, duration: 0.6, ease: "back.out(2)" },
      0.1,
    )
      .to(
        bezel.scale,
        { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(1.7)" },
        0.4,
      )
      .to(dial.scale, { x: 1, y: 1, z: 1, duration: 0.4 }, 0.6)
      .to(
        markers.children.map((m) => m.scale),
        { x: 1, y: 1, z: 1, duration: 0.4, ease: "back.out(2)", stagger: 0.03 },
        0.8,
      )
      .to(
        [hourHand.scale, minuteHand.scale, centerCap.scale],
        { x: 1, y: 1, z: 1, duration: 0.4, ease: "back.out(2)", stagger: 0.1 },
        1.2,
      )
      .to(glass.position, { z: 0.32, duration: 0.5, ease: "power2.out" }, 1.4)
      .to(glass.material, { opacity: 0.25, duration: 0.5 }, 1.4)
      .to(crown.position, { x: 1.55, duration: 0.4, ease: "power2.out" }, 1.5)
      .to(
        upperStrap.position,
        { y: 2.2, duration: 0.6, ease: "power2.out" },
        1.6,
      )
      .to(
        lowerStrap.position,
        { y: -2.2, duration: 0.6, ease: "power2.out" },
        1.6,
      );
  }

  if (parts.type === "wallet") {
    const { outer, inner, logo, stitch } = parts;
    outer.scale.setScalar(0);
    inner.scale.setScalar(0);
    logo.scale.setScalar(0);
    stitch.scale.set(0, 0, 0);
    tl.to(
      outer.scale,
      { x: 1, y: 1, z: 1, duration: 0.6, ease: "back.out(1.8)" },
      0.1,
    )
      .to(inner.scale, { x: 1, y: 1, z: 1, duration: 0.4 }, 0.5)
      .to(
        stitch.scale,
        { x: 1, y: 0.66, z: 1, duration: 0.4, ease: "back.out(2)" },
        0.7,
      )
      .to(
        logo.scale,
        { x: 1, y: 1, z: 1, duration: 0.4, ease: "back.out(2)" },
        0.9,
      );
  }

  if (parts.type === "perfume") {
    const { bottle, liquid, neck, cap, label } = parts;
    bottle.scale.setScalar(0);
    liquid.scale.setScalar(0);
    neck.position.y = 4;
    cap.position.y = 6;
    label.scale.setScalar(0);
    tl.to(
      bottle.scale,
      { x: 1, y: 1, z: 1, duration: 0.6, ease: "back.out(1.7)" },
      0.1,
    )
      .to(
        liquid.scale,
        { x: 1, y: 1, z: 1, duration: 0.5, ease: "power2.out" },
        0.5,
      )
      .to(neck.position, { y: 1.35, duration: 0.4, ease: "power2.out" }, 0.7)
      .to(cap.position, { y: 1.95, duration: 0.5, ease: "bounce.out" }, 0.9)
      .to(
        label.scale,
        { x: 1, y: 1, z: 1, duration: 0.4, ease: "back.out(2)" },
        1.3,
      );
  }
}
