<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        Home
      </router-link>
      |
      <router-link to="/about">
        About
      </router-link>
    </div>
    <div v-if="notification" :class="`bg-${notification.type}`"
         class="shadow text-uppercase alert w-25 mx-auto text-white text-center"
    >
      {{ notification.message }}
    </div>
    <router-view @notification="showNotification"/>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      notification: null,
    };
  },
  methods: {
    showNotification(notification) {
      this.notification = notification;
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
