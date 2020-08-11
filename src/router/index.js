import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

import Rain from "../pages/rain.vue"
import Tree from "../pages/tree.vue"
import City from "../pages/city.vue"
import Favorys from "../pages/favorys.vue"
import Meditation from "../pages/meditation.vue"

const routes = [
   {
      path: "/",
      component: Rain
   },
   {
      path: "/rain",
      redirect: "/"
   },
   {
      path: "/tree",
      component: Tree
   },
   {
      path: "/city",
      component: City
   },
   {
      path: "/favorys",
      component: Favorys
   },
   {
      path: "/meditation",
      component: Meditation
   }
]

export default new VueRouter({
   mode: "history",
   scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
          return savedPosition
      } else {
          return { x: 0, y: 0 }
      }
   },
   routes,
   linkExactActiveClass: "active"
})