<template lang='pug'>
.main
  .login
    h1 Get a username to chat!
    .input
      input.username(placeholder='Username' v-model='username')
      button(@click='directTo')
        pre Next   >>
</template>

<script>
export default {
  data() {
    return {
      username: ''
    }
  }, 
  methods: {
    directTo() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 1.8rem;
  margin-top: 1rem;
  padding-inline: 1rem;
}
.main {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login {
  min-height: 40vh;
  border: 1px solid grey;
  box-shadow: 0 0 2px grey;
}
.input {
  margin: auto;
  margin-top: 3rem;
}
input {
  width: 95%;
  font-size: 1.1rem;
  padding: .5rem .7rem;
}
input:focus {
  outline: 0;
}
button {
  margin-top: 2rem;
  margin-right: 1rem;
  float: right;
}
</style>