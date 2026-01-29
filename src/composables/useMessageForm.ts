import { ref } from 'vue';
import { notificationService } from '@/services/NotificationService';
import type { Category } from '@/types';

export function useMessageForm(emit: (e: 'message-sent') => void) {
  const selectedCategory = ref<Category>('SPORTS');
  const messageBody = ref('');
  const isSubmitting = ref(false);
  const errorMessage = ref('');
  const successMessage = ref('');
  const showModal = ref(false);
  const modalMessage = ref('');

  const categories: Category[] = ['SPORTS', 'FINANCE', 'MOVIES'];

  const handleSubmit = async () => {
    errorMessage.value = '';
    successMessage.value = '';

    if (!messageBody.value.trim()) {
      errorMessage.value = 'Message body cannot be empty.';
      return;
    }

    isSubmitting.value = true;

    try {
      await notificationService.sendNotification({
        category: selectedCategory.value,
        message: messageBody.value,
      });

      successMessage.value = 'Message sent successfully!';
      messageBody.value = ''; // Reset form
      emit('message-sent'); // Trigger refresh in parent
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'BACKEND_UNAVAILABLE') {
          modalMessage.value = 'The backend service is currently unavailable. Please try again later.';
          showModal.value = true;
        } else {
          errorMessage.value = error.message;
        }
      } else {
        errorMessage.value = 'An unexpected error occurred.';
      }
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    selectedCategory,
    messageBody,
    isSubmitting,
    errorMessage,
    successMessage,
    showModal,
    modalMessage,
    categories,
    handleSubmit,
  };
}