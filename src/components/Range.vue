<template>
   <div class="range" @click="calc" @touchstart="start" @touchmove="move" :style="{ color, backgroundColor }">
      <span class="thumb"
         @touchmove="move"
         @touchstart="start"
         @mouseover="start"
         @mousemove="move"
         :style="{
            left: thisValue * 100 + '%'
         }"></span>
      <span class="full"
         :style="{
            width: thisValue * 100 + '%'
         }"></span>
   </div>
</template>

<style lang="scss" scoped>
  .range {
     position: relative;
     margin: 10px 15px;
     height: 1px;
     border-radius: 1px;
    .full {
       position: absolute;
       height: 3px;
       top: 0;
       bottom: 0;
       left: 0;
       margin: auto;
       width: 50%;
       background-color: currentColor;
       border-radius: 1px;
      }
     .thumb {
         position: absolute;
         width: 13px;
         height: 13px;
         border-radius: 50%;
         background-color: currentColor;
         top: 0; bottom: 0;
         margin: auto;
         left: 50%;
         transform: translateX(-50%);
      }
   }
</style>

<script>
   export default {
      props: {
         value: {
            type: Number,
            default: 0.5
         },
         backgroundColor: {
            type: String
         },
         color: String
      },
      data() {
         return {
            thisValue: this.value,
            idTouchMove: null
         }
      },
      model: {
         event: "input"
      },
      watch: {
         thisValue(newVal) {
            this.$emit("input", newVal)
         },
         value(newVal) {
            this.thisValue = newVal
         }
      },
      methods: {
         calc({ clientX, clientY }) {
            let element = this.$el
            let rect = element.getBoundingClientRect()
            
            clientX -= rect.left
            clientY -= rect.top
               
            let value = clientX / parseFloat(window.getComputedStyle(this.$el).width)
            if ( value > 1 )
               value = 1
            if ( value < 0 )
               value = 0
                  
            this.thisValue = value || 0
         },
         start(e) {
            this.idTouchMove = (e.touches || e.changedTouches || [e])[0].identifier
         },
         move(e) {
            [].slice.call(e.touches || e.changedTouches || [e]).some(item => {
               if ( this.idTouchMove != item.identifier )
                  return
               this.calc(item)
            })
         }
      }
   }
</script>