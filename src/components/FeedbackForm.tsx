import { useState } from 'react';
import type { MissionFeedback } from '../types';

interface FeedbackFormProps {
  missionId?: string;
  childId: string;
  source: MissionFeedback['source'];
  onSubmit: (data: Omit<MissionFeedback, 'id' | 'createdAt'>) => void;
  submitLabel?: string;
}

const feelingLabels = ['Rough', 'Meh', 'Okay', 'Good', 'Great'];

export function FeedbackForm({
  missionId = 'general',
  childId,
  source,
  onSubmit,
  submitLabel = 'Send feedback',
}: FeedbackFormProps) {
  const [howItFelt, setHowItFelt] = useState(3);
  const [whatWasHard, setWhatWasHard] = useState('');
  const [whatWasFun, setWhatWasFun] = useState('');
  const [freeText, setFreeText] = useState('');
  const [moreLikeThis, setMoreLikeThis] = useState(false);
  const [lessLikeThis, setLessLikeThis] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      missionId,
      childId,
      howItFelt,
      whatWasHard,
      whatWasFun,
      freeText,
      moreLikeThis,
      lessLikeThis,
      source,
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="feedback-thanks" role="status">
        <h3>Thank you — this helps us build better missions.</h3>
        <p>Your voice is product feedback. We read every note.</p>
      </div>
    );
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <fieldset>
        <legend>How did it feel?</legend>
        <div className="feeling-scale" role="radiogroup" aria-label="How did it feel">
          {feelingLabels.map((label, i) => {
            const value = i + 1;
            return (
              <label key={label} className="feeling-option">
                <input
                  type="radio"
                  name="howItFelt"
                  value={value}
                  checked={howItFelt === value}
                  onChange={() => setHowItFelt(value)}
                />
                <span>{label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className="field">
        <span>What was hard?</span>
        <textarea
          value={whatWasHard}
          onChange={(e) => setWhatWasHard(e.target.value)}
          rows={2}
          placeholder="Optional — be honest, no wrong answers"
        />
      </label>

      <label className="field">
        <span>What was fun or interesting?</span>
        <textarea
          value={whatWasFun}
          onChange={(e) => setWhatWasFun(e.target.value)}
          rows={2}
          placeholder="Optional"
        />
      </label>

      <label className="field">
        <span>Anything else you want us to know?</span>
        <textarea
          value={freeText}
          onChange={(e) => setFreeText(e.target.value)}
          rows={3}
          placeholder="Ideas, wishes, rants — all welcome"
        />
      </label>

      <div className="toggle-row">
        <label className="toggle">
          <input
            type="checkbox"
            checked={moreLikeThis}
            onChange={(e) => setMoreLikeThis(e.target.checked)}
          />
          <span>More like this</span>
        </label>
        <label className="toggle">
          <input
            type="checkbox"
            checked={lessLikeThis}
            onChange={(e) => setLessLikeThis(e.target.checked)}
          />
          <span>Less like this</span>
        </label>
      </div>

      <button type="submit" className="btn btn-primary">
        {submitLabel}
      </button>
    </form>
  );
}
