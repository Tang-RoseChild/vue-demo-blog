<template>
  <div>
    <v-layout row justify-center>
      <v-flex xs16 sm10>
        <v-card v-if="blog">
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
import 'github-markdown-css'

export default {
  methods: {
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
    user () {
      return this.$store.state.user
    },
    blog () {
      return this.$store.state.blog
    },
    isAdmin () {
      return this.$store.getters.isAdmin
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
