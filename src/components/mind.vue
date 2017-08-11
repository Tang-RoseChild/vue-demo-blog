<template>
  <div>
    <v-layout row >
      <v-dialog v-model="copyDialog" width="800">
        <div id="jsmind_container" ></div>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
/* eslint-disable */
import 'jsmind'
import 'jsmind/jsmind.css'

export default {
  props: {
    data: Array,
    dialog: Boolean
  },
  data () {
    return {
      copyDialog: false,
      options: null,
      mind: null,
      jm: null
    }
  },
  methods: {
    showDialog () {
      // this.dialog = true
      if (!this.jm) {
        this.mind = {
            meta:{
                'name': 'blog',
                'author': 'tang.rosechild@gmail.com',
            },
            format: 'node_array',
            data: this.data
        }
        this.options = {
            container: 'jsmind_container',
            editable: true,
            theme: 'primary'
        }
        // console.log('show dialog >> data \n ', this.mind.data)
        setTimeout(() => {
          this.jm = jsMind.show(this.options, this.mind)
          // this.jm.view.e_nodes.querySelectorAll('jmnode').forEach(function (val) {
          //   // console.log('val.nodeName  ', val.nodeName)
          //   if (val.nodeName === 'JMNODE') {
          //     val.setAttribute('title', val.innerText)
          //   }
          // })
        })
      } else {
        console.log('old jm >>>> >>>>>>>  >>>>>>>>>>')
        setTimeout(() => {
          this.mind.data = this.data
          this.jm.show(this.mind)
          // console.log('old jm >>>> ', this.jm.view.e_nodes)
          // this.jm.view.e_nodes.querySelectorAll('jmnode').forEach(function (val) {
          //   // console.log('val.nodeName  ', val.nodeName)
          //   if (val.nodeName === 'JMNODE') {
          //     val.setAttribute('title', val.innerText)
          //   }
          // })
          // console.log('jm >>> ', this.jm.view.e_nodes)
        })
      }
    }
  },
  watch: {
    dialog: function (newValue) {
      // console.log('watch diallog .... ', newValue)
      if (newValue) {
        this.copyDialog = true
        this.showDialog()
        // console.log('after show dialog')
      }
    },
    copyDialog (newValue) {
      if (!newValue) {
        this.$emit('update:dialog', newValue)
      }
    }
  }
}
</script>
<style>
#jsmind_container{
            width:800px;
            height:500px;
            border:solid 1px #ccc;
            /*background:#f4f4f4;*/
            background:#f4f4f4;
}

jmnode.selected {
  overflow: visible;
  white-space: normal;
  height: auto;
  z-index: 9999;
}
</style>