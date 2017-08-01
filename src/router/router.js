import VueRouter from 'vue-router'

import BlogList from '../views/blog/list.vue'
import UploadBlog from '../views/blog/upload.vue'
import UpdateBlog from '../views/blog/update.vue'
import BlogDetail from '../views/blog/detail.vue'

const routes = [
  {path: '/blog/list', component: BlogList},
  {path: '/blog/upload', component: UploadBlog},
  {path: '/blog/update/:id', name: 'update-blog', component: UpdateBlog},
  {path: '/blog/:id', name: 'detail-blog', component: BlogDetail},
  {path: '*', component: BlogList}
]
let router = new VueRouter({
  routes
})

export default router
