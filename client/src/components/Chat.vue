<script>
import { io } from 'socket.io-client'

export default {
  inject: ['user'],
  data() {
    return {
      socket: io(process.env.VUE_APP_API_URL || 'http://localhost:3000'),
      message: '',
      messages: [],
      isTyping: false,
      typingText: '',
      users: []
    }
  },
  methods: {
    sendMessage(e) {
      e.preventDefault()
      if(this.message.length) {
        const msg = {username: this.user , message: this.message}

        this.socket.emit('chat message', msg)
        this.messages.push(msg)
        this.message = ''
        this.socket.emit('typing', this.user)
      }
    },
    typing() {
      this.socket.emit('typing', this.user)
    },
    joinServer() {
      if(!localStorage.getItem('user')) return this.$router.push('/')
      this.user = localStorage.getItem('user')
      if(!this.user) this.user = 'Anonymous'
      
      this.socket.emit('loggedIn', this.user)
      this.socket.on('loggedIn', result => {
        this.users = result.users
        this.messages = result.messages
      })
      this.listen()
    },
    listen() {
      // LoggedOut Users
      this.socket.on('userLeft', user => {
        console.log(this.users);
        this.users.splice(this.users.indexOf(user), 1)
      })

      // Chat message
      this.socket.on('chat message', message => {
        this.messages.push(message)
      })

      // User is typing...
      this.socket.on('typing', user => {
        this.isTyping = !this.isTyping
        this.typingText = `${user} is typing...`
      })
    }
  },
  created() {
    this.joinServer()
  }
}
</script>

<template lang='pug'>
#chat
  .room-info
    p.onlines Online users: {{users.length}}
    p.online-user-names {{users.toString()}}
  ul#messages
    li.speech(v-for='message in messages')
      span.message-username(v-if='message.username != user') {{message.username}}
      div.own-speech-bubble(v-if='message.username == user') {{message.message}}
      div.speech-bubble(v-else) 
        span {{message.message}}
        p.msg-date {{parseInt((message.date).split('T')[1].split(':')[0]) + 3}}:{{message.date.split('T')[1].split(':')[1]}}
    li.speech(v-if='isTyping') {{typingText}}
  form#form
    input#input(v-model='message' @change='typing' placeholder='Say something...' autocomplete='off')
    button(@click='sendMessage') Send
</template>
