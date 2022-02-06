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
      <div id="enemy-container">
        <img id="enemy" src="../assets/aws.jpg" alt="azure" title="azure">
        <div id="enemy-status">
          <status class="status-details" :side="'enemy'" />
        </div>
      </div>
      <div id="player-container">
        <img id="player" src="../assets/azure.jpg" alt="azure" title="azure">
        <div id="player-status">
          <status class="status-details" :side="'player'" />
        </div>
      </div>
      <system-msg />
      <selection />
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
      isLoading: false
    }
  },
  methods: {
    async click_start() {
      this.isLoading = true
      const res = await axios("/getWordList")
      const wordList = res.data.data
      this.$store.commit("setWordList", wordList)
      this.$store.commit("setStart")
      this.isLoading = false
      this.start = true
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

#game-window {
  border: 4px solid;
  margin: 50px auto 0 auto;
  width: 500px;
  height: 580px;
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

.status-details {
  width: 100%;
  height: 100%;
}
</style>