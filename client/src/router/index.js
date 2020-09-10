import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import About from "../views/About.vue";
import News from "../views/News.vue";
import Events from "../views/Events.vue";
import Dev from "../views/Dev.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/events",
    name: "Events",
    component: Events
  },
  {
    path: "/news",
    name: "News",
    component: News
  },
  {
    path: "/dev",
    name: "Dev",
    component: Dev
  },
  {
    path:"*",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
