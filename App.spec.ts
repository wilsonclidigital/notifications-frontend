import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import App from '../App.vue';
import { notificationService } from '@/services/NotificationService';
import type { NotificationLog } from '@/types';

vi.mock('@/services/NotificationService');

const initialLogs: NotificationLog[] = [
  { id: 1, category: 'SPORTS', messageContent: 'Initial log', userName: 'test', channel: 'SMS', timestamp: '2023-01-01T12:00:00Z' }
];

const newLog: NotificationLog = {
  id: 2, category: 'FINANCE', messageContent: 'New stocks report', userName: 'test', channel: 'E-Mail', timestamp: '2023-01-01T12:05:00Z'
};

describe('App Integration', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(notificationService, 'getLogHistory').mockResolvedValue(initialLogs);
    vi.spyOn(notificationService, 'sendNotification').mockResolvedValue(undefined);
  });

  it('submitting the form updates the log history', async () => {
    const wrapper = mount(App);

    // Wait for initial logs to be fetched by LogHistory's onMounted hook
    await nextTick();
    await nextTick();

    expect(wrapper.html()).toContain('Initial log');
    expect(notificationService.getLogHistory).toHaveBeenCalledTimes(1);

    // Simulate form input and submission
    await wrapper.find('select#category').setValue('FINANCE');
    await wrapper.find('textarea#message').setValue('New stocks report');

    // After submission, getLogHistory will be called again.
    // Mock it to return the new list of logs.
    vi.spyOn(notificationService, 'getLogHistory').mockResolvedValue([...initialLogs, newLog]);

    await wrapper.find('form').trigger('submit.prevent');

    // Wait for sendNotification and subsequent fetchLogs to complete
    await nextTick();
    await nextTick();

    // Check that sendNotification was called
    expect(notificationService.sendNotification).toHaveBeenCalledWith({
      category: 'FINANCE',
      message: 'New stocks report'
    });

    // Check that logs were refetched
    expect(notificationService.getLogHistory).toHaveBeenCalledTimes(2);

    // Check that the new log is displayed
    expect(wrapper.html()).toContain('New stocks report');
    expect(wrapper.findAll('tbody tr').length).toBe(2);
  });
});