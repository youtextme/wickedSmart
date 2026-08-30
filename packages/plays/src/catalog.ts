import type { Play, PlayEngine } from './types';

const MINS = 10;

function read(id: string, day: number, order: number, title: string, room: string, skill: string, paragraphs: string[]): Play {
  return {
    id,
    dayIndex: day,
    order,
    engine: 'read-stretch',
    kind: 'read',
    title,
    tagline: 'Read the room. Unlock the next door.',
    roomName: room,
    skill,
    doAction: 'Read this scene. Tap Next when you hit the door.',
    proofHint: 'Screenshot or photo of the last line you read.',
    durationMinutes: MINS,
    storyParagraphs: paragraphs,
  };
}

function write(id: string, day: number, order: number, title: string, room: string, skill: string, prompt: string, words: number): Play {
  return {
    id,
    dayIndex: day,
    order,
    engine: 'write-stretch',
    kind: 'write',
    title,
    tagline: '15-min write sprint. Autosaves.',
    roomName: room,
    skill,
    doAction: prompt,
    proofHint: 'Photo of your log or paste a line.',
    durationMinutes: MINS,
    writePrompt: prompt,
    writeWordGoal: words,
  };
}

function research(id: string, day: number, order: number, title: string, room: string, spark: string): Play {
  return {
    id,
    dayIndex: day,
    order,
    engine: 'research',
    kind: 'research',
    title,
    tagline: 'One tiny research loop. Real hunt.',
    roomName: room,
    skill: 'Question → hunt → one source → what I believe',
    doAction: 'Pick a spark. Run the 4-step cycle.',
    proofHint: 'Photo of your research card (4 boxes filled).',
    durationMinutes: MINS,
    researchSpark: spark,
  };
}

function question(id: string, day: number, order: number, title: string, room: string, initiative: string): Play {
  return {
    id,
    dayIndex: day,
    order,
    engine: 'question-tools',
    kind: 'question',
    title,
    tagline: 'Question it. Tool it. Own your take.',
    roomName: room,
    skill: 'Sharp questions + tool push-back',
    doAction: 'Write your question. Use Gemini. Paste what it said. Write what YOU think.',
    proofHint: 'Screenshot of your question card (yours > tool).',
    durationMinutes: MINS,
    initiative,
    toolLink: 'https://gemini.google.com/',
  };
}

function presence(id: string, day: number, order: number, title: string, room: string, prompt: string): Play {
  return {
    id,
    dayIndex: day,
    order,
    engine: 'presence',
    kind: 'presence',
    title,
    tagline: 'Notice. Name. That is the skill.',
    roomName: room,
    skill: 'Name what you feel without fixing it',
    doAction: prompt,
    proofHint: 'One line: what you named.',
    durationMinutes: MINS,
    presencePrompt: prompt,
  };
}

function people(id: string, day: number, order: number, title: string, room: string, prompt: string): Play {
  return {
    id,
    dayIndex: day,
    order,
    engine: 'people',
    kind: 'people',
    title,
    tagline: 'One real move with a person.',
    roomName: room,
    skill: 'Echo, ask, or door-note in 15 min',
    doAction: prompt,
    proofHint: 'Note what happened (no names needed).',
    durationMinutes: MINS,
    peoplePrompt: prompt,
  };
}

function agency(id: string, day: number, order: number, title: string, room: string, prompt: string): Play {
  return {
    id,
    dayIndex: day,
    order,
    engine: 'agency',
    kind: 'agency',
    title,
    tagline: 'Break. Rebuild. Smallest next move.',
    roomName: room,
    skill: 'First principles + next action',
    doAction: prompt,
    proofHint: 'Photo of before/after or your next-action line.',
    durationMinutes: MINS,
    agencyPrompt: prompt,
  };
}

/** Day 0 — Signal Fortress (7 plays) */
const d0: Play[] = [
  read('d0-r1', 0, 0, 'Gate Scanner', 'North Gate', 'Read stretch — scene chunk 1', [
    'The gate looked ordinary — rust on the hinges, a number painted twice. Rob walked past it every morning without thinking. Today Sistine stopped him. "You never look up," she said. He looked up. There was a bird carved into the wood, worn smooth by rain.',
    'Rob touched the carving. It felt warm, which made no sense. "Gates are just gates," he said. Sistine shook her head. "Everything is a gate if you are trying to leave something behind." Rob did not answer. He was already thinking about the suitcase under his bed.',
    'A truck rumbled on the highway. The sound was far away but it shook the gate anyway. Rob noticed his shoulders had climbed toward his ears. He let them drop. That was new — noticing before fixing.',
  ]),
  read('d0-r2', 0, 1, 'Hall Echo', 'Echo Hall', 'Read stretch — scene chunk 2', [
    'Inside the motel office, the air smelled like old carpet and lemon cleaner. Rob\'s father sat behind the desk reading a paper he had already read. Nobody spoke. Rob counted ceiling tiles — twelve, thirteen — until his mind stopped buzzing.',
    'Sistine appeared in the doorway like she had always belonged there. She dropped a book on the counter. "Read this part aloud," she said. Rob hated reading aloud. He hated more that part of him wanted to try.',
    'He read one paragraph. His voice sounded like someone else\'s. His father looked up — not angry, just awake. "Go on," his father said. Rob went on. The room felt bigger after.',
  ]),
  write('d0-w1', 0, 2, 'Scout Log', 'Log Desk', 'Write stretch — mission log', 'You are scouting the fortress. Write 4–6 sentences: what you saw, what surprised you, one thing you will check tomorrow.', 60),
  research('d0-res', 0, 3, 'Spark Hunt', 'Archive', 'Why do gates matter in stories?'),
  question('d0-q1', 0, 4, 'Boss Ping', 'Antenna', 'Homework feels pointless when I already know the answer'),
  presence('d0-p1', 0, 5, 'Name the Static', 'Quiet Room', 'Sit 60 seconds. Name the feeling in your body right now in ONE word. Write it. No fixing.'),
  people('d0-pe1', 0, 6, 'Relay Ask', 'Radio', 'Ask someone: "What was the best part of your day?" Listen. Write their answer in one sentence.'),
];

/** Day 1 — Cipher Break (6 plays) */
const d1: Play[] = [
  agency('d1-a1', 1, 0, 'Tower Remix', 'Workshop', 'Stack 5 items. Knock down. Rebuild a different shape. Photo the new shape.'),
  read('d1-r1', 1, 1, 'Clue Page', 'Library', 'Read stretch — mystery beat', [
    'The letter had no stamp and no return address. Only three words: OPEN THE SUITCASE. Rob\'s hands went cold. He had not told anyone about the suitcase. Nobody in Kentucky knew the word except him — and maybe the tiger.',
    'He folded the letter into his pocket. Folding felt like hiding, which he was good at. Sistine was not. She would have waved it in the air and demanded answers. Rob wondered which of them was braver.',
  ]),
  write('d1-w1', 1, 2, 'Decrypt Note', 'Cipher Desk', 'Write stretch', 'Write 3 sentences: what the clue might mean. No right answer — your best guess.', 50),
  research('d1-res', 1, 3, 'Parts Scan', 'Lab', 'How do locks work? (pick anything small)'),
  question('d1-q1', 1, 4, 'Tool Probe', 'Terminal', 'I learn faster when I teach myself'),
  people('d1-pe1', 1, 5, 'Echo Back', 'Courtyard', 'Repeat the last 3 words someone said to you today. Write who and what you think they meant.'),
];

/** Day 2 — People Radar (7 plays) */
const d2: Play[] = [
  read('d2-r1', 2, 0, 'Radar Chapter', 'Lookout', 'Read stretch — friendship signal', [
    'Sistine did not smile with her mouth first. She smiled with her shoulders — they dropped half an inch, like she had decided to trust the air. Rob watched that more than her face. Faces could lie. Shoulders were honest.',
    'She tossed him a juice box without asking if he wanted it. "You look thirsty," she said. He was thirsty. He drank. It was the smallest gift and it landed like a lighthouse.',
  ]),
  people('d2-pe1', 2, 1, 'Warm Open', 'Porch', 'Ask one person a question that is NOT about school. Write their answer.'),
  write('d2-w1', 2, 2, 'Field Letter', 'Mailroom', 'Write stretch', 'Write a 5-sentence letter to a character from what you read. Tell them one thing you get now.', 70),
  presence('d2-p1', 2, 3, 'Shoulder Scan', 'Mirror', 'Notice your shoulders right now. Write: up, down, or neutral. One sentence why.'),
  research('d2-res', 2, 4, 'Signal Search', 'Tower', 'What makes someone easy to talk to?'),
  question('d2-q1', 2, 5, 'Charm Check', 'Stage', 'Being liked vs being respected'),
  agency('d2-a1', 2, 6, 'Next Step', 'Trail', 'Pick one thing you have been avoiding. Write the smallest next action (under 10 min). Do it or schedule it.'),
];

/** Day 3 — Cage or Door (6 plays) */
const d3: Play[] = [
  read('d3-r1', 3, 0, 'Cage Page', 'Cell', 'Read stretch — feelings without quiz', [
    'Rob carried things in his chest that had no handles. The tiger in the suitcase was not only a tiger. It was every word he had not said to his mother. Every morning he woke up in Kentucky and pretended the pretending was fine.',
    'Sistine asked him once what he was afraid of. He said "nothing" too fast. She laughed — not mean, just true. "Fast answers are cages," she said. He hated that she was right.',
  ]),
  presence('d3-p1', 3, 1, 'Cage Name', 'Still', 'Name one "cage" you feel today (not bars — rules, fear, secrets). One word + one sentence.'),
  write('d3-w1', 3, 2, 'Door Note', 'Threshold', 'Write stretch', 'Write ONE honest sentence you could tell someone safe. Fold it. Photo optional.', 30),
  research('d3-res', 3, 3, 'Feeling Hunt', 'Study', 'Why do we hide feelings?'),
  question('d3-q1', 3, 4, 'Truth Tool', 'Gate', 'Telling the truth always helps'),
  people('d3-pe1', 3, 5, 'Trust Ping', 'Bridge', 'Tell someone one small true thing. Write how they reacted.'),
];

/** Day 4 — 80/20 Game (7 plays) */
const d4: Play[] = [
  read('d4-r1', 4, 0, 'System Page', 'Strategy', 'Read stretch — systems thinking', [
    'Rob\'s teacher said revise your work. Rob heard fix everything. He spent an hour on a sentence that did not matter. The story stayed stuck. Sistine looked at his page. "You are polishing the wrong rock," she said.',
    'She circled one paragraph. "This is the door. Fix the door." Rob fixed the door. The whole story moved. That was the first time he felt like a writer instead of a student.',
  ]),
  agency('d4-a1', 4, 1, 'MVE Pick', 'Planner', 'List 3 tasks. Circle the ONE that unlocks the rest. Do that one first.'),
  write('d4-w1', 4, 2, 'Briefing', 'Command', 'Write stretch', 'Write 4 sentences: your 80/20 for school OR life this week. What is the 20%?', 55),
  research('d4-res', 4, 3, 'Lever Hunt', 'Intel', 'What is the Pareto principle?'),
  question('d4-q1', 4, 4, 'Meta Game', 'Console', 'Minimum effort on homework'),
  presence('d4-p1', 4, 5, 'Priority Breath', 'Focus', 'Before your next task: one breath. Name the ONE thing. Write it.'),
  people('d4-pe1', 4, 6, 'Energy Ask', 'Lounge', 'Ask someone what drained them today. Listen only. One word for their feeling.'),
];

/** Day 5 — Pressure Bridge (6 plays) */
const d5: Play[] = [
  presence('d5-p1', 5, 0, 'Pressure Name', 'Vault', 'Write 3 words for what is squeezing you. No fixing.'),
  read('d5-r1', 5, 1, 'Load Chapter', 'Bridge', 'Read stretch — pressure metaphor', [
    'The bridge groaned when trucks crossed. Rob liked that sound — honest. Things should groan when they carry weight. People groaned inside and called it fine.',
    'He pressed his palms on the railing. Cold metal, real weight. For a second the pressure in his chest had somewhere to go. He breathed out longer than he breathed in.',
  ]),
  write('d5-w1', 5, 2, 'Compression Log', 'Desk', 'Write stretch', 'Write 5 sentences: what loaded you today and what you did with it.', 65),
  research('d5-res', 5, 3, 'Stress Scan', 'Clinic', 'What happens to your body under stress?'),
  question('d5-q1', 5, 4, 'Push Back', 'Relay', 'Kids should not have this much pressure'),
  agency('d5-a1', 5, 5, 'Load Share', 'Dock', 'Ask for help with one tiny thing. Write what happened.'),
];

/** Day 6 — Honest Move (7 plays) */
const d6: Play[] = [
  read('d6-r1', 6, 0, 'Honest Page', 'Summit', 'Read stretch — reliability', [
    'Rob promised to meet Sistine at the tree. He almost did not go — almost counted as breaking it in his head. He went. She was already there, kicking a root like she had all the time in the world.',
    '"You came," she said. Not praise. Fact. Rob realized promises were doors. Walking through was the whole game.',
  ]),
  write('d6-w1', 6, 1, 'Promise Card', 'Oath', 'Write stretch', 'Write one tiny promise you will keep today. Check it when done.', 40),
  research('d6-res', 6, 2, 'Trust Hunt', 'Archive', 'How do people earn trust?'),
  question('d6-q1', 6, 3, 'Brave Ask', 'Summit', 'Asking for help is weak'),
  people('d6-pe1', 6, 4, 'Stand Near', 'Plaza', 'Stand where you usually hide for 10 seconds. Write what felt different.'),
  presence('d6-p1', 6, 5, 'True Line', 'Mirror', 'One true sentence you usually do not say. Write it. Blur photo OK.'),
  agency('d6-a1', 6, 6, 'Smallest Move', 'Exit', 'Do one honest move today. Write: what, hard part, would you repeat?'),
];

export const plays: Play[] = [...d0, ...d1, ...d2, ...d3, ...d4, ...d5, ...d6];

export function getPlaysForDay(dayIndex: number): Play[] {
  return plays.filter((p) => p.dayIndex === dayIndex).sort((a, b) => a.order - b.order);
}

export function getPlay(id: string): Play | undefined {
  return plays.find((p) => p.id === id);
}

export function engineLabel(e: PlayEngine): string {
  const map: Record<PlayEngine, string> = {
    'read-stretch': 'Read',
    'write-stretch': 'Write',
    research: 'Research',
    'question-tools': 'Question',
    presence: 'Presence',
    people: 'People',
    agency: 'Agency',
  };
  return map[e];
}
