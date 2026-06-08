<script lang="ts" setup>
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import {
  NolebaseHighlightTargetedHeading,
} from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import AppearanceToggle from './components/AppearanceToggle.vue'
import AppFooter from './components/AppFooter.vue'
import CopyrightInfo from './components/CopyrightInfo.vue'
import FontSwitcher from './components/FontSwitcher/FontSwitcher.vue'
import PageInfo from './components/PageInfo.vue'

const { Layout } = DefaultTheme
const { frontmatter, theme } = useData()
</script>

<template>
  <AppearanceToggle>
    <Layout>
      <template #doc-before>
        <div
          v-if="theme.topBannerHtml"
          class="sjtuwiki-top-banner"
          role="alert"
          v-html="theme.topBannerHtml"
        />
        <div class="vp-doc">
          <h1>{{ frontmatter.title }}</h1>
          <PageInfo />
          <CopyrightInfo />
        </div>
        <NolebaseHighlightTargetedHeading />
      </template>
      <template #doc-after>
        <AppFooter />
      </template>
      <template #nav-bar-content-after>
        <NolebaseEnhancedReadabilitiesMenu />
        <FontSwitcher v-if="theme.enableFontSwitcher !== false" />
      </template>
      <template #nav-screen-content-after>
        <NolebaseEnhancedReadabilitiesScreenMenu />
      </template>
    </Layout>
  </AppearanceToggle>
</template>

<style>
:root {
  --vp-font-family-base: sans-serif;
  --vp-font-family-mono: monospace;
}

.sjtuwiki-top-banner {
  margin-bottom: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  background: var(--vp-c-danger-soft, rgb(217 52 63 / 14%));
  border-left: 4px solid var(--vp-c-danger-3, #d9343f);
  color: var(--vp-c-text-1);
  font-size: 14px;
  line-height: 1.6;
}

.sjtuwiki-top-banner a {
  color: var(--vp-c-danger-1, #b1252e);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.sjtuwiki-top-banner a:hover {
  opacity: 0.85;
}
</style>
