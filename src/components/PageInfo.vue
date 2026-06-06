<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, onMounted, ref, watchEffect } from 'vue'
import ReadingTime from './ReadingTime.vue' // 导入 ReadingTime 组件

// 从 VitePress 获取页面数据
const { frontmatter, page, theme, lang } = useData()

// 计算页面的最后更新时间
const date = computed(
  () => new Date(frontmatter.value.lastUpdated ?? page.value.lastUpdated),
)

// 计算 ISO 格式的日期时间字符串
const isoDatetime = computed(() => date.value.toISOString())

// 定义一个响应式变量来存储格式化后的日期时间字符串
const datetime = ref('')

// 避免 hydration 错误，在组件挂载后执行
onMounted(() => {
  watchEffect(() => {
    // 使用国际化 API 格式化日期时间
    datetime.value = new Intl.DateTimeFormat(
      theme.value.lastUpdated?.formatOptions?.forceLocale ? lang.value : undefined,
      theme.value.lastUpdated?.formatOptions ?? {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    ).format(date.value)
  })
})

// 计算页面的作者信息
const authors = computed(() => {
  let author = (frontmatter.value?.author ?? []) as string[]
  if (!Array.isArray(author))
    author = [author]
  return author
})

const MAX_DISPLAY_AUTHORS = 3

// 显示前 N 个作者，超过则在尾部加「等」
const displayAuthors = computed(() => {
  const list = authors.value
  if (list.length === 0) return '匿名'
  if (list.length <= MAX_DISPLAY_AUTHORS) return list.join(', ')
  return `${list.slice(0, MAX_DISPLAY_AUTHORS).join(', ')} 等`
})

// 悬浮提示用的完整作者列表（超过显示上限时才提供）
const allAuthorsTooltip = computed(() =>
  authors.value.length > MAX_DISPLAY_AUTHORS ? authors.value.join(', ') : undefined,
)
</script>

<template>
  <div class="mb-10 mt-4 flex flex-wrap gap-4">
    <div
      v-if="!theme.HideAuthors"
      class="inline-flex items-center gap-1"
    >
      <span class="i-octicon:person" />
      <span>作者:</span>
      <span :title="allAuthorsTooltip" :class="{ 'authors-truncated': allAuthorsTooltip }">{{ displayAuthors }}</span>
    </div>

    <div v-if="!theme.HideLastUpdated" class="inline-flex items-center gap-1">
      <span class="i-octicon:calendar-16" />
      <span>{{ theme.lastUpdated?.text || 'Last updated' }}:</span>
      <time :datetime="isoDatetime">{{ datetime }}</time>
    </div>
    <ClientOnly>
      <ReadingTime v-if="!theme.HideReadingTime" /> <!-- 添加 ReadingTime 组件 -->
    </ClientOnly>
  </div>
</template>

<style scoped>
/* 截断时给个虚线下划线提示「可悬浮看完整列表」 */
.authors-truncated {
  text-decoration: underline dotted;
  text-underline-offset: 6px;
  cursor: help;
}
</style>
