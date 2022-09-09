<template>
  <div>
    <p id="text">{{ text }}</p>
  </div>
</template>

<script>
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
      const cloud = this.$store.state.enemy_status.cloud;
      if (situation == "start") {
        return `共に競い合う中でもあるけど、何かと比較されるのが若干鼻につくから倒したい"${cloud}"に勝負を仕掛けた`;
      } else if (situation.indexOf("attack faild") > -1) {
        const recovery = situation.replace("attack faild", "");
        return `相手の特性"${cloud}ボディー"によってAzureの攻撃を吸収された！\n相手の体力が${recovery}回復した`;
      } else if (situation == "attack perfect") {
        this.bigdamage_se.play();
        return `Azureの攻撃が${cloud}のセキュリティホールにあたった！\n${cloud}に3ダメージ！`;
      } else if (situation.indexOf("attack success") > -1) {
        this.damage_se.play();
        const attack = situation.replace("attack success", "");
        return `Azureの攻撃が命中した！\n${cloud}に${attack}ダメージ！`;
      } else if (situation == "can not attack") {
        return `大人な事情によりAzureは体がしびれて動けなった`;
      } else if (situation.indexOf("counter") > -1) {
        const damage = situation.replace("counter", "");
        if (Number(damage) >= 3) {
          this.bigdamage_se.play();
          return `Azureのセキュリティホールに攻撃があたった！\nAzureに${damage}ダメージ！`;
        } else {
          this.damage_se.play();
          return `${cloud}からの反撃！\n${damage}ダメージを受けた！`;
        }
      } else if (situation == "win") {
        const add = Math.floor(Math.random() * 100000) + 1;
        return `${cloud}との勝負に勝利した!\nAzureユーザーを${add}人増やした！`;
      } else if (situation == "lose") {
        return `${cloud}に敗北した...\n目の前が真っ青になった`;
      } else {
        return "";
      }
    },
  },
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
