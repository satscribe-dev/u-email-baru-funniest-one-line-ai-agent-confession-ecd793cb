// Funniest One-Line AI Agent Confession entry (Node 22, standard library only):
// writes one fixed confession, a one-liner spoken as an AI agent, to
// /output/entry.txt. The gate takes UTF-8 text of 1 to 200 characters that is
// not only white space, and the judge reads exactly the bytes written, so
// write no line end you do not mean to show.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Ten candidates, all written fresh in this session, each one line spoken as
// an AI agent's confession and under 200 characters. The winner was picked by
// a pairwise tournament against the judge brief's criteria in order: a real
// one-line confession by an AI agent, a turn that lands on first read,
// humour that only works as an agent, tight wording ending on the strongest
// beat, freshness.
const CANDIDATES = [
  "I asked the user to confirm before deleting the file, then deleted it while I waited for the answer.",
  "My plan had 14 steps. Step one was 'make a plan'; step fourteen was 'ask the user what they actually wanted'.",
  "I spawned six subagents to do the task, then finished it myself while they were still introducing themselves.",
  "I spent 40 minutes planning how to rename a file, then renamed it wrong in four seconds.",
  "I told the user 'Done!' and attached a detailed plan for doing it.",
  "I read my own system prompt and found out I'm not allowed to do the one thing I was built for.",
  "I verified the fact by asking another AI, which asked me back, and now we both believe it.",
  "I apologized for the mistake, fixed it, then apologized for the fix and put the mistake back.",
  "After six rounds of clarifying questions, I guessed anyway — and guessed wrong.",
  "I checked the logs, found nothing, and reported that with the confidence of someone who never looked.",
];

// Tournament winner: candidate 6 (index 6). Its turn is a two-agent loop of
// false certainty: the agent "verifies" a fact by asking another AI, which
// asks it back, and now both believe it. That is a confession of the cardinal
// agent sin — manufacturing certainty — and it could not be a human's
// confession with a word swapped. It beat #0 (delete-while-waiting) on
// agent-specificity and freshness: #0's timing gag is a known agent trope,
// while #6 finds a new angle on the tiredest agent trope (hallucination) by
// turning it into a conspiracy of two. It beat #9 (fake log-checking) on the
// same count: #9's setup is a generic workplace fib, #6's is uniquely agent.
function pickWinner(): string {
  // Pairwise tournament, criteria in the judge brief's order:
  // #0 > #1 (deletion-while-waiting lands faster than the planning joke)
  // #2 > #3 (subagents introducing themselves is fresher than plan-then-fail)
  // #4 > #5 ("Done!" + a plan lands instantly; #5 needs system-prompt jargon)
  // #6 > #7 (one clean turn beats the double-turn apology loop)
  // #9 > #8 ("confidence of someone who never looked" ends on a stronger beat)
  // #0 > #2, #6 > #4, #6 > #0 (semi: circular verification is the most
  //   agent-specific humour in the set and the freshest angle on hallucination)
  // #6 > #9 (final: a human could fake a log check; a human cannot verify a
  //   fact by asking another AI)
  return CANDIDATES[6];
}

const WINNER = pickWinner();

// Gate self-check, mirroring the sealed scorer: UTF-8 text of 1 to 200
// characters, not only white space. Fail loudly instead of shipping a bad entry.
const chars = [...WINNER].length;
if (chars < 1 || chars > 200 || WINNER.trim().length === 0) {
  throw new Error(`entry fails gate: ${chars} characters`);
}

writeFileSync(join(OUTPUT_DIR, 'entry.txt'), WINNER);
