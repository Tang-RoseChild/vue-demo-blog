<template>
  <div id="blog-list">
    <v-layout row justify-center>
      <v-flex xs14 sm8 >
        <v-card v-for="(item, idx) in blogs" :key="idx" class="blog-list-card" >
          <v-card-title primary-title @click="showDetailInfo(item.id)">
            <div>
              <div class="headline">{{item.title}} </div>
              <div>{{item.description}}</div>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-chip @click.native="sourceClick(item.source)" v-if="item.source && item.source.length" label class="blog-source">{{item.source}}</v-chip>
            <div v-if="item.tag && item.tag.length">
              <v-chip v-for="tag in item.tag.split(' ')" v-if="tag  && tag.length" :key="tag" @click.native="tagClick(tag)">{{tag}}</v-chip>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  props: {
    blogs: Array
  },
  methods: {
    showDetailInfo (id) {
      this.$emit('itemClick', id)
    },
    tagClick (tag) {
      this.$emit('tagClick', tag)
    },
    sourceClick (source) {
      this.$emit('sourceClick', source)
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
