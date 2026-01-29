import { ref, onMounted } from 'vue';
import { notificationService } from '@/services/NotificationService';
import type { LogRecord } from '@/types';

export function useLogHistory() {
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
  onMounted(fetchLogs);

  return {
    logs,
    isLoading,
    error,
    fetchLogs,
  };
}