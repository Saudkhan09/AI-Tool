import { useEffect, useState } from 'react'
import { checkHeading, cleanText } from '../helper'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { MdContentCopy } from "react-icons/md"

const Answer = ({ ans }) => {
  const [isHeading, setIsHeading] = useState(false)
  const [text, setText] = useState(ans)

  useEffect(() => {
    if (checkHeading(ans)) {
      setIsHeading(true)
      setText(cleanText(ans))
    } else {
      setIsHeading(false)
      setText(ans)
    }
  }, [ans])

  const copyCode = () => {
    navigator.clipboard.writeText(text)
    alert("Code copied! ✅")
  }

  return (
    <>
      {isHeading ? (
        <h3 className="pl-5 py-3 text-lg font-bold text-zinc-900 dark:text-white">
          {text}
        </h3>
      ) : (
        <div className="relative pl-8 py-1 text-zinc-700 dark:text-zinc-300">
          <ReactMarkdown
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <div className="relative">
                    <SyntaxHighlighter
                      style={dark}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                    <button
                      onClick={copyCode}
                      className="absolute top-2 right-2 bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 flex items-center text-sm text-white"
                    >
                      <MdContentCopy className="mr-1" /> Copy
                    </button>
                  </div>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {text}
          </ReactMarkdown>
        </div>
      )}
    </>
  )
}

export default Answer