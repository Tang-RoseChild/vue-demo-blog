<template>
  <div id="blog-list">
    <list :blogs="blogs" @tagClick="showBlogByTag" @itemClick="showDetailInfo"></list>
  </div>
</template>
<script>
import {BlogAPI} from '../../api/api.js'
import List from '../../components/list.vue'
// import {simpleStore} from '../../global/global.js'
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
  methods: {
    showDetailInfo (item) {
      this.$router.push({name: 'detail-blog', params: {id: item.id}})
      // simpleStore.setBlogAction(item)
      this.$store.commit(SET_BLOG_MUTATION, item)
    },
    showBlogByTag (tag) {
      this.$router.push({name: 'tag-list', params: {tag: tag}})
    }
  },
  created () {
    // console.log('in source-list vue ', this.$route.params.source)
    BlogAPI.sourceList({source: this.$route.params.source}, resp => {
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
