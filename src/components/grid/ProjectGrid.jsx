import React, {
    useMemo,
    useState,
    useEffect,
    Suspense,
} from "react";
import { Canvas } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Leva } from "leva";
import projects from "../../../backend/projects.json";
import MiniMap from "../MiniMap";
import { DEFAULT_CONFIG, CONFIG } from "./gridConfig";
import { rigState, calculateGridDimensions, matchesFilter } from "./gridState";
import { useGridConfig } from "./useGridConfig";
import { Rig } from "./Rig";
import { GridCanvas } from "./GridCanvas";
import { UnifiedControlBar } from "../GridUI";
import Header from "../Header";
import { TopologyBackground } from "../TopologyBackground";
import "../HoloCardMaterial";

// --- PRELOAD ALL TEXTURES ---
projects.forEach((project) => {
    useTexture.preload(project.image_url);
});

export default function ProjectGrid() {
    const [zoomTarget, setZoomTarget] = useState(null);
    const [initialZoom] = useState(DEFAULT_CONFIG.zoomOut);
    const [currentZoom, setCurrentZoom] = useState(rigState.zoom);
    const controls = useGridConfig();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentZoom(rigState.zoom);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const [hasActiveSelection, setHasActiveSelection] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            setHasActiveSelection(rigState.activeId !== null);
        }, 16);
        return () => clearInterval(interval);
    }, []);

    const isZoomedIn = currentZoom <= CONFIG.zoomIn + 0.5;

    // Responsive zoom for mobile viewports
    useEffect(() => {
        const updateResponsiveZoom = () => {
            const width = window.innerWidth;
            let newZoomOut;
            if (width < 480) {
                newZoomOut = 48;
            } else if (width < 768) {
                newZoomOut = 38;
            } else {
                newZoomOut = DEFAULT_CONFIG.zoomOut;
            }
            CONFIG.zoomOut = newZoomOut;
            if (rigState.zoom > CONFIG.zoomIn + 2) {
                rigState.zoom = newZoomOut;
                setCurrentZoom(newZoomOut);
            }
        };
        updateResponsiveZoom();
        window.addEventListener("resize", updateResponsiveZoom);
        return () => window.removeEventListener("resize", updateResponsiveZoom);
    }, []);

    // Sub-filter for Featured collection (collection index 0)
    const [tagFilter, setTagFilter] = useState("all");

    // Collections: Featured (all), 2024, Open Source
    const collectionsData = useMemo(() => {
        const featured = projects; // All projects, filtering happens in GridCanvas
        const recent = projects.filter((p) => p.year === "2024");
        const openSource = projects.filter((p) => p.is_open_source);
        return [featured, recent, openSource];
    }, []);

    const [gridLayers, setGridLayers] = useState(() => [
        {
            id: "init",
            items: projects,
            mode: "enter",
            startTime: 0,
        },
    ]);
    const [activeCollectionIdx, setActiveCollectionIdx] = useState(0);

    const handleCollectionSwitch = (index) => {
        if (index === activeCollectionIdx) return;
        const now = Date.now();
        setGridLayers((prev) => {
            const exitingLayers = prev.map((layer) =>
                layer.mode === "enter"
                    ? { ...layer, mode: "exit", startTime: now }
                    : layer
            );
            const newLayer = {
                id: `grid-${index}-${now}`,
                items: collectionsData[index],
                mode: "enter",
                startTime: now,
            };
            return [...exitingLayers, newLayer];
        });
        setActiveCollectionIdx(index);
        setTagFilter("all");
        rigState.target.set(0, 2, 0);
        rigState.activeId = null;
        setTimeout(() => {
            setGridLayers((prev) =>
                prev.filter((layer) => layer.mode === "enter")
            );
        }, CONFIG.cleanupTimeout);
    };

    const handleFilterChange = (filter) => {
        if (filter === tagFilter) return;
        setTagFilter(filter);
        rigState.activeId = null;
    };

    // Get active project data when something is selected
    const [activeProject, setActiveProject] = useState(null);
    useEffect(() => {
        const interval = setInterval(() => {
            const id = rigState.activeId;
            if (id !== null) {
                const activeLayer = gridLayers[gridLayers.length - 1];
                setActiveProject(activeLayer.items[id] || null);
            } else {
                setActiveProject(null);
            }
        }, 16);
        return () => clearInterval(interval);
    }, [gridLayers]);

    useEffect(() => {
        if (zoomTarget === "OUT") {
            rigState.zoom = CONFIG.zoomOut;
            setCurrentZoom(CONFIG.zoomOut);
            rigState.target.set(0, 2, 0);
        } else if (typeof zoomTarget === "number") {
            rigState.zoom = zoomTarget;
            setCurrentZoom(zoomTarget);
        }
        setZoomTarget(null);
    }, [zoomTarget]);

    const activeLayer = gridLayers[gridLayers.length - 1];
    const filteredItemCount = useMemo(() => {
        if (activeCollectionIdx !== 0) return activeLayer.items.length;
        return activeLayer.items.filter((item) =>
            matchesFilter(item, tagFilter)
        ).length;
    }, [activeLayer.items, activeCollectionIdx, tagFilter]);

    const activeDims = calculateGridDimensions(filteredItemCount);

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "#f0f0f0",
                position: "relative",
                overflow: "hidden",
                touchAction: "none",
            }}
        >
            <Leva collapsed={true} hidden={false} />
            <Header />
            <Canvas
                camera={{ position: [0, 0, initialZoom], fov: 45 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    toneMapping: THREE.NoToneMapping,
                }}
            >
                <Rig gridW={activeDims.width} gridH={activeDims.height} />
                <TopologyBackground
                    isZoomedIn={isZoomedIn}
                    color={CONFIG.bgColor}
                    opacity={CONFIG.bgOpacity}
                    speed={CONFIG.bgSpeed}
                    scale={CONFIG.bgScale}
                    lineThickness={CONFIG.bgLineThickness}
                />
                <fog
                    attach="fog"
                    args={[
                        "#f0f0f0",
                        controls?.fogNear ?? DEFAULT_CONFIG.fogNear,
                        controls?.fogFar ?? DEFAULT_CONFIG.fogFar,
                    ]}
                />
                <Suspense fallback={null}>
                    {gridLayers.map((layer) => (
                        <GridCanvas
                            key={layer.id}
                            items={layer.items}
                            gridVisible={layer.mode === "enter"}
                            transitionStartTime={layer.startTime}
                            interactive={layer.mode === "enter"}
                            filter={activeCollectionIdx === 0 ? tagFilter : "all"}
                        />
                    ))}
                </Suspense>
            </Canvas>
            <MiniMap
                gridDims={activeDims}
                rigState={rigState}
                config={CONFIG}
                totalItems={filteredItemCount}
                isZoomedIn={isZoomedIn}
            />
            <UnifiedControlBar
                currentCollection={activeCollectionIdx}
                onSwitch={handleCollectionSwitch}
                setZoomTrigger={setZoomTarget}
                isZoomedIn={isZoomedIn}
                hasActiveSelection={hasActiveSelection}
                activeProject={activeProject}
                tagFilter={tagFilter}
                onFilterChange={handleFilterChange}
            />
        </div>
    );
}
