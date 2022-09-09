<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab>Login</v-tab>
      <v-tab>SignUp</v-tab>
    </v-tabs>
    <v-form ref="form" v-model="form" class="pa-4 pt-6">
      <v-text-field
        v-model="email"
        :rules="[rules.email]"
        label="email"
        prepend-icon="mdi-email"
      ></v-text-field>
      <v-text-field
        v-if="tab === 1"
        v-model="userName"
        :rules="[rules.required]"
        label="user name"
        prepend-icon="mdi-account"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.length(6)]"
        label="password"
        type="password"
        prepend-icon="mdi-lock"
      ></v-text-field>
    </v-form>
    <v-row justify="center">
      <div id="faild-msg">
        {{ faildMsg }}
      </div>
    </v-row>
    <v-row justify="center">
      <v-btn
        v-if="tab === 0"
        :disabled="!form"
        color="primary"
        elevation="1"
        large
        @click="login"
      >
        login
      </v-btn>
      <v-btn
        v-else
        :disabled="!form"
        color="primary"
        elevation="1"
        large
        @click="signup"
      >
        signup
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import { login, signup } from "../lib/auth";
import { addUserInfo, getUserInfo } from "../lib/fireStore";
export default {
  name: "Authentication",
  data() {
    return {
      tab: 0,
      form: false,
      email: undefined,
      userName: undefined,
      password: undefined,
      rules: {
        email: (v) =>
          !!(v || "").match(/@/) || "正しいメールアドレスを入力してください",
        length: (len) => (v) =>
          (v || "").length >= len || `${len}桁以上の長さを設定してください`,
        required: (v) => !!v || "必須項目です",
      },
      faildMsg: undefined,
    };
  },
  watch: {
    tab() {
      this.faildMsg = undefined;
    },
  },
  methods: {
    async login() {
      this.faildMsg = undefined;
      const res = await login(this.email, this.password);
      console.log("login");
      if (!res.error) {
        const userInfo = await getUserInfo(res.authInfo.uid);
        console.log("success");
        this.faildMsg = undefined;
        this.$store.commit("setUserInfo", {
          ...res.authInfo,
          name: userInfo.name,
        });
      } else {
        this.faildMsg = "アカウントの情報が間違っています";
      }
    },
    async signup() {
      this.faildMsg = undefined;
      const authRes = await signup(this.email, this.userName, this.password);
      console.log("signup");
      if (!authRes.error) {
        const dbRes = await addUserInfo(
          authRes.authInfo.uid,
          authRes.authInfo.name
        );
        if (!dbRes.error) {
          console.log("success");
          this.faildMsg = undefined;
          this.$store.commit("setUserInfo", authRes.authInfo);
        } else {
          this.faildMsg = "アカウントの登録に失敗しました";
        }
      } else {
        this.faildMsg = "このメールアドレスは既に使用されています";
      }
    },
  },
};
</script>

<style lang="scss">
#faild-msg {
  color: red;
  margin-bottom: 10px;
}
</style>
