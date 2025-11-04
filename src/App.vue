<template>
  <div id="app" class="layout-1">
    <div class="sidebar">
      <h2>iAlert Admin</h2>
      <ul>
        <li>
          <router-link to="/" active-class="active" exact>Home (Dashboard)</router-link>
        </li>
        <li>
          <router-link to="/incidents" active-class="active">Incident Reports</router-link>
        </li>
        <li>
          <router-link to="/map" active-class="active">Live Map</router-link>
        </li>
        <li>
          <router-link to="/users" active-class="active">Users</router-link>
        </li>
        <li>
          <router-link to="/logs" active-class="active">Logs</router-link>
        </li>
      </ul>
    </div>

    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
// No need for ref anymore since Vue Router handles navigation
</script>

<style scoped>
.layout-1 {
  display: flex;
  height: 100vh;
  font-family: "Segoe UI", sans-serif;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background-color: #2c2f33;
  color: white;
  padding: 20px;
  border-radius: 30px;
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

/* Active route highlight */
.sidebar a.active {
  background-color: #5865f2;
  color: white;
}

/* Main content */
.main-content {
  flex: 1;
  /* padding: 30px; */
  background-color: #f4f4f4;
  overflow-y: auto;
}
</style>
