<template>
   <div class="main" :style="{
      color, backgroundColor, backgroundImage
   }">
      <div class="container">
         <p class="title">
            <span> Kết hợp yêu thích </span>
         </p>
         <div class="content col-12">
            <transition-group tag="ul" name="slide" class="list">
               <li class="create" key="create" :style="{
                     backgroundColor: color,
                     color: backgroundColor
                  }" @click="createListFavorite" v-show="$store.state.SoundRuning.length > 0">
                  <span class="text"> Tạo kết hợp mới </span>
                  <span class="add" :style="{ backgroundImage: 'url(' + require('@/assets/ic_add_favorite_' + ($store.state.DarkTheme ? 'dark' : 'light') + '.png') + ')' }"></span>
               </li>
               <li v-for="(item, index) in items" :key="item" :style="{
                     backgroundColor: backgroundItem
                  }">
                  <span class="text"> {{ item }} </span>
                  <span class="_close" @click="items.splice(index, 1)"> &times; </span>
               </li>
            </transition-group>
            <!-- Resources Support -->
            <S-Modal v-model="stateModalInputNameNewFav" class="modal-new-fav-sp"
               :background-color="
                  $store.state.DarkTheme ? '#424242' : '#ffffff'
               ">
               <h1 class="_title" :style="{ color }"> Nhập tên yêu thích </h1>
               <p class="summary" :style="{
                  color: $store.state.DarkTheme ? '#bdbdbd' : '#a0a0a0'
               }"> Đặt tên bộ yêu thích mới của bạn </p>
               <S-Input placeholder="Gõ tên (ví dụ: Rừng ưa thích)" :style="{
                     color: $store.state.DarkTheme ? '#bdbdbd' : '#a0a0a0',
                     '--valid': color
                  }" max-length="30" v-model="tmpName" />
               <button class="btn save" :style="{ color }" :class="{
                     active: tmpName.length
                  }" @click="$emit('save.modal-name')"> Lưu </button>
            </S-Modal>
            <!-- //Resources Support -->
         </div>
         <!-- Settings -->
         <div class="col-12 settings mt-5">
            <ul class="list">
               <li class="setting" :style="{
                     backgroundColor: $store.state.DarkTheme ? '#b4b4b4' : '#8a8a8a',
                     color: backgroundColor
                  }" @click="$store.commit('ToggleTheme')">
                  <span class="text"> Thay đổi màu sắc </span>
                  <span class="add" :style="{
                        backgroundImage: 'url(' + require('@/assets/ic_change_colors_' + ($store.state.DarkTheme ? 'dark' : 'light') + '.png') + ')'
                     }"></span>
               </li>
               <router-link tag="li" to="/favorys/settings" :style="{
                     backgroundColor: $store.state.DarkTheme ? '#b4b4b4' : '#8a8a8a',
                     color: backgroundColor
                  }">
                  <span class="text"> Cài đặt </span>
               </router-link>
            </ul>
         </div>
      </div>
   </div>
</template>
<style lang="scss" scoped>
   .main {
      width: 100%;
      position: absolute;
      height: calc(100% - 1rem - 28px);
      overflow: hidden scroll;

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

         .content,
         .settings {
            .list {
               list-style: none;
               margin: 0;
               padding: 0;
               position: relative;

               li {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 0 15px;
                  border-radius: 10px;
                  margin: .5rem 0;
                  height: (55rem / 16);
                  overflow: hidden;
                  width: 100%;

                  &.active {
                     border: 3px solid currentColor;
                  }

                  .text {
                     font-weight: 600;
                     font-size: 1.1rem;
                  }

                  ._close {
                     font-size: 2.3rem;
                  }

                  &.create,
                  &.setting {
                     .add {
                        display: block;
                        width: 2.3rem;
                        height: 2.3rem;

                        background: {
                           repeat: no-repeat;
                           size: 2rem 2rem;
                           position: center;
                        }

                        ;
                        transform: translateX(calc(50% - 2.3rem / 4));
                     }
                  }

                  transition: all .5s;
               }
            }

            .slide-enter,
            .slide-leave-to {
               opacity: 0;
               transform: translateX(30px);
            }

            .slide-leave-active {
               position: absolute;
            }

            .modal-new-fav-sp {
               ._title {
                  font-size: 1.3rem;
               }

               .summary {
                  margin-top: 1.8rem;
               }

               .save {
                  opacity: .5;
                  float: right;

                  &.active {
                     opacity: 1;
                  }
               }
            }
         }
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
   import SModal from "@/components/Modal.vue"
   import SInput from "@/components/Input.vue"
   export default {
      components: { SModal, SInput },
      data() {
         return {
            items: [
               "Mưa và đàn piano",
               "Mưa trong rừng",
               "Cắm trại mùa đông",
               "Đi xe điện ngầm",
               "Sự tái tạo",
               "Thiền buổi sáng",
               "100% tập trung",
               "Mưa trên kính chắn gió"
            ],
            stateModalInputNameNewFav: false,
            tmpName: ""
         }
      },
      computed: {
         color() {
            return this.$store.state.DarkTheme ? "#f2b6c0" : "#e02444"
         },
         backgroundColor() {
            return this.$store.state.DarkTheme ? "#462128" : "#ffeff2"
         },
         backgroundImage() {
            return `url("/pages/Favoys/assets/bg_mountains_favorites_${this.$store.state.DarkTheme ? "dark" : "light"}.png")`
         },
         backgroundItem() {
            return this.$store.state.DarkTheme ? "#33141a" : "#ffffff"
         }
      },
      watch: {
         stateModalInputNameNewFv(e) {
            if (e == false)
               this.$emit("close.modal-name")
         }
      },
      methods: {
         createListFavorite() {
            this.tmpName = ""
            this.stateModalInputNameNewFav = true
            new Promise((resolve, reject) => {
                  this.$once("save.modal-name", () => resolve())
                  this.$once("close.modal-name", () => reject())
               })
               .then(() => {
                  if (this.items.indexOf(this.tmpName) > -1) {
                     this.items.splice( this.items.indexOf(this.tmpName) )
                  }
                  this.items.unshift(this.tmpName)
               })
               .finally(() => this.stateModalInputNameNewFav = false)
         }
      }
   }
</script>