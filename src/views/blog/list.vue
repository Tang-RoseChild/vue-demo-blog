<template>
  <div id="blog-list">
    <list :blogs="blogs" @sourceClick="showBlogBySource" @tagClick="showBlogByTag" @itemClick="showDetailInfo"></list>
  </div>
</template>
<script>
import {BlogAPI} from '../../api/api.js'
import List from '../../components/list.vue'
import {SET_BLOG_MUTATION} from '../../store/store.js'

export default {
  components: {
    'list': List
  },
  data () {
    return {
      blogs: []
    }
  },
  mounted () {
    let self = this
    BlogAPI.list(function (resp) {
      if (resp.data.blogs && resp.data.blogs.length) {
        self.blogs = resp.data.blogs
      }
    })
  },
  methods: {
    showDetailInfo (item) {
      this.$router.push({name: 'detail-blog', params: {id: item.id}})
      this.$store.commit(SET_BLOG_MUTATION, item)
    },
    showBlogByTag (tag) {
      this.$router.push({name: 'tag-list', params: {tag: tag}})
    },
    showBlogBySource (source) {
      this.$router.push({name: 'source-list', params: {source: source}})
    }
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
