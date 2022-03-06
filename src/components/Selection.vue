<template>
  <div class="selection" v-if="my_turn">
    <button class="option-button selection__button" @click="choice(0)"> {{options[0].word}} </button>
    <button class="option-button selection__button" @click="choice(2)"> {{options[2].word}} </button>
    <button class="option-button selection__button" @click="choice(3)"> {{options[3].word}} </button>
    <button class="option-button selection__button" @click="choice(1)"> {{options[1].word}} </button>
  </div>
</template>

<script>
export default {
  name: "Selection",
  data() {
    return {
      options: [],
      my_turn: false,
    }
  },
  created() {
    this.make_options()
    this.my_turn = true
  },
  methods: {
    make_options() {
      const clouds = ["Azure", "AWS", "GCP", "Heroku"]
      let damage = {Azure: 0, AWS: 0, GCP: 0, Heroku: 0}
      let n = Math.floor(Math.random() * 3) + 1
      damage.Azure = n
      for (let i = 0; i < n; i++) {
        this.options = this.options.concat([{cloud: "Azure", word: this.$store.state.wordList.Azure[0]}])
        this.$store.commit("deleteWord", `Azure`)
      }
      for (let i = 0; i < 4 - damage.Azure; i++) {
        n = Math.floor(Math.random() * 3) + 1
        damage[clouds[n]] += 1
        this.options = this.options.concat([{cloud: clouds[n], word: this.$store.state.wordList[clouds[n]][0]}])
        this.$store.commit("deleteWord", clouds[n])
      }
      for (const cloud of clouds) {
        damage[cloud] = (4 - damage[cloud]) % 4
      }
      // listをシャッフル
      for(var i = this.options.length - 1; i > 0; i--){
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = this.options[i];
        this.options[i] = this.options[r];
        this.options[r] = tmp;
      }
      this.$store.commit("setDamage", damage)
      console.log(this.options[0].cloud, this.options[0].word);
      console.log(this.options[1].cloud, this.options[1].word);
      console.log(this.options[2].cloud, this.options[2].word);
      console.log(this.options[3].cloud, this.options[3].word);
    },
    async choice(num) {
      this.my_turn = false
      this.$store.commit("attack", this.options[num].cloud)
      this.options = []
      this.make_options()
      await this.wait(4)
      this.counter()
      this.my_turn = true
    },
    counter() {
      const n = Math.floor(Math.random() * 4) + 1
      this.$store.commit("counter", n)
    },
    wait(sec) {
      return new Promise((resolve) => {
        setTimeout(resolve, sec*1000);
      })
    }
  }
}
</script>

<style lang="scss">
.selection {
  display: flex;
  justify-content: center;
  gap: 5px;
  flex-wrap: wrap;
  padding: 10px;
}

.option-button {
  width: 49%;
  height: 90px;
  border-radius: 15px 5px 15px 5px;
  font-size: 20pt;
  font-weight: blob;
  border: 3px solid black;
  color: black;
}
.option-button:hover {
  background-color: aqua;
}
</style>