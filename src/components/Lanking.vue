<template>
  <div>
    <div id="laking-header">
      <v-btn color="primary" elevation="1" @click="close"> ＜閉じる </v-btn>
      <div id="cloud-selector">
        <v-select
          v-model="selectedCloud"
          :items="clouds"
          dense
          outlined
          hide-details
        >
        </v-select>
      </div>
    </div>
    <div id="lanking-title">
      {{ selectedCloud === "all" ? "全" : selectedCloud }}信者ランキング
    </div>
    <v-simple-table fixed-header height="490">
      <thead>
        <tr>
          <th class="column-content --lanking"></th>
          <th class="column-content">ユーザー名</th>
          <th v-if="selectedCloud === 'all'" class="column-content">マイクラウド</th>
          <th class="column-content">増やした人数</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in lankingData[selectedCloud]" :key="item.uid">
          <td class="row-content --lanking">{{ index + 1 }}</td>
          <td class="row-content">{{ item.name }}</td>
          <td v-if="selectedCloud === 'all'" class="row-content">{{ item.cloud }}</td>
          <td class="row-content">{{ item.change }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: "Lanking",
  props: ["data"],
  data() {
    return {
      clouds: ["Azure", "AWS", "GCP", "Heroku", "all"],
      selectedCloud: "Azure",
    };
  },
  computed: {
    lankingData() {
      return this.data;
    },
  },
  methods: {
    close() {
      this.$emit("close-lanking");
    },
  },
};
</script>

<style>
#laking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
}

#cloud-selector {
  margin-top: 10px;
  margin-left: 10px;
  width: 110px;
}

#lanking-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.column-content {
  font-weight: bold !important;
  font-size: 16px !important;
}

.row-content {
  font-weight: bold !important;
}

.--lanking {
  width: 100px !important;
  text-align: center !important;
}
</style>
