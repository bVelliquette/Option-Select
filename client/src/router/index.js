import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import About from "../views/About.vue";
import News from "../views/News.vue";
import Events from "../views/EventView.vue";
import Dev from "../views/Dev.vue";
import EventBrowser from "../views/EventBrowser.vue";
import AddEvent from "../views/AddEvent.vue";


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
    name: "EventBrowser",
    component: EventBrowser
  },
  {
    path: "/events/:id",
    name: "EventsWithParam",
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
    path: "/AddEvent",
    name: "AddEvent",
    component: AddEvent
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
