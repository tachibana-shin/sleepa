import Vue from "vue"
import Vuex from "vuex"
import VuexCache from "vuex-cache"
import createLocal from "vuex-persistedstate"

Vue.use(Vuex)
/*
   ------Vuex----Vue------
   mutations | actions = methods
   getters = computed
   
   
   mapState
   mapGetters
   mapMutations
*/
export default new Vuex.Store({
   // state ...args
   strict: true,
   state: {
      SoundRuning: [], //empty
      Play: true,
      DarkTheme: true,
      
      Data: {
         Rain: [],
         Tree: [],
         City: [],
         Mutations: []
      }
   },
   plugins: [ VuexCache(), createLocal({
      paths: ["DarkTheme", "Play" ]
   }) ],
   getters: {
      hasSound: state => (mp3 => {
         return state.SoundRuning.some(e => e.object == mp3)
      })
   },
   mutations: {
      
      addSound(state, prop) {
         if ( !this.getters.hasSound(prop) ) {
            state.SoundRuning.push(prop)
         }
         
         if ( state.SoundRuning.length == 0 ) {
            state.Play = false
         } else {
            state.Play = true
         }
      },
      removeSound(state, prop) {
         if ( this.getters.hasSound(prop) ) {
            state.SoundRuning = state.SoundRuning.filter(e => e.object != prop )
         }
         
         if ( state.SoundRuning.length == 0 ) {
            state.Play = false
         } else {
            state.Play = true
         }
      },
      removeSoundById({ SoundRuning }, id) {
         SoundRuning.splice(id, 1)
      },
      
      ToggleSound(state, prop) {
         if ( typeof prop == "boolean" )
            state.Play = prop
         else state.Play = !state.Play
      },
      ToggleTheme(state, prop) {
         if ( typeof prop == "boolean" )
            state.DarkTheme = prop
         else state.DarkTheme = !state.DarkTheme
      },
      
      exec(state, { src, key, value }) {
         src[key] = value
      }
   },
   actions: {
      FETCH_DATA(state, api) {
         if ( typeof api == "object" ) {
             return new Promise(resolve => resolve(api))
            .then(e => {
               e.items.forEach(e => {
                   if ( !("volume" in e) ) {
                     e.volume = .5
                  }
               })
               return e
             })
         }
         return fetch(api)
         .then(e => e.json())
         .then(e => {
            e.items.forEach(e => {
               if ( !("volume" in e) ) {
                  e.volume = .5
               }
            })
            return e
         })
      },
      FETCH_DATA_RAIN() {
         return this.cache.dispatch("FETCH_DATA", require("../api/rain.json"))
      },
      FETCH_DATA_TREE() {
         return this.cache.dispatch("FETCH_DATA", require("../api/tree.json"))
      },
      FETCH_DATA_CITY() {
         return this.cache.dispatch("FETCH_DATA", require("../api/city.json"))
      },
      FETCH_DATA_MEDITATION() {
         return this.cache.dispatch("FETCH_DATA", require("../api/meditation.json"))
      }
   }
})