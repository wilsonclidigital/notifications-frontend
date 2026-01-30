import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import LogHistory from '../LogHistory.vue';
import { useLogHistory } from '@/composables/useLogHistory';

// Mock the composable
vi.mock('@/composables/useLogHistory');

describe('LogHistory.vue', () => {
  it('renders loading state', () => {
    vi.mocked(useLogHistory).mockReturnValue({
      logs: ref([]),
      isLoading: ref(true),
      error: ref(''),
      fetchLogs: vi.fn(),
    });

    const wrapper = mount(LogHistory);
    expect(wrapper.find('.loading').exists()).toBe(true);
    expect(wrapper.text()).toContain('Loading logs...');
  });

  it('renders error state', () => {
    vi.mocked(useLogHistory).mockReturnValue({
      logs: ref([]),
      isLoading: ref(false),
      error: ref('Failed to load'),
      fetchLogs: vi.fn(),
    });

    const wrapper = mount(LogHistory);
    expect(wrapper.find('.error').exists()).toBe(true);
    expect(wrapper.text()).toContain('Failed to load');
  });

  it('renders logs table when data is present', () => {
    const mockLogs = [
      { 
        id: 1, 
        category: 'SPORTS', 
        messageContent: 'Goal!', 
        userName: 'user1', 
        channel: 'SMS', 
        timestamp: new Date().toISOString() 
      }
    ];

    vi.mocked(useLogHistory).mockReturnValue({
      logs: ref(mockLogs) as any,
      isLoading: ref(false),
      error: ref(''),
      fetchLogs: vi.fn(),
    });

    const wrapper = mount(LogHistory);
    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.text()).toContain('Goal!');
    expect(wrapper.text()).toContain('SPORTS');
  });
});