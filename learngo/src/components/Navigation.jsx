import React from 'react'
import { Home, Bot, Map, Gamepad2, MoreHorizontal, Users } from 'lucide-react'
import { LearnGoIcon } from './LearnGoLogo'

// Bottom-nav tabs (mobile) — matches reference image exactly
// AI Tutor | Learn | Home (center/active) | Game | Other
const tabs = [
  { id: 'tutor',  label: 'AI Tutor', Icon: Bot },
  { id: 'learn',  label: 'Learn',    Icon: Map },
  { id: 'home',   label: 'Home',     Icon: Home,     center: true },
  { id: 'game',   label: 'Game',     Icon: Gamepad2 },
  { id: 'other',  label: 'Other',    Icon: MoreHorizontal },
]

// Sidebar entries (desktop)
const sidebarEntries = [
  { id: 'home',      label: 'Home',      Icon: Home },
  { id: 'tutor',     label: 'AI Tutor',  Icon: Bot },
  { id: 'learn',     label: 'Learn',     Icon: Map },
  { id: 'game',      label: 'Game',      Icon: Gamepad2 },
  { id: 'community', label: 'Community', Icon: Users },
  { id: 'other',     label: 'Other',     Icon: MoreHorizontal },
]

// ─── Desktop Sidebar ──────────────────────────────────────────────────────────
export function Sidebar({ active, onNavigate }) {
  return (
    <nav className="fixed left-0 top-16 bottom-0 z-20 w-56 glass-card border-r border-white/8 hidden lg:flex flex-col py-4 px-3 gap-1">
      {sidebarEntries.map(({ id, label, Icon }) => {
        // "Other" tab is active when screen is 'other' OR 'community' (both map to navTab='other')
        // Community has its own dedicated entry — mark active when screen === 'community'
        const isActive = active === id || (id === 'community' && active === 'other' && false)
        // Exact: each entry maps directly to its screen key
        const highlighted = active === id

        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left w-full
              ${highlighted
                ? 'text-[#FF7A00] ring-orange-glow'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/6'
              }`}
            style={highlighted ? { background: 'rgba(255,122,0,0.12)' } : {}}
          >
            <Icon
              size={18}
              style={{ color: highlighted ? '#FF7A00' : undefined }}
            />
            {label}
            {highlighted && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#FF7A00' }} />
            )}
          </button>
        )
      })}

      {/* Version tag */}
      <div className="mt-auto px-3 py-2">
        <p className="text-xs text-[#94A3B8]/40 font-mono">LearnGo v1.0.0</p>
        <p className="text-xs text-[#94A3B8]/40">AI Companion for CS</p>
      </div>
    </nav>
  )
}

// ─── Mobile Bottom Nav ────────────────────────────────────────────────────────
// Community is accessed via "Other" tab on mobile (navigates to 'community' sub-section
// inside OtherScreen, OR user can tap "Other" → sub-tab "Community Hub").
// The bottom nav itself uses 5 standard tabs; "Other" lights up for both 'other' and 'community'.
export function BottomNav({ active, onNavigate }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 lg:hidden glass-card border-t border-white/8 px-1">
      <div className="flex items-center justify-around">
        {tabs.map(({ id, label, Icon }) => {
          // "Other" tab lights up for both 'other' and 'community' screens
          const isActive = active === id || (id === 'other' && active === 'community')

          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="nav-item flex-1 pt-2 pb-2"
              style={isActive ? { color: '#FF7A00' } : {}}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className="relative p-1 rounded-lg transition-all duration-200"
                style={isActive ? { background: 'rgba(255,122,0,0.15)' } : {}}
              >
                <Icon
                  size={20}
                  style={{ color: isActive ? '#FF7A00' : '#94A3B8' }}
                />
                {isActive && (
                  <div
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: '#FF7A00' }}
                  />
                )}
              </div>
              <span
                className="text-[10px] font-semibold"
                style={{ color: isActive ? '#FF7A00' : 'rgba(148,163,184,0.7)' }}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
