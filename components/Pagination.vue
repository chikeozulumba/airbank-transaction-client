<template>
  <ul class="flex items-end space-x-2">
    <li class="rounded-lg overflow-hidden border border-slate-[#454545]">
      <button
        type="button"
        :disabled="isInFirstPage"
        class="text-[12px] p-2"
        @click="onClickFirstPage"
      >
        First
      </button>
    </li>

    <li class="rounded-lg overflow-hidden border border-slate-[#454545]">
      <button
        type="button"
        :disabled="isInFirstPage"
        class="text-[12px] p-2"
        @click="onClickPreviousPage"
      >
        Previous
      </button>
    </li>

    <li
      v-for="(page, index) in pages"
      :key="index"
      class="rounded-lg overflow-hidden border border-slate-[#454545]"
    >
      <button
        type="button"
        :disabled="page.isDisabled"
        :class="{ active: isPageActive(page.name) }"
        class="text-[12px] p-2"
        @click="onClickPage(page.name)"
      >
        {{ page.name }}
      </button>
    </li>

    <li class="rounded-lg overflow-hidden border border-slate-[#454545]">
      <button
        type="button"
        :disabled="isInLastPage"
        class="text-[12px] p-2"
        @click="onClickNextPage"
      >
        Next
      </button>
    </li>

    <li class="rounded-lg overflow-hidden border border-slate-[#454545]">
      <button
        type="button"
        :disabled="isInLastPage"
        class="text-[12px] p-2"
        @click="onClickLastPage"
      >
        Last
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1
      }

      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1
      }

      return this.currentPage - 1
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      )
    },
    pages() {
      const range = []

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        })
      }

      return range
    },
    isInFirstPage() {
      return this.currentPage === 1
    },
    isInLastPage() {
      return this.currentPage === this.totalPages
    },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1)
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1)
    },
    onClickPage(page) {
      this.$emit('pagechanged', page)
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1)
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages)
    },
    isPageActive(page) {
      return this.currentPage === page
    },
  },
}
</script>

<style scoped>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #454545;
  color: #fff;
}
</style>
