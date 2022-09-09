import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wordList: null,
    damage: { Azure: 0, AWS: 0, GCP: 0, Heroku: 0 },
    enemy_status: { cloud: null, HP: 20, condition: null },
    player_status: { cloud: null, HP: 20, condition: null },
    situation: null,
    userInfo: { uid: null, name: null, email: null, cloud: null }
  },
  mutations: {
    setStart(state) {
      const playerCloud = state.userInfo.cloud
      const allCloud = ["Azure", "AWS", "GCP", "Heroku"]
      const candidateCloud = allCloud.filter(item=> item !== playerCloud);
      const enemyCloud = candidateCloud[Math.floor(Math.random() * 3)];
      state.enemy_status = { cloud: enemyCloud, HP: 20, condition: null }
      state.player_status = { cloud: playerCloud, HP: 20, condition: null }
      state.situation = "start"
    },
    setEnd(state, loser) {
      if (loser == "enemy") {
        state.situation = "win"
      }
      else {
        state.situation = "lose"
      }
    },
    setWordList(state, list) {
      state.wordList = list
    },
    deleteWord(state, cloud) {
      state.wordList[cloud].shift()
    },
    setDamage(state, damage) {
      state.damage = damage
    },
    attack(state, cloud) {
      if (cloud === state.enemy_status.cloud) {
        state.enemy_status.HP = (state.enemy_status.HP + state.damage[cloud])
        if (state.enemy_status.HP > 20) {
          state.enemy_status.HP = 20
        }
        state.situation = "attack faild" + state.damage[cloud]
      }
      else if (cloud === state.player_status.cloud) {
        state.enemy_status.HP -= state.damage[state.player_status.cloud]
        if (state.damage[state.player_status.cloud] == 3) {
          state.situation = "attack perfect"
        }
        else {
          state.situation = "attack success" + state.damage[state.player_status.cloud]
        }
        if (state.enemy_status.HP < 0) {
          state.enemy_status.HP = 0
        }
      }
      else {
        state.situation = "can not attack"
      }
    },
    counter(state, damage) {
      state.player_status.HP -= damage
      if (state.player_status.HP < 0) {
        state.player_status.HP = 0
      }
      state.situation = "counter" + damage
    },
    OfficialCheat(state, cloud) {
      if (cloud == "player") {
        state.enemy_status.HP -= 10
        if (state.enemy_status.HP < 0) {
          state.enemy_status.HP = 0
        }
        state.situation = "attack success" + "10"
      }
      else {
        state.player_status.HP -= 10
        if (state.player_status.HP < 0) {
          state.player_status.HP = 0
        }
        state.situation = "counter" + "10"
      }
    },
    setUserInfo(state, authInfo) {
      state.userInfo = authInfo
    },
    logout(state) {
      state.userInfo = { uid: null, name: null, email: null }
    }
  },
  actions: {
  },
  modules: {
  }
})
