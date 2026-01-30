import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMessageForm } from '../useMessageForm';
import { notificationService } from '@/services/NotificationService';

// Mock NotificationService
vi.mock('@/services/NotificationService');

describe('useMessageForm', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should send a notification successfully', async () => {
    const emit = vi.fn();
    const { selectedCategory, messageBody, handleSubmit, successMessage, errorMessage } = useMessageForm(emit);

    selectedCategory.value = 'FINANCE';
    messageBody.value = 'Test message';

    const sendNotificationSpy = vi.spyOn(notificationService, 'sendNotification').mockResolvedValue(undefined);

    await handleSubmit();

    expect(sendNotificationSpy).toHaveBeenCalledWith({
      category: 'FINANCE',
      message: 'Test message',
    });
    expect(successMessage.value).toBe('Message sent successfully!');
    expect(messageBody.value).toBe('');
    expect(errorMessage.value).toBe('');
    expect(emit).toHaveBeenCalledWith('message-sent');
  });

  it('should show an error if message is empty', async () => {
    const emit = vi.fn();
    const { messageBody, handleSubmit, errorMessage } = useMessageForm(emit);

    messageBody.value = '';
    await handleSubmit();

    expect(errorMessage.value).toBe('Message body cannot be empty.');
    expect(notificationService.sendNotification).not.toHaveBeenCalled();
    expect(emit).not.toHaveBeenCalled();
  });

  it('should handle errors from NotificationService', async () => {
    const emit = vi.fn();
    const { messageBody, handleSubmit, errorMessage, successMessage } = useMessageForm(emit);

    messageBody.value = 'Another test';
    const errorMessage = 'Network Error';
    vi.spyOn(notificationService, 'sendNotification').mockRejectedValue(new Error(errorMessage));

    await handleSubmit();

    expect(errorMessage.value).toBe(errorMessage);
    expect(successMessage.value).toBe('');
    expect(emit).not.toHaveBeenCalled();
  });
});