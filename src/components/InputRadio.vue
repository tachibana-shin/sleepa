<template>
   <input type="radio" class="input-radio-custom"/>
</template>
<style lang="scss">
   .input-radio-custom {
      appearance: none;
      border: 1.5px solid #202020;
      border-radius: 50%;
      width: 1.2em;
      height: 1.2em;
      position: relative;
      outline: none;
      &:checked {
         appearance: none;
         border-color: #8d6bcc;
         &:before {
            content: "";
            position: absolute;
            width: 70%;
            height: 70%;
            top: 0; left: 0;
            right: 0; bottom: 0;
            margin: auto;
            border-radius: 50%;
            background-color: #8d6bcc;
         }
      }
   }
</style>