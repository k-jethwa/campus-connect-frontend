import { useState } from 'react'
import { isValidEventInput } from './lib/eventValidation'
import './App.css'

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1))
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))

type Event = {
  id: number
  title: string
  date: string
  time: string
  location: string
}

function formatDate(value: string) {
  const [year, month, day] = value.split('-')
  if (!year || !month || !day) return value
  return `${month}/${day}/${year}`
}

function App() {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM')
  const [location, setLocation] = useState('')
  const [events, setEvents] = useState<Event[]>([])

  const canCreate = isValidEventInput({ title, date, hour, minute, location })

  const handleCreate = () => {
    if (!canCreate) return

    setEvents((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: title.trim(),
        date,
        time: `${hour}:${minute} ${period}`,
        location: location.trim(),
      },
    ])

    setTitle('')
    setDate('')
    setHour('')
    setMinute('')
    setPeriod('AM')
    setLocation('')
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Campus Connect</h1>
        <p className="subtitle">Create an event</p>
      </header>

      <main className="card">
        <div className="field">
          <label htmlFor="title">Event title</label>
          <input
            id="title"
            type="text"
            placeholder="e.g. Fall Hackathon Kickoff"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="hour">Time</label>
          <div className="time-row">
            <select
              id="hour"
              aria-label="Hour"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
            >
              <option value="" disabled>
                HH
              </option>
              {HOURS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
            <span className="time-sep">:</span>
            <select
              aria-label="Minute"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
            >
              <option value="" disabled>
                MM
              </option>
              {MINUTES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <div className="period-toggle">
              <button
                type="button"
                className={period === 'AM' ? 'active' : ''}
                onClick={() => setPeriod('AM')}
              >
                AM
              </button>
              <button
                type="button"
                className={period === 'PM' ? 'active' : ''}
                onClick={() => setPeriod('PM')}
              >
                PM
              </button>
            </div>
          </div>
        </div>

        <div className="field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            placeholder="e.g. Benson Center, Room 201"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="create-btn"
          disabled={!canCreate}
          onClick={handleCreate}
        >
          Create event
        </button>
      </main>

      <section className="events">
        <h2 className="events-heading">Events</h2>
        {events.length === 0 ? (
          <p className="events-empty">No events yet.</p>
        ) : (
          <ul className="events-list">
            {events.map((event) => (
              <li key={event.id} className="event-item">
                <div className="event-title">{event.title}</div>
                <div className="event-meta">
                  {formatDate(event.date)} &middot; {event.time} &middot; {event.location}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default App
