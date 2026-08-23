import type { Mission } from '../types';

export const missions: Mission[] = [
  {
    id: 'feelings-detective',
    title: 'Feelings Detective',
    subtitle: 'Name what is really going on inside',
    doAction:
      'Pick a moment from The Tiger Rising (or your own day). Write what the character might be feeling — and one clue that tipped you off.',
    steps: [
      'Re-read a page you remember, or think of a scene you already know.',
      'Write the character name and the feeling you think they have (more than one is fine).',
      'Add one clue from the text or from their actions that made you think so.',
      'Now check yourself: when did YOU feel something similar this week?',
    ],
    reflectionPrompts: [
      'Was it easy or tricky to name the feeling?',
      'Did naming it change how you saw the scene?',
    ],
    durationMinutes: 10,
    category: 'feelings',
    childIds: ['ayaan'],
    bookConnection:
      'Rob and Sistine carry big feelings they do not always say out loud. Noticing is the first power move.',
  },
  {
    id: 'suitcase-check',
    title: 'Suitcase Check',
    subtitle: 'What are you carrying today?',
    doAction:
      'Imagine your feelings are items in a suitcase. List three you are carrying right now — and whether you want to keep, share, or set one down.',
    steps: [
      'Draw or list three "feeling items" in your suitcase today.',
      'Label each: keep, share with someone, or set down for now.',
      'Write one sentence about why the heaviest one is there.',
      'Optional: connect to Rob\'s suitcase in the book if you have read that part.',
    ],
    reflectionPrompts: [
      'Which feeling surprised you when you wrote it down?',
      'What would it take to set one down safely?',
    ],
    durationMinutes: 8,
    category: 'feelings',
    childIds: ['ayaan'],
    bookConnection:
      'Rob\'s suitcase holds more than clothes. Sometimes we carry things no one sees.',
  },
  {
    id: 'small-courage-move',
    title: 'Small Courage Move',
    subtitle: 'Bravery does not have to be loud',
    doAction:
      'Do one small brave thing today — speak up, try again, ask a question, or tell the truth about something small. Then write what you did.',
    steps: [
      'Choose one small brave action for today (write it down first).',
      'Do it — or plan exactly when you will before tomorrow.',
      'Write 2–3 sentences: what you did, what felt hard, what you would do again.',
      'Circle one word that describes your courage level: steady, shaky, growing, quiet, bold.',
    ],
    reflectionPrompts: [
      'What almost stopped you?',
      'What did you learn about how courage feels in your body?',
    ],
    durationMinutes: 10,
    category: 'courage',
    childIds: ['ayaan'],
    bookConnection:
      'Sistine does brave things even when her hands shake. Small moves count.',
  },
  {
    id: 'friendship-signals',
    title: 'Friendship Signals',
    subtitle: 'Notice care in the small stuff',
    doAction:
      'Find one way someone showed they care today — or one way YOU showed care. Write the signal and what it meant.',
    steps: [
      'Think of one person: friend, family, classmate, or character in the book.',
      'Write the small signal: a look, a word, standing nearby, sharing something.',
      'Write what you think they were trying to say without words.',
      'Add one signal you could send tomorrow.',
    ],
    reflectionPrompts: [
      'How do you know when someone is on your side?',
      'What kind of friend do you want to be this week?',
    ],
    durationMinutes: 8,
    category: 'friendship',
    childIds: ['ayaan'],
    bookConnection:
      'Rob and Sistine test whether they can trust each other. Friendship sends signals — we have to notice.',
  },
  {
    id: 'tiger-rising-breath',
    title: 'Tiger Rising Breath',
    subtitle: 'Power when something feels stuck',
    doAction:
      'When something feels caged or stuck, use the Tiger Rising breath: in for 4, hold for 4, out for 6. Do three rounds, then write what shifted.',
    steps: [
      'Name what feels stuck right now (homework, friendship, a worry — anything).',
      'Do the breath cycle three times: in 4, hold 4, out 6.',
      'Write one sentence about what changed — even a tiny bit.',
      'If nothing shifted, write that too. Noticing is still power.',
    ],
    reflectionPrompts: [
      'What does "stuck" feel like in your body?',
      'When could you use this breath again?',
    ],
    durationMinutes: 7,
    category: 'reflection',
    childIds: ['ayaan'],
    bookConnection:
      'The title is not just about a tiger. It is about what rises up when we make room for it.',
  },
  {
    id: 'cage-or-opening',
    title: 'Cage or Opening?',
    subtitle: 'Find the small opening',
    doAction:
      'Write a short scene (5–8 sentences) where a character feels trapped — then notices one small opening toward freedom or hope.',
    steps: [
      'Pick a character: from the book, from your life, or one you invent.',
      'Write 2–3 sentences showing the "cage" (pressure, fear, rules, loneliness).',
      'Write 2–3 sentences where they notice ONE small opening — a choice, a word, a breath.',
      'End with a single sentence of what might happen next.',
    ],
    reflectionPrompts: [
      'What made the opening believable?',
      'How is this different from a "happily ever after" ending?',
    ],
    durationMinutes: 12,
    category: 'writing',
    writingType: 'narrative',
    childIds: ['ayaan'],
    bookConnection:
      'A cage is not always bars. Sometimes it is a secret kept too long.',
  },
  {
    id: 'revision-power',
    title: 'Revision Power',
    subtitle: 'Strong writers change one thing on purpose',
    doAction:
      'Take something you wrote before (school, journal, anything). Change ONE sentence to make it stronger. Show before and after.',
    steps: [
      'Find a piece of writing from the last two weeks.',
      'Copy one sentence you want to improve.',
      'Rewrite that sentence — clearer, stronger, or more true.',
      'Write one note: why is the new version better?',
    ],
    reflectionPrompts: [
      'Was it hard to let go of your first version?',
      'What kind of change helped most: a word, the order, or a new detail?',
    ],
    durationMinutes: 12,
    category: 'writing',
    writingType: 'narrative',
    childIds: ['ayaan'],
    bookConnection:
      'Kate DiCamillo rewrote this book many times. Revision is what pros do.',
  },
  {
    id: 'opinion-with-heart',
    title: 'Opinion with Heart',
    subtitle: 'Persuade with reasons that matter',
    doAction:
      'Write your opinion: Should Rob open the suitcase (or face what he is avoiding)? Give three reasons and a strong closing line.',
    steps: [
      'State your opinion in one clear sentence.',
      'Give reason #1 — connect to something that happened in the story or that you predict.',
      'Give reasons #2 and #3 — mix story evidence with what you believe is right.',
      'Close with one sentence that respects the other side but holds your ground.',
    ],
    reflectionPrompts: [
      'Which reason felt strongest?',
      'Did your opinion change while you wrote?',
    ],
    durationMinutes: 15,
    category: 'writing',
    writingType: 'opinion',
    childIds: ['ayaan'],
    bookConnection:
      'Rob\'s choice about the suitcase is not just plot — it is about facing truth.',
  },
  {
    id: 'power-stomp',
    title: 'Power Stomp',
    subtitle: 'Feel strength in your body',
    doAction: 'Stomp your feet three times, arms wide, and say "I am powerful!"',
    steps: [
      'Stand up tall.',
      'Stomp three times — loud or quiet, your choice.',
      'Throw your arms wide and say it: "I am powerful!"',
      'Grown-up: tap Done when finished.',
    ],
    reflectionPrompts: ['Did you do it loud or quiet?'],
    durationMinutes: 5,
    category: 'play',
    childIds: ['younger-sibling'],
  },
  {
    id: 'brave-breath',
    title: 'Brave Breath',
    subtitle: 'Breathe like a big kid',
    doAction: 'Copy the breathing circle — breathe in when it grows, out when it shrinks.',
    steps: [
      'Sit or stand still.',
      'Watch the circle on screen (or breathe in for 3, out for 3).',
      'Do five breaths together.',
      'Tap how you feel after.',
    ],
    reflectionPrompts: ['Do you feel calm or wiggly?'],
    durationMinutes: 5,
    category: 'play',
    childIds: ['younger-sibling'],
  },
  {
    id: 'feelings-faces',
    title: 'Feelings Faces',
    subtitle: 'Tap how you feel',
    doAction: 'Pick the face that matches you right now.',
    steps: [
      'Look at the feeling options.',
      'Tap the one that fits.',
      'If you want, tell a grown-up why.',
    ],
    reflectionPrompts: ['Want to try another face?'],
    durationMinutes: 5,
    category: 'play',
    childIds: ['younger-sibling'],
  },
];

export function getMissionsForChild(childId: string): Mission[] {
  return missions.filter((m) => m.childIds.includes(childId));
}

export function getMission(id: string): Mission | undefined {
  return missions.find((m) => m.id === id);
}
