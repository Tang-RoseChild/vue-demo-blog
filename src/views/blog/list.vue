<template>
  <div id="blog-list">
    <v-layout row justify-center>
      <v-flex xs14 sm8 >
        <v-card v-for="item in blogs" :key="item" class="blog-list-card" >
          <v-card-title primary-title @click="showDetailInfo(item.id)">
            <div>
              <div class="headline">{{item.title}} </div>
              <div>{{item.description}}</div>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-chip v-if="item.source && item.source.length" label class="blog-source">{{item.source}}</v-chip>
            <div v-if="item.tag && item.tag.length">
              <v-chip v-for="tag in item.tag.split(' ')" v-if="tag  && tag.length" :key="tag">{{tag}}</v-chip>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import {BlogAPI} from '../../api/api.js'

export default {
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
    showDetailInfo (id) {
      console.log('id  in show deatial info > ', id)
      this.$router.push({name: 'detail-blog', params: {id: id}})
    },
    cardClick () {
      console.log('card clicked')
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
