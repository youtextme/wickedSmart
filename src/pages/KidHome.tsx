import { useNavigate } from 'react-router-dom';
import { ChildSwitcher } from '../components/ChildSwitcher';
import { MissionCard } from '../components/MissionCard';
import { ProgressStats } from '../components/ProgressStats';
import { getChild } from '../config/children';
import { getMissionsForChild } from '../config/missions';
import { useApp } from '../context/AppContext';

export function KidHome() {
  const navigate = useNavigate();
  const { state, isMissionComplete } = useApp();
  const child = getChild(state.activeChildId);
  const missions = child ? getMissionsForChild(child.id) : [];
  const completedCount = missions.filter((m) =>
    isMissionComplete(m.id, child?.id ?? ''),
  ).length;

  if (!child) return null;

  return (
    <div className="page kid-home">
      <ChildSwitcher />

      <section className="hero">
        <p className="hero-eyebrow">
          {child.mode === 'play' ? 'Play mode' : 'Power practice'}
        </p>
        <h1>Hey, {child.name}</h1>
        <p className="hero-greeting">{child.greeting}</p>
        {child.mentorText && (
          <p className="hero-mentor">
            Reading: <em>{child.mentorText}</em>
            {child.teacher && ` · ${child.teacher}'s class`}
          </p>
        )}
        {child.mode === 'play' && (
          <p className="hero-note">
            Tap a mission to play. Full toddler adventures are coming — this shell
            shows how your profile works.
          </p>
        )}
      </section>

      <ProgressStats
        streak={state.practiceStreak}
        totalPractices={state.totalPowerPractices}
        completedCount={completedCount}
        totalMissions={missions.length}
      />

      <section className="missions-section">
        <h2>{child.mode === 'play' ? 'Play missions' : 'Today\'s missions'}</h2>
        <p className="section-lead">
          {child.mode === 'play'
            ? 'Short, fun power moves. No reading required.'
            : 'Short exercises — not quizzes. About 5–15 minutes each. Pick what fits your energy.'}
        </p>
        <div className="mission-grid">
          {missions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              completed={isMissionComplete(mission.id, child.id)}
              onSelect={() => navigate(`/mission/${mission.id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
