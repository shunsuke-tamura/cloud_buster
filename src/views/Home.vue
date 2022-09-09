<template>
  <div id="main-display">
    <div id="auth-window" v-if="!logined">
      <authentication></authentication>
    </div>
    <div id="user-info" v-else>
      <UserInfo></UserInfo>
    </div>
    <div id="start-window" v-if="logined && !start">
      <v-btn
        id="start"
        color="primary"
        elevation="15"
        x-large
        :loading="isLoading"
        @click="click_start()"
      >
        start
      </v-btn>
    </div>
    <div id="game-window" v-if="logined && start">
      <div class="battle-start" v-if="!blackout_end"></div>
      <!-- 陣内エディション -->
      <div class="enemy --left-in">
        <p class="enemy__img">
          <img
            v-bind:class="{ blinking: enemy_injured, bottom_out: enemy_lose }"
            src="../assets/aws.jpg"
            alt="aws"
            title="aws"
          />
        </p>
        <div class="enemy__status">
          <status :side="'enemy'" />
        </div>
      </div>
      <!--  -->

      <div id="player-container" class="right-in">
        <img
          id="player"
          v-bind:class="{ blinking: player_injured, bottom_out: player_lose }"
          src="../assets/azure.jpg"
          alt="azure"
          title="azure"
        />
        <div id="player-status">
          <status :side="'player'" />
        </div>
      </div>

      <system-msg id="sys-msg" />
      <selection v-if="!end" />
      <div id="restart-container" v-else-if="!player_lose">
        <v-btn
          id="restart"
          color="primary"
          elevation="15"
          x-large
          :loading="isLoading"
          @click="click_restart()"
        >
          restart
        </v-btn>
      </div>
      <div id="selection-blank" v-else></div>
    </div>
    <div class="bloue-out" v-if="blue_out"></div>
  </div>
</template>

<script>
// import axios from "axios";
import Selection from "../components/Selection.vue";
import Status from "../components/Status.vue";
import SystemMsg from "../components/SystemMsg.vue";
import Authentication from "../components/Authentication.vue";
import UserInfo from "../components/UserInfo.vue";
import { debugData } from "../../z-debug";
export default {
  name: "Home",

  components: {
    Selection,
    Status,
    SystemMsg,
    Authentication,
    UserInfo
  },
  data() {
    return {
      start: false,
      end: false,
      isLoading: false,
      enemy_injured: false,
      enemy_lose: false,
      player_injured: false,
      player_lose: false,
      blue_out: false,
      blackout_end: false,
      battle_start: new Audio(require("@/assets/sounds/battle_start.mp3")),
      battle_bgm1: new Audio(require("@/assets/sounds/battle_bgm1.mp3")),
      battle_bgm2: new Audio(require("@/assets/sounds/battle_bgm1.mp3")),
      win_bgm: new Audio(require("@/assets/sounds/win.mp3")),
    };
  },
  computed: {
    situation() {
      return this.$store.state.situation;
    },
    logined() {
      return (
        this.$store.state.userInfo.uid !== null &&
        this.$store.state.userInfo.email !== null
      );
    },
  },
  watch: {
    async situation() {
      console.log(this.situation);
      if (
        this.situation == "attack perfect" ||
        this.situation.indexOf("attack success") > -1
      ) {
        this.enemy_injured = true;
        await this.wait(3);
        this.enemy_injured = false;
      } else if (this.situation.indexOf("counter") > -1) {
        this.player_injured = true;
        await this.wait(3);
        this.player_injured = false;
      } else if (this.situation == "win" || this.situation == "lose") {
        this.end = true;
        this.battle_start.pause();
        this.battle_start.currentTime = 0;
        this.battle_bgm1.pause();
        this.battle_bgm1.currentTime = 0;
        this.battle_bgm2.pause();
        this.battle_bgm2.currentTime = 0;
        if (this.situation == "win") {
          this.enemy_lose = true;
          this.win_bgm.play();
        } else {
          this.player_lose = true;
          await this.wait(4);
          this.blue_out = true;
          await this.wait(1.2);
          this.click_restart();
          await this.wait(0.8);
          this.blue_out = false;
        }
      }
    },
    logined(newVal) {
      if (!newVal) {
        this.start = false;
      }
    },
  },
  methods: {
    async click_start() {
      this.isLoading = true;
      // axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
      // const res = await axios(
      //   "https://tatakimaru.azurewebsites.net/getWordList"
      // );
      // const wordList = res.data.data;
      const wordList = debugData
      this.$store.commit("setWordList", wordList);
      this.$store.commit("setStart");
      this.isLoading = false;
      this.start = true;
      this.end = false;
      this.enemy_lose = false;
      this.player_lose = false;
      this.battle_start.play();
      await this.wait(1);
      this.blackout_end = true;
      await this.wait(11);
      while (!this.end) {
        if (!this.end) {
          this.battle_bgm1.play();
        } else {
          break;
        }
        await this.wait(83.3);
        if (!this.end) {
          this.battle_bgm2.play();
        } else {
          break;
        }
        await this.wait(83.3);
      }
    },
    click_restart() {
      this.start = false;
      this.win_bgm.pause();
    },
    wait(sec) {
      return new Promise((resolve) => {
        setTimeout(resolve, sec * 1000);
      });
    },
    auth() {
      this.logined = true;
    },
  },
};
</script>

<style lang="scss">
#main-display {
  display: grid;
  grid-template-rows: 40px 500px;
  place-items: center;
  border: 4px solid;
  margin: 50px auto 0 auto;
  width: 500px;
  height: 620px;
}

#auth-window {
  width: 100%;
  height: 100%;
  grid-row: 2;
  padding: 20% 10%;
}

#user-info {
  display: flex;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  justify-content: end;
  align-items: center;
}

#start-window {
  display: grid;
  place-items: center;
  // border: 4px solid;
  // margin: 50px auto 0 auto;
  // width: 500px;
  // height: 580px;
}
#start {
  display: grid;
  place-items: center;
  width: 150px;
  height: 50px;
}

#restart-container {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  height: 200px;
  background-color: white;
}
#restart {
  display: grid;
  place-items: center;
}

#game-window {
  // border: 4px solid;
  // margin: 50px auto 0 auto;
  // width: 500px;
  // height: 580px;
  position: relative;
}

.enemy {
  display: flex;
  flex-direction: row-reverse;
  height: 150px;
  &__img {
    grid-column: 2;
    grid-row: 1 / 2;
    margin: 10px 10px 0px 0px;
    width: 250px;
    height: 140px;
    z-index: 1;
    img {
      object-fit: contain;
      object-position: 0% 0%;
      width: inherit;
      height: inherit;
    }
  }
  &__status {
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
}

#player-container {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 256px 236px;
  grid-template-rows: 70px, 70px;
  background-color: white;
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

.blinking {
  animation: blink 0.3s steps(1) 4;
}
@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.right-in {
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

.--left-in {
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

.bottom_out {
  animation: BottomOut 1s;
  animation-fill-mode: forwards;
}
@keyframes BottomOut {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(140px);
  }
}

#sys-msg {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  border: 3px solid;
  margin: 10px 10px auto 10px;
  height: 65px;
  color: black;
  background-color: white;
}

#selection-blank {
  position: relative;
  z-index: 2;
  width: 492px;
  height: 200px;
  background-color: white;
}

.battle-start {
  position: absolute;
  z-index: 10;
  width: 500px;
  height: 580px;
  background-color: black;
  animation: BattleStart 1s;
  animation-fill-mode: forwards;
}
@keyframes BattleStart {
  0% {
    opacity: 1;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}

.bloue-out {
  position: absolute;
  z-index: 10;
  margin-top: 50px;
  width: 500px;
  height: 580px;
  background-color: rgb(0, 0, 88);
  animation: BloueOut 2s;
  animation-fill-mode: forwards;
}
@keyframes BloueOut {
  0% {
    opacity: 0;
  }
  60% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
