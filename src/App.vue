<!-- src/App.vue -->
<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/callback">Callback</router-link></li>
        <li><router-link to="/hello">Hello World</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>