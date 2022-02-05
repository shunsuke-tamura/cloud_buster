<template>
  <div>
    <div id="name">{{name}}</div>
    <a class="flex-wrap">
      <div id="hp-bar"><div id="hp" :style="hp_width"></div></div>
      <div id="hp-num">{{hp}}/20</div>
    </a>
  </div>
</template>

<script>
export default {
  props: ["side"],
  name: "Status",
  data() {
    return {
      name: null,
    }
  },
  created() {
    if (this.side == "enemy") {
      this.name = this.$store.state.enemy_status.cloud
    }
    else {
      this.name = this.$store.state.player_status.cloud
    }
  },
  computed: {
    hp() {
      if (this.side == "enemy") {
        return this.$store.state.enemy_status.HP
      }
      else {
        return this.$store.state.player_status.HP
      }
    },
    hp_width() {
      return `width: ${116 * (this.hp / 20)}px;`
    }
  }
}
</script>

<style scoped>
#name {
  margin: 5px auto 3px 15px;
  border: 2px;
  font-size: 20px;
  font-weight: bold;
  width: 100px;
  height: 25px
}

#hp-bar {
  margin: 0px auto auto 10px;
  border: 2px solid;
  color: black;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  grid-column: 1;
  width: 120px;
  height: 10px;
}
#hp {
  background-color: darkcyan;
  height: 6px;
}

#hp-num {
  grid-column: 2;
  width: 60px;
  color: black;
}

.flex-wrap {
  display: grid;
  grid-template-columns: 140px 50px;
}
</style>