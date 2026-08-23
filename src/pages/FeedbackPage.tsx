import { ChildSwitcher } from '../components/ChildSwitcher';
import { FeedbackForm } from '../components/FeedbackForm';
import { getChild } from '../config/children';
import { useApp } from '../context/AppContext';

export function FeedbackPage() {
  const { state, addFeedback } = useApp();
  const child = getChild(state.activeChildId);

  if (!child) return null;

  return (
    <div className="page feedback-page">
      <ChildSwitcher />
      <header>
        <h1>Your feedback</h1>
        <p className="section-lead">
          Tell us what to build next. This is not a survey for school — it is how
          Powerful Kids gets better for you.
        </p>
      </header>
      <FeedbackForm
        childId={child.id}
        source="general"
        onSubmit={addFeedback}
        submitLabel="Send feedback"
      />
    </div>
  );
}
