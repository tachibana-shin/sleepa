import Vue from "vue"
import router from "./router"
import App from "./App.vue"
import store from "./store"

Vue.mixin({
   computed: {
      THEME: {
         get() {
            return this.$store.state.DarkTheme ? "dark" : "light"
         },
         set(e) {
            this.$router.commit("ToggleTheme", e)
         }
      }
   },
   methods: {
      IMAGE(source, file) {
         return ("/static/" + source + "/" + file)
      }
   }
})

new Vue({
   el: "#app",
   router,
   store,
   template: "<App/>",
   components: { App }
})