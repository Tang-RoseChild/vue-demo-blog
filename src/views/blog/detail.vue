<template>
  <div>
    <v-layout row justify-center>
      <v-flex xs16 sm10>
        <v-card >
          <div>
            <v-btn class="light-blue lighten-2 white--text" @click.native.stop="edit" v-if="isAdmin">Edit</v-btn>
          </div>
          <v-divider></v-divider>
          <div class="detail-header" >
            <h3 v-if="blog.title" >{{blog.title}}</h3>
          </div>
          <v-divider></v-divider>
          <div v-html="afterMarked" class="markdown-body">
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import marked from 'marked'
import {BlogAPI} from '../../api/api.js'
import 'github-markdown-css'
import user from '../../global/global.js'

export default {
  data () {
    return {
      blog: {}
    }
  },
  mounted () {
    // console.log('this.$router.params', this.$route.params.id)
    // fetch data
    this.fetchData(this.$route.params.id)
  },
  methods: {
    fetchData (id) {
      let self = this
      BlogAPI.get({id: id}, function (response) {
        // console.log('response in detail vue > ', response)
        if (response.data.blog) {
          self.blog = response.data.blog
        }
      })
    },
    edit () {
      this.$router.push({name: 'update-blog', params: {id: this.blog.id}})
    }
  },
  computed: {
    afterMarked () {
      if (this.blog.content) {
        return marked(this.blog.content, {sanitize: true})
      }
    },
    isAdmin () {
      if (user.mobile.length) {
        return true
      }
      return false
    }
  }
}
</script>

<style>
.markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		 padding: 25px;
}

.detail-header {
  text-align: center;
}
.detail-header h3 {
  margin-bottom: 0px;
}
</style>
