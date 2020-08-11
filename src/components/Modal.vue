<style lang="scss">
   .fade-enter-active,
   .fade-leave-active {
      transition: opacity .3s;
   }

   .fade-enter,
   .fade-leave-to {
      opacity: 0;
   }

   ._modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2048;
      padding: 0;
      margin: 0;
      background-color: rgba(0, 0, 0, .5);

      ._modal-body {
         position: absolute;
         top: 50%; left: 50%;
         transform: translate(-50%, -50%);
         margin: auto;
         width: calc(100% - (27rem / 16) * 2);
         min-height: 0;
         max-height: calc(100% - (37rem / 16) *2);
         padding: calc(25rem / 16) calc(20rem / 16);
         overflow: auto;
         border-radius: 5px;
      }
   }
</style>
<script>
   export default {
      props: {
         show: Boolean,
         backgroundColor: String
      },
      model: {
         event: "input",
         prop: "show"
      },
      data() {
         return {
            state: this.show
         }
      },
      watch: {
         state(newVal) {
            this.$emit("input", newVal)
         },
         show(newVal) {
            this.state = newVal || false
         }
      },
      methods: {
         hide(e) {
            if (e.target == e.currentTarget)
               this.state = false
         }
      },
      render(h) {
         return h("transition", {
            props: {
               name: "fade"
            }
         }, [
            h("div", {
               staticClass: "_modal",
               directives: [
                  { name: "show", value: this.state }
               ],
               on: {
                  click: (e) => this.hide(e)
               }
            }, [
               h("div", {
                  staticClass: "_modal-body",
                  style: {
                     backgroundColor: this.backgroundColor
                  }
               }, this.$slots.default)
            ])
         ])
      }
   }
</script>