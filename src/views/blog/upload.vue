<template>
  <div>
    <editor hasTitle hasTag hasSource hasDescription
    :enableCommit="enableCommit" @commit="commit"
    hasSaveBtn :enableSave="enableSave" @save="save"
    ></editor>
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
      id: '',
      errMsg: '',
      alert: false,
      enableCommit: true,
      enableSave: true
    }
  },
  components: {
    editor: Editor
  },
  methods: {
    commit (data) {
      let self = this
      self.enableCommit = false
      if (self.id) {
        data.id = self.id
      }
      console.log('commit data >>> ', data)
      BlogAPI.upload(data, function (response) {
        console.log('response >>>>>>> ', response)
        self.$router.push({name: 'detail-blog', params: {id: response.data.blog.id}})
      }, function (err) {
        console.log('error', err)
        self.errMsg = 'commit failed'
        self.alert = true
        self.enableCommit = true
      })
    },
    save (data) {
      let self = this
      data.id = self.id
      BlogAPI.update(data, function (response) {
        console.log('save blog')
        if ('blog' in response.data && 'id' in response.data.blog) {
          self.id = response.data.blog.id
        } else {
          console.log('error, response data format is wrong')
        }
      })
    }
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
