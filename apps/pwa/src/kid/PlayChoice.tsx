interface Props {
  onBreak: () => void;
  onNext: () => void;
  hasMore: boolean;
}

export function PlayChoice({ onBreak, onNext, hasMore }: Props) {
  return (
    <div className="play-choice">
      <div className="choice-glow" aria-hidden />
      <h2 className="choice-head">Level clear</h2>
      <p className="choice-sub">{hasMore ? 'Want another round?' : 'You cleared today. Rest up.'}</p>
      <div className="choice-btns">
        <button type="button" className="choice-break" onClick={onBreak}>
          Take a break
        </button>
        {hasMore && (
          <button type="button" className="go-btn" onClick={onNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
