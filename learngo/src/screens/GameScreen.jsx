import React, { useState } from 'react'
import { useGame } from '../context/GameContext'
import { languages, chapterTitles, lessonsByLang } from '../data/curriculum'

// ─── Game HUD ─────────────────────────────────────────────────────────────────
function GameHUD({ lang }) {
  const { lives, gems, keys } = useGame()
  const cfg = {
    python:     { bg:'#1A3A0A', color:'#84CC16',  label:'PY'  },
    javascript: { bg:'#3A2E00', color:'#FCD34D',  label:'JS'  },
    cpp:        { bg:'#1E0A3A', color:'#C084FC',  label:'C++' },
    dsa:        { bg:'#003A2A', color:'#34D399',  label:'DSA' },
  }
  const c = cfg[lang] || cfg.python
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 16px', background:'#0F172A', borderBottom:'1px solid #1E2A4A' }}>
      <div style={{ background:c.bg, border:`1px solid ${c.color}40`, borderRadius:10, padding:'5px 12px', fontWeight:800, fontSize:14, color:c.color, fontFamily:'JetBrains Mono,monospace' }}>{c.label}</div>
      <div style={{ display:'flex', alignItems:'center', gap:4 }}><span>💧</span><span style={{ color:'white', fontWeight:700, fontSize:15 }}>{lives}</span></div>
      <div style={{ display:'flex', alignItems:'center', gap:4 }}><span>💎</span><span style={{ color:'white', fontWeight:700, fontSize:15 }}>{gems.toLocaleString()}</span></div>
      <div style={{ display:'flex', alignItems:'center', gap:4 }}><span>🔑</span><span style={{ color:'white', fontWeight:700, fontSize:15 }}>{keys}</span></div>
    </div>
  )
}

// ─── Chapter banner ───────────────────────────────────────────────────────────
function ChapterBanner({ lang, completedCount }) {
  const { getLangProgress } = useGame()
  const prog     = getLangProgress(lang)
  const chapters = chapterTitles[lang] || chapterTitles.python
  const chIdx    = Math.min(completedCount, chapters.length - 1)
  return (
    <div style={{ margin:'12px 16px', background:'linear-gradient(135deg,#1E8BC3,#0284C7)', borderRadius:20, padding:'16px 18px 14px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', right:16, top:'50%', transform:'translateY(-50%)', width:52, height:52, borderRadius:'50%', border:'2.5px solid rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <span style={{ color:'white', fontWeight:700, fontSize:13 }}>{prog.pct}%</span>
      </div>
      <p style={{ color:'rgba(255,255,255,0.7)', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:1.5, margin:'0 0 4px' }}>CHAPTER {chIdx+1} OF {chapters.length}</p>
      <p style={{ color:'white', fontWeight:800, fontSize:18, lineHeight:1.25, margin:0, paddingRight:72 }}>{chapters[chIdx]}</p>
      <div style={{ marginTop:10, height:5, background:'rgba(255,255,255,0.2)', borderRadius:99, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${prog.pct}%`, background:'white', borderRadius:99, transition:'width 0.6s' }}/>
      </div>
    </div>
  )
}

// ─── Hexagon node ─────────────────────────────────────────────────────────────
function HexNode({ levelNum, status, title, xp, onClick, size=68 }) {
  const w = size, h = size * 0.866
  const pts = [[w*.25,0],[w*.75,0],[w,h*.5],[w*.75,h],[w*.25,h],[0,h*.5]].map(p=>p.join(',')).join(' ')
  const S = {
    done:      { fill:'#1A2E1A', stroke:'#22C55E', glow:'0 0 14px rgba(34,197,94,0.4)',  icon:'✓',  ic:'#22C55E', nc:'#4ADE80' },
    active:    { fill:'#0E2A3A', stroke:'#38BDF8', glow:'0 0 18px rgba(56,189,248,0.6)', icon:null, ic:'#38BDF8', nc:'#38BDF8', pulse:true },
    locked:    { fill:'#111827', stroke:'#1F2937', glow:'none',                           icon:null, ic:'#374151', nc:'#374151' },
    quiz:      { fill:'#1E1030', stroke:'#7C3AED', glow:'0 0 12px rgba(124,58,237,0.35)',icon:'?',  ic:'#A78BFA', nc:'#A78BFA' },
    challenge: { fill:'#2A1008', stroke:'#EA580C', glow:'0 0 12px rgba(234,88,12,0.35)', icon:'⚡', ic:'#FB923C', nc:'#FB923C' },
    trophy:    { fill:'#2A2000', stroke:'#CA8A04', glow:'0 0 16px rgba(202,138,4,0.5)',  icon:'🏆', ic:'#FCD34D', nc:'#FCD34D' },
  }
  const s = S[status] || S.locked
  const ok = status==='active' || status==='done'
  return (
    <div onClick={() => ok && onClick()} title={title} style={{ cursor:ok?'pointer':'default', filter:`drop-shadow(${s.glow})`, transition:'transform 0.15s', display:'inline-flex', flexDirection:'column', alignItems:'center', gap:3, animation:s.pulse?'pulse-hex 2s ease-in-out infinite':'none' }}
      onMouseEnter={e => { if(ok) e.currentTarget.style.transform='scale(1.1)' }}
      onMouseLeave={e => { e.currentTarget.style.transform='scale(1)' }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <polygon points={pts} fill="rgba(0,0,0,0.3)" transform="translate(1.5,2.5)"/>
        <polygon points={pts} fill={s.fill} stroke={s.stroke} strokeWidth="2.5"/>
        {status!=='locked' && <polygon points={[[w*.3,2],[w*.7,2],[w*.86,h*.25],[w*.7,h*.3],[w*.3,h*.3],[w*.14,h*.25]].map(p=>p.join(',')).join(' ')} fill="rgba(255,255,255,0.05)"/>}
        {s.icon
          ? <text x={w/2} y={h/2+4} textAnchor="middle" fill={s.ic} fontSize={s.icon.length>1?18:22} fontWeight="700" fontFamily="system-ui">{s.icon}</text>
          : <text x={w/2} y={h/2+3} textAnchor="middle" fill={s.nc} fontSize="20" fontWeight="800" fontFamily="Plus Jakarta Sans,system-ui">{levelNum}</text>
        }
        {s.icon && status!=='trophy' && <text x={w/2} y={h-4} textAnchor="middle" fill={s.nc} fontSize="10" fontFamily="system-ui" opacity="0.8">{levelNum}</text>}
      </svg>
      {status==='active' && <div style={{ background:'rgba(56,189,248,0.15)', border:'1px solid rgba(56,189,248,0.3)', borderRadius:99, padding:'2px 8px', fontSize:10, color:'#38BDF8', fontWeight:700 }}>+{xp} XP</div>}
    </div>
  )
}

// ─── Zigzag level map ─────────────────────────────────────────────────────────
function LevelMap({ lang, lessons, onPlay }) {
  const { isLevelDone } = useGame()
  const COLS = 3
  const firstActive = lessons.findIndex((_,i) => !isLevelDone(lang, i))
  return (
    <div style={{ padding:'8px 16px 100px' }}>
      <style>{`@keyframes pulse-hex{0%,100%{filter:drop-shadow(0 0 12px rgba(56,189,248,0.4))}50%{filter:drop-shadow(0 0 22px rgba(56,189,248,0.8))}}`}</style>
      {Array.from({ length: Math.ceil(lessons.length / COLS) }).map((_,rowIdx) => {
        const row = lessons.slice(rowIdx*COLS, rowIdx*COLS+COLS)
        const isEven = rowIdx%2===0
        const disp = isEven ? row : [...row].reverse()
        return (
          <div key={rowIdx} style={{ display:'flex', justifyContent:isEven?'flex-start':'flex-end', gap:8, paddingLeft:isEven?28:0, paddingRight:isEven?0:28, marginBottom:-8 }}>
            {disp.map(lesson => {
              const i = lesson.id-1
              const done   = isLevelDone(lang, i)
              const active = i===firstActive
              let status   = done?'done':active?'active':'locked'
              if (!done&&!active) {
                if (lesson.type==='quiz')      status='quiz'
                if (lesson.type==='challenge') status='challenge'
                if (lesson.id===10)            status='trophy'
              }
              return <HexNode key={lesson.id} levelNum={lesson.id} status={status} title={lesson.title} xp={lesson.xp} onClick={() => onPlay(lang, i, lesson)}/>
            })}
          </div>
        )
      })}
    </div>
  )
}

// ─── Main GameScreen ──────────────────────────────────────────────────────────
export default function GameScreen({ onStartLesson }) {
  const { activeLang, setActiveLang, getLangProgress } = useGame()
  const [selectedLang, setSelected] = useState(activeLang)
  const lessons = lessonsByLang[selectedLang] || []

  const handleLangChange = (id) => { setSelected(id); setActiveLang(id) }
  const handlePlay = (lang, idx, lesson) => {
    if (onStartLesson) onStartLesson({ lang, levelIndex: idx, title: lesson.title })
  }

  return (
    <div style={{ background:'#0D1117', minHeight:'100vh' }} className="animate-fade-in">
      <GameHUD lang={selectedLang}/>

      {/* Language selector */}
      <div style={{ display:'flex', gap:8, padding:'10px 16px', overflowX:'auto' }} className="no-scrollbar">
        {languages.map(lang => (
          <button key={lang.id} onClick={() => handleLangChange(lang.id)} style={{
            display:'flex', alignItems:'center', gap:6, padding:'7px 14px', borderRadius:20,
            border:'none', cursor:'pointer', fontWeight:700, fontSize:13, whiteSpace:'nowrap',
            transition:'all 0.2s',
            background: selectedLang===lang.id ? lang.bgColor : '#1E2A4A',
            color: selectedLang===lang.id ? 'white' : '#94A3B8',
            boxShadow: selectedLang===lang.id ? `0 0 12px ${lang.color}50` : 'none',
          }}>
            <span style={{ fontSize:15 }}>{lang.icon}</span>
            {lang.label}
            <span style={{ fontSize:11, opacity:0.8, marginLeft:2 }}>{getLangProgress(lang.id).done}/10</span>
          </button>
        ))}
      </div>

      <ChapterBanner lang={selectedLang} completedCount={getLangProgress(selectedLang).done}/>
      <LevelMap lang={selectedLang} lessons={lessons} onPlay={handlePlay}/>
    </div>
  )
}
