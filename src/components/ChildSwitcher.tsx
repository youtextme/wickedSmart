import { children } from '../config/children';
import { useApp } from '../context/AppContext';

export function ChildSwitcher() {
  const { state, setActiveChild } = useApp();

  return (
    <div className="child-switcher" role="tablist" aria-label="Choose child profile">
      {children.map((child) => (
        <button
          key={child.id}
          type="button"
          role="tab"
          aria-selected={state.activeChildId === child.id}
          className={
            state.activeChildId === child.id
              ? 'child-chip active'
              : 'child-chip'
          }
          onClick={() => setActiveChild(child.id)}
        >
          {child.name}
          {child.mode === 'play' && <span className="chip-tag">Play</span>}
        </button>
      ))}
    </div>
  );
}
