<template>
  <div>
    <p id="text">{{ text }}</p>
  </div>
</template>

<script>
import { addCloudValueChange } from '../lib/fireStore';

export default {
  name: "SystemMsg",
  data() {
    return {
      damage_se: new Audio(require("@/assets/sounds/damage_se.mp3")),
      bigdamage_se: new Audio(require("@/assets/sounds/bigdamage_se.mp3")),
    };
  },
  computed: {
    text() {
      const situation = this.$store.state.situation;
      const enemyCloud = this.$store.state.enemy_status.cloud;
      const playerCloud = this.$store.state.player_status.cloud;
      if (situation == "start") {
        return `共に競い合う中でもあるけど、何かと比較されるのが若干鼻につくから倒したい"${enemyCloud}"に勝負を仕掛けた`;
      } else if (situation.indexOf("attack faild") > -1) {
        const recovery = situation.replace("attack faild", "");
        return `特性"${enemyCloud}ボディー"によって${playerCloud}の攻撃を吸収された！\n相手の体力が${recovery}回復した`;
      } else if (situation == "attack perfect") {
        this.bigdamage_se.play();
        return `${playerCloud}の攻撃が${enemyCloud}のセキュリティホールにあたった！\n${enemyCloud}に3ダメージ！`;
      } else if (situation.indexOf("attack success") > -1) {
        this.damage_se.play();
        const attack = situation.replace("attack success", "");
        return `${playerCloud}の攻撃が命中した！\n${enemyCloud}に${attack}ダメージ！`;
      } else if (situation == "can not attack") {
        return `大人な事情により${playerCloud}は体がしびれて動けなった`;
      } else if (situation.indexOf("counter") > -1) {
        const damage = situation.replace("counter", "");
        if (Number(damage) >= 3) {
          this.bigdamage_se.play();
          return `${playerCloud}のセキュリティホールに攻撃があたった！\n${playerCloud}に${damage}ダメージ！`;
        } else {
          this.damage_se.play();
          return `${enemyCloud}からの反撃！\n${damage}ダメージを受けた！`;
        }
      } else if (situation == "win") {
        console.log("updateDB");
        const add = Math.floor(Math.random() * 100000) + 1;
        this.updateDB(playerCloud, enemyCloud, add)
        return `${enemyCloud}との勝負に勝利した!\n${enemyCloud}ユーザーを${add}人${playerCloud}に染め上げた！`;
      } else if (situation == "lose") {
        return `${enemyCloud}に敗北した...\n目の前が真っ青になった`;
      } else {
        return "";
      }
    },
  },
  methods: {
    async updateDB(to, from, value) {
      await addCloudValueChange(to, from, value, this.$store.state.userInfo)
    }
  }
};
</script>

<style>
#text {
  color: #263806;
  font-weight: 800;
  padding: 5px;
  white-space: pre-line;
  word-wrap: break-word;
}
</style>
