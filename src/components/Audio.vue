<template>
   <audio></audio>
</template>

<script>
   export default {
      props: {
         play: Boolean,
         volume: {
            type: Number,
            default: .5
         }
      },
      watch: {
         play: {
            handler(newVal) {
                if ( this.$el )
                   setTimeout(() => newVal ? this.$el.play() : this.$el.pause())
            },
            immediate: true
         },
         volume(newVal) {
            this.$el.volume = newVal
         }
      }
   }
</script>