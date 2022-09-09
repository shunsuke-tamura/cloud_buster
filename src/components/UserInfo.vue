<template>
  <div id="container">
    <div id="user-name">
      {{ userName }}
    </div>
    <v-btn color="primary" elevation="1" small @click="logout"> logout </v-btn>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  computed: {
    userName() {
      return this.$store.state.userInfo.name;
    },
  },
  methods: {
    logout() {
      this.$store.commit("logout");
    },
  },
};
</script>

<style>
#container {
  display: flex;
  gap: 10px;
  justify-content: end;
  align-items: center;
}

#user-name {
  font-size: x-large;
  font-weight: bold;
}
</style>
