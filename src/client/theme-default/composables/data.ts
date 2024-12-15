import { useData as useData$ } from 'vitepress-cdn'
import type { DefaultTheme } from 'vitepress-cdn/theme'

export const useData: typeof useData$<DefaultTheme.Config> = useData$
