<template>
  <div :class="[type,{disabled}]" :style="$attrs.style">
    <template v-if="prefix">{{prefix}}</template>
    {{text}}
  </div>
</template>

<script>
export default {
  // inheritAttrs:false,
  data() {
    testMsg: 'test'
  },
  props: {
    Bcontent: {
      type: String,
      default: '确定',
      required: true
    },
    type: {
      type: String,
      default: 'info',
      validator(v) {
        return ['success', 'danger', 'info'].includes(v);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    prefix: {
      type: String
    },
    testFor: {
      type: Object
    }
  },
  data() {
    return {
      text: this.Bcontent
    }
  },
  methods: {
    loading() {
      this.text = 'loading';
      setTimeout(() => {
        this.text = this.Bcontent;
      }, 500);
    },
    show_msg() {
      alert('child component to main component')
    },
  },

  watch: {
    Bcontent(v) {
      this.text = v;
    }
  }

}

</script>

<style lang="scss" scoped>
div {
  display: inline-block;
  cursor: pointer;
  padding: 25px 35px;
  border-radius: 10px;
  background-color: #16a085;
  color: white;
  opacity: .6;
  transition-duration: 1s;
  font-size: 1.5rem;

  &:hover {
    opacity: 1;
    filter: drop-shadow(0 0 1em #dfe6e9);
  }

  &.info {
    background-color: #ddd;
  }

  &.success {
    background-color: #55efc4;
  }

  &.danger {
    background-color: firebrick;
  }

  &.disabled {
    background-color: #aaa !important;
    color: rgb(194, 194, 194);
    cursor: default;
  }

  &.special {
    background-color: #9b59b6;
  }
}
</style>