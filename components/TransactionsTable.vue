<template>
  <div class="mt-4 -mb-3">
    <div class="not-prose relative bg-gray-100/60 overflow-hidden">
      <div class="relative overflow-auto">
        <div class="shadow-sm overflow-hidden">
          <table class="border-collapse table-auto w-full text-sm">
            <thead class="mt-8">
              <tr>
                <th
                  class="border-b font-medium p-4 pl-8 pb-3 text-gray-500 text-left pt-3"
                >
                  Reference
                </th>
                <th
                  class="border-b font-medium p-4 pb-3 text-gray-500 text-left pt-3"
                >
                  Category
                </th>
                <th
                  class="border-b font-medium p-4 pr-8 pb-3 text-gray-500 text-left pt-3 cursor-pointer"
                >
                  <button @click="toggledateAscition">
                    Date {{ !dateAsc ? '&#x2193;' : '&#x2191;' }}
                  </button>
                </th>
                <th
                  class="border-b font-medium p-4 pr-8 pb-3 text-gray-500 text-right pt-3"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr
                v-for="(transaction, index) in transactions"
                :key="index"
                class="cursor-pointer hover:bg-slate-100/40"
                :class="[index % 2 && 'bg-slate-50']"
                @click.prevent="() => $emit('selected', transaction)"
              >
                <td class="border-b border-gray-300 p-4 pl-8 text-gray-500">
                  <span
                    v-if="transaction.reference"
                    class="text-gray-800 font-medium"
                    >{{ transaction.reference }}</span
                  >
                  <span v-else class="opacity-70">No reference provided</span>
                </td>
                <td class="border-b border-gray-300 p-4 text-gray-500">
                  <div v-if="transaction.category" class="relative w-fit">
                    <div
                      class="px-4 py-1 text-gray-600/80 font-medium rounded"
                      :class="[
                        !transaction.category.color
                          ? 'text-[14px] pl-0 text-opacity-80'
                          : 'text-[12px]',
                      ]"
                      :style="{
                        background: transaction.category.color || 'transparent',
                      }"
                    >
                      {{ transaction.category.name }}
                    </div>
                  </div>
                  <span v-else class="text-[14px]">No category provided</span>
                </td>
                <td
                  class="border-b border-gray-300 p-4 pr-8 text-gray-500 text-[14px]"
                >
                  {{ dateFormatter(transaction.date) }}
                </td>
                <td
                  class="border-b border-gray-300 p-4 pr-8 text-gray-500 text-right font-bold"
                >
                  <span class="text-[14px]">{{ transaction.amount }}</span>
                  <span class="text-[14px] opacity-70">{{
                    transaction.currency
                  }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionTable',
  props: {
    transactions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dateAsc: false,
    }
  },
  methods: {
    dateFormatter(date) {
      return new Date(date).toLocaleDateString()
    },
    toggledateAscition() {
      this.dateAsc = !this.dateAsc
      this.$emit('dateSorted', {
        key: 'date',
        value: this.dateAsc ? 'asc' : 'desc',
      })
    },
  },
}
</script>
