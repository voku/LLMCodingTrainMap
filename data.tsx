import React from 'react';
import { Station, TransitLine, LineColor } from './types';
import { ExternalLink, Terminal, AlertTriangle, CheckCircle, Brain, Shield, Zap, GitCommit, Layers, Code, Play, Split, FileText, Lightbulb, PenTool, Target } from 'lucide-react';

// --- Helper Components ---

const CodeBlock = ({ children }: { children?: React.ReactNode }) => (
  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm my-4 overflow-x-auto border-l-4 border-indigo-500 shadow-sm">
    <pre className="whitespace-pre-wrap">{children}</pre>
  </div>
);

const SectionHeader = ({ children, icon: Icon }: { children?: React.ReactNode, icon?: any }) => (
  <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3 flex items-center gap-2 tracking-tight">
    {Icon && <Icon size={20} className="text-slate-500" />}
    {children}
  </h3>
);

const List = ({ items }: { items: string[] }) => (
  <ul className="list-none space-y-2 my-4">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2 text-slate-700">
        <span className="bg-slate-200 text-slate-600 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">{i + 1}</span>
        <span dangerouslySetInnerHTML={{ __html: item }} />
      </li>
    ))}
  </ul>
);

const LinkCard = ({ url, title, description }: { url: string, title: string, description?: string }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className="block my-4 p-4 rounded-lg border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all bg-white group no-underline">
    <div className="flex items-center justify-between">
       <div className="flex-1 min-w-0">
         <div className="font-bold text-slate-800 group-hover:text-indigo-600 truncate pr-4">{title}</div>
         <div className="text-xs text-slate-400 font-mono truncate">{url.replace(/^https?:\/\//, '')}</div>
       </div>
       <ExternalLink size={16} className="text-slate-300 group-hover:text-indigo-500 shrink-0" />
    </div>
    {description && <div className="text-sm text-slate-600 mt-2 border-t border-slate-100 pt-2 leading-relaxed">{description}</div>}
  </a>
);

// --- Lines Definition ---
// Y-Shift: +400px applied to all previous coordinates.
// Foundation Line: Added at top.

export const lines: TransitLine[] = [
  {
    id: 'foundation',
    name: 'The Foundation',
    color: LineColor.Foundation,
    description: 'Mental Models & Planning',
    path: 'M 500 50 L 500 450',
    fullContent: (
      <>
        <div className="p-4 bg-slate-100 border-l-4 border-slate-900 text-slate-900 mb-6">
          <strong>The Intro:</strong> LLMs don’t replace engineering discipline, even if they will replace many developers. This guide shows a workflow that keeps correctness, speed, and control.
        </div>

        <SectionHeader icon={Brain}>You Don't Work with LLMs</SectionHeader>
        <p className="text-slate-700">
          If you treat an LLM like a teammate, you'll be disappointed.
          <br/>
          If you treat it like a compiler, you'll ship valuable results.
        </p>

        <SectionHeader icon={Shield}>Why Developers Fail</SectionHeader>
        <List items={[
          'Vague inputs',
          'Missing constraints',
          'No stopping condition',
          'Blind trust'
        ]} />

        <SectionHeader icon={Target}>The Mental Model</SectionHeader>
        <p className="text-slate-700 mb-4">
          Internalize this model before prompting:
        </p>
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="min-w-full text-sm text-left text-slate-600">
            <thead className="bg-slate-50 text-slate-900 font-bold">
              <tr>
                <th className="px-4 py-2 border-b">Programming Concept</th>
                <th className="px-4 py-2 border-b">LLM Equivalent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr><td className="px-4 py-2">Source Code</td><td className="px-4 py-2">Prompt + Context</td></tr>
              <tr><td className="px-4 py-2 font-bold text-indigo-600">Compiler</td><td className="px-4 py-2 font-bold text-indigo-600">LLM</td></tr>
              <tr><td className="px-4 py-2">Linker</td><td className="px-4 py-2">Manual Edits</td></tr>
              <tr><td className="px-4 py-2">Runtime</td><td className="px-4 py-2">Production</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-2">If something breaks, the bug is in the input (prompt), not the compiler.</p>

        <SectionHeader icon={Lightbulb}>Planning is Coding</SectionHeader>
        <p className="text-slate-700">
          Start every feature by converting chaos into structure. Use LLMs to triage tickets, extract criteria, and find blind spots before you write a single line of code.
        </p>
      </>
    )
  },
  { 
    id: 'start', 
    name: 'Entry Zone', 
    color: LineColor.Start, 
    description: 'Task Classification', 
    path: 'M 500 450 L 500 500',
    fullContent: (
      <>
        <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 text-indigo-900 mb-6">
            <strong>The Crossroad:</strong> The biggest mistake is treating every coding task the same. You must choose the right tool (and lane) for the job.
        </div>
        <SectionHeader icon={Split}>Pick Your Lane</SectionHeader>
        <p className="text-slate-600 mb-4">LLMs are not one tool. They are four different tools depending on your goal. Choose one track and stay on it.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-amber-50 p-4 rounded border border-amber-200">
            <strong className="text-amber-900 block">Lane A: Legacy</strong>
            <span className="text-amber-800 text-sm">Fragile, old stacks, weird quirks. Use manual copy-paste and prototypes.</span>
          </div>
          <div className="bg-purple-50 p-4 rounded border border-purple-200">
            <strong className="text-purple-900 block">Lane B: Frontend</strong>
            <span className="text-purple-800 text-sm">New shiny web features, fast iteration. Use Vibe Coding.</span>
          </div>
          <div className="bg-orange-50 p-4 rounded border border-orange-200">
            <strong className="text-orange-900 block">Lane C: Agents</strong>
            <span className="text-orange-800 text-sm">Large repetitive refactors, batch work. Use CLI Agents.</span>
          </div>
          <div className="bg-slate-50 p-4 rounded border border-slate-200">
            <strong className="text-slate-900 block">Lane D: Daily</strong>
            <span className="text-slate-700 text-sm">Precision maintenance inside IDE. Use Inline Completion.</span>
          </div>
        </div>
      </>
    )
  },
  { 
    id: 'lane_a', 
    name: 'Lane A: Legacy Stack', 
    color: LineColor.LaneA, 
    description: 'Older PHP, Java, etc.', 
    path: 'M 500 500 C 500 500, 150 500, 150 550 L 150 1000 C 150 1050, 500 1000, 500 1050',
    fullContent: (
      <>
        <div className="p-4 bg-amber-50 border-l-4 border-amber-500 text-amber-900 mb-6">
          <strong>When to use:</strong> Older stacks (PHP, Java) where the LLM struggles with quirks (e.g., 1996 template engines).
        </div>

        <SectionHeader icon={Layers}>1. Generate a Mockup</SectionHeader>
        <p className="text-slate-700">
          Generate an image mockup after providing your "style guide" and examples. 
          If you haven't a style guide yet, let the LLM help you with that task first.
        </p>
        <LinkCard url="https://gist.github.com/voku/8615cc2b095ec2d46a3e69faa2595dad" title="Style Guide Helper" description="Gist to help extract style guides." />

        <SectionHeader icon={Play}>2. Generate a Click-Dummy</SectionHeader>
        <p className="text-slate-700">
          Turn the mockup into a clickable prototype (HTML/CSS/JS) to verify flows against constraints. 
          This is cheap and disposable.
        </p>

        <SectionHeader icon={Code}>3. Manual Integration</SectionHeader>
        <p className="text-slate-700">
          Use the Click-Dummy to integrate the feature into the real code, mostly by hand.
          You act as the surgeon; the LLM was just the architect.
        </p>

        <SectionHeader icon={Shield}>4. Tests</SectionHeader>
        <p className="text-slate-700">
          Let the LLM add some tests in the end. Lock in the behavior you just manually verified.
        </p>
      </>
    )
  },
  { 
    id: 'lane_b', 
    name: 'Lane B: Vibe-Coding', 
    color: LineColor.LaneB, 
    description: 'The 2026 Way', 
    path: 'M 500 500 C 500 500, 380 500, 380 550 L 380 1000 C 380 1050, 500 1000, 500 1050',
    fullContent: (
      <>
        <div className="p-4 bg-purple-50 border-l-4 border-purple-500 text-purple-900 mb-6">
          <strong>When to use:</strong> Modern stacks where iteration is cheap and instant.
        </div>

        <SectionHeader icon={Brain}>1. Go to AI Studio</SectionHeader>
        <p className="text-slate-700">
          Use your planning from before, and copy & paste the <strong>full document</strong> into the input.
        </p>
        <LinkCard url="https://aistudio.google.com/" title="Google AI Studio" />

        <SectionHeader icon={Split}>2. Ping-Pong Time</SectionHeader>
        <p className="text-slate-700">
          Shape the results by providing direct feedback and ideas that pop up while seeing the results.
          Don't settle for the first draft.
        </p>

        <SectionHeader icon={GitCommit}>3. Push 90% Version</SectionHeader>
        <p className="text-slate-700">
          Push the 90% version to GitHub (just one click in the UI). Don't try to get the last 10% perfect in the chat.
        </p>

        <SectionHeader icon={Terminal}>4. Agentic Cleanup</SectionHeader>
        <p className="text-slate-700">
          Use another LLM (e.g., Codex or GitHub agent) to handle the cleanup. Give it a batch list:
        </p>
        <CodeBlock>
{`Remove GEMINI references
Update README.md to remove AI Studio ads
Add "Key Files Detector" helper to README
Add a favicon
Create a contribution link
Configure GitHub Pages deployment
Add GitHub Actions workflow
Build and verify the application works`}
        </CodeBlock>

        <SectionHeader icon={ExternalLink}>5. Go Live</SectionHeader>
        <p className="text-slate-700">
          Activate GitHub Pages. Your webapp is online while you managed all this with your phone.
        </p>
        <LinkCard url="https://dev.to/suckup_de/posts-as-webapps-26lk" title="Posts as Webapps" description="Example webapps created this way." />
      </>
    )
  },
  { 
    id: 'lane_c', 
    name: 'Lane C: Agentic Batch', 
    color: LineColor.LaneC, 
    description: 'Vibe-Coding with Control', 
    path: 'M 500 500 C 500 500, 620 500, 620 550 L 620 1000 C 620 1050, 500 1000, 500 1050',
    fullContent: (
      <>
        <div className="p-4 bg-orange-50 border-l-4 border-orange-500 text-orange-900 mb-6">
          <strong>When to use:</strong> Large repetitive refactors or well-defined batch tasks.
        </div>

        <SectionHeader icon={FileText}>1. Plan with Restrictions</SectionHeader>
        <p className="text-slate-700">
          Ensure your planning phase is solid. Document clear constraints in an <code>AGENTS.md</code> file in your repo root.
        </p>

        <SectionHeader icon={Layers}>2. Define Tasks</SectionHeader>
        <p className="text-slate-700">
          Add clear, bite-sized tasks into a <code>docs/TODO.md</code> file via the LLM.
        </p>

        <SectionHeader icon={Terminal}>3. Run the Agent</SectionHeader>
        <p className="text-slate-700">
          Use CLI tools to execute the list.
        </p>
        <CodeBlock>codex --yolo "Implement the open tasks from docs/TODO.md"</CodeBlock>

        <SectionHeader icon={Brain}>Why Agents?</SectionHeader>
        <p className="text-slate-700 mb-4">
          I created the project below via agents. Agents struggle with slow feedback loops (like Android builds), but thrive on Webapps.
        </p>
        <div className="bg-slate-100 p-4 rounded text-sm italic text-slate-600">
          "My main pain point is that if you didn't do the coding work anymore you haven't this mental model of the project in mind."
        </div>
        <LinkCard url="https://github.com/voku/AmysEcho/" title="Amy's Echo" description="Project built purely via agents." />
      </>
    )
  },
  { 
    id: 'lane_d', 
    name: 'Lane D: Daily Driver', 
    color: LineColor.LaneD, 
    description: 'IDE-Centric with Guardrails', 
    path: 'M 500 500 C 500 500, 850 500, 850 550 L 850 1000 C 850 1050, 500 1000, 500 1050',
    fullContent: (
      <>
        <div className="p-4 bg-slate-100 border-l-4 border-slate-500 text-slate-900 mb-6">
          <strong>When to use:</strong> Maintenance, debugging, and refactoring where correctness matters more than speed. No agents. No pipelines.
        </div>

        <SectionHeader icon={Layers}>1. Curate Context Explicitly</SectionHeader>
        <p className="text-slate-700">
          Copilot does not understand your project unless you open the right tabs:
        </p>
        <List items={[
          'Open the interface or contract',
          'Open the concrete implementation',
          'Open the relevant test',
          'Open involved DTOs'
        ]} />
        <p className="text-xs font-bold uppercase text-slate-500 mt-2">Rule: If the file is not open, it doesn't exist.</p>

        <SectionHeader icon={Code}>2. Prefer Inline Edit</SectionHeader>
        <p className="text-slate-700">
          Use Copilot where diffs are visible and reversible (Ctrl + Shift + I).
          <br/>
          Prompt with precise, local instructions like: <em>"Extract the loop logic into a private method processItems with an explicit return type."</em>
        </p>

        <SectionHeader icon={FileText}>3. Reverse Documentation</SectionHeader>
        <p className="text-slate-700">
          For unclear code, ask Copilot to <strong>describe</strong> it first.
          "Write a PHPDoc explaining exactly what this code does."
          Refactor only after understanding.
        </p>

        <SectionHeader icon={Shield}>4. No Passenger Mode</SectionHeader>
        <p className="text-slate-700">
          The <code>Tab → Accept → Commit</code> loop is a trap.
          If you can't explain the generated code, <strong>reject it</strong>.
        </p>
      </>
    )
  },
  { 
    id: 'exit', 
    name: 'Shared Exit', 
    color: LineColor.Exit, 
    description: 'Safety & Memory', 
    path: 'M 500 1050 L 500 1450',
    fullContent: (
      <>
         <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-900 mb-6">
          <strong>The Gatekeeper:</strong> No matter which lane you took, all code must pass through this safety checklist before production.
        </div>
        <SectionHeader icon={Shield}>1. Run Checks</SectionHeader>
        <p className="text-slate-700">
          Run your types, linters, static analysis, and tests. No green lights, no progress. 
          If you skipped this because "the LLM wrote it", you are inviting bugs.
        </p>

        <SectionHeader icon={Zap}>2. Fix via Rules</SectionHeader>
        <p className="text-slate-700">
          If checks fail, do not just re-roll the prompt hoping for luck. 
          Analyze the failure, tighten the constraints, or adjust the task.
        </p>

        <SectionHeader icon={FileText}>3. Draft Commit</SectionHeader>
        <p className="text-slate-700">
          Let the LLM draft the commit message summarizing the diff. It's good at describing "What", but you must add the "Why".
        </p>

        <SectionHeader icon={GitCommit}>4. Persist</SectionHeader>
        <p className="text-slate-700">
          Persist decisions in docs, ADRs, and comments. Only now does code go to production.
        </p>
      </>
    )
  }
];

// --- Stations Definition ---

export const stations: Station[] = [
  // --- The Foundation (New) ---
  {
    id: 'p1', name: 'P1: Mental Model', x: 500, y: 80, type: 'stop', lineId: 'foundation', labelPlacement: 'right',
    description: 'LLM as Compiler',
    content: (
      <>
        <SectionHeader icon={Brain}>Teammate vs. Compiler</SectionHeader>
        <div className="my-4 border border-slate-200 rounded-lg overflow-hidden">
          <div className="grid grid-cols-2 bg-slate-50 p-3 font-bold text-sm border-b border-slate-200">
            <div>If you treat it like...</div>
            <div>Result</div>
          </div>
          <div className="grid grid-cols-2 p-3 border-b border-slate-100">
            <div className="text-red-600">A Teammate</div>
            <div>Disappointment</div>
          </div>
          <div className="grid grid-cols-2 p-3">
            <div className="text-green-600">A Compiler</div>
            <div>Valuable Results</div>
          </div>
        </div>
        <p className="text-slate-700">If something breaks, <strong>the bug is in the input</strong>, mostly not in the compiler.</p>
      </>
    )
  },
  {
    id: 'p2', name: 'P2: Input Discipline', x: 500, y: 180, type: 'stop', lineId: 'foundation', labelPlacement: 'left',
    description: 'No Raw Thoughts',
    content: (
      <>
        <SectionHeader icon={PenTool}>Amplify Clarity</SectionHeader>
        <p className="text-slate-600 mb-4">LLMs amplify ambiguity. If your input is fuzzy, the output will be confidently wrong.</p>
        <div className="bg-red-50 p-3 rounded mb-2 text-sm text-red-800 border border-red-100">
          <strong>Bad:</strong> "Implement the refund logic."
        </div>
        <div className="bg-green-50 p-3 rounded text-sm text-green-800 border border-green-100">
          <strong>Good:</strong> "Context: PHP 8.2, RefundService. Constraint: No new deps. Task: Draft calculation logic only."
        </div>
      </>
    )
  },
  {
    id: 'p3', name: 'P3: The 90% Rule', x: 500, y: 280, type: 'stop', lineId: 'foundation', labelPlacement: 'right',
    description: 'Scaffolding Only',
    content: (
      <>
        <SectionHeader icon={Target}>Stop Prompting</SectionHeader>
        <p className="text-slate-600 mb-4">LLMs are excellent at scaffolding, DTOs, and mappings. They are bad at domain invariants and legacy quirks.</p>
        <div className="p-4 bg-slate-100 border-l-4 border-slate-500 italic text-slate-700">
          "The moment you think 'it’s almost right', stop prompting. Fix it manually or add a test."
        </div>
      </>
    )
  },
  {
    id: 'p4', name: 'P4: Planning', x: 500, y: 380, type: 'stop', lineId: 'foundation', labelPlacement: 'left',
    description: 'Triage & Blind Spots',
    content: (
      <>
        <SectionHeader icon={Lightbulb}>Chaos to Structure</SectionHeader>
        <p className="text-slate-600">Before coding, use LLMs to:</p>
        <List items={[
          'Summarize long ticket threads',
          'Extract precise acceptance criteria',
          'Identify system invariants',
          'Run a "blind spot analysis"'
        ]} />
      </>
    )
  },

  // --- S0 Hub (Shifted Y to 480) ---
  {
    id: 's0', name: 'S0: Task Classification', x: 500, y: 480, type: 'hub', lineId: 'start', labelPlacement: 'top-right',
    description: 'What kind of work is this?',
    content: (
      <>
        <SectionHeader icon={Split}>Pick Your Lane</SectionHeader>
        <p className="text-slate-600 mb-4">LLMs are not one tool. They are four different tools depending on your goal. Choose one track and stay on it.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-amber-50 p-4 rounded border border-amber-200">
            <strong className="text-amber-900 block">Lane A: Legacy</strong>
            <span className="text-amber-800 text-sm">Fragile, old stacks, weird quirks.</span>
          </div>
          <div className="bg-purple-50 p-4 rounded border border-purple-200">
            <strong className="text-purple-900 block">Lane B: Frontend</strong>
            <span className="text-purple-800 text-sm">New shiny web features, fast iteration.</span>
          </div>
          <div className="bg-orange-50 p-4 rounded border border-orange-200">
            <strong className="text-orange-900 block">Lane C: Agents</strong>
            <span className="text-orange-800 text-sm">Large repetitive refactors, batch work.</span>
          </div>
          <div className="bg-slate-50 p-4 rounded border border-slate-200">
            <strong className="text-slate-900 block">Lane D: Daily</strong>
            <span className="text-slate-700 text-sm">Precision maintenance inside IDE.</span>
          </div>
        </div>
      </>
    )
  },

  // --- Lane A: Legacy (X: 150, Y+400) ---
  {
    id: 'a1', name: 'A1: Style Guide', x: 150, y: 580, type: 'stop', lineId: 'lane_a', labelPlacement: 'left',
    description: 'Extract Rules',
    content: (
      <>
        <SectionHeader>Snapshot the Rules</SectionHeader>
        <p className="text-slate-600">Don't let the LLM guess your legacy styles. Extract patterns from existing UI/code: naming, layout, component structure.</p>
        <LinkCard url="https://gist.github.com/voku/8615cc2b095ec2d46a3e69faa2595dad" title="Style Guide Generator" description="Helper to extract styles." />
      </>
    )
  },
  {
    id: 'a2', name: 'A2: Visual Mockup', x: 150, y: 680, type: 'stop', lineId: 'lane_a', labelPlacement: 'left',
    description: 'Generate Images',
    content: (
      <>
        <SectionHeader>Pixels, Not Code</SectionHeader>
        <p className="text-slate-600">Ask for an image of the feature using your style guide. Align on look and flow without fighting 1996 template engines.</p>
      </>
    )
  },
  {
    id: 'a3', name: 'A3: Click-Dummy', x: 150, y: 780, type: 'stop', lineId: 'lane_a', labelPlacement: 'left',
    description: 'Disposable Prototype',
    content: (
      <>
        <SectionHeader>Verify Flow Cheaply</SectionHeader>
        <p className="text-slate-600">Generate plain HTML/CSS/JS prototype. Verify navigation and states cheaply before touching the fragile real codebase.</p>
      </>
    )
  },
  {
    id: 'a4', name: 'Manual Integration', x: 150, y: 880, type: 'hub', lineId: 'lane_a', labelPlacement: 'left',
    description: 'Hand Porting',
    content: (
      <>
        <SectionHeader>The Human Surgeon</SectionHeader>
        <p className="text-slate-600">Translate the prototype into real legacy code by hand. You adapt to hidden constraints the LLM can't see.</p>
      </>
    )
  },
  {
    id: 'a5', name: 'A5: Generated Tests', x: 150, y: 980, type: 'stop', lineId: 'lane_a', labelPlacement: 'left',
    description: 'Lock in Reality',
    content: (
      <>
        <SectionHeader>Test the Result</SectionHeader>
        <p className="text-slate-600">Now that it works, let the LLM draft tests describing the final behaviour. Lock in reality.</p>
      </>
    )
  },

  // --- Lane B: Frontend (X: 380, Y+400) ---
  {
    id: 'b1', name: 'B1: Full Plan', x: 380, y: 560, type: 'stop', lineId: 'lane_b', labelPlacement: 'left',
    description: 'One Context Dump',
    content: (
      <>
        <SectionHeader>Full Context Input</SectionHeader>
        <p className="text-slate-600">Paste one coherent spec document into AI Studio. Big context, single direction. Don't feed fragments.</p>
      </>
    )
  },
  {
    id: 'b2', name: 'B2: Ping-Pong', x: 380, y: 640, type: 'stop', lineId: 'lane_b', labelPlacement: 'left',
    description: 'Visual Iteration',
    content: (
      <>
        <SectionHeader>Shape the Result</SectionHeader>
        <p className="text-slate-600">React to live previews. "Move this", "Simplify that". Short cycles, direct feedback.</p>
      </>
    )
  },
  {
    id: 'b3', name: 'B3: 90% Stop', x: 380, y: 720, type: 'stop', lineId: 'lane_b', labelPlacement: 'left',
    description: 'Freeze',
    content: (
      <>
        <SectionHeader>Don't Chase Perfection</SectionHeader>
        <p className="text-slate-600">When it basically works and looks right, stop. Do not try to polish the last 10% in the chat window.</p>
      </>
    )
  },
  {
    id: 'b4', name: 'B4: Push Repo', x: 380, y: 800, type: 'hub', lineId: 'lane_b', labelPlacement: 'left',
    description: 'Create Artifact',
    content: (
      <>
        <SectionHeader>Versioned Reality</SectionHeader>
        <p className="text-slate-600">Push to GitHub immediately. Now it's versioned, shareable, and reviewable.</p>
      </>
    )
  },
  {
    id: 'c4', name: 'B5: Agentic Cleanup', x: 380, y: 880, type: 'stop', lineId: 'lane_b', labelPlacement: 'left',
    description: 'Batch Chores',
    content: (
      <>
        <SectionHeader>Janitor Agents</SectionHeader>
        <p className="text-slate-600">Use an agent to handle the boring stuff in one go.</p>
      </>
    )
  },
  {
    id: 'b6', name: 'B6: Instant Deploy', x: 380, y: 960, type: 'stop', lineId: 'lane_b', labelPlacement: 'left',
    description: 'Live URL',
    content: (
      <>
        <SectionHeader>Real URLs</SectionHeader>
        <p className="text-slate-600">Turn it into a live webapp fast. Real URLs expose real problems and give motivation.</p>
        <LinkCard url="https://dev.to/suckup_de/posts-as-webapps-26lk" title="Posts as Webapps" description="Example webapps created this way." />
      </>
    )
  },

  // --- Lane C: Agentic (X: 620, Y+400) ---
  {
    id: 'c1', name: 'C1: Hard Rules', x: 620, y: 580, type: 'stop', lineId: 'lane_c', labelPlacement: 'right',
    description: 'AGENTS.md',
    content: (
      <>
        <SectionHeader>The Sandbox Wall</SectionHeader>
        <p className="text-slate-600">Define what may be changed and what must never be touched in an <code>AGENTS.md</code> file.</p>
      </>
    )
  },
  {
    id: 'c2', name: 'C2: Generate TODO', x: 620, y: 680, type: 'stop', lineId: 'lane_c', labelPlacement: 'right',
    description: 'Atomic Tasks',
    content: (
      <>
        <SectionHeader>Lists, Not Essays</SectionHeader>
        <p className="text-slate-600">Break work into atomic tasks in a markdown file. "Rename X to Y", "Add null check in Z". No vague instructions.</p>
      </>
    )
  },
  {
    id: 'c3', name: 'C3: Run Agent', x: 620, y: 780, type: 'stop', lineId: 'lane_c', labelPlacement: 'right',
    description: 'Execute List',
    content: (
      <>
        <SectionHeader>Deterministic Scope</SectionHeader>
        <CodeBlock>codex --yolo "Implement tasks from docs/TODO.md"</CodeBlock>
        <p className="text-slate-600">Point the agent at that file and nothing else.</p>
      </>
    )
  },
  {
    id: 'c4_real', name: 'C4: Diff Review', x: 620, y: 880, type: 'hub', lineId: 'lane_c', labelPlacement: 'right',
    description: 'Human Review',
    content: (
      <>
        <SectionHeader>Root Responsibility</SectionHeader>
        <p className="text-slate-600">Read every change. Agents have speed and zero intuition.</p>
      </>
    )
  },
  {
    id: 'c5', name: 'C5: Iterate', x: 620, y: 980, type: 'stop', lineId: 'lane_c', labelPlacement: 'right',
    description: 'Small Batches',
    content: (
      <>
        <SectionHeader>Safe Runs</SectionHeader>
        <p className="text-slate-600">Adjust TODOs, run again. Many small safe runs beat one heroic gamble.</p>
      </>
    )
  },

  // --- Lane D: Daily Driver (X: 850, Y+400) ---
  {
    id: 'd1', name: 'D1: Curate Context', x: 850, y: 580, type: 'stop', lineId: 'lane_d', labelPlacement: 'right',
    description: 'Open Tabs',
    content: (
      <>
        <SectionHeader>Context is Key</SectionHeader>
        <p className="text-slate-600">Open only relevant files (Interface, Implementation, Test). If a file isn't open, it doesn't exist to Copilot.</p>
      </>
    )
  },
  {
    id: 'd2', name: 'D2: Inline Edit', x: 850, y: 680, type: 'stop', lineId: 'lane_d', labelPlacement: 'right',
    description: 'Visible Diffs',
    content: (
      <>
        <SectionHeader>Local Instructions</SectionHeader>
        <p className="text-slate-600">Select code, trigger inline edit. "Extract loop to private method". Small, visible diffs.</p>
      </>
    )
  },
  {
    id: 'd3', name: 'D3: Explain First', x: 850, y: 780, type: 'stop', lineId: 'lane_d', labelPlacement: 'right',
    description: 'Understand',
    content: (
      <>
        <SectionHeader>Reverse Documentation</SectionHeader>
        <p className="text-slate-600">First ask the LLM to describe existing behavior. Understanding precedes refactoring.</p>
      </>
    )
  },
  {
    id: 'd4', name: 'D4: Explainable', x: 850, y: 880, type: 'hub', lineId: 'lane_d', labelPlacement: 'right',
    description: 'No Magic',
    content: (
      <>
        <SectionHeader>No Passenger Mode</SectionHeader>
        <p className="text-slate-600">If you can't explain the generated change, reject it. Borrowed code without understanding is debt.</p>
      </>
    )
  },
  {
    id: 'd5', name: 'D5: Tiny Commits', x: 850, y: 980, type: 'stop', lineId: 'lane_d', labelPlacement: 'right',
    description: 'Revertible',
    content: (
      <>
        <SectionHeader>Stability</SectionHeader>
        <p className="text-slate-600">Each accepted change should be easily revertible. Stability comes from small deltas.</p>
      </>
    )
  },

  // --- Shared Exit (X: 500, Y+400) ---
  {
    id: 'x1', name: 'X1: Run Checks', x: 500, y: 1080, type: 'stop', lineId: 'exit', labelPlacement: 'left',
    description: 'Validation',
    content: (
      <>
        <SectionHeader icon={Shield}>The Gatekeeper</SectionHeader>
        <p className="text-slate-600">Run types, linters, static analysis, and tests. No green lights, no progress.</p>
      </>
    )
  },
  {
    id: 'x2', name: 'X2: Fix via Rules', x: 500, y: 1160, type: 'stop', lineId: 'exit', labelPlacement: 'right',
    description: 'No Guessing',
    content: (
      <>
        <SectionHeader>Fix the Inputs</SectionHeader>
        <p className="text-slate-600">Tighten constraints or adjust tasks if checks fail. Don't just re-roll the prompt.</p>
      </>
    )
  },
  {
    id: 'x3', name: 'X3: Draft Commit', x: 500, y: 1240, type: 'stop', lineId: 'exit', labelPlacement: 'left',
    description: 'Auto Summary',
    content: (
      <>
        <SectionHeader>What Changed</SectionHeader>
        <p className="text-slate-600">Let the LLM draft the commit message summarizing the diff.</p>
      </>
    )
  },
  {
    id: 'x4', name: 'X4: Add the WHY', x: 500, y: 1320, type: 'stop', lineId: 'exit', labelPlacement: 'right',
    description: 'Human Intent',
    content: (
      <>
        <SectionHeader>Context is Human</SectionHeader>
        <p className="text-slate-600">Add the "WHY" manually. Future you needs reasons, not just diffs.</p>
      </>
    )
  },
  {
    id: 'x5', name: 'X5: Persist', x: 500, y: 1400, type: 'terminus', lineId: 'exit', labelPlacement: 'bottom',
    description: 'Repo Memory',
    content: (
      <>
        <SectionHeader icon={GitCommit}>Safe to Merge</SectionHeader>
        <p className="text-slate-600">Persist decisions in docs, ADRs, and comments. Only now does code go to production.</p>
      </>
    )
  },
];