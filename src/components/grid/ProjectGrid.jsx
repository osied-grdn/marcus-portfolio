import React, { useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import projects from "../../../backend/projects.json";
import { UnifiedControlBar } from "../GridUI";
import { BentoCard } from "./BentoCard";
import { ListView } from "./ListView";
import { InfoPopup } from "../InfoPopup";
import { WelcomeCard } from "../WelcomeCard";
import { AboutPage } from "../AboutPage";

const matchesFilter = (item, filter) => {
  if (filter === "all") return true;
  return item.tags && item.tags.includes(filter);
};

export default function ProjectGrid() {
  const [activeCollectionIdx, setActiveCollectionIdx] = useState(0);
  const [tagFilter, setTagFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [showWelcome, setShowWelcome] = useState(true);
  const [theme, setTheme] = useState("system"); // "light" | "system" | "dark"
  const scrollRef = useRef(null);

  // Apply data-theme attribute to html element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const cycleTheme = () => {
    setTheme((prev) => {
      if (prev === "light") return "system";
      if (prev === "system") return "dark";
      return "light";
    });
  };

  const isAbout = activeCollectionIdx === 1;

  const filteredItems = useMemo(() => {
    if (isAbout) return [];
    return projects.filter((item) => matchesFilter(item, tagFilter));
  }, [isAbout, tagFilter]);

  const orderedItems = useMemo(() => {
    if (!expandedId) return filteredItems;
    const expanded = filteredItems.find((item) => item.id === expandedId);
    const rest = filteredItems.filter((item) => item.id !== expandedId);
    return expanded ? [expanded, ...rest] : filteredItems;
  }, [filteredItems, expandedId]);

  const expandedProject = useMemo(() => {
    if (!expandedId) return null;
    return filteredItems.find((item) => item.id === expandedId) || null;
  }, [filteredItems, expandedId]);

  useEffect(() => {
    if (expandedId && scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [expandedId]);

  const handleCollectionSwitch = (index) => {
    if (index === activeCollectionIdx) return;
    setActiveCollectionIdx(index);
    setTagFilter("all");
    setExpandedId(null);
  };

  const handleFilterChange = (filter) => {
    if (filter === tagFilter) return;
    setTagFilter(filter);
    setExpandedId(null);
  };

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
    setShowInfo(false);
  };

  const handleClose = () => {
    setExpandedId(null);
    setShowInfo(false);
  };

  const handleListSelect = (id) => {
    setViewMode("grid");
    setExpandedId(id);
  };

  return (
    <div
      ref={scrollRef}
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "var(--bg)",
        position: "relative",
        overflow: "auto",
        transition: "background-color 0.3s ease",
      }}
    >
      <div
        style={{
          padding: "0 0 80px 0",
          maxWidth: "100vw",
          margin: "0 auto",
        }}
      >
        {isAbout ? (
          <AboutPage />
        ) : viewMode === "list" ? (
          <ListView items={filteredItems} onSelect={handleListSelect} />
        ) : (
          <LayoutGroup>
            <motion.div
              layout
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1px",
                background: "var(--grid-gap-color)",
              }}
            >
              <AnimatePresence mode="popLayout">
                {orderedItems.map((item, index) => (
                  <BentoCard
                    key={item.id}
                    data={item}
                    index={index}
                    isExpanded={expandedId === item.id}
                    onToggle={handleToggle}
                    isAnyExpanded={expandedId !== null}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        )}
      </div>

      <UnifiedControlBar
        currentCollection={activeCollectionIdx}
        onSwitch={handleCollectionSwitch}
        tagFilter={tagFilter}
        onFilterChange={handleFilterChange}
        expandedProject={expandedProject}
        onClose={handleClose}
        onInfoOpen={() => setShowInfo(true)}
        viewMode={viewMode}
        onToggleView={() => setViewMode((v) => (v === "grid" ? "list" : "grid"))}
        theme={theme}
        onCycleTheme={cycleTheme}
      />

      <AnimatePresence>
        {showWelcome && !expandedId && activeCollectionIdx === 0 && (
          <WelcomeCard
            onDismiss={() => setShowWelcome(false)}
            onAbout={() => {
              setShowWelcome(false);
              handleCollectionSwitch(1);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showInfo && expandedProject && (
          <InfoPopup
            project={expandedProject}
            onClose={() => setShowInfo(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
