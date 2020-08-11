<template>
   <ul class="footer-tool-bar">
      <router-link tag="li" :to="item.path" v-for="(item, index) in items" :key="index">
         <img class="default" :src="require(item.src + '_normal.png')">
         <img class="active" :src="require(item.src + '_active.png')">
      </router-link>
   </ul>
</template>
<style lang="scss" scoped>
   .footer-tool-bar {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      max-height: 100%;
      padding: .3rem 0 .3rem 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      list-style-type: none;
      margin: 0;
      color: #fff;
      background-color: #081025;
      z-index: 1024;
      li {
         img {
            width: 28px;
            margin: .5rem 0 .5rem 0;
         }

         .default {
            display: block;
         }

         .active {
            display: none;
         }
         &.active {
            
            .default {
               display: none;
            }
   
            .active {
               display: block;
            }
         }
      }
   }


   @media (min-width: 992px) {
      .footer-tool-bar {
         height: 100%;
         width: calc(1rem + 28px);
         flex-direction: column;
         justify-content: flex-start;
      }
   }
</style>
<script>
   export default {
      data() {
         return {
            items: [
               { path: "/", src: "./assets/menu_rain" },
               { path: "/tree", src: "./assets/menu_tree" },
               { path: "/city", src: "./assets/menu_city" },
               { path: "/meditation", src: "./assets/menu_meditation" },
               { path: "/favorys", src: "./assets/menu_heart" },
               { path: "/alarm", src: "./assets/menu_alarm" }
            ]
         }
      }
   }
</script>