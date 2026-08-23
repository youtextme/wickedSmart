import { useMemo } from 'react';
import { children } from '../config/children';
import { getMission } from '../config/missions';
import { useApp } from '../context/AppContext';

export function ParentPage() {
  const { state, exportData } = useApp();

  const childSummaries = useMemo(
    () =>
      children.map((child) => {
        const completions = state.completions.filter((c) => c.childId === child.id);
        const feedback = state.feedback.filter((f) => f.childId === child.id);
        return { child, completions, feedback };
      }),
    [state.completions, state.feedback],
  );

  function handleExport() {
    const blob = new Blob([exportData()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `powerful-kids-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const feelingLabels = ['Rough', 'Meh', 'Okay', 'Good', 'Great'];

  return (
    <div className="page parent-page">
      <header>
        <h1>Parent insights</h1>
        <p className="section-lead">
          Full visibility for this prototype. Completions, feedback, and export for
          iteration.
        </p>
        <button type="button" className="btn btn-primary" onClick={handleExport}>
          Export all data (JSON)
        </button>
      </header>

      <section className="parent-overview">
        <div className="stat-card">
          <span className="stat-value">{state.practiceStreak}</span>
          <span className="stat-label">current streak (days)</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{state.totalPowerPractices}</span>
          <span className="stat-label">total power practices</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{state.completions.length}</span>
          <span className="stat-label">missions completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{state.feedback.length}</span>
          <span className="stat-label">feedback entries</span>
        </div>
      </section>

      {childSummaries.map(({ child, completions, feedback }) => (
        <section key={child.id} className="parent-child-section">
          <h2>
            {child.name}
            <span className="parent-meta">
              age {child.age}
              {child.grade && ` · ${child.grade} grade`}
              {child.mode === 'play' && ' · play mode'}
            </span>
          </h2>

          <h3>Completions ({completions.length})</h3>
          {completions.length === 0 ? (
            <p className="empty-state">No missions completed yet.</p>
          ) : (
            <ul className="parent-list">
              {completions.map((c) => {
                const mission = getMission(c.missionId);
                return (
                  <li key={`${c.missionId}-${c.completedAt}`}>
                    <strong>{mission?.title ?? c.missionId}</strong>
                    <time dateTime={c.completedAt}>
                      {new Date(c.completedAt).toLocaleString()}
                    </time>
                  </li>
                );
              })}
            </ul>
          )}

          <h3>Feedback ({feedback.length})</h3>
          {feedback.length === 0 ? (
            <p className="empty-state">No feedback yet.</p>
          ) : (
            <ul className="parent-feedback-list">
              {feedback.map((f) => {
                const mission = getMission(f.missionId);
                return (
                  <li key={f.id} className="feedback-entry">
                    <div className="feedback-entry-header">
                      <strong>
                        {f.source === 'general'
                          ? 'General feedback'
                          : mission?.title ?? f.missionId}
                      </strong>
                      <time dateTime={f.createdAt}>
                        {new Date(f.createdAt).toLocaleString()}
                      </time>
                    </div>
                    <p>
                      Felt: {feelingLabels[f.howItFelt - 1] ?? f.howItFelt}
                      {f.moreLikeThis && ' · More like this'}
                      {f.lessLikeThis && ' · Less like this'}
                    </p>
                    {f.whatWasHard && <p><em>Hard:</em> {f.whatWasHard}</p>}
                    {f.whatWasFun && <p><em>Fun:</em> {f.whatWasFun}</p>}
                    {f.freeText && <p>{f.freeText}</p>}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
