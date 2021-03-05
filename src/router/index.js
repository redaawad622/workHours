import Vue from "vue";
import VueRouter from "vue-router";
import StopWatch from "../views/StopWatch";
import WorkList from "../views/WorkList";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "StopWatch",
    component: StopWatch
  },
  {
    path: "/WorkList",
    name: "WorkList",
    component: WorkList
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
