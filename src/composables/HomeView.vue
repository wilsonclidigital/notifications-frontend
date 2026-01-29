<template>
  <div class="content-grid">
    <section class="left-panel">
      <MessageForm @message-sent="handleNotificationSent" />
    </section>
    
    <section class="right-panel">
      <LogHistory ref="logHistory" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MessageForm from '@/components/MessageForm.vue';
import LogHistory from '@/components/LogHistory.vue';

const logHistory = ref<InstanceType<typeof LogHistory> | null>(null);

const handleNotificationSent = () => {
  logHistory.value?.fetchLogs();
};
</script>