<template>
   <Page-Style
      title="Thiên nhiên & Rừng"
      :resources="resources" v-if="loaddone"/>
</template>

<script>
   import PageStyle from "./PageStyle.vue"
   
   export default {
      components: { PageStyle },
      data() {
         return {
            resources: {},
            loaddone: false
         }
      },
      created() {
         this.$store.cache.dispatch("FETCH_DATA_TREE")
         .then(e => this.resources = e)
         .then((e) => this.loaddone = true)
      }
   }
</script>