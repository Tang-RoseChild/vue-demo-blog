<template>
  <div id="blog-list">
    <list :blogs="blogs" @sourceClick="showBlogBySource" @itemClick="showDetailInfo"></list>
  </div>
</template>
<script>
import {BlogAPI} from '../../api/api.js'
import List from '../../components/list.vue'
export default {
  components: {
    'list': List
  },
  data () {
    return {
      blogs: []
    }
  },
  methods: {
    showDetailInfo (id) {
      console.log('itemClick ...  in tag-list ', id)
      this.$router.push({name: 'detail-blog', params: {id: id}})
    },
    showBlogBySource (source) {
      this.$router.push({name: 'source-list', params: {source: source}})
    }
  },
  created () {
    BlogAPI.tagList({tag: this.$route.params.tag}, resp => {
      if (resp.data.blogs && resp.data.blogs.length) {
        this.blogs = resp.data.blogs
      }
    })
  }
}
</script>

<style scoped>
.blog-list-card {
  margin-bottom: 1px;
}
#blog-list .blog-source {
  padding: 12px;
}
</style>
