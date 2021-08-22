<template lang='pug'>
.main
  .login
    h1 Get a username to chat!
    .input
      input.username(placeholder='Username' v-model='username')
      button(@click='setUsername(username)')
        pre Next   >>
</template>

<script>
export default {
  inject: ['setUsername'],
  data() {
    return {
      username: ''
    }
  }, 
  methods: {
    checkIfLoggedBefore(){
      const username = localStorage.getItem('user')
      if(username) this.$router.push('/chat-room')
    }
  },
  created() {
    this.checkIfLoggedBefore()
  }
}
</script>

<style scoped>
h1 {
  color:white;
  font-size: 1.8rem;
  margin-top: 1rem;
  padding-inline: 1rem;
}
.main {
  background-color: #efefef;
  height: 100vh;
  display: flex;
  justify-content: center;
}
.login {
  background: rgb(118,167,161);
  background: linear-gradient(90deg, rgb(77, 197, 107) 0%, rgb(83, 182, 119) 60%);
  height: 15rem;
  border: 1px solid grey;
  box-shadow: 0 0 2px grey;
  margin-top: 5%;
  box-shadow: 0 0 10px black;
}
.input {
  margin: auto;
  margin-top: 3rem;
}
input {
  border: none;
  border-radius: .5rem;
  width: 95%;
  font-size: 1.1rem;
  padding: .4rem .9rem;
}
input:focus {
  outline: 0;
}
button {
  transition: all .2s ease-in;
  border: 1px solid white;
  color: rgb(83, 182, 119);
  background-color: white;
  margin-top: 2rem;
}
button:hover {
  border: 1px solid white;
  color: white;
  background-color: rgb(83, 182, 119);
}
</style>