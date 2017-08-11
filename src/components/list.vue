<template>
  <div id="blog-list">
    <v-layout row justify-center v-show="!dialog">
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
            <div class="point-tree">
              <v-chip @click.native.stop="showDialog(item)">point-tree</v-chip>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <mind :data="data" :dialog.sync="dialog" @update:dialog="val => dialog = val"></mind>
  </div>
</template>
<script>
/* eslint-disable */
import marked from 'marked'
import Mind from './mind.vue'
export default {
  components: {
    mind: Mind
  },
  data () {
    return {
      data: [],
      options: null,
      mind: null,
      jm: null,
      dialog: false
    }
  },
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
    },
    showDialog (item) {
      // console.log('content ', content)
      this.dialog = true
      this.data = JSON.parse(item.points)
      // console.log('points ::: ', item.points, ' after json:: ', JSON.parse(item.points))
      // console.log('points ::: ', item.points)
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
.point-tree {
  position: absolute;
  right: 5px;
}
</style>
