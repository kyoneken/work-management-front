<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export interface AuthorizationResponse {
  user_id: string;
}

export default defineComponent({
  name: 'CallbackPage',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const loading = ref(true);
    const error = ref('');

    onMounted(async () => {
      const code = route.query.code as string;

      try {
        const response = await axios.post<AuthorizationResponse>('http://localhost:8081/authorization/code', { code });

        if (response.status === 201) {
          console.log(response.data);
          const userId = response.data.user_id;
          localStorage.setItem('user_id', userId);
          router.push('/home');
        } else {
          error.value = 'API request failed';
        }
      } catch (err) {
        error.value = 'API request failed';
      } finally {
        loading.value = false;
      }
    });

    return {
      loading,
      error,
    };
  },
});
</script>

<template>
  <div>
    <h1>コールバック</h1>
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

