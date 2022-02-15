<template>
  <div id="sys-msg">
    <a id="text">{{text}}</a>
  </div>
</template>

<script>
export default {
  name: "SystemMsg",
  data() {
    return {
      damage_se: new Audio(require('@/assets/sounds/damage_se.mp3')),
      bigdamage_se: new Audio(require('@/assets/sounds/bigdamage_se.mp3')),
    }
  },
  computed: {
    text() {
      const situation = this.$store.state.situation
      const cloud = this.$store.state.enemy_status.cloud
      if (situation == "start") {
        return `共に競い合う中でもあるけど、何かと比較されるのが若干鼻につくから倒したい"${cloud}"に勝負を仕掛けた`
      }
      else if (situation.indexOf('attack faild') > -1) {
        const recovery = situation.replace('attack faild', "")
        return `相手の特性"${cloud}ボディー"によってAzureの攻撃を吸収された！相手の体力が${recovery}回復した`
      }
      else if (situation == "attack perfect") {
        this.bigdamage_se.play()
        return `Azureの攻撃が${cloud}のセキュリティホールにあたった！${cloud}に3ダメージ！`
      }
      else if (situation.indexOf('attack success') > -1) {
        this.damage_se.play()
        const attack = situation.replace('attack success', "")
        return `Azureの攻撃が命中した！${cloud}に${attack}ダメージ！`
      }
      else if (situation == "can not attack") {
        return `大人な事情によりAzureは体がしびれて動けなった`
      }
      else if (situation.indexOf('counter') > -1) {
        const damage = situation.replace("counter", "")
        if (Number(damage) >= 3) {
          this.bigdamage_se.play()
          return `Azureのセキュリティホールに攻撃があたった！Azureに${damage}ダメージ！`
        }
        else {
          this.damage_se.play()
          return `${cloud}からの反撃！${damage}ダメージを受けた！`
        }
      }
      else if (situation == "win") {
        return `${cloud}との勝負に勝利した`
      }
      else if (situation == "lose") {
        return `${cloud}に敗北した`
      }
      else {
        return ""
      }
    }
  }
}
</script>

<style scoped>
#sys-msg {
  display: grid;
  place-items: center;
  border: 3px solid;
  margin: 10px 10px auto 10px;
  height: 65px;
}

#text {
  color: #263806;
  font-weight: 800;
  padding: 5px;
}
</style>