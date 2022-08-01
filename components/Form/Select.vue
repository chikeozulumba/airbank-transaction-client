<template>
  <div :class="wrapperClassName">
    <label :for="param" :class="labelClassName">{{ label }}</label>
    <select
      :id="name"
      :name="name"
      :class="className"
      @change.prevent="handleOnChange"
    >
      <option selected :value="null">No Filter</option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.key }}
      </option>
    </select>
  </div>
</template>

<script>
import { slugify } from '~/utils'
export default {
  name: 'SelectComponent',
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
      this.$emit('changed', { key: this.name, value: evt.target.value })
    },
  },
}
</script>
