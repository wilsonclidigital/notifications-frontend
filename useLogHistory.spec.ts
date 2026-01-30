import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nextTick } from 'vue';
import { useLogHistory } from '../useLogHistory';
import { notificationService } from '@/services/NotificationService';
import type { NotificationLog } from '@/types';

vi.mock('@/services/NotificationService');

const mockLogs: NotificationLog[] = [
  { id: 1, category: 'Sports', message: 'Goal!', userName: 'user1', channel: 'SMS', timestamp: new Date().toISOString() },
  { id: 2, category: 'Finance', message: 'Stock up', userName: 'user2', channel: 'Email', timestamp: new Date().toISOString() },
];

describe('useLogHistory', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch logs on mount', async () => {
    vi.spyOn(notificationService, 'getLogHistory').mockResolvedValue(mockLogs);
    
    const { logs, isLoading } = useLogHistory();
    
    expect(isLoading.value).toBe(true);
    
    // onMounted is async, so we wait for the next tick
    await nextTick(); // for onMounted
    await nextTick(); // for promise to resolve

    expect(notificationService.getLogHistory).toHaveBeenCalledTimes(1);
    expect(logs.value).toEqual(mockLogs);
    expect(isLoading.value).toBe(false);
  });

  it('should handle errors when fetching logs', async () => {
    vi.spyOn(notificationService, 'getLogHistory').mockRejectedValue(new Error('Fetch failed'));
    
    const { logs, error, isLoading } = useLogHistory();
    
    expect(isLoading.value).toBe(true);
    
    await nextTick();
    await nextTick();

    expect(error.value).toBe('Failed to load history.');
    expect(logs.value).toEqual([]);
    expect(isLoading.value).toBe(false);
  });

  it('should refetch logs when fetchLogs is called', async () => {
    const getLogsSpy = vi.spyOn(notificationService, 'getLogHistory').mockResolvedValue(mockLogs);
    const { fetchLogs, logs } = useLogHistory();

    await nextTick();
    await nextTick();
    expect(getLogsSpy).toHaveBeenCalledTimes(1);

    const newLogs = [...mockLogs, { id: 3, category: 'Movies', message: 'New movie out', userName: 'user3', channel: 'Push', timestamp: new Date().toISOString() }];
    getLogsSpy.mockResolvedValue(newLogs);

    await fetchLogs();

    expect(getLogsSpy).toHaveBeenCalledTimes(2);
    expect(logs.value).toEqual(newLogs);
  });
});