import React, { useState } from 'react'
import { X, Zap, ChevronUp, Check } from 'lucide-react'
import { useGame } from '../context/GameContext'
import { lessonsByLang } from '../data/curriculum'

// ─── Mascot SVG ───────────────────────────────────────────────────────────────
function Mascot({ size = 80, mood = 'neutral' }) {
  // mood: 'neutral' | 'happy' | 'sad'
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 80 92" fill="none" style={{ flexShrink: 0 }}>
      <ellipse cx="40" cy="78" rx="20" ry="11" fill="#4A5568"/>
      <path d="M 22 56 Q 20 78 24 86 Q 32 90 40 90 Q 48 90 56 86 Q 60 78 58 56 Z" fill="#4A7C59"/>
      <circle cx="40" cy="38" r="22" fill="#F5DEB3"/>
      <ellipse cx="40" cy="26" rx="20" ry="12" fill="white"/>
      <path d="M 20 26 Q 20 16 40 14 Q 60 16 60 26" fill="white"/>
      {/* Eyes */}
      <ellipse cx="31" cy="40" rx="4" ry={mood === 'happy' ? 3 : 4.5} fill="#1A1A2E"/>
      <ellipse cx="49" cy="40" rx="4" ry={mood === 'happy' ? 3 : 4.5} fill="#1A1A2E"/>
      {/* Eyebrows */}
      {mood === 'sad'
        ? <><path d="M 27 35 L 37 37" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M 43 37 L 53 35" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round"/></>
        : <><path d="M 27 37 L 37 35" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round"/>
            <path d="M 43 35 L 53 37" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round"/></>
      }
      {/* Mouth */}
      {mood === 'happy'
        ? <path d="M 33 50 Q 40 56 47 50" stroke="#1A1A2E" strokeWidth="2" fill="none" strokeLinecap="round"/>
        : mood === 'sad'
          ? <path d="M 33 53 Q 40 49 47 53" stroke="#1A1A2E" strokeWidth="2" fill="none" strokeLinecap="round"/>
          : <path d="M 34 51 Q 40 49 46 51" stroke="#1A1A2E" strokeWidth="2" fill="none" strokeLinecap="round"/>
      }
      <ellipse cx="40" cy="54" rx="14" ry="8" fill="white" opacity="0.9"/>
      <path d="M 26 53 Q 30 64 40 66 Q 50 64 54 53" fill="white"/>
      <ellipse cx="18" cy="66" rx="5" ry="10" fill="#4A7C59" transform="rotate(-15 18 66)"/>
      <ellipse cx="62" cy="66" rx="5" ry="10" fill="#4A7C59" transform="rotate(15 62 66)"/>
    </svg>
  )
}

// ─── Top progress bar ─────────────────────────────────────────────────────────
function TopBar({ progress, lives, onClose }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 16px', background:'#0D1117', borderBottom:'1px solid #1E2A4A' }}>
      <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'#94A3B8', padding:4, display:'flex' }}>
        <X size={22}/>
      </button>
      <div style={{ flex:1, height:12, background:'#1E2A4A', borderRadius:99, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${progress}%`, background:'linear-gradient(90deg,#1E8BC3,#22D3EE)', borderRadius:99, transition:'width 0.5s ease' }}/>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:4, minWidth:40 }}>
        <Zap size={16} color="#F59E0B" fill="#F59E0B"/>
        <span style={{ color: lives > 1 ? '#F59E0B' : '#EF4444', fontWeight:700, fontSize:15 }}>x{lives}</span>
      </div>
    </div>
  )
}

// ─── Code block display ───────────────────────────────────────────────────────
function CodeBlock({ lines, highlightWord, language }) {
  const langColor = { python:'#3B82F6', javascript:'#F59E0B', cpp:'#8B5CF6', dsa:'#10B981' }
  const dot = langColor[language] || '#94A3B8'

  return (
    <div style={{ borderRadius:14, overflow:'hidden', border:'1px solid #2A3550', marginBottom:4 }}>
      <div style={{ background:'#1A2235', padding:'6px 14px', display:'flex', alignItems:'center', gap:6 }}>
        <div style={{ width:8, height:8, borderRadius:'50%', background:dot }}/>
        <span style={{ color:'#94A3B8', fontSize:12, fontFamily:'JetBrains Mono,monospace' }}>{language}</span>
      </div>
      {lines.map((line, i) => {
        const parts = highlightWord
          ? line.split(new RegExp(`(${highlightWord.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'g'))
          : [line]
        return (
          <div key={i} style={{ background:'#131B2E', padding:'8px 14px', display:'flex', gap:12, fontFamily:'JetBrains Mono,monospace', fontSize:14, borderTop: i>0 ? '1px solid #1A2235' : 'none' }}>
            <span style={{ color:'#4A5568', minWidth:16, userSelect:'none' }}>{i+1}</span>
            <span style={{ whiteSpace:'pre', color:'#E2E8F0' }}>
              {parts.map((p,j) => {
                if (p === highlightWord)
                  return <span key={j} style={{ color:'#34D399', background:'rgba(52,211,153,0.15)', border:'1.5px solid rgba(52,211,153,0.5)', borderRadius:5, padding:'1px 5px' }}>{p}</span>
                // Colour strings orange, keywords cyan
                if ((p.startsWith('"')&&p.endsWith('"'))||(p.startsWith("'")&&p.endsWith("'")))
                  return <span key={j} style={{ color:'#F59E0B' }}>{p}</span>
                if (/^(def|if|else|for|while|return|class|import|from|in|and|or|not|int|double|cout|cin|const|let|var|async|await|function|=>)$/.test(p.trim()))
                  return <span key={j} style={{ color:'#60A5FA' }}>{p}</span>
                return <span key={j}>{p}</span>
              })}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ─── Output display ───────────────────────────────────────────────────────────
function OutputBlock({ output }) {
  if (!output) return null
  return (
    <div style={{ background:'#1A2235', borderRadius:10, padding:'8px 14px', fontFamily:'JetBrains Mono,monospace', fontSize:13, color:'#CBD5E1', border:'1px solid #2A3550', whiteSpace:'pre' }}>
      {output}
    </div>
  )
}

// ─── XP reward popup ─────────────────────────────────────────────────────────
function XPPopup({ xp }) {
  return (
    <div style={{ position:'absolute', top:'20%', left:'50%', transform:'translateX(-50%)', zIndex:10, animation:'slideUp 0.4s ease-out', pointerEvents:'none' }}>
      <div style={{ background:'linear-gradient(135deg,#FF7A00,#F59E0B)', borderRadius:20, padding:'10px 24px', display:'flex', alignItems:'center', gap:8, boxShadow:'0 8px 24px rgba(255,122,0,0.5)' }}>
        <span style={{ fontSize:20 }}>✨</span>
        <span style={{ color:'white', fontWeight:800, fontSize:22 }}>+{xp} XP</span>
      </div>
    </div>
  )
}

// ─── Fill-in-blank ────────────────────────────────────────────────────────────
function FillBlankLesson({ lesson, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const correct = selected === lesson.correctOption

  const handleCheck = () => { if (selected !== null) setConfirmed(true) }
  const handleNext  = () => onAnswer(correct)

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18, padding:'0 20px', flex:1 }}>
      <h2 style={{ color:'white', fontWeight:800, fontSize:22, lineHeight:1.3 }}>{lesson.instruction}</h2>

      {/* Mascot */}
      <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
        <Mascot size={76} mood={confirmed ? (correct?'happy':'sad') : 'neutral'} />
        <div style={{ background:'#1E2A4A', borderRadius:16, borderBottomLeftRadius:4, padding:'12px 14px', flex:1, border:'1px solid #2A3550' }}>
          <p style={{ color:'#CBD5E1', fontSize:14, lineHeight:1.6, margin:0 }}>{lesson.mascotSpeech}</p>
        </div>
      </div>

      {/* Code */}
      <CodeBlock
        lines={lesson.codeLines}
        highlightWord={confirmed ? lesson.blankWord : undefined}
        language={lesson.language}
      />
      {lesson.codeOutput && <OutputBlock output={lesson.codeOutput}/>}

      {/* Options */}
      <div style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center' }}>
        {lesson.options.map((opt, i) => {
          let bg='#1E2A4A', border='#2A3550', color='#CBD5E1'
          if (confirmed) {
            if (i === lesson.correctOption) { bg='rgba(52,211,153,0.15)'; border='#34D399'; color='#34D399' }
            else if (i===selected) { bg='rgba(239,68,68,0.12)'; border='#EF4444'; color='#EF4444' }
          } else if (i===selected) { bg='rgba(59,130,246,0.18)'; border='#3B82F6'; color='#60A5FA' }
          return (
            <button key={i} onClick={() => !confirmed && setSelected(i)} style={{
              background:bg, border:`2px solid ${border}`, color,
              borderRadius:14, padding:'10px 22px', fontSize:14, fontWeight:700,
              cursor:confirmed?'default':'pointer', transition:'all 0.15s',
              fontFamily:'JetBrains Mono,monospace', minWidth:90,
            }}>
              {opt}
            </button>
          )
        })}
      </div>

      <div style={{ flex:1 }}/>

      {/* Feedback */}
      {confirmed && (
        <div style={{ borderRadius:16, padding:'14px 16px', marginBottom:4,
          background: correct?'rgba(52,211,153,0.1)':'rgba(239,68,68,0.1)',
          border:`1px solid ${correct?'#34D399':'#EF4444'}` }}>
          <p style={{ color:correct?'#34D399':'#EF4444', fontWeight:800, fontSize:16, marginBottom:6 }}>
            {correct ? `✨ Correct! +${lesson.xp} XP` : '💔 Not quite...'}
          </p>
          <p style={{ color:'#CBD5E1', fontSize:13, lineHeight:1.6, margin:0 }}>
            {lesson.explanation.split(/(`[^`]+`)/).map((p,i) =>
              p.startsWith('`')&&p.endsWith('`')
                ? <code key={i} style={{ background:'#1E2A4A', color:'#FB923C', padding:'1px 5px', borderRadius:4 }}>{p.slice(1,-1)}</code>
                : <span key={i}>{p}</span>
            )}
          </p>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display:'flex', gap:10, paddingBottom:20 }}>
        {!confirmed
          ? <button onClick={handleCheck} disabled={selected===null} style={{
              flex:1, background: selected===null ? '#2A3550' : '#22C55E',
              color:'white', fontWeight:800, fontSize:15, border:'none',
              borderRadius:14, padding:'15px 0', cursor:selected===null?'not-allowed':'pointer',
              opacity:selected===null?0.5:1, transition:'all 0.2s',
            }}>CHECK</button>
          : <>
              <button onClick={() => {/* show why */}} style={{ flex:1, background:'#2A1E4A', color:'#A78BFA', fontWeight:700, fontSize:13, border:'none', borderRadius:14, padding:'14px 0', cursor:'pointer' }}>WHY?</button>
              <button onClick={handleNext} style={{ flex:3, background:correct?'#22C55E':'#EF4444', color:'white', fontWeight:800, fontSize:15, border:'none', borderRadius:14, padding:'14px 0', cursor:'pointer' }}>
                {correct ? 'CONTINUE' : 'TRY AGAIN'}
              </button>
            </>
        }
      </div>
    </div>
  )
}

// ─── Multiple-choice ──────────────────────────────────────────────────────────
function MultiChoiceLesson({ lesson, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [showWhy, setShowWhy]   = useState(false)
  const confirmed = selected !== null
  const correct   = selected === lesson.correctOption

  const handleSelect = (i) => { if (!confirmed) setSelected(i) }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16, padding:'0 20px', flex:1 }}>
      <h2 style={{ color:'white', fontWeight:800, fontSize:22, lineHeight:1.3 }}>{lesson.instruction}</h2>

      {/* Mascot */}
      <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
        <Mascot size={76} mood={confirmed?(correct?'happy':'sad'):'neutral'}/>
        <div style={{ background:'#1E2A4A', borderRadius:16, borderBottomLeftRadius:4, padding:'12px 14px', flex:1, border:'1px solid #2A3550' }}>
          <p style={{ color:'#CBD5E1', fontSize:14, lineHeight:1.6, margin:0 }}>{lesson.mascotSpeech}</p>
        </div>
      </div>

      {/* Code */}
      <CodeBlock lines={lesson.codeLines} language={lesson.language}/>
      {lesson.codeOutput && <OutputBlock output={lesson.codeOutput}/>}

      {/* Options */}
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {lesson.options.map((opt, i) => {
          let bg='#1E2A4A', border='#2A3550', color='#CBD5E1'
          if (confirmed) {
            if (i===lesson.correctOption) { bg='rgba(52,211,153,0.12)'; border='#34D399'; color='#34D399' }
            else if (i===selected) { bg='rgba(239,68,68,0.12)'; border='#EF4444'; color='#EF4444' }
          } else if (i===selected) { bg='rgba(59,130,246,0.18)'; border='#3B82F6'; color='#60A5FA' }
          return (
            <button key={i} onClick={() => handleSelect(i)} style={{
              background:bg, border:`2px solid ${border}`, color,
              borderRadius:14, padding:'14px 16px', fontSize:14, fontWeight:500,
              cursor:confirmed?'default':'pointer', transition:'all 0.15s', textAlign:'center',
              fontFamily:'JetBrains Mono,monospace', display:'flex', alignItems:'center', justifyContent:'space-between',
            }}>
              <span>{opt}</span>
              {confirmed && i===lesson.correctOption && <Check size={16} color="#34D399"/>}
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {confirmed && !showWhy && (
        <div style={{ borderRadius:16, padding:'12px 16px',
          background:correct?'rgba(52,211,153,0.1)':'rgba(239,68,68,0.1)',
          border:`1px solid ${correct?'#34D399':'#EF4444'}` }}>
          <p style={{ color:correct?'#34D399':'#EF4444', fontWeight:800, fontSize:16, margin:0 }}>
            {correct ? `✨ Correct! +${lesson.xp} XP` : '💔 Oops!'}
          </p>
          {!correct && <p style={{ color:'#F87171', fontSize:13, marginTop:4, marginBottom:0 }}>
            Correct answer: <span style={{ color:'#34D399', fontWeight:700 }}>{lesson.options[lesson.correctOption]}</span>
          </p>}
        </div>
      )}

      {/* WHY panel */}
      {showWhy && (
        <div style={{ background:'#131B2E', borderRadius:20, padding:16, border:'1px solid #2A3550' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <span style={{ color:'#60A5FA', fontWeight:700, fontSize:13 }}>💡 Explanation</span>
            <button onClick={() => setShowWhy(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'#94A3B8' }}>
              <ChevronUp size={18}/>
            </button>
          </div>
          <p style={{ color:'#CBD5E1', fontSize:14, lineHeight:1.7, margin:0 }}>
            {lesson.explanation.split(/(`[^`]+`|\*\*[^*]+\*\*)/).map((p,i) => {
              if (p.startsWith('`')&&p.endsWith('`')) return <code key={i} style={{ background:'#1E2A4A', color:'#FB923C', padding:'1px 5px', borderRadius:4, fontFamily:'monospace' }}>{p.slice(1,-1)}</code>
              if (p.startsWith('**')&&p.endsWith('**')) return <strong key={i} style={{ color:'white' }}>{p.slice(2,-2)}</strong>
              return <span key={i}>{p}</span>
            })}
          </p>
          <div style={{ display:'flex', gap:8, marginTop:12 }}>
            <button style={{ flex:1, padding:'10px', borderRadius:12, border:'1px solid #2A3550', background:'#1E2A4A', color:'#CBD5E1', fontWeight:700, cursor:'pointer' }}>Got it</button>
            <button style={{ flex:1, padding:'10px', borderRadius:12, border:'1px solid #2A3550', background:'#1E2A4A', color:'#94A3B8', fontWeight:600, cursor:'pointer' }}>Not really</button>
          </div>
        </div>
      )}

      <div style={{ flex:1 }}/>

      {/* Action buttons */}
      {confirmed && (
        <div style={{ display:'flex', gap:10, paddingBottom:20 }}>
          <button onClick={() => setShowWhy(w=>!w)} style={{ flex:1, background:'#2A1E4A', color:'#A78BFA', fontWeight:700, fontSize:13, border:'none', borderRadius:14, padding:'14px 0', cursor:'pointer' }}>
            WHY?
          </button>
          <button onClick={() => onAnswer(correct)} style={{
            flex:3, background:correct?'#22C55E':'#EF4444', color:'white',
            fontWeight:800, fontSize:15, border:'none', borderRadius:14, padding:'14px 0', cursor:'pointer',
          }}>
            {correct ? 'CONTINUE' : 'GOT IT'}
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Completion screen ────────────────────────────────────────────────────────
function CompletionScreen({ xpEarned, onClose, title }) {
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 24px', textAlign:'center', gap:20 }}>
      <div style={{ fontSize:72 }}>🏆</div>
      <h2 style={{ color:'white', fontWeight:800, fontSize:26, margin:0 }}>Lesson Complete!</h2>
      <p style={{ color:'#94A3B8', fontSize:15, margin:0 }}>{title}</p>
      <div style={{ background:'rgba(255,122,0,0.15)', border:'1px solid rgba(255,122,0,0.4)', borderRadius:20, padding:'16px 32px', display:'flex', alignItems:'center', gap:12 }}>
        <span style={{ fontSize:28 }}>⭐</span>
        <span style={{ color:'#FF7A00', fontWeight:800, fontSize:28 }}>+{xpEarned} XP</span>
      </div>
      <button onClick={onClose} style={{ background:'#22C55E', color:'white', fontWeight:800, fontSize:16, border:'none', borderRadius:16, padding:'16px 48px', cursor:'pointer', marginTop:8 }}>
        CONTINUE
      </button>
    </div>
  )
}

// ─── Main LessonScreen ────────────────────────────────────────────────────────
export default function LessonScreen({ lang, levelIndex, onClose, onComplete }) {
  const { lives, loseLife, earnXP, completeLevel } = useGame()
  const lessons   = lessonsByLang[lang] || lessonsByLang.python
  // Find the lesson for this level index (cycle through if needed)
  const lesson    = lessons[levelIndex % lessons.length]

  const [progress,  setProgress]  = useState(10)
  const [livesLeft, setLivesLeft] = useState(lives)
  const [showXP,    setShowXP]    = useState(false)
  const [done,      setDone]      = useState(false)
  const [totalXP,   setTotalXP]   = useState(0)

  // Re-render key to reset lesson on retry
  const [key, setKey] = useState(0)

  const handleAnswer = (correct) => {
    if (correct) {
      const xp = lesson.xp
      earnXP(xp)
      setTotalXP(xp)
      setProgress(100)
      setShowXP(true)
      setTimeout(() => { setShowXP(false); setDone(true) }, 1200)
      completeLevel(lang, levelIndex)
    } else {
      loseLife()
      setLivesLeft(l => Math.max(0, l - 1))
      // Retry: reset lesson
      setTimeout(() => setKey(k => k + 1), 400)
    }
  }

  if (!lesson) return null

  return (
    <div style={{ position:'fixed', inset:0, background:'#0D1117', zIndex:100, display:'flex', flexDirection:'column', overflowY:'auto' }}>
      {/* Top bar */}
      <TopBar progress={progress} lives={livesLeft} onClose={onClose}/>

      {/* XP popup */}
      {showXP && <XPPopup xp={lesson.xp}/>}

      {/* Completion */}
      {done
        ? <CompletionScreen xpEarned={totalXP} onClose={() => { onComplete && onComplete(); onClose() }} title={lesson.title}/>
        : (
          <div key={key} style={{ flex:1, display:'flex', flexDirection:'column', paddingTop:16 }}>
            {lesson.type === 'fill_blank'
              ? <FillBlankLesson  lesson={lesson} onAnswer={handleAnswer}/>
              : <MultiChoiceLesson lesson={lesson} onAnswer={handleAnswer}/>
            }
          </div>
        )
      }
    </div>
  )
}
