<template>
  <div>
    <div id="start-window" v-if="!start">
      <v-btn
        id="start"
        color="primary"
        elevation="15"
        x-large
        :loading=isLoading
        @click="click_start()"
      > 
        start
      </v-btn>
    </div>
    <div id="game-window" v-else>
      <div id="enemy-container" class="right-in" v-if="!enemy_lose">
        <img id="enemy" v-bind:class="{blinking: enemy_injured}" src="../assets/aws.jpg" alt="aws" title="aws">
        <div id="enemy-status">
          <status class="status-details" :side="'enemy'" />
        </div>
      </div>
      <div class="chara-blank" v-else></div>

      <div id="player-container" class="left-in" v-if="!player_lose">
        <img id="player" v-bind:class="{blinking: player_injured}" src="../assets/azure.jpg" alt="azure" title="azure">
        <div id="player-status">
          <status class="status-details" :side="'player'" />
        </div>
      </div>
      <div class="chara-blank" v-else></div>

      <system-msg />
      <selection v-if="!end" />
      <div id="restart-container" v-else>
        <v-btn
          id="restart"
          color="primary"
          elevation="15"
          x-large
          :loading=isLoading
          @click="click_restart()"
        > 
          restart
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Selection from '../components/Selection.vue'
import Status from '../components/Status.vue'
import SystemMsg from '../components/SystemMsg.vue'
export default {
  name: 'Home',

  components: {
    Selection,
    Status,
    SystemMsg
  },
  data() {
    return {
      start: false,
      end: false,
      isLoading: false,
      enemy_injured: false,
      enemy_lose: false,
      player_injured: false,
      player_lose: false
    }
  },
  computed: {
    situation() {
      return this.$store.state.situation
    }
  },
  watch: {
    async situation() {
      console.log(this.situation)
      if (this.situation == "attack perfect" || this.situation.indexOf('attack success') > -1) {
        this.enemy_injured = true
        await this.wait(3)
        this.enemy_injured = false
      }
      else if (this.situation.indexOf("counter") > -1) {
        this.player_injured = true
        await this.wait(3)
        this.player_injured = false
      }
      else if (this.situation == "win" || this.situation == "lose") {
        this.end = true
        if (this.situation == "win") {
          this.enemy_lose = true
        }
        else {
          this.player_lose = true
        }
      }
    }
  },
  methods: {
    async click_start() {
      this.isLoading = true
      axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
      const res = await axios("https://tatakimaru.azurewebsites.net/getWordList")
      const wordList = res.data.data
      this.$store.commit("setWordList", wordList)
      this.$store.commit("setStart")
      this.isLoading = false
      this.start = true
    },
    click_restart() {
      this.start = false
      this.end = false
    },
    wait(sec) {
      return new Promise((resolve) => {
        setTimeout(resolve, sec*1000);
      })
    }
  }
}
</script>

<style>
#start-window {
  display: grid;
  place-items: center;
  border: 4px solid;
  margin: 50px auto 0 auto;
  width: 500px;
  height: 580px;
}
#start {
  display: grid;
  place-items: center;
  width: 150px;
  height: 50px;
}

#restart-container {
  display: grid;
  place-items: center;
  height: 200px;
}
#restart {
  display: grid;
  place-items: center;
}

#game-window {
  border: 4px solid;
  margin: 50px auto 0 auto;
  width: 500px;
  height: 580px;
  position: relative;
  z-index: 10;
}

#enemy-container {
  display: grid;
  grid-template-columns: 236px 256px;
  grid-template-rows: 70px, 70px;
}
#enemy {
  grid-column: 2;
  grid-row: 1 / 2;
  margin: 10px 10px 0px 0px;
  width: auto;
  height: 140px;
  z-index: 1;
}
#enemy-status {
  border: 3px solid;
  grid-column: 1;
  grid-row: 1;
  margin: 30px 2px auto auto;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 15px;
  width: 200px;
  height: 60px;
}

#player-container {
  display: grid;
  grid-template-columns: 256px 236px;
  grid-template-rows: 70px, 70px;
  z-index: 1;
}
#player {
  grid-column: 1;
  grid-row: 1 / 2;
  margin: 5px 0px 0px 10px;
  width: 250px;
  height: 140px;
}
#player-status {
  border: 3px solid;
  grid-column: 2;
  grid-row: 1;
  margin: 70px auto auto 6px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 0px;
  width: 200px;
  height: 60px;
}

.chara-blank {
  width: 492px;
  height: 150px;
}

.status-details {
  width: 100%;
  height: 100%;
}

.blinking {
  animation:blink 0.3s steps(1) 4;
}
@keyframes blink {
  0% {opacity:0;}
  50% {opacity:1;}
  100% {opacity:0;}
}

.right-in{
  animation: RightIn 1.6s;
}
@keyframes RightIn {
  0% {
    opacity: 0;
    transform: translateX(64px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.left-in{
  animation: LeftIn 1.6s;
}
@keyframes LeftIn {
  0% {
    opacity: 0;
    transform: translateX(-64px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>