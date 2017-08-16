<template>
<v-app>
  <v-navigation-drawer temporary v-model="drawer" >
    <v-list>
      <v-list-tile avatar tag="div">
        <v-list-tile-avatar>
            <img :src="account.avatar" />
        </v-list-tile-avatar>
        <v-list-tile-content>
            <v-list-tile-title>{{account.mobile}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-divider></v-divider>
    <v-list >
      <v-list-tile to="/blog/list">
        <v-list-tile-action >
          <v-btn icon >
            <v-icon >home</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>home page</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-list >
      <v-list-tile to="/blog/upload">
        <v-list-tile-action >
          <v-btn icon >
            <v-icon >edit</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>write blog</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar class="light-blue lighten-2" >
    <v-toolbar-side-icon v-show="sideIcon" @click.native.stop="drawer = true"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">你行你上啊 -></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click.native.stop="showDialog">
      <v-icon>account_circle</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" lazy absolute>
        <v-card>
          <v-card-title>
            <span>Login</span>
          </v-card-title>
          <v-card-text>
            <v-text-field prepend-icon="account_box" v-model="loginForm.mobile"></v-text-field>
            <v-text-field prepend-icon="lock" type="password" v-model="loginForm.password"></v-text-field>
            <div id="login-btn">
              <v-btn class="light-blue lighten-2 white--text" @click.native="login">
                commit
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
    </v-dialog>
  </v-toolbar>
  <v-snackbar
    :timeout="timeout"
    v-model="snackbar.open"
    top
    :success="snackbar.context === 'success'"
    :error="snackbar.context === 'error'"
  >
  {{snackbar.text}}
  </v-snackbar>
  <main>
    <v-container fluid>
      <router-view :key="$route.fullPath"></router-view>
    </v-container>
  </main>
</v-app>
</template>

<script>
import {AdminAPI} from './api/api.js'
import store, {SET_USER_MUTATION} from './store/store.js'

export default {
  name: 'app',
  store,
  data () {
    return {
      mini: false,
      drawer: false,
      timeout: 3000,
      sideIcon: false,
      dialog: false,
      snackbar: {
        open: false,
        context: 'info',
        text: ''
      },
      loginForm: {
        mobile: '',
        password: ''
      }
    }
  },
  computed: {
    account () {
      return this.$store.state.user
    }
  },
  methods: {
    showSideIcon () {
      this.sideIcon = !this.sideIcon
    },
    showDialog () {
      this.dialog = !this.dialog
    },
    login () {
      // console.log('login ......', this.loginForm)
      let self = this
      AdminAPI.Login(self.loginForm, function (resp) {
        console.log('login resp >> ', resp)
        if (resp.data.success) {
          self.sideIcon = true
          self.dialog = false
          self.snackbar.open = true
          self.snackbar.context = 'success'
          self.snackbar.text = 'welcome ~'
          self.$store.commit(SET_USER_MUTATION, resp.data.account)
        } else {
          self.snackbar.open = true
          self.snackbar.context = 'error'
          self.snackbar.text = 'login failed'
        }
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
