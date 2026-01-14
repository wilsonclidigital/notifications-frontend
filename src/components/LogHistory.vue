<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { notificationService } from '@/services/NotificationService';
import type { LogRecord } from '@/types';

const logs = ref<LogRecord[]>([]);
const isLoading = ref(false);
const error = ref('');

const fetchLogs = async () => {
  isLoading.value = true;
  error.value = '';
  try {
    logs.value = await notificationService.getLogHistory();
  } catch (err) {
    error.value = 'Failed to load history.';
  } finally {
    isLoading.value = false;
  }
};

// Initial fetch
onMounted(() => {
  fetchLogs();
});

// Expose fetchLogs to parent
defineExpose({ fetchLogs });
</script>

<template>
  <div class="history-container">
    <div class="header">
      <h2>Log History</h2>
      <button @click="fetchLogs" class="btn-refresh" title="Refresh Logs">↻</button>
    </div>

    <div v-if="isLoading" class="loading">Loading logs...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    
    <div v-else class="table-wrapper">
      <table class="log-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Type</th>
            <th>User</th>
            <th>Category</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in logs" :key="log.id">
            <td>{{ new Date(log.timestamp).toLocaleString() }}</td>
            <td><span class="badge">{{ log.channel }}</span></td>
            <td>{{ log.userName }}</td>
            <td>{{ log.category }}</td>
            <td class="message-cell" :title="log.messageContent">{{ log.messageContent }}</td>
          </tr>
          <tr v-if="logs.length === 0">
            <td colspan="5" class="empty-state">No logs found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.history-container {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.btn-refresh {
  background: none;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-size: 1.2rem;
}

.table-wrapper {
  overflow-x: auto;
}

.log-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.log-table th, .log-table td {
  text-align: left;
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
}

.log-table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.badge {
  background-color: #e2e6ea;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.message-cell {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.empty-state {
  text-align: center;
  color: #888;
  padding: 2rem;
}
</style>
