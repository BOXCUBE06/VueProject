<template>
    <AdminLayout v-if="useLayout">
        <RouterView />
    </AdminLayout>
    
    <div v-else>
        <RouterView />
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AdminLayout from '@/components/layout/AdminLayout.vue';

const route = useRoute();

const useLayout = computed(() => route.meta.layout !== 'empty');
</script>

<style scoped>
.layout-1 {
  display: flex;
  height: 100vh;
  font-family: "Segoe UI", sans-serif;
}

.sidebar {
  width: 250px;
  background-color: #2c2f33;
  color: white;
  padding: 20px;

  margin-right: 10px;
}

.sidebar h2 {
  margin-bottom: 20px;
  text-align: center;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 10px 0;
}

.sidebar a {
  display: block;
  color: #ccc;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 6px;
  transition: background 0.3s, color 0.3s;
}

.sidebar a:hover {
  background-color: #444;
  color: #fff;
}

.sidebar a.active {
  background-color: #5865f2;
  color: white;
}

.main-content {
  flex: 1;
  background-color: #f4f4f4;
  overflow-y: auto;
}
</style>
