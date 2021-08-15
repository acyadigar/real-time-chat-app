import { createWebHistory, createRouter } from "vue-router";
import Home from '@/views/Home';
import Login from '@/views/Login'

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/chat-room",
    name: "Chat Room",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;