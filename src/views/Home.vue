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
        <div id="enemy"></div>
        <div id="enemy-status"></div>
      </div>
      <div id="player-container">
        <div id="player"></div>
        <div id="player-status"></div>
      </div>
      <div id="sys-msg"></div>
      <selection />
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Selection from '../components/Selection.vue'
export default {
  name: 'Home',

  components: {
    Selection
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
  border: 3px solid;
  grid-column: 2;
  grid-row: 1 / 2;
  margin: 10px 10px 0px 0px;
  width: 250px;
  height: 140px;
}
#enemy-status {
  border: 3px solid;
  grid-column: 1;
  grid-row: 1;
  margin: 30px 2px auto auto;
  width: 200px;
  height: 60px;
}

#player-container {
  display: grid;
  grid-template-columns: 256px 236px;
  grid-template-rows: 70px, 70px;
}
#player {
  border: 3px solid;
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
  width: 200px;
  height: 60px;
}

#sys-msg {
  border: 3px solid;
  margin: 10px 10px auto 10px;
  height: 65px;
}
</style>