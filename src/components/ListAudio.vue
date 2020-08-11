<template>
   <ul class="list">
      <li v-for="(item, index) in resources.items"
         :key="index"
         :class="{
            active: $store.getters.hasSound(item)
         }">
         <img :src=" require('@/assets/' + item.icon + ($store.getters.hasSound(item) ? '_active.png' : '_normal.png') ) " 
            class="icon"
            @click="toggleSound(item)">
         <br>
         <S-Range
            :value="item.volume"
            @input="changeVolume(item, $event)"
            class="range"
            :background-color="resources['background-color-range'][THEME]"
            :color="resources.color[THEME]"/>
      </li>
   </ul>
</template>

<style lang="scss" scoped>
   .list {
      display: flex;
      margin: 0;
      padding: 0;
      flex-wrap: wrap;
      list-style: none;
      li {
         text-align: center;
         flex: 0 0 calc(100% / 3);
         max-height: 50px;
         img {
            max-width: 100%;
            width: 50px;
            height: auto;
         }
         margin-bottom: 3.4rem;
         .range {
            display: none;
         }
         &.active {
            .range {
               display: block;
            }
            img {
               width: 40px;
            }
         }
      }
   }


   @media (min-width: 576px) {
       .list li {
          flex: 0 0 (100% / 4);
       }
    }
    @media (min-width: 768px) {
       .list li {
          flex: 0 0 (100% / 5);
       }
    }
    @media (min-width: 992px) {
       .list li {
          flex: 0 0 (100% / 6);
       }
    }

</style>

<script>
   import SRange from "@/components/Range.vue"
   export default {
      components: { SRange },
      props: {
         resources: Object
      },
      methods: {
         toggleSound(object) {
            if ( this.$store.getters.hasSound(object) ) {
               this.$store.commit("removeSound", object)
            } else {
               this.$store.commit("addSound",  {
                  object, src: this.resources
               })
            }
         },
         changeVolume(src, value) {
            this.$store.commit("exec", {
               src,
               key: "volume",
               value
            })
         }
      }
   }
</script>