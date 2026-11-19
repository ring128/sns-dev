import { useEffect, useState } from 'react'
import './App.css'

type Topic = {
  id: number
  title: string
  body: string
}

function renderTopic(topic: Topic) {
  return (
    <li key={topic.id}>
      <h2>{topic.title}</h2>
      <p>{topic.body}</p>
    </li>
  )
} // Render one topic

function App() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadTopics() {
      try {
        const response = await fetch('/api/topics')
        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        const data = (await response.json()) as Topic[]
        if (!ignore) setTopics(data)
      } catch {
        if (!ignore) setError('議題を読み込めませんでした')
      }
    } // Load topics from the API

    loadTopics()

    return () => {
      ignore = true
    } // Ignore a response after this effect ends
  }, []) // Load topics when the page opens

  return (
    <main>
      <h1>議題一覧</h1>
      {error && <p role="alert">{error}</p>}
      <ul>{topics.map(renderTopic)}</ul>
    </main>
  )
} // Render the topics page

export default App