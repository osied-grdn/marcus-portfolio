import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "./grid/gridConfig";

const islandTransition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 1,
};

export function UnifiedControlBar({
  currentCollection,
  onSwitch,
  setZoomTrigger,
  isZoomedIn,
  hasActiveSelection,
  activeProject,
  tagFilter,
  onFilterChange,
}) {
  const collections = ["Featured", "2024", "Open Source"];

  const tagFilters = [
    { id: "all", label: "All" },
    { id: "web", label: "Web" },
    { id: "systems", label: "Systems" },
  ];

  return (
    <div
      className="control-bar-container"
      style={{
        position: "fixed",
        bottom: "40px",
        left: "0",
        right: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <motion.div
        className="control-bar-island"
        layout
        transition={islandTransition}
        style={{
          background:
            "linear-gradient(135deg, rgba(235, 245, 255, 0.4) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(235, 255, 245, 0.4) 100%)",
          backdropFilter: "blur(40px) saturate(200%)",
          WebkitBackdropFilter: "blur(40px) saturate(200%)",
          borderRadius: "32px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
          padding: "6px",
          display: "flex",
          alignItems: "center",
          pointerEvents: "auto",
          height: "56px",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {hasActiveSelection ? (
            /* STATE 1: VIEW PROJECT (Active Selection) */
            <motion.a
              key="view-project-mode"
              href={activeProject?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              transition={{ ...islandTransition, opacity: { duration: 0.2 } }}
              style={{
                background: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "24px",
                padding: "0 24px",
                height: "44px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                whiteSpace: "nowrap",
                textDecoration: "none",
                gap: "8px",
              }}
            >
              View Project
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </motion.a>
          ) : isZoomedIn ? (
            /* STATE 2: COMPACT (Zoomed In) */
            <motion.div
              key="compact-mode"
              initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
              transition={{ ...islandTransition, opacity: { duration: 0.2 } }}
              style={{ display: "flex" }}
            >
              <ControlButton
                icon="remove"
                onClick={() => setZoomTrigger("OUT")}
                label="Zoom Out"
              />
            </motion.div>
          ) : (
            /* STATE 3: EXPANDED (Zoomed Out) */
            <motion.div
              key="expanded-mode"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              transition={{ ...islandTransition, opacity: { duration: 0.2 } }}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <ControlButton
                icon="add"
                onClick={() => setZoomTrigger(CONFIG.zoomIn)}
                label="Zoom In"
              />

              <motion.div
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "24px" }}
                transition={{ delay: 0.1 }}
                style={{
                  width: "1px",
                  background: "rgba(0,0,0,0.08)",
                  margin: "0 2px",
                  boxShadow: "0 0 1px rgba(255, 255, 255, 0.3)",
                }}
              />

              {/* Collection Tabs */}
              <div style={{ display: "flex", gap: "2px" }}>
                {collections.map((name, index) => {
                  const isActive = currentCollection === index;
                  return (
                    <TabButton
                      key={name}
                      isActive={isActive}
                      onClick={() => onSwitch(index)}
                    >
                      {name}
                    </TabButton>
                  );
                })}
              </div>

              {/* Tag Filters - only for Featured collection on desktop */}
              {currentCollection === 0 && (
                <div className="desktop-filters">
                  <motion.div
                    layout
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={islandTransition}
                    style={{
                      width: "1px",
                      height: "24px",
                      background: "rgba(0,0,0,0.08)",
                      margin: "0 6px",
                      transformOrigin: "center",
                    }}
                  />
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={islandTransition}
                    style={{ display: "flex", gap: "4px" }}
                  >
                    {tagFilters.map((filter) => (
                      <FilterChip
                        key={filter.id}
                        isActive={tagFilter === filter.id}
                        onClick={() => onFilterChange(filter.id)}
                        layoutGroup="desktop"
                      >
                        {filter.label}
                      </FilterChip>
                    ))}
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mobile tag filters */}
      <AnimatePresence>
        {currentCollection === 0 && !isZoomedIn && !hasActiveSelection && (
          <motion.div
            className="mobile-filters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={islandTransition}
            style={{
              position: "absolute",
              bottom: "70px",
              left: 0,
              right: 0,
              display: "none",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                background: "rgba(255, 255, 255, 0.85)",
                backdropFilter: "blur(40px) saturate(200%)",
                WebkitBackdropFilter: "blur(40px) saturate(200%)",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                padding: "6px 8px",
                gap: "4px",
                pointerEvents: "auto",
              }}
            >
              {tagFilters.map((filter) => (
                <FilterChip
                  key={`mobile-${filter.id}`}
                  isActive={tagFilter === filter.id}
                  onClick={() => onFilterChange(filter.id)}
                  layoutGroup="mobile"
                >
                  {filter.label}
                </FilterChip>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .desktop-filters {
          display: flex;
          align-items: center;
        }
        .mobile-filters {
          display: none !important;
        }
        @media (max-height: 800px) {
          .control-bar-container {
            bottom: 24px !important;
          }
          .control-bar-island {
            height: 48px !important;
            border-radius: 24px !important;
            padding: 4px !important;
          }
        }
        @media (max-height: 650px) {
          .control-bar-container {
            bottom: 16px !important;
          }
          .control-bar-island {
            height: 44px !important;
          }
        }
        @media (max-width: 768px) {
          .control-bar-container {
            bottom: 20px !important;
          }
          .control-bar-island {
            height: 48px !important;
            padding: 4px !important;
          }
          .desktop-filters {
            display: none !important;
          }
          .mobile-filters {
            display: flex !important;
          }
        }
        @media (max-width: 480px) {
          .control-bar-container {
            bottom: 16px !important;
          }
          .control-bar-island {
            height: 44px !important;
          }
          .control-button {
            width: 36px !important;
            height: 36px !important;
          }
          .tab-button {
            padding: 6px 10px !important;
            font-size: 12px !important;
          }
          .filter-chip {
            padding: 4px 8px !important;
            font-size: 11px !important;
          }
          .mobile-filters {
            bottom: 60px !important;
          }
        }
      `}</style>
    </div>
  );
}

function ControlButton({ onClick, icon, label }) {
  return (
    <motion.button
      layout="position"
      onClick={onClick}
      className="control-button"
      whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.05)" }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        border: "none",
        background: "transparent",
        color: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        outline: "none",
      }}
      aria-label={label}
    >
      {icon === "add" ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      )}
    </motion.button>
  );
}

function TabButton({ children, isActive, onClick }) {
  return (
    <motion.button
      layout
      onClick={onClick}
      className="tab-button"
      style={{
        position: "relative",
        border: "none",
        background: "transparent",
        color: isActive ? "#000" : "#666",
        padding: "8px 16px",
        borderRadius: "20px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        whiteSpace: "nowrap",
        zIndex: 1,
        transition: "color 0.2s ease",
      }}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="activeTabIndicator"
          transition={islandTransition}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
            zIndex: -1,
          }}
        />
      )}
    </motion.button>
  );
}

function FilterChip({ children, isActive, onClick, layoutGroup = "default" }) {
  return (
    <motion.button
      layout
      onClick={onClick}
      className="filter-chip"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={islandTransition}
      style={{
        position: "relative",
        border: "none",
        background: "transparent",
        color: isActive ? "#fff" : "#555",
        padding: "6px 12px",
        borderRadius: "14px",
        fontSize: "12px",
        fontWeight: "500",
        cursor: "pointer",
        whiteSpace: "nowrap",
        zIndex: 1,
      }}
    >
      {isActive && (
        <motion.div
          layoutId={`activeFilterIndicator-${layoutGroup}`}
          transition={islandTransition}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.85)",
            borderRadius: "14px",
            zIndex: -1,
          }}
        />
      )}
      {!isActive && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.05)",
            borderRadius: "14px",
            zIndex: -1,
          }}
        />
      )}
      {children}
    </motion.button>
  );
}
