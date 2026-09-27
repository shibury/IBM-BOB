import React, { useState, useEffect } from 'react'
import { Bell, Flame, Star, ArrowRight, Play, ChevronRight, Brain } from 'lucide-react'
import { user, dailyQuests, continueLearning, notifications } from '../data/mockData'
import { LearnGoIcon, FoxFaceSVG } from '../components/LearnGoLogo'
import { useGame } from '../context/GameContext'

// ─── Fox mascot floating ─────────────────────────────────────────────────────
function FloatingFox({ size = 80 }) {
  return (
    <div style={{ animation: 'float 3s ease-in-out infinite', display: 'inline-flex' }}>
      <svg width={size} height={size * 1.2} viewBox="0 0 80 96" fill="none">
        {/* Body */}
        <ellipse cx="40" cy="78" rx="18" ry="14" fill="#E8650A"/>
        {/* Head */}
        <circle cx="40" cy="44" r="22" fill="#E8650A"/>
        {/* Ears */}
        <polygon points="20,28 14,10 30,24" fill="#E8650A"/>
        <polygon points="60,28 66,10 50,24" fill="#E8650A"/>
        <polygon points="21,26 17,14 28,23" fill="#F5C08A"/>
        <polygon points="59,26 63,14 52,23" fill="#F5C08A"/>
        {/* Face cream */}
        <ellipse cx="40" cy="50" rx="15" ry="14" fill="#F5E0C0"/>
        {/* Eyes */}
        <ellipse cx="31" cy="40" rx="6" ry="7" fill="#2A2A3A"/>
        <ellipse cx="49" cy="40" rx="6" ry="7" fill="#2A2A3A"/>
        <ellipse cx="32.5" cy="38" rx="2" ry="2.5" fill="white"/>
        <ellipse cx="50.5" cy="38" rx="2" ry="2.5" fill="white"/>
        {/* Nose */}
        <ellipse cx="40" cy="51" rx="4" ry="3" fill="#9C4A10"/>
        {/* Smile */}
        <path d="M 35 55 Q 40 59 45 55" stroke="#9C4A10" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Tail */}
        <path d="M 55 82 Q 70 76 66 88 Q 62 94 56 88" fill="#E8650A"/>
        <path d="M 57 83 Q 68 78 65 87 Q 62 92 58 87" fill="#F5C08A"/>
      </svg>
    </div>
  )
}

// ─── Home Header — orange top bar (matches reference) ────────────────────────
function HomeHeader({ onNavigate }) {
  const [notifOpen, setNotifOpen] = useState(false)
  const unread = notifications.filter(n => n.unread).length
  const { xp, level, streak } = useGame()

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #FF7A00 0%, #E8650A 100%)', borderRadius: '0 0 28px 28px', paddingBottom: 24 }}
    >
      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
      <div style={{ position: 'absolute', top: 20, right: 60, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

      <div className="px-4 pt-4 relative">
        {/* Top row: avatar + name + bell */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: 'rgba(255,255,255,0.25)',
              border: '2px solid rgba(255,255,255,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <FoxFaceSVG size={38} />
            </div>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 500 }}>Hello, {user.name}!</p>
              {/* Level badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                background: 'rgba(255,255,255,0.25)', borderRadius: 20,
                padding: '2px 10px', marginTop: 2,
              }}>
                <span style={{ fontSize: 13 }}>🏅</span>
                <span style={{ color: 'white', fontWeight: 700, fontSize: 13 }}>Level {level}</span>
              </div>
            </div>
          </div>

          {/* Bell */}
          <button
            onClick={() => setNotifOpen(o => !o)}
            style={{ position: 'relative', padding: 8, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer' }}
          >
            <Bell size={20} color="white" />
            {unread > 0 && (
              <span style={{
                position: 'absolute', top: 4, right: 4,
                width: 10, height: 10, borderRadius: '50%',
                background: '#FF2D55', border: '1.5px solid white',
              }} />
            )}
          </button>
        </div>

        {/* Stats row: streak + XP */}
        <div className="flex gap-3">
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.25)', borderRadius: 20,
            padding: '5px 14px',
          }}>
            <span style={{ fontSize: 16 }}>🔥</span>
            <span style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>{streak}</span>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.25)', borderRadius: 20,
            padding: '5px 14px',
          }}>
            <span style={{ fontSize: 16 }}>⭐</span>
            <span style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>{xp}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Daily Goal Progress bar ──────────────────────────────────────────────────
function DailyGoalCard() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 300); return () => clearTimeout(t) }, [])
  const { dailyGoalProgress } = useGame()
  const pct = dailyGoalProgress

  return (
    <div style={{ background: '#1E2A4A', borderRadius: 20, padding: '18px 18px 14px', marginTop: 16 }}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>Daily Goal Progress : {pct}%</p>
        </div>
        <FloatingFox size={64} />
      </div>
      {/* Track */}
      <div style={{ height: 14, background: '#2E3D5E', borderRadius: 99, overflow: 'hidden', position: 'relative' }}>
        <div style={{
          height: '100%',
          width: mounted ? `${pct}%` : '0%',
          background: 'linear-gradient(90deg, #FF7A00, #FFAA00)',
          borderRadius: 99,
          transition: 'width 1.2s cubic-bezier(0.22,1,0.36,1)',
          position: 'relative',
        }}>
          {/* Fox marker */}
          <div style={{
            position: 'absolute', right: -12, top: '50%', transform: 'translateY(-50%)',
            width: 24, height: 24, borderRadius: '50%',
            background: 'white', border: '2px solid #FF7A00',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <FoxFaceSVG size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Quest card (reference style) ────────────────────────────────────────────
const difficultyStyle = {
  blue:   { bg: 'rgba(59,130,246,0.2)', color: '#60A5FA' },
  orange: { bg: 'rgba(249,115,22,0.2)', color: '#FB923C' },
  purple: { bg: 'rgba(139,92,246,0.2)', color: '#A78BFA' },
  emerald:{ bg: 'rgba(16,185,129,0.2)', color: '#34D399' },
}

function QuestCard({ quest, onStart }) {
  const diff = difficultyStyle[quest.difficultyColor] || difficultyStyle.blue
  const isCode = quest.icon === '</>'

  return (
    <div style={{
      background: '#1E2A4A', borderRadius: 16, padding: 14,
      display: 'flex', flexDirection: 'column', gap: 8, minWidth: 140,
      border: '1px solid rgba(255,255,255,0.07)',
    }}>
      {/* Icon */}
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: '#2A3A5C', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: isCode ? 14 : 18, color: '#60A5FA', fontFamily: 'monospace', fontWeight: 700,
      }}>
        {quest.icon}
      </div>
      {/* Title */}
      <p style={{ color: 'white', fontWeight: 700, fontSize: 13, lineHeight: 1.3 }}>{quest.title}</p>
      {/* Difficulty tag */}
      <span style={{
        display: 'inline-block', borderRadius: 99, padding: '2px 8px',
        fontSize: 11, fontWeight: 600,
        background: diff.bg, color: diff.color,
      }}>{quest.difficulty}</span>
      {/* XP */}
      <p style={{ color: '#FF7A00', fontWeight: 700, fontSize: 13 }}>+{quest.xp} XP</p>
      {/* Start button */}
      <button
        onClick={() => onStart(quest)}
        style={{
          background: '#FF7A00', color: 'white', fontWeight: 700, fontSize: 13,
          border: 'none', borderRadius: 10, padding: '8px 0', cursor: 'pointer',
          transition: 'background 0.15s',
        }}
        onMouseOver={e => e.currentTarget.style.background = '#FF9A40'}
        onMouseOut={e => e.currentTarget.style.background = '#FF7A00'}
      >
        Start
      </button>
    </div>
  )
}

// ─── Continue Learning card ───────────────────────────────────────────────────
function ContinueLearningCard({ data, onResume }) {
  return (
    <div style={{ background: '#1E2A4A', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Title bar */}
      <div style={{ padding: '16px 18px 10px' }}>
        <p style={{ color: 'white', fontWeight: 800, fontSize: 18 }}>{data.title}</p>
      </div>
      {/* AI Summary row */}
      <div style={{ padding: '8px 18px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'rgba(139,92,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Brain size={18} color="#A78BFA" />
        </div>
        <div>
          <p style={{ color: '#FF7A00', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>AI Tutor Summary</p>
          <p style={{ color: '#94A3B8', fontSize: 13 }}>{data.aiSummary}</p>
        </div>
      </div>
      {/* Progress */}
      <div style={{ padding: '12px 18px 16px' }}>
        <div className="flex items-center justify-between mb-2">
          <p style={{ color: '#94A3B8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8 }}>Course Progress</p>
          <div className="flex items-center gap-1">
            <span style={{ color: '#94A3B8', fontSize: 12 }}>{data.progress}%</span>
            <FoxFaceSVG size={16} />
          </div>
        </div>
        <div style={{ height: 10, background: '#2E3D5E', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${data.progress}%`,
            background: 'linear-gradient(90deg, #FF7A00, #FFAA00)',
            borderRadius: 99,
          }} />
        </div>
        {/* Resume button */}
        <button
          onClick={() => onResume()}
          style={{
            marginTop: 14, width: '100%',
            background: '#FF7A00', color: 'white', fontWeight: 700, fontSize: 14,
            border: 'none', borderRadius: 14, padding: '13px 0', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
          onMouseOver={e => e.currentTarget.style.background = '#FF9A40'}
          onMouseOut={e => e.currentTarget.style.background = '#FF7A00'}
        >
          <Play size={14} fill="white" color="white" />
          Resume Socratic Learning
        </button>
      </div>
    </div>
  )
}

// ─── Main HomeScreen ──────────────────────────────────────────────────────────
export default function HomeScreen({ onNavigate, onStartQuest }) {
  return (
    <div style={{ minHeight: '100vh', background: '#131B2E' }} className="animate-fade-in">
      {/* Orange header */}
      <HomeHeader onNavigate={onNavigate} />

      <div className="px-4" style={{ paddingBottom: 24 }}>
        {/* Daily Goal */}
        <DailyGoalCard />

        {/* Daily Quests */}
        <div className="flex items-center justify-between mt-5 mb-3">
          <p style={{ color: 'white', fontWeight: 800, fontSize: 17 }}>Daily Quests</p>
          <button onClick={() => onNavigate('quests')} style={{ color: '#FF7A00', fontSize: 13, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
            See All
          </button>
        </div>

        {/* Horizontal scroll quest cards */}
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }} className="no-scrollbar">
          {dailyQuests.map(q => (
            <QuestCard key={q.id} quest={q} onStart={onStartQuest} />
          ))}
        </div>

        {/* Continue Learning */}
        <div className="flex items-center justify-between mt-5 mb-3">
          <p style={{ color: 'white', fontWeight: 800, fontSize: 17 }}>Continue Learning</p>
          <button onClick={() => onNavigate('learn')} style={{ color: '#FF7A00', fontSize: 13, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
            See All
          </button>
        </div>

        <ContinueLearningCard data={continueLearning} onResume={() => onNavigate('tutor')} />
      </div>
    </div>
  )
}
