import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const islandTransition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 1,
};

const THEME_ICONS = {
  light: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  system: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  dark: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
};

const THEME_LABELS = { light: "Light", system: "Auto", dark: "Dark" };

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
  theme,
  onCycleTheme,
}) {
  const collections = ["Projects", "About"];
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
              border: "1px solid var(--border-island)",
              background: "var(--bg-island)",
              backdropFilter: "blur(40px) saturate(200%)",
              WebkitBackdropFilter: "blur(40px) saturate(200%)",
              boxShadow: "var(--shadow-island)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              pointerEvents: "auto",
              color: "var(--text-primary)",
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
          background: "var(--bg-island)",
          backdropFilter: "blur(40px) saturate(200%)",
          WebkitBackdropFilter: "blur(40px) saturate(200%)",
          borderRadius: "32px",
          border: "1px solid var(--border-island)",
          boxShadow: "var(--shadow-island)",
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
                  color: "var(--text-primary)",
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
                  background: "var(--bg-overlay)",
                  color: "var(--text-secondary)",
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
                      color: hasActiveFilter || filtersOpen ? "var(--text-active)" : "var(--text-filter)",
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
                          background: "var(--text-primary)",
                        }}
                      />
                    )}
                  </motion.button>
                </>
              )}

              {/* Theme toggle */}
              <Divider />
              <motion.button
                layout="position"
                onClick={onCycleTheme}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                transition={islandTransition}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "var(--text-filter)",
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
                {THEME_ICONS[theme]}
                <span className="theme-label">{THEME_LABELS[theme]}</span>
              </motion.button>
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
              background: "var(--bg-island-dropdown)",
              backdropFilter: "blur(40px) saturate(200%)",
              WebkitBackdropFilter: "blur(40px) saturate(200%)",
              borderRadius: "20px",
              border: "1px solid var(--border-island)",
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
                background: "var(--bg-island-dropdown)",
                backdropFilter: "blur(40px) saturate(200%)",
                WebkitBackdropFilter: "blur(40px) saturate(200%)",
                borderRadius: "20px",
                border: "1px solid var(--border-island)",
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
        @media (max-width: 600px) {
          .theme-label {
            display: none;
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
      whileHover={{ scale: 1.05, backgroundColor: "var(--bg-muted)" }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        border: "none",
        background: isActive ? "var(--bg-overlay)" : "transparent",
        color: "var(--text-primary)",
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
        background: "var(--border-divider)",
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
        color: isActive ? "var(--text-active)" : "var(--text-tab)",
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
            background: "var(--tab-active-bg)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "20px",
            border: "1px solid var(--tab-active-border)",
            boxShadow: "var(--tab-active-shadow)",
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
        background: isActive ? "var(--filter-active-bg)" : "var(--filter-inactive-bg)",
        color: isActive ? "var(--filter-active-color)" : "var(--filter-inactive-color)",
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
