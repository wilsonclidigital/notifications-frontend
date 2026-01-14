import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import MessageForm from '../MessageForm.vue'
import { notificationService } from '@/services/NotificationService'

// Mock the NotificationService to prevent actual API calls
vi.mock('@/services/NotificationService', () => ({
  notificationService: {
    sendNotification: vi.fn()
  }
}))

describe('MessageForm', () => {
  it('renders properly', () => {
    const wrapper = mount(MessageForm)
    expect(wrapper.text()).toContain('Send Notification')
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('validates empty message body', async () => {
    const wrapper = mount(MessageForm)
    
    // Try to submit without typing anything
    await wrapper.find('form').trigger('submit')
    
    expect(wrapper.text()).toContain('Message body cannot be empty')
    expect(notificationService.sendNotification).not.toHaveBeenCalled()
  })

  it('sends notification when form is valid', async () => {
    const wrapper = mount(MessageForm)
    
    // Fill out the form
    const textarea = wrapper.find('textarea#message')
    await textarea.setValue('Hello World')
    
    // Submit
    await wrapper.find('form').trigger('submit')
    
    expect(notificationService.sendNotification).toHaveBeenCalledWith({
      category: 'SPORTS', // Default value
      message: 'Hello World'
    })
  })
})