"use client"

import { createContext, useContext, useState, useEffect } from "react"

const ContentContext = createContext<any>(null)

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<any>({})
  const [shas, setShas] = useState<any>({})

  async function loadAll() {
    const files = ["home", "about", "services", "projects", "contact"]
    const newData: any = {}
    const newShas: any = {}

    for (const file of files) {
      const res = await fetch(`/api/github/content?file=${file}`)
      const json = await res.json()

      newData[file] = json.content || {}
      newShas[file] = json.sha || null
    }

    setContent(newData)
    setShas(newShas)
  }

  async function updateFile(file: string, updated: any) {
    const res = await fetch(`/api/github/content?file=${file}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        file,
        content: updated,
        sha: shas[file]
      })
    })

    if (res.ok) {
      await loadAll()
    }
  }

  useEffect(() => {
    loadAll()
  }, [])

  return (
    <ContentContext.Provider value={{ content, updateFile }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}
