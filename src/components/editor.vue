<template>
  <div>
    <v-layout row justify-center>
      <v-flex xs14 sm8>
        <v-card>
          <v-card-title v-if="hasHead">
            <h3>{{head}}</h3>
          </v-card-title>
          <div class="editor__markdown__header">
            <v-text-field v-if="hasTitle" v-model="blog.title" id="editor__markdow__title" type="text" placeholder="title"></v-text-field>
          </div>
          <div class="editor__markdown__header">
            <v-text-field  value="10" v-if="hasTag" v-model="blog.tag" placeholder="tag"> </v-text-field>
          </div>
          <div class="editor__markdown__header">
            <v-text-field  placeholder="source" v-if="hasSource" v-model="blog.source"> </v-text-field>
          </div>
          <div class="editor__markdown__header">
            <v-text-field  placeholder="description" v-if="hasDescription" v-model="blog.description"> </v-text-field>
          </div>
          <div id="editor__markdown"  >
            <input type="textarea" v-model="blog.content"  placeholder="content" />
          </div>
          <div>
            <v-btn :disabled="!enableSave" v-if="hasSaveBtn" class="light-blue lighten-2 white--text" @click.native.stop="save">save</v-btn>
            <v-btn :disabled="!enableCommit" class="light-blue lighten-2 white--text" @click.native.stop="commit" >commit</v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import 'simplemde/dist/simplemde.min.css'
import 'github-markdown-css'
import SimpleMDE from 'simplemde'
import marked from 'marked'

export default {
  props: {
    blog: {
      type: Object,
      default: function () {
        return {
          title: '',
          source: '',
          description: '',
          content: '',
          tag: ''
        }
      }
    },
    enableSave: Boolean,
    hasSaveBtn: Boolean,
    hasDescription: Boolean,
    hasSource: Boolean,
    enableCommit: Boolean,
    hasTag: Boolean,
    hasHead: Boolean,
    hasTitle: Boolean,
    head: String
  },
  data () {
    return {
      description: '',
      source: '',
      tag: '',
      title: '',
      mde: null
    }
  },
  mounted () {
    console.log('this props blog: ', this.blog)
    let ele = document.querySelector('#editor__markdown input')
    let self = this
    console.log('self.blog.content ', self.blog.content)
    this.mde = new SimpleMDE({element: ele, initialValue: self.blog.content})
  },
  methods: {
    save () {
      this.$emit('save', this.genEditInfo())
    },
    commit () {
      this.$emit('commit', this.genEditInfo())
    },
    genEditInfo () {
      let content = this.mde.value()
      var div = document.createElement('div')
      div.innerHTML = marked(content)

      if (!this.blog.description.length) {
        let directP = div.querySelectorAll('div > p')
        let headerEle = div.querySelectorAll('div > h1, div > h2, div > h3, div > h4, div > h5, div > h6')
        let p = div.querySelector('p')
        if (directP && directP.length) {
          this.blog.description = directP[0].innerText
        } else if (headerEle && headerEle.length) {
          this.blog.description = headerEle[0].innerText
        } else if (p) {
          this.blog.description = p.innerText
        }
      }
      this.blog.content = content
      return this.blog
    }
  },
  watch: {
    'blog.content': {
      handler: function () {
        this.mde.value(this.blog.content)
      },
      deep: true
    }
  }
}
</script>

<style >

.editor__markdown__header .input-group {
  margin: 0px !important;
}
.editor__markdown__header .input-group__details {
  min-height: 1px !important;
  padding-top: 0px !important;
}
.editor__markdown__header .input-group__input {
  padding: 10px !important;
}

/* #editor__markdown__tag .input-group {
  margin: 0px !important;
}
#editor__markdown__tag .input-group__details {
  min-height: 1px !important;
  padding-top: 0px !important;
}
#editor__markdown__tag .input-group__input {
  padding: 10px !important;
} */


.editor__markdown__header input{
  height: auto !important;
}


#editor__markdown .editor-toolbar {
   border-top: 0px !important;
   border-left: 0px !important;
   border-right: 0px !important;
   border-top-left-radius: 0px !important;
   border-top-right-radius: 0px !important;
}

#editor__markdown .CodeMirror {
  border: 0px !important;
  border-bottom-left-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  border-top: 1px solid #ddd !important;
  border-bottom: 1px solid #ddd !important;
}
#editor__markdown .editor-statusbar {
  border-bottom: 1px solid #ddd !important;
}
</style>
