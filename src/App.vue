<script setup lang="ts">
import { ref } from 'vue';
import MessageForm from './components/MessageForm.vue';
import LogHistory from './components/LogHistory.vue';

// Reference to the LogHistory component instance
const logHistoryRef = ref<InstanceType<typeof LogHistory> | null>(null);

const refreshHistory = () => {
  logHistoryRef.value?.fetchLogs();
};
</script>

<template>
  <main class="app-container">
    <header class="app-header">
      <h1>Notification System</h1>
    </header>
    
    <div class="content-grid">
      <section class="left-panel">
        <MessageForm @message-sent="refreshHistory" />
      </section>
      
      <section class="right-panel">
        <LogHistory ref="logHistoryRef" />
      </section>
    </div>
  </main>
</template>

<style>
/* Global Reset */
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f6f8;
  color: #333;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.app-header {
  margin-bottom: 2rem;
  text-align: center;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr 2fr; /* Form takes 1/3, Logs take 2/3 */
  }
}
</style>
