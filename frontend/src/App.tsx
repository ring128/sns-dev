import { useEffect, useState, type SubmitEvent } from 'react'
import './App.css'

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '')
const apiAvailable = import.meta.env.DEV || Boolean(apiBaseUrl)
const topicsApiUrl = `${apiBaseUrl}/api/topics`

type Topic = {
  id: number
  title: string
}

function renderTopic(topic: Topic) {
  return (
    <li key={topic.id}>
      <h2>{topic.title}</h2>
    </li>
  )
} // Render one topic

function App() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [error, setError] = useState(apiAvailable ? '' : '投稿APIの公開先が未設定です')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!apiAvailable) return

    let ignore = false

    async function loadTopics() {
      try {
        const response = await fetch(topicsApiUrl)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        const data = (await response.json()) as Topic[]
        if (!ignore) setTopics(data)
      } catch {
        if (!ignore) setError('議題を読み込めませんでした')
      }
    } // Load topics from the API

    void loadTopics()

    return () => {
      ignore = true
    } // Ignore a response after this effect ends
  }, []) // Load topics when the page opens

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!apiAvailable) return

    const form = event.currentTarget
    const formData = new FormData(form)
    const title = String(formData.get('title') ?? '').trim()

    if (!title) {
      setError('題名を入力してください')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const response = await fetch(topicsApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      const createdTopic = (await response.json()) as Topic
      setTopics((currentTopics) => [...currentTopics, createdTopic])
      form.reset()
    } catch {
      setError('議題を投稿できませんでした')
    } finally {
      setSubmitting(false)
    }
  } // Submit a new topic

  return (
    <main>
      <h1>議題一覧</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="topic-title">題名</label>
        <input id="topic-title" name="title" required />

        <button type="submit" disabled={submitting || !apiAvailable}>
          {submitting ? '投稿中…' : '投稿'}
        </button>
      </form>

      {error && <p role="alert">{error}</p>}
      <ul>{topics.map(renderTopic)}</ul>
    </main>
  )
} // Render the topics page

export default App
