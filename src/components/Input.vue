<template>
   <div class="input__custom">
      <input v-bind="$attrs" v-model="valueLocal" maxlength="maxLength" required aria-required="Please input name" @keyup="valueLocal = $event.target.value">
      <label> {{ (valueLocal || "").length }} / {{ maxLength }} </label>
   </div>
</template>

<style lang="scss" scoped>
   .input__custom {
      input {
         appearance: none;
         border: 0;
         border-radius: 0;
         outline: none;
         color: currentColor;
         caret-color: #d12e05;
         border-bottom: 1px solid #d12e05;
         margin: 0;
         background-color: #00000000 !important;
         display: inline-block;
         width: 100%;
         
         &:valid {
            border-bottom-color: var(--valid);
            caret-color: var(--valid);
         }
         &:valid + label {
            color: var(--valid);
         }
      }
      label {
         font-size: .8rem;
         color: #d12e05;
         margin-top: 1rem;
         display: block;
         text-align: right;
      }
   }
</style>

<script>
   export default {
      props: {
         maxLength: [Number, String],
         value: [Number, String]
      },
      data() {
         return {
            valueLocal: this.value
         }
      },
      watch: {
         valueLocal(e) {
            this.$emit("input", e)
         },
         value(e) {
            this.valueLocal = e
         }
      }
   }
</script>