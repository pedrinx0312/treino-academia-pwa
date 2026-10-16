import { useState, useEffect } from 'react'
import './App.css'

const workouts = {
  segunda: {
    title: 'Peito',
    subtitle: '15 séries • Força + Volume',
    color: '#3b82f6',
    exercises: [
      {
        name: 'Supino Reto Barra',
        sets: '4x',
        details: '30kg x10 / 36kg x8 / 40kg x6-8 / 32kg x10',
        rest: '90s',
        notes: 'Progressão: quando fizer 40kg x8, sobe pra 42kg'
      },
      {
        name: 'Supino Inclinado Halter',
        sets: '4x',
        details: '16kg x10 / 18kg x6-8 / 14kg x10 / 14kg x10',
        rest: '75s',
        notes: 'Progressão: 18kg x10 → sobe pra 20kg'
      },
      {
        name: 'Crucifixo Inclinado Halter',
        sets: '3x 12-15',
        details: '10-12kg',
        rest: '60s'
      },
      {
        name: 'Peck Deck ou Crossover',
        sets: '2x 12-15',
        details: '',
        rest: '60s'
      },
      {
        name: 'Flexão',
        sets: '2x até falhar',
        details: '',
        rest: '60s'
      }
    ]
  },
  terca: {
    title: 'Perna',
    subtitle: 'Força e Hipertrofia',
    color: '#60a5fa',
    exercises: [
      {
        name: 'Agachamento Livre',
        sets: '4x 8-10',
        details: '',
        rest: '90-120s'
      },
      {
        name: 'Cadeira Extensora',
        sets: '3x 12-15',
        details: '',
        rest: '60s'
      },
      {
        name: 'Cadeira Flexora',
        sets: '3x 12-15',
        details: '',
        rest: '60s'
      },
      {
        name: 'Stiff / RDL',
        sets: '3x 10-12',
        details: 'No lugar de adutora/abdutora',
        rest: '75s'
      },
      {
        name: 'Panturrilha em Pé',
        sets: '4x 15-20',
        details: '',
        rest: '45s'
      }
    ]
  },
  quarta: {
    title: 'Costas 1',
    subtitle: 'Pesado',
    color: '#2563eb',
    exercises: [
      {
        name: 'Puxada Frente Aberta',
        sets: '4x 8-10',
        details: '',
        rest: '90s'
      },
      {
        name: 'Remada Baixa Triângulo',
        sets: '4x 10-12',
        details: '',
        rest: '75s'
      },
      {
        name: 'Remada Curvada Barra',
        sets: '3x 8-10',
        details: '',
        rest: '90s'
      },
      {
        name: 'Rosca Direta',
        sets: '3x 10-12',
        details: 'Opcional',
        rest: '60s'
      }
    ]
  },
  quinta: {
    title: 'OFF TOTAL',
    subtitle: 'Descanso completo',
    color: '#93c5fd',
    exercises: [
      {
        name: 'Descanso Ativo (opcional)',
        sets: '',
        details: 'Se tiver muita energia: ombro lateral + desenvolvimento. O ideal é descansar para recuperar peito e costas.',
        rest: ''
      }
    ]
  },
  sexta: {
    title: 'Costas 2 + Abdômen',
    subtitle: 'Variação + Core',
    color: '#1d4ed8',
    exercises: [
      {
        name: 'Puxada Neutra Fechada Triângulo',
        sets: '4x 10-12',
        details: '',
        rest: '75s'
      },
      {
        name: 'Remada Unilateral Halter',
        sets: '3x 10 cada lado',
        details: '',
        rest: '60s'
      },
      {
        name: 'Pullover ou Peck Deck Invertido',
        sets: '3x 12-15',
        details: '',
        rest: '60s'
      },
      {
        name: 'Crunch Curtinho',
        sets: '3x 20',
        details: 'Abdômen',
        rest: '45s'
      },
      {
        name: 'Crunch na Polia com Corda (ajoelhado)',
        sets: '3x 15',
        details: 'Abdômen',
        rest: '45s'
      },
      {
        name: 'Prancha',
        sets: '3x 45s',
        details: 'Abdômen',
        rest: '45s'
      }
    ]
  }
}

const days = [
  { id: 'segunda', label: 'Seg', full: 'Segunda' },
  { id: 'terca', label: 'Ter', full: 'Terça' },
  { id: 'quarta', label: 'Qua', full: 'Quarta' },
  { id: 'quinta', label: 'Qui', full: 'Quinta' },
  { id: 'sexta', label: 'Sex', full: 'Sexta' }
]

function App() {
  const [activeDay, setActiveDay] = useState('segunda')
  const [completed, setCompleted] = useState({})
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('treino-completed')
    if (saved) {
      try {
        setCompleted(JSON.parse(saved))
      } catch (e) {}
    }

    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstall(true)
    }
    window.addEventListener('beforeinstallprompt', handler)

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const toggleExercise = (dayId, index) => {
    const key = `${dayId}-${index}`
    const next = { ...completed, [key]: !completed[key] }
    setCompleted(next)
    localStorage.setItem('treino-completed', JSON.stringify(next))
  }

  const installPWA = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setShowInstall(false)
    }
    setDeferredPrompt(null)
  }

  const workout = workouts[activeDay]
  const isOff = activeDay === 'quinta'
  const today = new Date().getDay()
  const dayMap = { 1: 'segunda', 2: 'terca', 3: 'quarta', 4: 'quinta', 5: 'sexta' }
  const isToday = dayMap[today] === activeDay

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <div className="logo-icon">
            <svg viewBox="0 0 48 48" fill="none">
              <rect x="4" y="18" width="40" height="12" rx="3" fill="#60a5fa"/>
              <rect x="10" y="10" width="8" height="28" rx="2" fill="#93c5fd"/>
              <rect x="30" y="10" width="8" height="28" rx="2" fill="#93c5fd"/>
              <circle cx="14" cy="24" r="3" fill="#0a1628"/>
              <circle cx="34" cy="24" r="3" fill="#0a1628"/>
            </svg>
          </div>
          <div>
            <h1>Treino Academia</h1>
            <p>5 dias • Força + Volume</p>
          </div>
        </div>
        {showInstall && (
          <button className="install-btn" onClick={installPWA}>
            Instalar App
          </button>
        )}
      </header>

      <nav className="days">
        {days.map(day => (
          <button
            key={day.id}
            className={`day-btn ${activeDay === day.id ? 'active' : ''} ${dayMap[today] === day.id ? 'today' : ''}`}
            onClick={() => setActiveDay(day.id)}
          >
            <span className="day-label">{day.label}</span>
            <span className="day-full">{day.full}</span>
          </button>
        ))}
      </nav>

      <main className="content">
        <div className="workout-header" style={{ borderColor: workout.color }}>
          <div>
            <h2>{workout.title}</h2>
            <p>{workout.subtitle}</p>
          </div>
          {isToday && <span className="badge-today">HOJE</span>}
        </div>

        {isOff ? (
          <div className="off-card">
            <div className="off-icon">😴</div>
            <h3>Dia de Descanso</h3>
            <p>{workout.exercises[0].details}</p>
            <div className="off-tip">
              <strong>Dica:</strong> Use esse dia para recuperação. Sono e alimentação bons fazem a diferença no próximo treino.
            </div>
          </div>
        ) : (
          <div className="exercises">
            {workout.exercises.map((ex, i) => {
              const key = `${activeDay}-${i}`
              const done = completed[key]
              return (
                <div
                  key={i}
                  className={`exercise-card ${done ? 'done' : ''}`}
                  onClick={() => toggleExercise(activeDay, i)}
                >
                  <div className="ex-check">
                    <div className={`checkbox ${done ? 'checked' : ''}`}>
                      {done && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="ex-info">
                    <div className="ex-name">{ex.name}</div>
                    <div className="ex-sets">{ex.sets}</div>
                    {ex.details && <div className="ex-details">{ex.details}</div>}
                    {ex.rest && <div className="ex-rest">Descanso: {ex.rest}</div>}
                    {ex.notes && <div className="ex-notes">{ex.notes}</div>}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <section className="progress-section">
          <h3>📈 Como Progredir</h3>
          <ul>
            <li><strong>Peito:</strong> Quando fizer 40kg x8 no reto e 18kg x10 no inclinado → sobe para 42kg e 20kg.</li>
            <li><strong>Regra geral:</strong> Quando fizer o máximo de reps com facilidade, aumenta 2kg na próxima semana.</li>
            <li>Sábado e Domingo são OFF completos.</li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <p>Toque no exercício para marcar como feito • Dados salvos no celular</p>
      </footer>
    </div>
  )
}

export default App
