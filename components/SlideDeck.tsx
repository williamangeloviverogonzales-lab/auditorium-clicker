import { MathInline } from './MathText'
import Image from 'next/image'
import spellboundQr from './spellbound.png'
import spellPuzzle from './spell.png'

export default function SlideDeck({ slideIndex, step = 0 }: { slideIndex: number; step?: number }) {
  switch (slideIndex) {
    case 0:
      return (
        <div className="text-center space-y-6 my-auto">
          <span className="px-4 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 font-semibold text-sm rounded-full tracking-wider uppercase">
            Catanduanes State University
          </span>
          <h1 className="text-7xl md:text-8xl font-black text-slate-900 tracking-tight leading-tight">
            Mathematics in the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Modern World
            </span>
          </h1>
          <div className="pt-8 space-y-1">
            <p className="text-xl font-bold text-slate-800">William Angelo V. Gonzales</p>
            <p className="text-sm text-slate-600">September 23, 2026</p>
          </div>
        </div>
      )

    case 1:
      return (
      <div className="text-left space-y-7 my-auto max-w-5xl mx-auto w-full animate-fadeIn">
        <span className="text-blue-600 font-semibold tracking-wide uppercase text-base">A Quick Roadmap</span>
        <h2 className="text-5xl font-extrabold text-slate-900 leading-snug">
          Mathematics in the Modern World
        </h2>
        <p className="text-xl text-slate-700 max-w-3xl">
          We could spend hours exploring the whole subject.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            ['01', 'Mathematics in Nature'],
            ['02', 'Language of Mathematics'],
            ['03', 'Problem Solving'],
            ['04', 'Data Analysis'],
            ['05', 'Mathematics of Finance'],
          ].map(([n, title], i) => {
            const isVisible = step >= i + 1;
            const isTarget = i === 2;
            const isHighlighted = step >= 6 && isTarget;

            return (
              <div
                key={n}
                className={`p-5 rounded-2xl border transition-all duration-500 flex flex-col justify-between ${
                  !isVisible 
                    ? 'opacity-30 bg-slate-100 border-slate-200 scale-95' 
                    : isHighlighted
                    ? 'bg-blue-100 border-blue-400 shadow-xl shadow-blue-500/10 ring-4 ring-blue-500/20 scale-105 z-10'
                    : 'bg-white border-slate-200 opacity-100 scale-100 shadow-sm'
                }`}
              >
                <div className={`font-black text-base ${isVisible ? 'text-blue-600' : 'text-slate-400'}`}>{n}</div>
                <div className={`font-bold mt-4 text-base leading-snug ${isVisible ? 'text-slate-900' : 'text-slate-400'}`}>{title}</div>
              </div>
            );
          })}
        </div>

        {step >= 7 && (
          <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-blue-900 shadow-md animate-fadeIn flex items-center gap-4 text-lg">
            <div className="text-3xl">🎯</div>
            <div>
              <span className="text-slate-700">Today, we will narrow our focus and dive deep into just one:</span>{' '}
              <strong className="text-slate-900 font-extrabold tracking-wide">Problem Solving in Mathematics.</strong>
            </div>
          </div>
        )}
      </div>
    )

    case 2:
      return (
        <div className="text-center space-y-8 my-auto max-w-5xl mx-auto w-full animate-fadeIn">
          <span className="px-4 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-sm font-semibold uppercase tracking-widest">
            Interactive Poll
          </span>
          <h2 className="text-5xl font-black text-slate-900 tracking-tight">
            How to Vote
          </h2>
          <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-10 space-y-6">
            <p className="text-2xl text-slate-700">
              To vote in the poll, open your browser and go to:
            </p>
            <div className="p-6 bg-blue-50 border-2 border-blue-400 rounded-2xl text-2xl md:text-3xl font-extrabold text-blue-600 shadow-sm whitespace-nowrap overflow-x-auto">
              <a 
                href="https://auditorium-clicker.vercel.app/vote" 
                target="_blank" 
                rel="noreferrer"
                className="hover:underline"
              >
                https://auditorium-clicker.vercel.app/vote
              </a>
            </div>
            <p className="text-xl text-slate-600 pt-2">
              Input your <strong className="text-slate-900">Student Number</strong> to submit your response.
            </p>
          </div>
        </div>
      )

    case 3:
      return (
      <div className="space-y-8 text-center max-w-4xl mx-auto animate-fadeIn">
        <div className="space-y-3">
          <span className="px-4 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-sm font-semibold uppercase tracking-widest">
            Interactive Pulse Check
          </span>
          <h2 className="text-5xl font-black text-slate-900 tracking-tight">
            How do you honestly feel about Mathematics?
          </h2>
          <p className="text-slate-600 text-xl">
            Cast your vote on your device! Let's see where the room stands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-4">
          <div className={`p-5 rounded-2xl flex items-center space-x-4 shadow-sm transition-all duration-300 ${
            step >= 1 
              ? "bg-white border border-slate-200 opacity-100 scale-100" 
              : "bg-slate-100 border border-slate-200/60 opacity-30 scale-95"
          }`}>
            <span className={`w-12 h-12 rounded-xl font-black text-lg text-white flex items-center justify-center shrink-0 transition-colors ${step >= 1 ? "bg-blue-600" : "bg-slate-300 text-slate-500"}`}>A</span>
            <div>
              <p className={`font-bold text-xl ${step >= 1 ? "text-slate-900" : "text-slate-400"}`}>A Love Affair 😍</p>
              <p className={`text-sm ${step >= 1 ? "text-slate-600" : "text-slate-400"}`}>Math is my favorite; I live for the aha! moments.</p>
            </div>
          </div>

          <div className={`p-5 rounded-2xl flex items-center space-x-4 shadow-sm transition-all duration-300 ${
            step >= 2 
              ? "bg-white border border-slate-200 opacity-100 scale-100" 
              : "bg-slate-100 border border-slate-200/60 opacity-30 scale-95"
          }`}>
            <span className={`w-12 h-12 rounded-xl font-black text-lg text-white flex items-center justify-center shrink-0 transition-colors ${step >= 2 ? "bg-emerald-600" : "bg-slate-300 text-slate-500"}`}>B</span>
            <div>
              <p className={`font-bold text-xl ${step >= 2 ? "text-slate-900" : "text-slate-400"}`}>It's Complicated 👍</p>
              <p className={`text-sm ${step >= 2 ? "text-slate-600" : "text-slate-400"}`}>We get along when things click, but it has its moments.</p>
            </div>
          </div>

          <div className={`p-5 rounded-2xl flex items-center space-x-4 shadow-sm transition-all duration-300 ${
            step >= 3 
              ? "bg-white border border-slate-200 opacity-100 scale-100" 
              : "bg-slate-100 border border-slate-200/60 opacity-30 scale-95"
          }`}>
            <span className={`w-12 h-12 rounded-xl font-black text-lg text-white flex items-center justify-center shrink-0 transition-colors ${step >= 3 ? "bg-amber-600" : "bg-slate-300 text-slate-500"}`}>C</span>
            <div>
              <p className={`font-bold text-xl ${step >= 3 ? "text-slate-900" : "text-slate-400"}`}>Just Friends 😐</p>
              <p className={`text-sm ${step >= 3 ? "text-slate-600" : "text-slate-400"}`}>It's useful for work, but strictly professional.</p>
            </div>
          </div>

          <div className={`p-5 rounded-2xl flex items-center space-x-4 shadow-sm transition-all duration-300 ${
            step >= 4 
              ? "bg-white border border-slate-200 opacity-100 scale-100" 
              : "bg-slate-100 border border-slate-200/60 opacity-30 scale-95"
          }`}>
            <span className={`w-12 h-12 rounded-xl font-black text-lg text-white flex items-center justify-center shrink-0 transition-colors ${step >= 4 ? "bg-rose-600" : "bg-slate-300 text-slate-500"}`}>D</span>
            <div>
              <p className={`font-bold text-xl ${step >= 4 ? "text-slate-900" : "text-slate-400"}`}>Run Away 🏃💨</p>
              <p className={`text-sm ${step >= 4 ? "text-slate-600" : "text-slate-400"}`}>Let's just say my calculator and I need space.</p>
            </div>
          </div>
        </div>
      </div>
    )

    case 4:
      const mmwOptions = [
      { emoji: '🙄', title: 'The Heavy Sigh 🙄', desc: 'Thinking: "Do I really have to take math in college? Here we go again..."' },
      { emoji: '🥶', title: 'Cold Sweat 🥶', desc: 'Pure panic during exams, praying the formulas would magically memorize themselves.' },
      { emoji: '🤷', title: 'Resigned Acceptance 🤷', desc: 'Surviving lecture by lecture just to get past the GE requirement.' },
      { emoji: '🤩', title: 'Spark of Excitement 🤩', desc: 'Getting genuinely amazed when math suddenly explains how the real world works.' },
    ];

    return (
      <div className="space-y-8 text-center max-w-4xl mx-auto animate-fadeIn">
        <div className="space-y-3">
          <span className="px-4 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-sm font-semibold uppercase tracking-widest">
            First-Year Reflection
          </span>
          <h2 className="text-5xl font-black text-slate-900 tracking-tight">
            How would you describe your MMW experience back in your 1st year?
          </h2>
          <p className="text-slate-600 text-xl">
            Looking back—what was your actual vibe when you took this subject?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-4">
          {mmwOptions.map((opt, i) => {
            const isVisible = step >= i + 1;

            return (
              <div
                key={opt.title}
                className={`p-5 rounded-2xl flex items-center space-x-4 shadow-sm transition-all duration-500 ${
                  !isVisible
                    ? 'bg-slate-100 border border-slate-200/60 opacity-30 scale-95'
                    : 'bg-white border border-slate-200 opacity-100 scale-100'
                }`}
              >
                <span className={`w-14 h-14 rounded-xl text-3xl flex items-center justify-center shrink-0 transition-colors ${
                  isVisible ? 'bg-blue-50 border border-blue-200' : 'bg-slate-200 text-slate-400'
                }`}>
                  {opt.emoji}
                </span>
                <div>
                  <p className={`font-bold text-xl ${isVisible ? 'text-slate-900' : 'text-slate-400'}`}>
                    {opt.title}
                  </p>
                  <p className={`text-sm ${isVisible ? 'text-slate-600' : 'text-slate-400'}`}>
                    {opt.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )

    case 5:
      return (
        <div className="text-center space-y-8 my-auto max-w-5xl mx-auto w-full">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-base">Warm-Up 1</span>
          <h2 className="text-5xl font-extrabold text-slate-900">What Comes Next?</h2>
          <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-10">
            <div className="text-6xl md:text-7xl font-black text-slate-900 tracking-widest">
              1, 4, 7, 10, <span className="text-blue-600">?</span>
            </div>
            {step >= 1 && (
              <div className="mt-8 text-2xl text-slate-700 animate-fadeIn">
                Look at what changes from one term to the next.
              </div>
            )}
            {step >= 2 && (
              <div className="mt-5 text-4xl font-bold text-blue-600 animate-fadeIn">
                +3, +3, +3 → <span className="text-slate-900">13</span>
              </div>
            )}
          </div>
        </div>
      )

    case 6:
      return (
        <div className="text-center space-y-8 my-auto max-w-5xl mx-auto w-full">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-base">Warm-Up 2</span>
          <h2 className="text-5xl font-extrabold text-slate-900">What Comes Next?</h2>
          <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-10">
            <div className="text-6xl md:text-7xl font-black text-slate-900 tracking-widest">
              2, 4, 8, 16, <span className="text-blue-600">?</span>
            </div>
            {step >= 1 && (
              <div className="mt-8 text-2xl text-slate-700 animate-fadeIn">
                This time, the pattern is not addition.
              </div>
            )}
            {step >= 2 && (
              <div className="mt-5 text-4xl font-bold text-blue-600 animate-fadeIn">
                ×2, ×2, ×2 → <span className="text-slate-900">32</span>
              </div>
            )}
          </div>
        </div>
      )

    case 7:
      return (
        <div className="text-center space-y-8 my-auto max-w-5xl mx-auto w-full">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-base">Warm-Up 3</span>
          <h2 className="text-5xl font-extrabold text-slate-900">A Familiar Pattern</h2>
          <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-10">
            <div className="text-5xl md:text-6xl font-black text-slate-900 tracking-wide">
              1, 1, 2, 3, 5, 8, 13, <span className="text-blue-600">?</span>
            </div>
            {step >= 1 && (
              <div className="mt-8 text-2xl text-slate-700 animate-fadeIn">
                Each term is connected to the two terms before it.
              </div>
            )}
            {step >= 2 && (
              <div className="mt-5 text-4xl font-bold text-blue-600 animate-fadeIn">
                8 + 13 = <span className="text-slate-900">21</span>
              </div>
            )}
            {step >= 3 && (
              <p className="mt-5 text-xl text-slate-600 animate-fadeIn">
                A sequence can have a rule that is different from simple addition or multiplication.
              </p>
            )}
          </div>
        </div>
      )

    case 8:
      return (
        <div className="text-center space-y-8 my-auto max-w-5xl mx-auto w-full">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-base">Warm-Up 4</span>
          <h2 className="text-5xl font-extrabold text-slate-900">Read the Pattern</h2>
          <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-10">
            <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-wide break-words">
              1, 11, 21, 1211, 111221, <span className="text-blue-600">?</span>
            </div>
            {step >= 1 && (
              <div className="mt-8 text-2xl text-slate-700 animate-fadeIn">
                Do not calculate first. <strong className="text-slate-900">Describe</strong> what you see.
              </div>
            )}
            {step >= 2 && (
              <div className="mt-5 p-5 bg-blue-50 border border-blue-200 rounded-xl text-2xl text-blue-900 animate-fadeIn">
                <strong className="text-slate-900">111221</strong> can be read as:
                “three 1s, two 2s, one 1” → <strong className="text-blue-700">312211</strong>
              </div>
            )}
          </div>
        </div>
      )

    case 9:
      return (
        <div className="text-center space-y-8 my-auto max-w-5xl mx-auto w-full">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-base">Warm-Up 5</span>
          <h2 className="text-5xl font-extrabold text-slate-900"> What comes next? </h2>
          <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-10">
            <div className="text-6xl md:text-7xl font-black text-slate-900 tracking-[0.35em]">
              O T T F F S S E <span className="text-blue-600">?</span>
            </div>
            {step >= 1 && (
              <div className="mt-8 text-2xl text-slate-700 animate-fadeIn">
                Think of the <strong className="text-slate-900">ordinal words</strong> represented by the letters.
              </div>
            )}
            {step >= 2 && (
              <div className="mt-5 text-3xl text-blue-700 animate-fadeIn">
                One, Two, Three, Four, Five, Six, Seven, Eight, <strong className="text-slate-900">Nine</strong>
              </div>
            )}
          </div>
        </div>
      )

    case 10:
      const polyaSteps = [
      ['1', 'Understand', 'What is known? What is unknown? What is being asked?'],
      ['2', 'Plan', 'What strategy might help? (Working backwards, drawing a diagram, etc.)'],
      ['3', 'Carry Out', 'Execute the plan carefully and check each step.'],
      ['4', 'Look Back', 'Does the answer make sense? Can we check or solve it another way?'],
    ];

    return (
      <div className="text-left space-y-7 my-auto max-w-5xl mx-auto w-full animate-fadeIn">
        <span className="text-blue-600 font-semibold tracking-wide uppercase text-base">Problem Solving</span>
        <h2 className="text-5xl font-extrabold text-slate-900">Pólya&apos;s Four Steps</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {polyaSteps.map(([n, title, description], index) => {
            const isVisible = step >= index + 1;

            return (
              <div
                key={n}
                className={`p-6 bg-white border rounded-2xl transition-all duration-500 shadow-sm ${
                  isVisible
                    ? 'border-blue-400 opacity-100 translate-y-0 shadow-md shadow-blue-500/5'
                    : 'border-slate-200 opacity-30 translate-y-4 pointer-events-none'
                }`}
              >
                <div className="text-blue-600 text-4xl font-black">{n}</div>
                <h3 className="text-slate-900 text-2xl font-bold mt-3">{title}</h3>
                <p className="text-slate-600 mt-3 text-base leading-relaxed">{description}</p>
              </div>
            );
          })}
        </div>

        {step >= 5 && (
          <div className="text-center text-xl text-blue-800 font-medium animate-fadeIn pt-2">
            The steps organize our thinking—but they do not prescribe only one way to solve a problem.
          </div>
        )}
      </div>
    )

    case 11:
      return (
      <div className="text-left space-y-7 my-auto max-w-5xl mx-auto w-full animate-fadeIn">
        <span className="text-blue-600 font-semibold tracking-wide uppercase text-base">Strategy 1</span>
        <h2 className="text-5xl font-extrabold text-slate-900">Guess and Check</h2>

        <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-8 space-y-6">
          <p className="text-2xl text-slate-800 leading-relaxed text-center">
            Three students — <strong className="text-slate-900">Ana, Ben, and Carlo</strong> —
            each have a different favorite subject: Mathematics, Science, and English.
          </p>

          <div className="grid md:grid-cols-3 gap-3 text-center pt-2">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-lg font-semibold shadow-sm">
              Ana <MathInline math="\neq"/> Mathematics
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-lg font-semibold shadow-sm">
              Ben <MathInline math="\neq"/> English
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-lg font-semibold shadow-sm">
              Carlo <MathInline math="\neq"/> Math or Science
            </div>
          </div>

          <div className="text-center text-2xl text-slate-700 font-medium pt-2">
            Who likes which subject?
          </div>

          {step >= 1 && (
            <div className="grid grid-cols-3 gap-4 animate-fadeIn pt-2">
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-center shadow">
                <div className="text-blue-600 font-black text-xl">Carlo</div>
                <div className="text-slate-900 text-2xl font-bold mt-2">English ✓</div>
              </div>
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-center shadow">
                <div className="text-blue-600 font-black text-xl">Ana</div>
                <div className="text-slate-900 text-2xl font-bold mt-2">Science ✓</div>
              </div>
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-center shadow">
                <div className="text-blue-600 font-black text-xl">Ben</div>
                <div className="text-slate-900 text-2xl font-bold mt-2">Mathematics ✓</div>
              </div>
            </div>
          )}

        </div>
      </div>
    )

    case 12:
      return (
        <div className="text-left space-y-7 my-auto max-w-5xl mx-auto w-full animate-fadeIn">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-base">Strategy 1 </span>
          <h2 className="text-5xl font-extrabold text-slate-900">Guess and Check</h2>

          <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-8 space-y-6">
            <div className="text-center space-y-3">
              <p className="text-3xl font-extrabold text-slate-900 leading-snug">
                Find two numbers under 10 whose quotient is <span className="text-blue-600">0.7777...</span>
              </p>
            </div>

            {step >= 1 && (
              <div className="space-y-4 pt-2 animate-fadeIn">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-lg text-slate-700">
                  <span><strong>Guess 1:</strong> Try <MathInline math="3 \div 4" /></span>
                  <span className="font-mono font-bold text-slate-900">0.75</span>
                  <span className="text-amber-600 text-sm font-semibold bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">Too small</span>
                </div>
              </div>
            )}

            {step >= 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-lg text-slate-700">
                  <span><strong>Guess 2:</strong> Try <MathInline math="4 \div 5" /></span>
                  <span className="font-mono font-bold text-slate-900">0.80</span>
                  <span className="text-amber-600 text-sm font-semibold bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">Too large</span>
                </div>
              </div>
            )}

            {step >= 3 && (
              <div className="p-6 bg-emerald-50 border-2 border-emerald-400 rounded-2xl text-center space-y-1 animate-fadeIn shadow-md">
                <div className="text-sm text-emerald-700 font-bold uppercase tracking-wider">Solution</div>
                <div className="text-4xl font-black text-slate-900">
                  <MathInline math="7 \div 9" /> = <span className="text-emerald-600">0.7777...</span> ✓
                </div>
              </div>
            )}
          </div>
        </div>
      )

    case 13:
      return (
        <div className="text-left space-y-7 my-auto max-w-5xl mx-auto w-full animate-fadeIn">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-base">Strategy 1</span>
          <h2 className="text-5xl font-extrabold text-slate-900">Guess and Check</h2>

          <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-8 space-y-6">
            <div className="text-center space-y-3">
              <p className="text-3xl font-extrabold text-slate-900 leading-snug">
                Find two numbers under 20 whose quotient is <span className="text-blue-600">0.727272...</span>
              </p>
            </div>

            {step >= 1 && (
              <div className="space-y-3 pt-2 animate-fadeIn">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-lg text-slate-700">
                  <span><strong>Guess 1:</strong> Try <MathInline math="7 \div 10" /></span>
                  <span className="font-mono font-bold text-slate-900">0.7000...</span>
                  <span className="text-amber-600 text-sm font-semibold bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">Too small</span>
                </div>
              </div>
            )}

            {step >= 2 && (
              <div className="space-y-3 animate-fadeIn">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-lg text-slate-700">
                  <span><strong>Guess 2:</strong> Try <MathInline math="3 \div 4" /></span>
                  <span className="font-mono font-bold text-slate-900">0.7500...</span>
                  <span className="text-amber-600 text-sm font-semibold bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">Too large</span>
                </div>
              </div>
            )}


            {step >= 3 && (
              <div className="p-6 bg-emerald-50 border-2 border-emerald-400 rounded-2xl text-center space-y-2 animate-fadeIn shadow-md">
                <div className="text-sm text-emerald-700 font-bold uppercase tracking-wider">Solution</div>
                <div className="text-3xl md:text-4xl font-black text-slate-900">
                  <MathInline math="8 \div 11" /> = <span className="text-emerald-600">0.727272...</span> ✓
                </div>
              </div>
            )}
          </div>
        </div>
      )

    case 14:
      const nodes = [
      { id: 'A', x: 160, y: 20 },
      { id: 'B', x: 260, y: 75 },
      { id: 'C', x: 260, y: 205 },
      { id: 'D', x: 160, y: 260 },
      { id: 'E', x: 60, y: 205 },
      { id: 'F', x: 60, y: 75 },
    ];

    const edges = [
      { from: 'A', to: 'B', stepReq: 2 },
      { from: 'A', to: 'C', stepReq: 2 },
      { from: 'A', to: 'D', stepReq: 2 },
      { from: 'A', to: 'E', stepReq: 2 },
      { from: 'A', to: 'F', stepReq: 2 },
      { from: 'B', to: 'C', stepReq: 3 },
      { from: 'B', to: 'D', stepReq: 3 },
      { from: 'B', to: 'E', stepReq: 3 },
      { from: 'B', to: 'F', stepReq: 3 },
      { from: 'C', to: 'D', stepReq: 4 },
      { from: 'C', to: 'E', stepReq: 4 },
      { from: 'C', to: 'F', stepReq: 4 },
      { from: 'D', to: 'E', stepReq: 5 },
      { from: 'D', to: 'F', stepReq: 5 },
      { from: 'E', to: 'F', stepReq: 6 },
    ];

    const activeStep = Math.min(Math.max(step, 0), 6);
    const handshakeCounts = [0, 0, 5, 9, 12, 14, 15];
    const currentCount = handshakeCounts[activeStep];

    return (
      <div className="text-left space-y-5 my-auto max-w-5xl mx-auto w-full animate-fadeIn">
        <span className="text-blue-600 font-semibold tracking-wide uppercase text-base">Strategy 2</span>
        <h2 className="text-5xl font-extrabold text-slate-900">Draw a Diagram</h2>

        <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-8 space-y-4">
          
          {step === 0 && (
            <div className="py-10 text-center space-y-6 animate-fadeIn">
              <p className="text-3xl text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed">
                Six people at a gathering shake hands with everyone else exactly once. 
              </p>
              <div className="text-4xl font-extrabold text-slate-900">
                How many total handshakes are there?
              </div>
            </div>
          )}

          {step >= 1 && (
            <div className="flex flex-col items-center justify-center animate-fadeIn space-y-4">
              <div className="relative w-[320px] h-[280px] bg-slate-50 rounded-2xl border border-slate-200 shadow-inner flex items-center justify-center">
                
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {edges.map((edge, idx) => {
                    const nodeA = nodes.find(n => n.id === edge.from);
                    const nodeB = nodes.find(n => n.id === edge.to);
                    if (!nodeA || !nodeB) return null;

                    const isVisible = activeStep >= edge.stepReq;

                    return (
                      <line
                        key={idx}
                        x1={nodeA.x}
                        y1={nodeA.y}
                        x2={nodeB.x}
                        y2={nodeB.y}
                        stroke={isVisible ? "#2563eb" : "transparent"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className="transition-all duration-500 animate-fadeIn"
                      />
                    );
                  })}
                </svg>

                {nodes.map(node => (
                  <div
                    key={node.id}
                    style={{ left: `${node.x}px`, top: `${node.y}px` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center text-blue-600 font-black text-base shadow-md z-10"
                  >
                    {node.id}
                  </div>
                ))}
              </div>

              <div className="text-center space-y-2">
                <div className="text-4xl font-black text-blue-600 animate-fadeIn">
                  Handshakes: <span className="text-slate-900">{currentCount}</span>
                </div>
                <p className="text-lg text-slate-600 font-medium">
                  {activeStep === 1 && "Here are 6 people (A, B, C, D, E, F) at the gathering."}
                  {activeStep === 2 && "Person A shakes hands with everyone (5 handshakes)."}
                  {activeStep === 3 && "Person B shakes remaining unvisited people (+4 handshakes)."}
                  {activeStep === 4 && "Person C shakes remaining people (+3 handshakes)."}
                  {activeStep === 5 && "Person D shakes remaining people (+2 handshakes)."}
                  {activeStep === 6 && "Person E & F complete the final handshake (+1)! Total = 5 + 4 + 3 + 2 + 1 = 15."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    )

    case 15:
      const patternRows = [
      { expr: '1', square: '1²', val: '1' },
      { expr: '1 + 3', square: '2²', val: '4' },
      { expr: '1 + 3 + 5', square: '3²', val: '9' },
      { expr: '1 + 3 + 5 + 7', square: '4²', val: '16' },
    ];

    return (
      <div className="text-left space-y-6 my-auto max-w-5xl mx-auto w-full animate-fadeIn">
        <span className="text-blue-600 font-semibold tracking-wide uppercase text-base">Strategy 3</span>
        <h2 className="text-5xl font-extrabold text-slate-900">Look for a Pattern</h2>

        <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-7 space-y-5">
          <div className="text-center space-y-2">
            <p className="text-xl text-slate-600">Find the sum:</p>
            <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-wide">
              1 + 3 + 5 + 7 + 9 + ... + 99
            </div>
          </div>

          {step >= 1 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center pt-2">
              {patternRows.map((row, index) => {
                const isVisible = step >= index + 1;
                if (!isVisible) return null;

                return (
                  <div 
                    key={row.expr} 
                    className="p-4 bg-slate-50 border border-slate-200 rounded-2xl animate-fadeIn shadow flex flex-col justify-between"
                  >
                    <div className="text-slate-700 font-semibold text-base">{row.expr}</div>
                    <div className="text-blue-600 text-3xl font-black my-2">= {row.square}</div>
                    <div className="text-sm text-slate-500 font-mono">({row.val})</div>
                  </div>
                );
              })}
            </div>
          )}

          {step >= 5 && (
            <div className="text-center text-xl text-slate-700 animate-fadeIn pt-1">
              The sum of the first <strong className="text-slate-900">n odd numbers</strong> is always <strong className="text-blue-600">n²</strong>.
            </div>
          )}

          {step >= 6 && (
            <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center space-y-2 animate-fadeIn">
              <p className="text-base text-slate-600">
                There are <strong className="text-slate-900">50</strong> odd numbers from 1 to 99.
              </p>
              <div className="text-4xl md:text-5xl font-black text-blue-600">
                50² = <span className="text-slate-900">2,500</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )

    case 16:
      return (
      <div className="text-left space-y-6 my-auto max-w-5xl mx-auto w-full animate-fadeIn">
        <span className="text-blue-600 font-semibold tracking-wide uppercase text-base">Strategy 4</span>
        <h2 className="text-5xl font-extrabold text-slate-900">Work Backwards</h2>

        <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-8 space-y-6">
          <div className="text-center py-2">
            <p className="text-2xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
              You spend half of your money plus <strong className="text-slate-900">₱20</strong>, then spend half of what remains plus <strong className="text-slate-900">₱10</strong>. You have <strong className="text-slate-900">₱30</strong> left.
            </p>
            <div className="text-3xl font-bold text-slate-900 mt-3">
              How much money did you start with?
            </div>
          </div>

          {step >= 1 && (
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 py-2 animate-fadeIn">
              <div className={`w-full md:w-1/3 rounded-2xl p-5 text-center shadow-md space-y-2 transition-all duration-300 ${
                step === 5 
                  ? "bg-blue-100 border-2 border-blue-500 shadow-blue-500/10 animate-pulse" 
                  : step === 4
                  ? "bg-blue-50 border-2 border-blue-400 ring-4 ring-blue-500/10"
                  : "bg-slate-50 border border-slate-200"
              }`}>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Box 1: Start</div>
                <div className="h-16 flex items-center justify-center">
                  {step >= 5 ? (
                    <span className="text-4xl font-black text-blue-600 animate-fadeIn">₱200</span>
                  ) : (
                    <span className="text-slate-400 italic text-base">?</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center text-blue-600 text-sm font-bold text-center px-1">
                <span>Spend Half</span>
                <span className="text-xl">→</span>
                <span>+ ₱20</span>
              </div>

              <div className={`w-full md:w-1/3 rounded-2xl p-5 text-center shadow-md space-y-2 transition-all duration-300 ${
                step === 3
                  ? "bg-blue-100 border-2 border-blue-500 shadow-blue-500/10 animate-pulse"
                  : step >= 3
                  ? "bg-slate-50 border border-slate-200"
                  : step === 2
                  ? "bg-blue-100 border-2 border-blue-500 shadow-blue-500/10 animate-pulse"
                  : "bg-slate-50 border border-slate-200"
              }`}>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Box 2: After 1st Spend</div>
                <div className="h-16 flex items-center justify-center">
                  {step >= 3 ? (
                    <span className="text-4xl font-black text-blue-600 animate-fadeIn">₱80</span>
                  ) : (
                    <span className="text-slate-400 italic text-base">?</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center text-blue-600 text-sm font-bold text-center px-1">
                <span>Spend Half</span>
                <span className="text-xl">→</span>
                <span>+ ₱10</span>
              </div>

              <div className={`w-full md:w-1/3 rounded-2xl p-5 text-center shadow-md space-y-2 transition-all duration-300 ${
                step === 1 
                  ? "bg-blue-100 border-2 border-blue-500 shadow-blue-500/10 animate-pulse" 
                  : "bg-slate-50 border border-slate-200"
              }`}>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Box 3: Leftover</div>
                <div className="h-16 flex items-center justify-center">
                  {step >= 2 ? (
                    <span className="text-4xl font-black text-slate-900 animate-fadeIn">₱30</span>
                  ) : (
                    <span className="text-slate-400 italic text-base">?</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {step >= 6 && (
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1 animate-fadeIn">
              <div className="text-sm text-emerald-700 font-bold uppercase tracking-wider">Check Your Work</div>
              <p className="text-lg text-slate-700">
                Start with <strong className="text-slate-900">₱200</strong> <MathInline math="\rightarrow"/> Spend (<MathInline math="100 + 20 = 120"/>), leaves <strong className="text-slate-900">₱80</strong> (Box 2). 
                Spend (<MathInline math="40 + 10 = 50"/>), leaves <strong className="text-slate-900">₱30</strong> (Box 3). Perfect! ✓
              </p>
            </div>
          )}
        </div>
      </div>
    )

    case 17:
      return (
      <div className="text-left space-y-6 my-auto max-w-5xl mx-auto w-full animate-fadeIn">
        <span className="text-blue-600 font-semibold tracking-wide uppercase text-base">Strategy 5</span>
        <h2 className="text-5xl font-extrabold text-slate-900">Make a Table or List</h2>

        <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-7 space-y-5">
          <p className="text-xl text-slate-700">
            There are jellybeans in a jar. Ann guessed <strong className="text-slate-900">475</strong>. Bill guessed <strong className="text-slate-900">455</strong>.
            Cory guessed <strong className="text-slate-900">510</strong>.
          </p>
          <p className="text-xl text-slate-700">
            One guess is wrong by <strong className="text-slate-900">20</strong>, another by <strong className="text-slate-900">15</strong>,
            and another by <strong className="text-slate-900">40</strong>.
          </p>
          <div className="text-2xl text-slate-900 font-bold">
            How many jellybeans in the jar?
          </div>

          {step >= 1 && (
            <div className="overflow-hidden rounded-2xl border border-slate-200 animate-fadeIn">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 text-base">
                    <th className="p-3 border-r border-slate-200" rowSpan={2}>Guess</th>
                    <th className="p-3 border-b border-slate-200" colSpan={2}>20</th>
                    <th className="p-3 border-b border-slate-200" colSpan={2}>15</th>
                    <th className="p-3 border-b border-slate-200" colSpan={2}>40</th>
                  </tr>
                  <tr className="bg-slate-50 text-slate-600 text-sm">
                    <th className="p-2">−20</th>
                    <th className="p-2">+20</th>
                    <th className="p-2">−15</th>
                    <th className="p-2">+15</th>
                    <th className="p-2">−40</th>
                    <th className="p-2">+40</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-200 text-slate-800 text-base">
                    <td className="p-3 font-bold text-slate-900 border-r border-slate-200">Ann: 475</td>
                    <td className="p-3">{step >= 2 ? "455" : ""}</td>
                    <td className={`p-3 transition-all ${step >= 8 ? "bg-blue-100 text-blue-900 font-bold border border-blue-400 rounded-lg" : ""}`}>
                      {step >= 3 ? "495" : ""}
                    </td>
                    <td className="p-3">{step >= 4 ? "460" : ""}</td>
                    <td className="p-3">{step >= 5 ? "490" : ""}</td>
                    <td className={`p-3 transition-all ${step >= 8 ? "bg-emerald-100 text-emerald-900 font-bold border border-emerald-400 rounded-lg" : ""}`}>
                      {step >= 6 ? "435" : ""}
                    </td>
                    <td className="p-3">{step >= 7 ? "515" : ""}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {step >= 1 && (
            <div className="overflow-hidden rounded-2xl border border-slate-200 animate-fadeIn">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 text-base">
                    <th className="p-3 border-r border-slate-200" rowSpan={2}>Guess</th>
                    <th className="p-3 border-b border-slate-200" colSpan={2}>20</th>
                    <th className="p-3 border-b border-slate-200" colSpan={2}>15</th>
                    <th className="p-3 border-b border-slate-200" colSpan={2}>40</th>
                  </tr>
                  <tr className="bg-slate-50 text-slate-600 text-sm">
                    <th className="p-2">−20</th>
                    <th className="p-2">+20</th>
                    <th className="p-2">−15</th>
                    <th className="p-2">+15</th>
                    <th className="p-2">−40</th>
                    <th className="p-2">+40</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-200 text-slate-800 text-base">
                    <td className="p-3 font-bold text-slate-900 border-r border-slate-200">Bill: 455</td>
                    <td className={`p-3 transition-all ${step >= 8 ? "bg-emerald-100 text-emerald-900 font-bold border border-emerald-400 rounded-lg" : ""}`}>
                      {step >= 2 ? "435" : ""}
                    </td>
                    <td className="p-3">{step >= 3 ? "475" : ""}</td>
                    <td className="p-3">{step >= 4 ? "440" : ""}</td>
                    <td className="p-3">{step >= 5 ? "470" : ""}</td>
                    <td className="p-3">{step >= 6 ? "415" : ""}</td>
                    <td className={`p-3 transition-all ${step >= 8 ? "bg-blue-100 text-blue-900 font-bold border border-blue-400 rounded-lg" : ""}`}>
                      {step >= 7 ? "495" : ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    )

    case 18:
      return (
      <div className="text-left space-y-6 my-auto max-w-5xl mx-auto w-full animate-fadeIn">
        <span className="text-blue-600 font-semibold tracking-wide uppercase text-base">Strategy 5</span>
        <h2 className="text-5xl font-extrabold text-slate-900">Make a Table or List</h2>

        <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-7 space-y-6">
          <p className="text-xl text-slate-700">
            Reviewing Ann and Bill's tables, we find their overlapping possibilities:
          </p>

          {step >= 1 && (
            <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl animate-fadeIn text-center space-y-2 shadow-sm">
              <div className="text-sm text-blue-700 font-bold uppercase tracking-wider">Common possibilities found</div>
              <div className="text-5xl font-black text-slate-900 tracking-wide">435 <span className="text-blue-600 font-light px-2">&</span> 495</div>
              <div className="text-base text-slate-600 pt-1">
                Now let's test them against Cory's guess of <strong className="text-slate-900">510</strong> (which must have an error of 20, 15, or 40).
              </div>
            </div>
          )}

          {step >= 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
              <div className={`p-5 rounded-2xl border text-center space-y-2 transition-all ${
                step >= 3 
                  ? "bg-slate-50 border-slate-200 opacity-90" 
                  : "opacity-40"
              }`}>
                <div className="text-2xl font-bold text-slate-800">Test: 435</div>
                <div className="text-base text-slate-600">510 − 435 = <strong className="text-slate-900">75</strong></div>
                <div className="text-rose-700 font-semibold text-sm bg-rose-50 py-1.5 px-3 rounded-lg border border-rose-200 inline-block">
                  ✗ Not in allowed errors (20, 15, 40)
                </div>
              </div>

              {step >= 3 && (
                <div className="p-5 rounded-2xl bg-blue-50 border-2 border-blue-400 text-center space-y-2 shadow-md animate-fadeIn">
                  <div className="text-2xl font-bold text-blue-900">Test: 495</div>
                  <div className="text-base text-slate-700">510 − 495 = <strong className="text-slate-900 font-bold text-lg">15</strong></div>
                  <div className="text-emerald-700 font-semibold text-sm bg-emerald-50 py-1.5 px-3 rounded-lg border border-emerald-300 inline-block animate-pulse">
                    ✓ Matches allowed error of 15!
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )

    case 19:
      return (
      <div className="text-left space-y-7 my-auto max-w-5xl mx-auto w-full animate-fadeIn">
        <span className="text-blue-600 font-semibold tracking-wide uppercase text-base">Strategy 6</span>
        <h2 className="text-5xl font-extrabold text-slate-900">Solve a Simpler Problem</h2>

        <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-8 space-y-6">
          <p className="text-3xl text-slate-800 text-center font-bold">
            How many squares are there in a standard 8 × 8 chessboard?
          </p>

          <div className="text-center text-slate-600 text-lg">
            Instead of tackling the massive 8×8 grid right away, let's look at smaller boards first!
          </div>

          {step >= 1 && (
            <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-3 text-center animate-fadeIn">
              {[
                ['1 × 1', '1'],
                ['2 × 2', '4'],
                ['3 × 3', '9'],
                ['4 × 4', '16'],
                ['5 × 5', '25'],
                ['6 × 6', '36'],
              ].map(([board, squares]) => (
                <div key={board} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-slate-800 font-bold text-base">{board}</div>
                  <div className="text-blue-600 text-2xl font-black mt-2">{squares}</div>
                </div>
              ))}
            </div>
          )}

          {step >= 2 && (
            <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl text-center animate-fadeIn">
              <p className="text-slate-800 font-medium text-lg">
                Notice a pattern? These are the square numbers: 1², 2², 3², 4², 5², 6²...
                <br /><span className="text-blue-600 font-bold">But wait—does a 2×2 board only have 4 squares?</span>
              </p>
            </div>
          )}
        </div>
      </div>
    )

    case 20:
    return (
      <div className="text-left space-y-6 my-auto max-w-5xl mx-auto w-full animate-fadeIn">
        <span className="text-blue-600 font-semibold tracking-wide uppercase text-base">Strategy 6</span>
        <h2 className="text-5xl font-extrabold text-slate-900">Solve a Simpler Problem</h2>

        <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-7 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 flex justify-center">
            <div className="grid grid-cols-8 gap-0.5 bg-slate-200 p-2 rounded-xl border-2 border-slate-300 shadow-lg w-72 h-72">
              {Array.from({ length: 64 }).map((_, i) => {
                const row = Math.floor(i / 8);
                const col = i % 8;
                let highlightClass = "bg-white border border-slate-200";
                if (step === 1 && row < 1 && col < 1) highlightClass = "bg-blue-500 border-white";
                if (step === 2 && row < 2 && col < 2) highlightClass = "bg-emerald-500 border-white";
                if (step === 3 && row < 3 && col < 3) highlightClass = "bg-amber-500 border-white";
                if (step === 4 && row < 4 && col < 4) highlightClass = "bg-blue-500 border-white";
                if (step === 5 && row < 5 && col < 5) highlightClass = "bg-emerald-500 border-white";
                if (step === 6 && row < 6 && col < 6) highlightClass = "bg-amber-500 border-white";
                if (step === 7 && row < 7 && col < 7) highlightClass = "bg-blue-500 border-white";
                if (step >= 8) highlightClass = "bg-emerald-500 border-white";

                return (
                  <div key={i} className={`transition-all duration-300 rounded-xs ${highlightClass}`} />
                );
              })}
            </div>
          </div>

          <div className="md:col-span-7 space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-slate-700 text-lg">
                A chessboard doesn't just contain 1×1 units. Larger squares overlap across the grid!
              </p>
            </div>

            {step >= 1 && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-base animate-fadeIn">
                🔹 <strong>1 × 1 squares:</strong> There are 8 × 8 = 64 small squares.
              </div>
            )}

            {step >= 2 && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-base animate-fadeIn">
                🟩 <strong>2 × 2 squares:</strong> Can slide into 7 × 7 = 49 positions.
              </div>
            )}

            {step >= 3 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-base animate-fadeIn">
                🔸 <strong>3 × 3 squares:</strong> Can slide into 6 × 6 = 36 positions, and so on...
              </div>
            )}
          </div>
        </div>
      </div>
    )

    case 21:
      return (
      <div className="text-left space-y-7 my-auto max-w-5xl mx-auto w-full animate-fadeIn">
        <span className="text-blue-600 font-semibold tracking-wide uppercase text-base">Strategy 6</span>
        <h2 className="text-5xl font-extrabold text-slate-900">Solve a Simpler Problem</h2>

        <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-8 text-center space-y-6">
          <p className="text-2xl text-slate-700">
            Summing up all possible square sizes from 1×1 up to 8×8:
          </p>

          {step >= 1 && (
            <div className="text-2xl md:text-3xl font-black text-blue-600 tracking-wider animate-fadeIn">
              64 + 49 + 36 + 25 + 16 + 9 + 4 + 1
            </div>
          )}

          {step >= 2 && (
            <div className="pt-4 animate-fadeIn">
              <div className="text-6xl font-black text-slate-900">
                = <span className="text-emerald-600">204 squares</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )

    case 22:
      return (
        <div className="text-center space-y-8 my-auto max-w-5xl mx-auto w-full">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-base">For Future Teachers</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Your Job Isn't Always to Give the Solution.
          </h2>
          <div className="p-10 bg-white border border-slate-200 shadow-md rounded-3xl">
            <p className="text-2xl md:text-3xl text-slate-800 leading-relaxed">
              Sometimes your job is to help students
              <br />
              <strong className="text-blue-600">discover a way toward it.</strong>
            </p>
          </div>
          {step >= 1 && (
            <p className="text-xl text-slate-600 animate-fadeIn">
              Give students room to think, try, fail, revise, and understand.
            </p>
          )}
        </div>
      )

    case 23: {
      const places = ['Country', 'Province', 'Barangay', 'Home', 'School', 'Classroom'];

      return (
        <div className="text-left space-y-7 my-auto max-w-5xl mx-auto w-full animate-fadeIn">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-base">Beyond Mathematics Class</span>
          <h2 className="text-5xl font-extrabold text-slate-900">Problems Are Everywhere.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {places.map((place, i) => {
              const isVisible = step >= i + 1;
              const isLast = i === 5;

              return (
                <div
                  key={place}
                  className={`p-6 rounded-2xl border text-center transition-all duration-500 shadow-sm ${
                    !isVisible
                      ? 'bg-slate-100 border-slate-200/60 opacity-30 scale-95'
                      : isLast
                      ? 'bg-blue-50 border-blue-300 opacity-100 scale-100 shadow-blue-500/5'
                      : 'bg-white border-slate-200 opacity-100 scale-100'
                  }`}
                >
                  <div className={`text-2xl font-bold ${isVisible ? 'text-slate-900' : 'text-slate-400'}`}>
                    {place}
                  </div>
                </div>
              );
            })}
          </div>

          {step >= 7 && (
            <div className="p-8 bg-white border border-slate-200 shadow-md rounded-3xl text-center animate-fadeIn">
              <p className="text-2xl text-slate-800">
                The setting changes. The need to <strong className="text-slate-900">understand, plan, act, and look back</strong> remains.
              </p>
            </div>
          )}
        </div>
      )
    }

    case 24: {
      const messages = [
        'Understand the problem.',
        "Don't stop at blaming.",
        'Devise a strategy.',
        'Be part of the solution.',
      ];

      return (
        <div className="text-center space-y-8 my-auto max-w-5xl mx-auto w-full animate-fadeIn">
          <h2 className="text-5xl font-extrabold text-slate-900 leading-tight">Be Part of the Solution.</h2>
          
          <div className="space-y-4 text-left max-w-3xl mx-auto">
            {messages.map((line, i) => {
              const isVisible = step >= i + 1;
              const isLast = i === 3;

              return (
                <div
                  key={line}
                  className={`p-5 rounded-2xl border text-xl md:text-2xl transition-all duration-500 shadow-sm ${
                    !isVisible
                      ? 'bg-slate-100 border-slate-200/60 opacity-30 scale-95'
                      : isLast
                      ? 'bg-blue-50 border-blue-300 text-blue-900 opacity-100 scale-100 shadow-blue-500/5'
                      : 'bg-white border-slate-200 text-slate-800 opacity-100 scale-100'
                  }`}
                >
                  <span className={`font-black mr-4 ${isVisible ? 'text-blue-600' : 'text-slate-400'}`}>
                    {i + 1}
                  </span>
                  <span className={isVisible ? '' : 'text-slate-400'}>{line}</span>
                </div>
              );
            })}
          </div>
        </div>
      )
    }

    case 25:
      return (
        <div className="text-center space-y-7 my-auto max-w-5xl mx-auto animate-fadeIn">
          <span className="px-4 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-sm font-semibold uppercase tracking-widest">
            End of Presentation
          </span>
          
          <h2 className="text-6xl md:text-8xl font-black tracking-tight animate-shimmer py-2">
            Thank You.
          </h2>

          <p className="text-2xl font-light text-slate-700 tracking-wide max-w-2xl mx-auto">
            Understand <span className="text-blue-600 font-bold">•</span> Plan <span className="text-blue-600 font-bold">•</span> Carry Out the Plan <span className="text-blue-600 font-bold">•</span> Look Back
          </p>

          <div className="pt-10 text-slate-500 font-medium text-base tracking-widest uppercase">
            Mathematics in the Modern World
          </div>
        </div>
      )

      case 26:
        return (
          <div className="text-center space-y-6 my-auto max-w-4xl mx-auto w-full animate-fadeIn">
            <span className="px-4 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-sm font-semibold uppercase tracking-widest">
              Bonus Challenge
            </span>
            <h2 className="text-5xl font-black text-slate-900 tracking-tight">
              Spellbound Puzzle
            </h2>
            <p className="text-xl text-slate-600">
              Scan the QR code below to access the problem-solving challenge!
            </p>

            <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-8 max-w-xs mx-auto flex flex-col items-center space-y-4">
              <Image 
                src={spellboundQr} 
                alt="Spellbound Puzzle QR Code" 
                className="w-64 h-64 object-contain rounded-2xl border border-slate-100 shadow-inner"
              />
              <p className="text-sm font-semibold text-slate-500">
                Scan with your phone camera
              </p>
            </div>
          </div>
        )

    case 27:
      return (
        <div className="text-left space-y-6 my-auto max-w-6xl mx-auto w-full animate-fadeIn">
          <div className="text-center space-y-2">
            <span className="px-4 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-sm font-semibold uppercase tracking-widest">
              Puzzle Mechanics
            </span>
            <h2 className="text-5xl font-black text-slate-900 tracking-tight">
              Spellbound Rules
            </h2>
          </div>

          <div className="bg-white border border-slate-200 shadow-md rounded-3xl p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Puzzle Image */}
            <div className="md:col-span-5 flex justify-center">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner">
                <Image 
                  src={spellPuzzle} 
                  alt="Spellbound Sudoku Grid" 
                  className="w-full max-w-xs md:max-w-none h-auto object-contain rounded-xl"
                />
              </div>
            </div>

            {/* Rules List */}
            <div className="md:col-span-7 space-y-3 text-slate-700 text-base leading-relaxed">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <strong className="text-slate-900 block font-bold text-lg mb-0.5">Normal Sudoku Rules</strong>
                Place digits 1–9 such that every row, column, and 3×3 box contains each digit exactly once.
              </div>

              <div className="p-3 bg-blue-50/60 border border-blue-200/60 rounded-xl">
                <strong className="text-blue-900 block font-bold text-lg mb-0.5">☁️ Dynamic Fog</strong>
                Placing correct digits clears up fog somewhere across the grid. No guessing required!
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <strong className="text-slate-900 block font-bold text-lg mb-0.5">⚫ Kropki Dots</strong>
                Digits separated by a black dot have a 1:2 ratio (one digit is double the other).
              </div>

              <div className="p-3 bg-emerald-50/60 border border-emerald-200/60 rounded-xl">
                <strong className="text-emerald-900 block font-bold text-lg mb-0.5">🟩 Green Whispers Line</strong>
                Adjacent digits along a green line differ by at least 5.
              </div>

              <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl">
                <strong className="text-amber-900 block font-bold text-lg mb-0.5">🟧 Orange Lines (Spellbound)</strong>
                Digits on the same orange line have the same number of letters when spelled (e.g., <strong className="text-slate-900">4</strong> [FOUR] and <strong className="text-slate-900">9</strong> [NINE] both have four letters).
              </div>
            </div>
          </div>
        </div>
      )

    default:
      return (
        <div className="text-center space-y-4 my-auto">
          <span className="text-slate-400 font-semibold tracking-wide uppercase text-sm">Slide {slideIndex}</span>
          <h2 className="text-5xl font-extrabold text-slate-900">End of Presentation</h2>
          <p className="text-slate-600 text-lg">Thank you for participating!</p>
        </div>
      )
  }
}