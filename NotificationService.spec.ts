import { describe, it, expect, vi, afterEach } from 'vitest';
import axios from 'axios';
import { notificationService } from '../NotificationService';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('NotificationService', () => {
  // Mock the apiClient instance created in the service constructor
  const mockApiClient = {
    post: vi.fn(),
    get: vi.fn(),
  };
  mockedAxios.create.mockReturnValue(mockApiClient as any);

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('sendNotification', () => {
    it('should make a POST request to send a notification', async () => {
      const notification = { category: 'Movies', message: 'New release!' };
      mockApiClient.post.mockResolvedValue({});

      await notificationService.sendNotification(notification);

      expect(mockApiClient.post).toHaveBeenCalledWith('/notifications/send', notification);
    });

    it('should throw a specific error for 400 Bad Request', async () => {
      mockApiClient.post.mockRejectedValue({ isAxiosError: true, response: { status: 400 } });
      await expect(notificationService.sendNotification({ category: 'MOVIES', message: 'Test' }))
        .rejects.toThrow('Bad Request: Please check your input.');
    });

    it('should throw a specific error for 500 Internal Server Error', async () => {
      mockApiClient.post.mockRejectedValue({ isAxiosError: true, response: { status: 500 } });
      await expect(notificationService.sendNotification({ category: 'MOVIES', message: 'Test' }))
        .rejects.toThrow('Internal Server Error: Please try again later.');
    });
    
    it('should throw a specific error for 503 Service Unavailable', async () => {
      mockApiClient.post.mockRejectedValue({ isAxiosError: true, response: { status: 503 } });
      await expect(notificationService.sendNotification({ category: 'MOVIES', message: 'Test' }))
        .rejects.toThrow('Service Unavailable: The service is temporarily down.');
    });

    it('should throw a network error if request is made but no response is received', async () => {
      mockApiClient.post.mockRejectedValue({ isAxiosError: true, request: {} });
      await expect(notificationService.sendNotification({ category: 'MOVIES', message: 'Test' }))
        .rejects.toThrow('Network Error: Could not connect to the server.');
    });

    it('should throw a generic error for other issues', async () => {
      mockApiClient.post.mockRejectedValue(new Error('Something else went wrong'));
      await expect(notificationService.sendNotification({ category: 'MOVIES', message: 'Test' }))
        .rejects.toThrow('An unexpected error occurred.');
    });
  });

  describe('getLogs', () => {
    it('should make a GET request and return logs', async () => {
      const mockLogs = [{ id: 1, message: 'log1' }];
      mockApiClient.get.mockResolvedValue({ data: mockLogs });

      const logs = await notificationService.getLogHistory();

      expect(mockApiClient.get).toHaveBeenCalledWith('/notifications/logs');
      expect(logs).toEqual(mockLogs);
    });
  });
});