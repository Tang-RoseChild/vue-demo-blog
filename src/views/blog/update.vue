<template>
  <div>
    <editor
    :blog="blog"
    hasTitle hasTag hasSource hasDescription :enableCommit="enableCommit" @commit="commit"></editor>
    <v-alert error dismissible v-model="alert" id="upload-alert">
      {{errMsg}}
    </v-alert>
  </div>
</template>

<script>
import Editor from '../../components/editor.vue'
import {BlogAPI} from '../../api/api.js'

export default {
  data () {
    return {
      blog: {},
      errMsg: '',
      alert: false,
      enableCommit: true
    }
  },
  components: {
    editor: Editor
  },
  methods: {
    fetchData (id) {
      let self = this
      BlogAPI.get({id: id}, function (response) {
        console.log('response in update vue > ', response)
        if (response.data.blog) {
          self.blog = response.data.blog
        }
      })
    },
    commit (data) {
      let self = this
      self.enableCommit = false
      data.id = this.blog.id
      console.log('update data ', data)
      BlogAPI.update(data, function (response) {
        console.log('response >>>>>>> ', response)
        self.$router.push({name: 'detail-blog', params: {id: response.data.blog.id}})
      }, function (err) {
        console.log('error', err)
        self.errMsg = 'commit failed'
        self.alert = true
        self.enableCommit = true
      })
    }
  },
  created () {
    console.log('this.route param ', this.$route.params.id)
    this.fetchData(this.$route.params.id)
  }
}
</script>

<style>
#upload-alert {
  position: fixed;
  top: 40%;
  right: 0px;
  z-index: 1000;
}
</style>
