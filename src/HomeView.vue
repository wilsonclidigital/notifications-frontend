<template>
  <main>
    <MessageForm @notification-sent="handleNotificationSent" />
    <hr />
    <LogHistory ref="logHistory" />
  </main>
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