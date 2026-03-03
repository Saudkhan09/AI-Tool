import { useEffect, useRef, useState } from 'react'
import './App.css'
import { URL } from './constants'
import RecentSearch from './components/RecentSearch'
import QuestionAnswer from './components/QuestionAnswer'

function App() {
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState([])
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem('history')) || []
  )
  const [selectedHistory, setSelectedHistory] = useState('')
  const [loader, setLoader] = useState(false)
  const [theme, setTheme] = useState('dark')

  const scrollToAns = useRef()

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])
  console.log("ENV KEY:", import.meta.env.VITE_GEMINI_KEY);

  const handleAsk = async () => {
    if (!question && !selectedHistory) return
    if (loader) return

    const payloadData = question || selectedHistory

    if (question) {
      let history = JSON.parse(localStorage.getItem('history')) || []
      history = history.slice(0, 19)
      history = [question, ...history]
      history = history.map(
        (item) => item.charAt(0).toUpperCase() + item.slice(1).trim()
      ) // Trim whitespace
      history = [...new Set(history)] // Remove duplicates
      localStorage.setItem('history', JSON.stringify(history))
      setRecentHistory(history)
    }

    const payload = {
      contents: [{ parts: [{ text: payloadData }] }]
    }

    setLoader(true)

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''

      setResult((prev) => [
        ...prev,
        { type: 'q', text: payloadData },
        { type: 'a', text }
      ])

      setQuestion('')
      setSelectedHistory('')

      setTimeout(() => {
        scrollToAns.current?.scrollTo({
          top: scrollToAns.current.scrollHeight,
          behavior: 'smooth'
        })
      }, 300)
    } catch (err) {
      console.log(err)
    } finally {
      setLoader(false)
    }
  }

  const handledelete = () => {
    localStorage.removeItem('history')
    setRecentHistory([])
  }

  const IsEnter = (e) => {
    if (e.key === 'Enter') handleAsk()
  }

  useEffect(() => {
    if (selectedHistory) handleAsk()
  }, [selectedHistory])

  return (
    <div className="grid grid-cols-5 h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
      {/* THEME TOGGLE */}
      <select
  value={theme}
  onChange={(e) => setTheme(e.target.value)}
  className="fixed bottom-4 left-4 bg-zinc-200 dark:bg-zinc-800 px-3 py-1 rounded z-50"
>
  <option value="dark">Dark</option>
  <option value="light">Light</option>
</select>

      <RecentSearch
        recentHistory={recentHistory}
        setSelectedHistory={setSelectedHistory}
        handledelete={handledelete}
      />

      <div className="col-span-4 flex flex-col h-screen">
        <h1 className="text-4xl text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700 pt-4">
          Hello User, Ask me Anything
        </h1>

        {loader && (
          <div className="flex justify-center my-4">
            <div className="bg-zinc-300 dark:bg-zinc-800 px-6 py-2 rounded-full">
              Thinking...
            </div>
          </div>
        )}

        <div ref={scrollToAns} className="flex-1 overflow-auto p-4 pb-24">
          <ul>
            {result.map((item, index) => (
              <QuestionAnswer
                key={index}
                item={item}
                onDelete={() =>
                  setResult((prev) => prev.filter((_, i) => i !== index))
                }
              />
            ))}
          </ul>
        </div>

        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-zinc-200 dark:bg-zinc-800 w-1/2 p-1 pr-5 rounded-full border flex h-16">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={IsEnter}
            className="w-full bg-transparent p-3 outline-none "
            placeholder="Ask Me"
          />
          <button onClick={handleAsk} className="px-4">
            Ask
          </button>
        </div>
      </div>
    </div>
  )
}

export default App