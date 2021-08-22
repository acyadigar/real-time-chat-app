<script>
export default {
  data() {
    return {
      username: ''
    }
  },
  provide() {
    return {
      user: this.username,
      setUsername: this.setUsername
    }
  },
  methods: {
    setUsername(username) {
      this.username = username
      localStorage.setItem('user', this.username)
      this.$router.push('/chat-room')
    }
  }
}
</script>

<template lang='pug'>
#app
  router-view
</template>

<style>
@import url('./assets/css/main.css');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
