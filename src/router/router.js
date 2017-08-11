import VueRouter from 'vue-router'

// const BlogList = resolve => require(['../views/blog/list.vue'], resolve)
const UploadBlog = resolve => require(['../views/blog/upload.vue'], resolve)
const UpdateBlog = resolve => require(['../views/blog/update.vue'], resolve)
const BlogDetail = resolve => require(['../views/blog/detail.vue'], resolve)
const TagList = resolve => require(['../views/blog/tag-list.vue'], resolve)
const SourceList = resolve => require(['../views/blog/source-list.vue'], resolve)
import BlogList from '../views/blog/list.vue'

const routes = [
  {
    path: '/blog/list',
    component: BlogList,
    children: [
      {path: '/tag/:tag', component: BlogList}
    ]
  },
  {path: '/blog/upload', component: UploadBlog},
  {path: '/blog/update/:id', name: 'update-blog', component: UpdateBlog},
  {path: '/blog/:id', name: 'detail-blog', component: BlogDetail},
  {path: '/blog/list/tag/:tag', name: 'tag-list', component: TagList},
  {path: '/blog/list/source/:source', name: 'source-list', component: SourceList},
  {path: '*', component: BlogList}
  // {path: '*', component: Mind}
]
let router = new VueRouter({
  routes
})

export default router
