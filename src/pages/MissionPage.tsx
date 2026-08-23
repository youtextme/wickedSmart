import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FeedbackForm } from '../components/FeedbackForm';
import { getChild } from '../config/children';
import { getMission } from '../config/missions';
import { useApp } from '../context/AppContext';

export function MissionPage() {
  const { missionId } = useParams<{ missionId: string }>();
  const navigate = useNavigate();
  const { state, completeMission, addFeedback, isMissionComplete } = useApp();
  const [phase, setPhase] = useState<'do' | 'reflect' | 'feedback'>('do');
  const [reflections, setReflections] = useState<Record<number, string>>({});

  const child = getChild(state.activeChildId);
  const mission = missionId ? getMission(missionId) : undefined;

  if (!child || !mission || !mission.childIds.includes(child.id)) {
    return (
      <div className="page">
        <p>Mission not found for this profile.</p>
        <Link to="/">Back home</Link>
      </div>
    );
  }

  const completed = isMissionComplete(mission.id, child.id);

  function handleComplete() {
    if (!mission || !child) return;
    completeMission(mission.id, child.id);
    setPhase('feedback');
  }

  return (
    <div className="page mission-page">
      <button type="button" className="back-link" onClick={() => navigate('/')}>
        ← Back
      </button>

      <header className="mission-header">
        <span className="mission-category">{mission.category}</span>
        <h1>{mission.title}</h1>
        <p className="mission-subtitle">{mission.subtitle}</p>
        <p className="mission-duration-badge">{mission.durationMinutes} min power practice</p>
      </header>

      {mission.bookConnection && child.mode === 'practice' && (
        <aside className="book-connection">
          <strong>From the book:</strong> {mission.bookConnection}
        </aside>
      )}

      {phase === 'do' && (
        <section className="mission-phase">
          <h2>Your mission</h2>
          <p className="do-action">{mission.doAction}</p>
          <ol className="mission-steps">
            {mission.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          {child.mode === 'play' && mission.id === 'brave-breath' && (
            <div className="breath-circle" aria-hidden="true">
              <div className="breath-inner" />
            </div>
          )}
          {child.mode === 'play' && mission.id === 'feelings-faces' && (
            <div className="feelings-faces" role="group" aria-label="Pick a feeling">
              {['😊', '😢', '😠', '😴', '🤩'].map((face) => (
                <button key={face} type="button" className="face-btn" aria-label={`Feeling ${face}`}>
                  {face}
                </button>
              ))}
            </div>
          )}
          <button type="button" className="btn btn-primary" onClick={() => setPhase('reflect')}>
            I did it — reflect
          </button>
        </section>
      )}

      {phase === 'reflect' && (
        <section className="mission-phase">
          <h2>Quick reflection</h2>
          <p className="section-lead">No grades. Just notice what happened.</p>
          {mission.reflectionPrompts.map((prompt, i) => (
            <label key={prompt} className="field">
              <span>{prompt}</span>
              <textarea
                value={reflections[i] ?? ''}
                onChange={(e) =>
                  setReflections((prev) => ({ ...prev, [i]: e.target.value }))
                }
                rows={2}
              />
            </label>
          ))}
          <button type="button" className="btn btn-primary" onClick={handleComplete}>
            Finish mission
          </button>
        </section>
      )}

      {phase === 'feedback' && (
        <section className="mission-phase">
          <h2>How was it?</h2>
          {completed && (
            <p className="completion-banner" role="status">
              Power practice logged. {child.mode === 'play' ? 'Nice job!' : 'You showed up — that counts.'}
            </p>
          )}
          <FeedbackForm
            missionId={mission.id}
            childId={child.id}
            source="mission"
            onSubmit={(data) => {
              addFeedback(data);
            }}
            submitLabel="Send & go home"
          />
          <Link to="/" className="btn btn-ghost">
            Skip to home
          </Link>
        </section>
      )}
    </div>
  );
}
