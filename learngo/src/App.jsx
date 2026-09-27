import React, { useState, useCallback, useEffect } from 'react'
import { GameProvider, useGame } from './context/GameContext'
import Header from './components/Header'
import { Sidebar, BottomNav } from './components/Navigation'
import { AuthModal, LogoutModal } from './components/AuthModals'
import HomeScreen        from './screens/HomeScreen'
import AITutorScreen     from './screens/AITutorScreen'
import LearnScreen       from './screens/LearnScreen'
import QuestsScreen      from './screens/QuestsScreen'
import GameScreen        from './screens/GameScreen'
import LessonScreen      from './screens/LessonScreen'
import CommunityScreen   from './screens/CommunityScreen'
import OtherScreen       from './screens/OtherScreen'
import OnboardingScreen  from './screens/OnboardingScreen'

// ─── SPA Router: screen-id → component ───────────────────────────────────────
const ROUTES = {
  home:      { Component: HomeScreen,      navTab: 'home'   },
  tutor:     { Component: AITutorScreen,   navTab: 'tutor'  },
  learn:     { Component: LearnScreen,     navTab: 'learn'  },
  quests:    { Component: QuestsScreen,    navTab: 'game'   },
  game:      { Component: GameScreen,      navTab: 'game'   },
  community: { Component: CommunityScreen, navTab: 'other'  },
  other:     { Component: OtherScreen,     navTab: 'other'  },
}

// ─── Toast Notification ───────────────────────────────────────────────────────
function Toast({ msg, onDone }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 3200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="fixed bottom-24 lg:bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up pointer-events-none">
      <div
        className="glass-card border border-white/15 px-5 py-3 rounded-2xl text-sm font-semibold text-white shadow-card flex items-center gap-2 whitespace-nowrap"
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
      >
        {msg}
      </div>
    </div>
  )
}

// ─── Quest Start Modal ────────────────────────────────────────────────────────
function QuestStartModal({ quest, onClose, onNavigate }) {
  const [launched, setLaunched] = useState(false)

  const handleStart = () => {
    setLaunched(true)
    setTimeout(() => {
      onClose()
      onNavigate('tutor')
    }, 800)
  }

  if (!quest) return null

  const isEasy = quest.difficultyColor === 'emerald'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm glass-card rounded-3xl border border-white/10 shadow-card overflow-hidden animate-slide-up">
        <div className="p-6 text-center">
          <div className="text-5xl mb-3">{quest.icon}</div>
          <h3 className="text-xl font-extrabold text-white mb-1">{quest.title}</h3>
          <p className="text-sm text-[#94A3B8] mb-4 leading-relaxed">{quest.description}</p>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="badge-xp">+{quest.xp} XP</span>
            <span
              className="tag-pill text-xs border"
              style={{
                background:   isEasy ? 'rgba(16,185,129,0.15)' : 'rgba(255,122,0,0.15)',
                color:        isEasy ? '#10B981' : '#F97316',
                borderColor:  isEasy ? 'rgba(16,185,129,0.3)' : 'rgba(255,122,0,0.3)',
              }}
            >
              {quest.difficulty}
            </span>
          </div>
          <div className="flex gap-3">
            <button onClick={onClose}    className="btn-secondary flex-1">Not now</button>
            <button onClick={handleStart} className="btn-primary flex-1">
              {launched ? '🚀 Launching…' : '▶ Start Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Login Gate Splash ────────────────────────────────────────────────────────
function LoginGate({ onOpen }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#0F172A]/95 backdrop-blur-md">
      <div className="text-center px-6 max-w-sm w-full">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
          style={{ background: '#FF7A00', boxShadow: '0 0 30px rgba(255,122,0,0.4)' }}
        >
          <span className="text-4xl">🦊</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-2">
          Welcome to <span style={{ color: '#FF7A00' }}>LearnGo</span>
        </h2>
        <p className="text-[#94A3B8] text-sm mb-6 leading-relaxed">
          Your AI-powered CS companion. Master fundamentals, earn XP, and get industry-ready.
        </p>
        <button onClick={onOpen} className="btn-primary px-8 py-3 text-base w-full">
          Get Started 🚀
        </button>
        <p className="text-xs text-[#94A3B8]/50 mt-4">Free forever · No credit card needed</p>
      </div>
    </div>
  )
}

// ─── Bridge: GameContext toasts → App-level toast ─────────────────────────────
function GameToastBridge({ showToast }) {
  const { toastMsg, clearToast } = useGame()
  useEffect(() => {
    if (toastMsg) {
      showToast(toastMsg)
      clearToast()
    }
  }, [toastMsg, showToast, clearToast])
  return null
}

// ─── PWA Install Banner ───────────────────────────────────────────────────────
function PWAInstallBanner({ prompt, onInstall, onDismiss }) {
  return (
    <div
      className="fixed bottom-20 lg:bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div
        className="pointer-events-auto mx-4 mb-2 w-full max-w-sm glass-card border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-card animate-slide-up"
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: '#FF7A00' }}
        >
          <span className="text-lg">🦊</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white leading-tight">Install LearnGo App</p>
          <p className="text-xs text-[#94A3B8]">Add to home screen for quick access</p>
        </div>
        <button
          onClick={onInstall}
          className="btn-primary text-xs px-3 py-1.5 flex-shrink-0"
        >
          Install
        </button>
        <button
          onClick={onDismiss}
          className="text-[#94A3B8] hover:text-white transition-colors flex-shrink-0"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen]           = useState('home')
  const [isLoggedIn, setIsLoggedIn]   = useState(true)
  const [showAuth, setShowAuth]       = useState(false)
  const [showLogout, setShowLogout]   = useState(false)
  const [toast, setToast]             = useState(null)
  const [questModal, setQuestModal]   = useState(null)
  // activeLesson shape: { lang, levelIndex, title } — set by GameScreen
  const [activeLesson, setActiveLesson] = useState(null)
  // Onboarding: show when logged in and not yet onboarded
  const [showOnboarding, setShowOnboarding] = useState(
    () => isLoggedIn && !localStorage.getItem('learngo_onboarded')
  )
  // PWA install prompt
  const [pwaPrompt, setPwaPrompt]   = useState(null)
  const [showPwaBanner, setShowPwaBanner] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('learngo_pwa_no')) return
    const handler = (e) => {
      e.preventDefault()
      setPwaPrompt(e)
      setShowPwaBanner(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handlePwaInstall = async () => {
    if (!pwaPrompt) return
    pwaPrompt.prompt()
    const { outcome } = await pwaPrompt.userChoice
    setPwaPrompt(null)
    setShowPwaBanner(false)
    if (outcome === 'accepted') showToast('🎉 LearnGo installed successfully!')
  }

  const handlePwaDismiss = () => {
    setShowPwaBanner(false)
    localStorage.setItem('learngo_pwa_no', '1')
  }

  // ── navigate: accepts any route key ──────────────────────────────────────
  const navigate = useCallback((id) => {
    if (ROUTES[id]) {
      setScreen(id)
      // Scroll content area back to top on route change
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const showToast = useCallback((msg) => {
    setToast(null) // reset first so same msg re-triggers
    requestAnimationFrame(() => setToast(msg))
  }, [])

  // ── auth handlers ─────────────────────────────────────────────────────────
  const handleLogout = () => {
    setShowLogout(false)
    setIsLoggedIn(false)
    setScreen('home')
    showToast('✅ Logged out successfully')
  }

  const handleAuthSuccess = () => {
    setShowAuth(false)
    setIsLoggedIn(true)
    showToast('🎉 Welcome back to LearnGo!')
  }

  // ── derived state ─────────────────────────────────────────────────────────
  const route    = ROUTES[screen] ?? ROUTES.home
  const { Component: ActiveScreen, navTab } = route

  // Props injected per-screen (only those that need them)
  const screenProps = {
    home:      { onNavigate: navigate, onStartQuest: setQuestModal },
    other:     { onLogout: () => setShowLogout(true), onAuth: () => setShowAuth(true), onNavigate: navigate },
    game:      { onStartLesson: ({ lang, levelIndex, title }) => setActiveLesson({ lang, levelIndex, title }) },
    community: { onNavigate: navigate },
    tutor:     { onNavigate: navigate },
    learn:     { onNavigate: navigate, onStartLesson: ({ lang, levelIndex, title }) => setActiveLesson({ lang, levelIndex, title }) },
    quests:    { onNavigate: navigate },
  }

  return (
    <GameProvider>
    <div className="min-h-screen bg-[#0F172A] dot-grid">
      {/* ── Fixed Header ── */}
      <Header
        onNavigate={navigate}
        onLogout={() => setShowLogout(true)}
        onSettings={() => navigate('other')}
      />

      {/* ── Desktop Sidebar ── */}
      <Sidebar active={navTab} onNavigate={navigate} />

      {/* ── GameContext → App Toast bridge ── */}
      <GameToastBridge showToast={showToast} />

      {/* ── Main Content ── */}
      <main className="pt-16 pb-20 lg:pb-6 lg:pl-56 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-5">

          {/*
           * SPA Router — renders the active screen component.
           * State is preserved: screens keep their local state while mounted
           * via CSS visibility trick, so only the active one is visible
           * while the rest stay mounted but hidden (preserves chat history, etc.)
           */}
          {Object.entries(ROUTES).map(([key, { Component }]) => (
            <div
              key={key}
              style={{ display: screen === key ? 'block' : 'none' }}
              aria-hidden={screen !== key}
            >
              <Component {...(screenProps[key] ?? {})} />
            </div>
          ))}

        </div>
      </main>

      {/* ── Mobile Bottom Nav ── */}
      <BottomNav active={navTab} onNavigate={navigate} />

      {/* ── Modals ── */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
      {showLogout && (
        <LogoutModal
          onClose={() => setShowLogout(false)}
          onConfirm={handleLogout}
        />
      )}
      {questModal && (
        <QuestStartModal
          quest={questModal}
          onClose={() => setQuestModal(null)}
          onNavigate={navigate}
        />
      )}

      {/* ── Lesson Modal (full-screen, above everything) ── */}
      {activeLesson && (
        <LessonScreen
          lang={activeLesson.lang}
          levelIndex={activeLesson.levelIndex}
          onClose={() => setActiveLesson(null)}
          onComplete={() => {
            setActiveLesson(null)
            showToast(`🏆 Lesson complete! Keep going!`)
          }}
        />
      )}

      {/* ── Toast ── */}
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}

      {/* ── Login Gate (full-screen overlay when logged out) ── */}
      {!isLoggedIn && (
        <LoginGate onOpen={() => setShowAuth(true)} />
      )}

      {/* ── Onboarding Wizard ── */}
      {showOnboarding && isLoggedIn && (
        <OnboardingScreen onDone={() => setShowOnboarding(false)} />
      )}

      {/* ── PWA Install Banner ── */}
      {showPwaBanner && (
        <PWAInstallBanner
          prompt={pwaPrompt}
          onInstall={handlePwaInstall}
          onDismiss={handlePwaDismiss}
        />
      )}
    </div>
    </GameProvider>
  )
}
