<template>
  <div
    class="bg-white p-8 max-w-[800px] min-h-[35vh] mt-[5vh] rounded-lg shadow-sm w-full mx-auto"
  >
    <div class="flex items-center justify-between">
      <h1 class="font-semibold uppercase text-[25px]">
        {{ transaction.reference || 'No Reference Provided' }}
      </h1>
      <!-- <div class="text-gray-500 text-right font-bold">
        <h3 class="text-[14px]">{{ transaction.amount }}</h3>
        <h4 class="text-[14px] opacity-70">{{ transaction.currency }}</h4>
      </div> -->
      <div class="text-gray-500 font-bold text-right">
        <h2 class="text-[35px] flex items-end justify-end gap-x-2">
          {{ transaction.amount }}
          <h4 class="text-[35px] opacity-70">
            {{ transaction.currency }}
          </h4>
        </h2>
      </div>
    </div>

    <div class="w-fit flex items-center gap-x-2 text-gray-600">
      <div v-if="transaction.category" class="relative w-fit">
        <button
          role="button"
          class="px-4 py-1 text-gray-600/80 font-medium rounded"
          :class="[
            !transaction.category.color
              ? 'text-[14px] pl-0 text-opacity-80'
              : 'text-[12px]',
          ]"
          :style="{
            background:
              hexToRgbA('#' + transaction.category.color, 0.5) || 'transparent',
          }"
          @click.prevent="
            () => $router.push('/?categoryId=' + transaction.categoryId)
          "
        >
          {{ transaction.category.name }}
        </button>
      </div>
      &#x2022;
      <span class="text-gray-500">{{ dateFormatter(transaction.date) }}</span>
    </div>

    <div class="flex flex-col mt-8 justify-start gap-y-4">
      <a
        v-if="transaction.categoryId"
        :href="`/?categoryId=${transaction.categoryId}`"
        class="w-fit px-8 py-3 bg-slate-900 text-white font-thin text-[14px] hover:bg-slate-700 rounded-xl"
        role="button"
      >
        View Similar Category Transactions
      </a>
      <a
        v-if="transaction.accountId"
        :href="`/?accountId=${transaction.accountId}`"
        class="w-fit px-8 py-3 bg-slate-900 text-white font-thin text-[14px] hover:bg-slate-700 rounded-xl"
        role="button"
      >
        View Similar Account Transactions
      </a>
    </div>
  </div>
</template>

<script>
import { hexToRgbA } from '~/utils/color'

export default {
  name: 'TransactionView',
  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    hexToRgbA() {
      return hexToRgbA
    },
  },
  methods: {
    dateFormatter(date) {
      return new Date(date).toLocaleDateString()
    },
  },
}
</script>
