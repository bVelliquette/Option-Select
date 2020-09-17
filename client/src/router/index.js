import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import Events from "../views/EventView.vue";
import ScheduleMakerDemo from "../views/ScheduleMakerDemo.vue";
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
    path: "/createEvent",
    name: "ScheduleMakerDemo",
    component: ScheduleMakerDemo
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
