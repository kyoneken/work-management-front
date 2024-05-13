<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';

type Comment = {
  id: string;
  project_id: string;
  start: string;
  end: string;
  memo: string;
  content: string;
  issue_key: string;
  summary: string;
  status: string;
};

export default defineComponent({
  name: 'HomePage',
  setup() {
    const issues = ref<Comment[]>([]);
    const loading = ref(true);
    const error = ref('');

    onMounted(async () => {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        error.value = 'User ID not found';
        loading.value = false;
        return;
      }

      try {
        const response = await axios.get<Comment[]>('http://localhost:8081/comment/list', {
          headers: { 'X-User-ID': userId },
        });
        issues.value = response.data;
      } catch (err) {
        error.value = 'API request failed';
      } finally {
        loading.value = false;
      }
    });

    return { comments: issues, loading, error };
  },
});
</script>

<template>
  <div>
    <h1>課題一覧</h1>
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
    <ul v-if="comments.length > 0">
      <li v-for="comment in comments" :key="comment.id">
        <h2>{{ comment.summary }}</h2>
        <p>課題キー: {{ comment.issue_key }}</p>
        <p>ステータス: {{ comment.status }}</p>
        <p>コメント： {{ comment.content }}</p>
        <p>開始日時： {{ comment.start }}</p>
        <p>終了日時： {{ comment.end }}</p>
        <p>メモ： {{ comment.memo }}</p>
        
      </li>
    </ul>
  </div>
</template>