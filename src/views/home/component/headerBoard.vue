<script setup lang="ts">
import { useHome } from '@/use/useHome'
const { formattedDateTime } = useHome()
</script>
<template>
  <div class="header">
    <div class="title">科维智能电控可视化</div>
    <div class="time">{{ formattedDateTime }}</div>
  </div>
</template>
