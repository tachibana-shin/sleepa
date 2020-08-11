<template>
   <div class="main" :style="{
      color: resources.color[THEME],
      backgroundColor: resources['background-color'][THEME],
      backgroundImage: 'url(\'' + require('@/assets/' + resources['background-image'][THEME]) + '\')'
   }">
      <div class="container">
         <p class="title">
            <span> {{ title }} </span>
         </p>
         <div class="content col-12">
            <ListAudio :resources="resources" />
         </div>
      </div>
   </div>
</template>
<style lang="scss" scoped>
   .main {
      width: 100%;
      position: absolute;
      height: calc(100% - 1rem - 28px);
      overflow: hidden auto;
      background: {
         size: 100% auto;
         /* 162px */
         position: 0px 100%;
         repeat: no-repeat;
      }

      .container {
         .title {
            margin: 0;
            margin: 1.5rem 0 2.6rem 0;
            font-weight: 500;
            font-size: 1.45rem;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            &::before {
               content: "";
               position: absolute;
               width: 5.7rem;
               height: 3px;
               background-color: currentColor;
               bottom: -.3rem;
               border-radius: 3px;
               margin: auto;
               left: 0;
               right: 0;
            }
         }

         .content {}
      }
   }
   @media (min-width: 992px) {
       .main {
          height: 100%;
          width: calc(100% - 1rem - 28px);
          right: 0;
       }
    }
</style>
<script>
   import ListAudio from "@/components/ListAudio.vue"

   export default {
      components: { ListAudio },
      props: {
         resources: {
            type: Object
         },
         title: String
      }
   }
</script> 