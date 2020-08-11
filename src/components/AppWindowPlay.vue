<template>
   <ul class="app-window-play">
      <li>
         <i class="fas fa-1.5x fa-stopwatch"
            :data-text="timeCount | toTime2"
            :class="{
               'area-bottom': timeCount != null
            }"
            @click="showModalState"></i>
         <S-Modal v-model="stateModalTime" class="_modal__time"
            :background-color="
              $store.state.DarkTheme ? '#424242' : '#ffffff'">
            <h1 class="title">
               Cài đặt thời gian hẹn giờ
            </h1>
            <div class="content">
               <ul class="list">
                  <li v-for="(item, index) in Timeline"
                     :key="item"
                     @click="selectTime(item)"
                     :style="{
                        color: $store.state.DarkTheme ? '#fff' : '#333' }">
                     <S-Input-Radio name="input-radio-1" v-model="countDownValue" :id="'id-input-radio-1' + index" :checked="item == countDownValue"/>
                     <label :for="'id-input-radio-1' + index"> {{ item | toTime }} </label>
                  </li>
               </ul>
               <Vue2-Clock
                  input-class="d-none"
                  ref="TimePicker"
                  v-model="tmpClockPicker"
                  done-text="Bắt đầu hẹn giờ"
                  cancel-text="Hủy bỏ"/> 
            </div>
         </S-Modal>
      </li>
      <li>
         <i class="fas fa-1.5x" :class="[
            $store.state.Play ? 'fa-pause' : 'fa-play'
         ]" @click="$store.commit('ToggleSound')"></i>
      </li>
      <li>
         <i class="fas fa-1.5x fa-volume aria-right" :data-text="$store.state.SoundRuning.length"
            @click="stateModalState = true"></i>
         <S-Modal v-model="stateModalState" class="_modal__state"
            :background-color="
               $store.state.DarkTheme ? '#424242' : '#ffffff'">
            <div class="content">
               <ul class="list">
                  
                  <li v-for="(item, index) in $store.state.SoundRuning"
                     :key="index">
                     <img class="icon" :src=" require('@/assets/' + item.object.icon + '_active.png') ">
                     <S-Range
                        class="volume"
                        :value="item.object.volume"
                        @input="changeVolume(item.object, $event)"
                        :background-color="item.src['background-color-range'][THEME]"
                        :color="item.src.color[THEME]"/>
                     <span class="_close" @click="$store.commit('removeSound', item.object)"> &times; </span>
                  </li>
              
                  <li v-if="$store.state.SoundRuning.length == 0" key="empty"> <span> Không có âm thanh nào được chọn </span> </li>
               </ul>
            </div>
         </S-Modal>
      </li>
   </ul>
</template>
<style lang="scss" scoped>
   @import "../lib/vue2-clock-picker/vue2-clock-picker.min.css";
   @import "../lib/vue2-clock-picker/vue2-clock-picker-fix-center.css";

   .fa-1\.5x {
      font-size: 1.5rem !important;
   }

   .app-window-play {
      position: fixed;
      bottom: 100px;
      left: 0;
      right: 0;
      margin: auto;
      padding: .7rem 1.3rem;
      list-style: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 10px;
      background-color: #262d4a;
      width: 220px;
      z-index: 1024;

      li {
         color: #a9b8f9;
         width: auto;
         min-width: 0;

         .aria-right {
            position: relative;

            &::after {
               content: attr(data-text);
               position: absolute;
               font-size: .8rem;
               right: 0;
               bottom: 0;
               transform: translate(100%, 50%);
            }
         }
         
         .area-bottom {
            position: relative;
            font-size: (1em / 1.5);

            &::after {
               content: attr(data-text);
               position: absolute;
               font-size: .8rem;
               left: 50%;
               bottom: 0;
               text-align: center;
               transform: translate(-50%, 100%);
            }
         }

         ._modal {
            .title {
               font-size: 1.1rem;
               color: currentColor;
            }
            .content {
               .list {
                  list-style: none;
                  margin: 0;
                  padding: 0 1rem;
                  li {
                     padding: .5rem 0;
                     display: flex;
                     color: #fff;
                     align-items: center;
                  }
               }
            }
            
            &._modal__time .content .list li input {
               margin-right: .8rem;
            }
            &._modal__state .content .list li {
               display: flex;
               justify-content: space-between;
               .icon {
                  width: 35px;
                  height: 35px;
                  margin-right: 1.2rem;
               }
               .volume {
                  flex-basis: 1;
                  min-width: 0;
                  max-width: 100%;
                  width: 100%;
               }
               ._close {
                  color: #939393;
                  font-size: 2.3rem;
               }
            }
         }
      }
   }
</style>
<script>
   import SModal from "./Modal.vue"
   import SInputRadio from "./InputRadio.vue"
   import SRange from "./Range.vue"
   import Vue2Clock from "@pencilpix/vue2-clock-picker"
   
   export default {
      components: { SModal, SInputRadio, Vue2Clock, SRange },
      data() {
         return {
            stateModalTime: false,
            stateModalState: false,
            Timeline: [
               "never",
               "current",
               5 * 60 * 1000,
               10 * 60 * 1000,
               15 * 60 * 1000,
               20 * 60 * 1000,
               30 * 60 * 1000,
               40 * 60 * 1000,
               1 * 3600 * 1000,
               2 * 3600 * 1000,
               4 * 3600 * 1000,
               8 * 3600 * 1000
            ],
            countDownValue: "never",
            tmpClockPicker: "",
            timeCount: null
         }
      },
      watch: {
         countDownValue(newVal) {
            if ( newVal == "never" ) {
               return this.timeCount = null
            }
            if ( newVal == "current" ) {
               this.currentTime()
               .finally(() => this.stateModalTime = false)
               .then(() => this.WorkerTime())
               .catch(() => {
                  this.timeCount = null
                  this.countDownValue = "never"
               })
            } else {
               this.timeCount = +newVal || 0
               this.stateModalTime = false
               this.WorkerTime()
            }
         },
         "$store.state.SoundRuning"(newVal) {
            if ( newVal.length == 0 ) {
               this.stateModalTime = this.stateModalState = false
            }
         }
      },
      methods: {
         showModalState() {
            this.stateModalTime = true
         },
         currentTime() {
            return new Promise((resolve, reject) => {
               this.$tmpClockPicker = ""
               this.$refs.TimePicker.open()
               this.$refs.TimePicker.$once("beforeClose", () => {
                  !!this.tmpClockPicker ? resolve( this.tmpClockPicker ) : reject()
               })
            })
            .then(time => {
               time = this.tmpClockPicker.split(":")
               if ( time.length < 2 )
                  return this.timeCount = null
               return this.timeCount = (time[0] * 3600 + time[1] * 60) * 1000 || 0
            })
         },
         selectTime(val) {
            if ( this.countDownValue == val ) {
               this.countDownValue = "never"
               this.countDownValue = val
            } else {
               this.countDownValue = val
            }
         },
         WorkerTime() {
            if ( this.timeCount == null ) {
               return
            }
            if ( this.timeCount <= 0 ) {
               this.$store.commit("ToggleSound", false)
               this.timeCount = null
               return
            }
            clearTimeout(this.__WorkerTimeID)
            this.timeCount -= 1000
            this.__WorkerTimeID = setTimeout(() => {
               this.WorkerTime()
            }, 1000)
         },
         changeVolume(src, value) {
            // commiting
            this.$store.commit("exec", { src, key: "volume", value })
         }
      },
      filters: {
         toTime(val) {
            if (val == "never") {
               return "Không bao giờ"
            }
            if (val == "current") {
               return "Thời gian tùy chỉnh"
            }

            let minutes = val / 1000 / 60

            if (minutes > 60)
               return ~~(minutes / 60) + " giờ"
            return ~~minutes + " phút"
         },
         toTime2(val) {
            let seconds, minutes, hours
            seconds = Math.round(val / 1000)
            if ( seconds / 60 > 0 ) {
               minutes = ~~(seconds / 60)
               seconds -= minutes * 60
               if ( minutes / 60 > 0 ) {
                  hours = ~~(minutes / 60)
                  minutes -= hours * 60
               }
            }
            return [ hours ? hours : undefined, minutes, seconds]
            .filter(e => e != null)
            .map(e => (e >= 10 ? e : ("0" + e)))
            .join(":")
         }
         
      }
   }
</script>