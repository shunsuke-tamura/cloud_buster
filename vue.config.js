module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: "https://tatakimaru.azurewebsites.net"
  }
}
