<script setup lang="ts">
import type { DefaultTheme } from 'vitepress'
import type { PjtsThemeConfig } from '../config'
import { useData, withBase } from 'vitepress'
import { computed } from 'vue'

const { theme, isDark } = useData<PjtsThemeConfig>()

// Prefix site base for relative paths. Absolute URLs pass through.
function resolveUrl(u?: string) {
  if (!u) return u
  if (/^(https?:)?\/\//i.test(u) || u.startsWith('data:')) return u
  return withBase(u)
}

function pickLogo(logo: DefaultTheme.ThemeableImage | undefined, dark: boolean): string | undefined {
  if (!logo) return undefined
  if (typeof logo === 'string') return logo
  if ('src' in logo && logo.src) return logo.src
  if ('light' in logo || 'dark' in logo) return dark ? logo.dark : logo.light
  return undefined
}

const linkUrl = computed(() => theme.value.suggestionBoxLinkUrl)
const logoUrl = computed(() => resolveUrl(pickLogo(theme.value.logo, isDark.value)))
</script>

<template>
  <a
    v-if="linkUrl"
    class="sbox-banner"
    :href="linkUrl"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img v-if="logoUrl" class="sbox-logo" :src="logoUrl" alt="">
    <span class="sbox-text">
      这个页面有什么问题？或者有什么建议？<span class="sbox-text-link">请点击此处反馈</span>，我们会尽快回复和处理。
    </span>
  </a>
</template>

<style scoped>
.sbox-banner {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 14px 18px;
  border-radius: 8px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: background-color 0.2s;
}

.sbox-banner:hover {
  background: color-mix(in srgb, var(--vp-c-brand-soft) 70%, var(--vp-c-brand-1) 12%);
}

.sbox-logo {
  flex: 0 0 auto;
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.sbox-text {
  flex: 1;
  font-size: 14px;
  line-height: 1.6;
}

.sbox-text-link {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
