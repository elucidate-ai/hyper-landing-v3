import { createContext, useContext } from 'react'
import type { SiteContent } from './content-types'
import { defaultContent } from './content'

const ContentContext = createContext<SiteContent>(defaultContent)

export function ContentProvider({
  content,
  children,
}: {
  content: SiteContent
  children: React.ReactNode
}) {
  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent(): SiteContent {
  return useContext(ContentContext)
}
