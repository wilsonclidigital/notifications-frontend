<script setup lang="ts">
import { useMessageForm } from '@/composables/useMessageForm';

// Events to notify parent components
const emit = defineEmits<{
  (e: 'message-sent'): void;
}>();

const {
  selectedCategory,
  messageBody,
  isSubmitting,
  errorMessage,
  successMessage,
  showModal,
  modalMessage,
  categories,
  handleSubmit,
} = useMessageForm(emit);
</script>

<template>
  <div class="form-container">
    <h2>Send Notification</h2>
    
    <form @submit.prevent="handleSubmit" class="notification-form">
      <div class="form-group">
        <label for="category">Category</label>
        <select id="category" v-model="selectedCategory" class="form-control">
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <textarea 
          id="message" 
          v-model="messageBody" 
          class="form-control" 
          rows="4"
          placeholder="Type your message here..."
        ></textarea>
      </div>

      <div v-if="errorMessage" class="alert error">{{ errorMessage }}</div>
      <div v-if="successMessage" class="alert success">{{ successMessage }}</div>

      <button type="submit" :disabled="isSubmitting" class="btn-submit">
        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
      </button>

      <Teleport to="body">
        <div v-if="showModal" class="modal-overlay">
          <div class="modal-content">
            <h3>Service Unavailable</h3>
            <p>{{ modalMessage }}</p>
            <button @click="showModal = false" class="btn-close" type="button">Close</button>
          </div>
        </div>
      </Teleport>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.btn-submit {
  background-color: #3498db;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
}

.btn-submit:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.alert {
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}
.error { background-color: #fdecea; color: #e74c3c; }
.success { background-color: #eafaf1; color: #2ecc71; }

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.btn-close {
  margin-top: 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
</style>
