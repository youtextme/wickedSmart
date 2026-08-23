import type { Mission } from '../types';

interface MissionCardProps {
  mission: Mission;
  completed: boolean;
  onSelect: () => void;
}

const categoryLabels: Record<Mission['category'], string> = {
  feelings: 'Feelings',
  courage: 'Courage',
  friendship: 'Friendship',
  writing: 'Writing',
  reflection: 'Reflection',
  play: 'Play',
};

export function MissionCard({ mission, completed, onSelect }: MissionCardProps) {
  return (
    <button
      type="button"
      className={`mission-card${completed ? ' completed' : ''}`}
      onClick={onSelect}
      aria-label={`${mission.title}${completed ? ', completed' : ''}`}
    >
      <div className="mission-card-top">
        <span className="mission-category">{categoryLabels[mission.category]}</span>
        <span className="mission-duration">{mission.durationMinutes} min</span>
      </div>
      <h3 className="mission-title">{mission.title}</h3>
      <p className="mission-subtitle">{mission.subtitle}</p>
      {mission.writingType && (
        <span className="mission-badge">{mission.writingType} writing</span>
      )}
      {completed && <span className="mission-done">Power practice done</span>}
    </button>
  );
}
