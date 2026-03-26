import * as THREE from "three";
import { CONFIG } from "./gridConfig";

// --- GLOBAL STATE ---
export const rigState = {
    target: new THREE.Vector3(0, 2, 0),
    current: new THREE.Vector3(0, 2, 0),
    velocity: new THREE.Vector3(0, 0, 0),
    zoom: CONFIG.zoomOut,
    isDragging: false,
    activeId: null,
};

// --- HELPER: Grid Dimensions ---
export const calculateGridDimensions = (count) => {
    const rows = Math.ceil(count / CONFIG.gridCols);
    const spacing = CONFIG.itemSize + CONFIG.gap;
    return {
        width: CONFIG.gridCols * spacing,
        height: rows * spacing,
    };
};

// Stable empty array to avoid unnecessary re-renders
export const EMPTY_TAGS = [];

// --- HELPER: Check if item matches filter ---
// filter: "all" | "web" | "systems" | "design"
export const matchesFilter = (item, filter, tagFilter = EMPTY_TAGS) => {
    let matchesType = true;
    if (filter !== "all") {
        matchesType = item.tags && item.tags.includes(filter);
    }
    return matchesType;
};
