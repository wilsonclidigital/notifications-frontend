import axios, { type AxiosInstance } from 'axios';
import type { LogRecord, MessageRequest } from '@/types';

class NotificationService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: 'http://localhost:8080/api', // Adjust based on your Spring Controller mapping
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Sends a notification message to the backend.
   * @param payload The message data
   */
  async sendNotification(payload: MessageRequest): Promise<void> {
    try {
      await this.apiClient.post('/notifications/send', payload);
    } catch (error) {
      console.error('Error sending notification:', error);
      throw new Error('Failed to send notification. Please try again.');
    }
  }

  /**
   * Retrieves the history of notification logs.
   * @returns List of log records
   */
  async getLogHistory(): Promise<LogRecord[]> {
    try {
      const response = await this.apiClient.get<LogRecord[]>('/notifications/logs');
      // Ensure sorting happens here or in backend. Requirements say newest to oldest.
      return response.data.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    } catch (error) {
      console.error('Error fetching logs:', error);
      throw new Error('Failed to fetch log history.');
    }
  }
}

// Export a singleton instance for dependency injection-like usage
export const notificationService = new NotificationService();
