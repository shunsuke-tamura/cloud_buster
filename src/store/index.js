import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wordList: null,
    damage: {Azure: 0, AWS: 0, GCP: 0, Heroku: 0},
    enemy_status: {cloud: "AWS", HP: 20, condition: null},
    player_status: {cloud: "Azure", HP: 20, condition: null},
    atack_res: null
  },
  mutations: {
    setWordList(state, list) {
      state.wordList = list
    },
    deleteWord(state, cloud) {
      state.wordList[cloud].shift()
    },
    setDamage(state, damage) {
      state.damage = damage
    },
    atack(state, cloud) {
      if (cloud == state.enemy_status.cloud) {
        console.log(state.damage[cloud]);
        state.enemy_status.HP = (state.enemy_status.HP + state.damage[cloud])
        if (state.enemy_status.HP > 20) {
          state.enemy_status.HP = 20
        }
        this.atack_res = "faild"
      }
      else if (cloud == "Azure") {
        state.enemy_status.HP -= state.damage["Azure"]
        this.atack_res = "success"
      }
      else {
        this.atack_res = "keep"
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
