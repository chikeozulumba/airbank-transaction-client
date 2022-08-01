<template>
  <div :class="wrapperClassName">
    <label :for="param" :class="labelClassName">{{ label }}</label>
    <input
      :id="name"
      type="date"
      :name="name"
      :class="className"
      @change.prevent="handleOnChange"
    />
  </div>
</template>

<script>
import { slugify } from '~/utils'
export default {
  name: 'InputDateComponent',
  props: {
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    wrapperClassName: {
      type: String,
      default: '',
    },
    labelClassName: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    param() {
      return slugify(this.name)
    },
  },
  methods: {
    handleOnChange(evt) {
      this.$emit('changed', {
        key: this.name,
        value: evt.target.value,
      })
    },
  },
}
</script>
