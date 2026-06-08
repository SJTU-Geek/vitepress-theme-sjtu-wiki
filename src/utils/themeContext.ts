import type { DefaultTheme } from 'vitepress'
import type { VitePressSidebarOptions } from 'vitepress-sidebar/types'
import { AsyncLocalStorage } from 'node:async_hooks'

type NavConfig = DefaultTheme.NavItem[]

export interface DisclaimerPathConfig {
  path: string // The path prefix to match
  summaryHtml: string // HTML content for the summary view
  detailHtml?: string // Optional HTML content for the detailed view
}

// 支持 vitepress 官方 i18n
export interface LocalesConfig {
  label: string
  lang: string
  link?: string
}

export type HeadConfig =
  | [string, Record<string, string>]
  | [string, Record<string, string>, string]

export interface ThemeContext {
  siteTitle: string
  siteLogo: string
  SiteTitle?: string
  baseUrl?: string
  siteDescription: string
  githubRepoLink: string
  rootDir: string
  include: string[]
  nav: NavConfig
  sidebarOptions: VitePressSidebarOptions[]
  enableSuggestionBox?: boolean
  suggestionBoxImageUrl?: string
  suggestionBoxLinkUrl?: string
  suggestionBoxImageAlt?: string
  enableChangeLog?: boolean
  enableFontSwitcher?: boolean
  sitePattern?: string
  org?: string
  HideReadingTime?: boolean
  HideLastUpdated?: boolean
  HideAuthors?: boolean
  hostName: string
  fontsBaseUrl?: string
  enableDisclaimer?: boolean
  disclaimerPaths?: DisclaimerPathConfig[]
  disclaimerStatusKey?: string
  disclaimerStatusExpiration?: number
  locales?: { [key: string]: LocalesConfig } // i18n
  additionalHead?: HeadConfig[] // Additional head elements
  // 每页顶部的提示横幅（红底警示）。空/未设则不渲染。支持内联 HTML（链接、emoji 等）。
  topBannerHtml?: string
  // VitePress 原生 themeConfig 字段透传：在 theme 生成的 themeConfig 之上做浅合并，
  // 用户值优先，可以覆盖 theme 内置的 search / returnToTopLabel / notFound 等。
  extraThemeConfig?: Partial<DefaultTheme.Config>
}

const themeContext = new AsyncLocalStorage<ThemeContext>()

export function withThemeContext<T>(context: ThemeContext, fn: () => T): T {
  return themeContext.run(context, fn)
}

export function useThemeContext(): ThemeContext {
  return themeContext.getStore()!
}
