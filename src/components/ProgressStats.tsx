interface ProgressStatsProps {
  streak: number;
  totalPractices: number;
  completedCount: number;
  totalMissions: number;
}

export function ProgressStats({
  streak,
  totalPractices,
  completedCount,
  totalMissions,
}: ProgressStatsProps) {
  const pct = totalMissions > 0 ? Math.round((completedCount / totalMissions) * 100) : 0;

  return (
    <section className="progress-stats" aria-label="Your growth">
      <div className="stat-card">
        <span className="stat-value">{streak}</span>
        <span className="stat-label">day streak</span>
      </div>
      <div className="stat-card">
        <span className="stat-value">{totalPractices}</span>
        <span className="stat-label">power practices</span>
      </div>
      <div className="stat-card wide">
        <div className="progress-bar" aria-hidden="true">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="stat-label">
          {completedCount} of {totalMissions} missions explored
          {completedCount === 0 && ' — your first one is waiting'}
          {completedCount > 0 && completedCount < totalMissions && ' — keep going at your pace'}
          {completedCount === totalMissions && totalMissions > 0 && ' — you showed up for all of them'}
        </span>
      </div>
    </section>
  );
}
