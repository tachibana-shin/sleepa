<template>
   <div id="app">
      <AppToolBar/> 
      <transition>
         <router-view></router-view>
      </transition>
      <transition name="AppWindowPlay">
         <AppWindowPlay v-show="$store.state.SoundRuning.length"/>
      </transition>




      <div class="d-none">




         <S-Audio :src="require('@/ogg/' + item.object.audio)"
            loop autoplay
            v-for="(item, index) in $store.state.SoundRuning"
            :key="index"
            :volume="item.object.volume"
            :play="$store.state.Play"/>
      </div>
   </div>
</template>

<style>
@import "https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css";
@import "https://nguyenthanh1995.github.io/lib/awesome%20pro/css/all.min.css";
</style>
<style> html, body { position: relative; height: 100%; } body { padding: 0; margin: 0; } #app { width: 100%; height: 100%; position: relative; }
</style>

<style lang="scss" scoped>
   .AppWindowPlay-enter-active {
      animation: AppWindowPlay .2s ease-in;
   }
   .AppWindowPlay-leave-active {
      animation: AppWindowPlay .2s ease-in reverse;
   }
   @keyframes AppWindowPlay {
      from {
         transform: scale(0);
      }
      90% {
         transform: scale(1.2);
      }
      to {
         transform: scale(1);
      }
   }
</style>

<script>
   import AppToolBar from "@/components/AppToolBar/index.vue"
   import AppWindowPlay from "@/components/AppWindowPlay.vue"
   import eruda from "eruda"
   import SAudio from "@/components/Audio.vue"

   eruda.init()
   
   export default {
      name: "App",
      components: {
         AppToolBar, AppWindowPlay, SAudio
      }
   }
</script>