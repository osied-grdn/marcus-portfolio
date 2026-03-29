import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const islandTransition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 1,
};

export function UnifiedControlBar({
  currentCollection,
  onSwitch,
  tagFilter,
  onFilterChange,
  expandedProject,
  onClose,
  onInfoOpen,
  viewMode,
  onToggleView,
}) {
  const collections = ["Projects", "About", "Research"];
  const [filtersOpen, setFiltersOpen] = useState(false);

  const tagFilters = [
    { id: "all", label: "All" },
    { id: "ai", label: "AI" },
    { id: "fintech", label: "Fintech" },
    { id: "entertainment", label: "Entertainment" },
    { id: "experience-design", label: "Experience Design" },
  ];

  const hasExpanded = !!expandedProject;
  const hasActiveFilter = tagFilter !== "all";

  return (
    <>
    {/* Floating close circle at top */}
    <AnimatePresence>
      {hasExpanded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={islandTransition}
          style={{
            position: "fixed",
            top: "16px",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            zIndex: 100,
            pointerEvents: "none",
          }}
        >
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              background:
                "linear-gradient(135deg, rgba(235, 245, 255, 0.4) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(235, 255, 245, 0.4) 100%)",
              backdropFilter: "blur(40px) saturate(200%)",
              WebkitBackdropFilter: "blur(40px) saturate(200%)",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              pointerEvents: "auto",
              color: "#111",
              outline: "none",
            }}
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="9" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>

    <div
      className="control-bar-container"
      style={{
        position: "fixed",
        bottom: "16px",
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
          {hasExpanded ? (
            /* EXPANDED STATE: Title + Info button */
            <motion.div
              key="expanded-mode"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              transition={{ ...islandTransition, opacity: { duration: 0.2 } }}
              layout
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <motion.span
                layout="position"
                style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#111",
                  padding: "0 10px",
                  whiteSpace: "nowrap",
                  maxWidth: "260px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {expandedProject.title}
              </motion.span>
              <motion.button
                layout="position"
                onClick={onInfoOpen}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  border: "none",
                  background: "rgba(0,0,0,0.06)",
                  color: "#555",
                  padding: "6px 14px",
                  borderRadius: "14px",
                  fontSize: "12px",
                  fontWeight: "500",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                }}
              >
                Info
              </motion.button>
            </motion.div>
          ) : (
            /* DEFAULT STATE */
            <motion.div
              key="default-mode"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              transition={{ ...islandTransition, opacity: { duration: 0.2 } }}
              layout
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              {/* Search */}
              <IconButton
                onClick={() => {}}
                label="Search"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                }
              />

              {/* List view toggle */}
              <IconButton
                onClick={onToggleView}
                label={viewMode === "grid" ? "List view" : "Grid view"}
                isActive={viewMode === "list"}
                icon={
                  viewMode === "grid" ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="4" y1="6" x2="20" y2="6" />
                      <line x1="4" y1="12" x2="20" y2="12" />
                      <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  )
                }
              />

              <Divider />

              {/* Collection Tabs */}
              <div style={{ display: "flex", gap: "2px" }}>
                {collections.map((name, index) => (
                  <TabButton
                    key={name}
                    isActive={currentCollection === index}
                    onClick={() => { onSwitch(index); setFiltersOpen(false); }}
                  >
                    {name}
                  </TabButton>
                ))}
              </div>

              {/* Filter toggle — only for Projects */}
              {currentCollection === 0 && (
                <>
                  <Divider />
                  <motion.button
                    layout="position"
                    onClick={() => setFiltersOpen((v) => !v)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    transition={islandTransition}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: hasActiveFilter || filtersOpen ? "#000" : "#888",
                      padding: "0 10px",
                      height: "44px",
                      borderRadius: "14px",
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="4" y1="6" x2="20" y2="6" />
                      <line x1="7" y1="12" x2="17" y2="12" />
                      <line x1="10" y1="18" x2="14" y2="18" />
                    </svg>
                    {hasActiveFilter
                      ? tagFilters.find((f) => f.id === tagFilter)?.label
                      : "Filter"}
                    {/* Active dot indicator */}
                    {hasActiveFilter && (
                      <div
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#111",
                        }}
                      />
                    )}
                  </motion.button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Filter dropdown — shows above island when open */}
      <AnimatePresence>
        {filtersOpen && currentCollection === 0 && !hasExpanded && (
          <motion.div
            className="filter-dropdown"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={islandTransition}
            style={{
              position: "absolute",
              bottom: "66px",
              display: "flex",
              justifyContent: "center",
              pointerEvents: "auto",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(40px) saturate(200%)",
              WebkitBackdropFilter: "blur(40px) saturate(200%)",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              padding: "6px 8px",
              gap: "4px",
            }}
          >
            {tagFilters.map((filter) => (
              <FilterChip
                key={filter.id}
                isActive={tagFilter === filter.id}
                onClick={() => {
                  onFilterChange(filter.id);
                  setFiltersOpen(false);
                }}
              >
                {filter.label}
              </FilterChip>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile: same filter dropdown */}
      <AnimatePresence>
        {filtersOpen && currentCollection === 0 && !hasExpanded && (
          <motion.div
            className="mobile-filter-dropdown"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={islandTransition}
            style={{
              position: "absolute",
              bottom: "60px",
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
                flexWrap: "wrap",
                background: "rgba(255, 255, 255, 0.9)",
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
                  onClick={() => {
                    onFilterChange(filter.id);
                    setFiltersOpen(false);
                  }}
                >
                  {filter.label}
                </FilterChip>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .filter-dropdown {
          display: flex;
        }
        .mobile-filter-dropdown {
          display: none !important;
        }
        @media (max-height: 800px) {
          .control-bar-island {
            height: 48px !important;
            border-radius: 24px !important;
            padding: 4px !important;
          }
        }
        @media (max-height: 650px) {
          .control-bar-island {
            height: 44px !important;
          }
        }
        @media (max-width: 768px) {
          .control-bar-container {
            bottom: 12px !important;
          }
          .control-bar-island {
            height: 48px !important;
            padding: 4px !important;
          }
          .filter-dropdown {
            display: none !important;
          }
          .mobile-filter-dropdown {
            display: flex !important;
          }
        }
        @media (max-width: 480px) {
          .control-bar-container {
            bottom: 10px !important;
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
        }
      `}</style>
    </div>
    </>
  );
}

function IconButton({ onClick, label, icon, isActive }) {
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
        background: isActive ? "rgba(0,0,0,0.06)" : "transparent",
        color: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        outline: "none",
      }}
      aria-label={label}
    >
      {icon}
    </motion.button>
  );
}

function Divider() {
  return (
    <div
      style={{
        width: "1px",
        height: "24px",
        background: "rgba(0,0,0,0.08)",
        margin: "0 2px",
        flexShrink: 0,
      }}
    />
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

function FilterChip({ children, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={islandTransition}
      style={{
        position: "relative",
        border: "none",
        background: isActive ? "rgba(0, 0, 0, 0.85)" : "rgba(0, 0, 0, 0.05)",
        color: isActive ? "#fff" : "#555",
        padding: "6px 14px",
        borderRadius: "14px",
        fontSize: "12px",
        fontWeight: "500",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </motion.button>
  );
}
