<template>
  <div
    class="bg-white p-8 max-w-[1200px] min-h-[95vh] my-[2.5vh] rounded-lg shadow-sm w-full mx-auto"
  >
    <h1 class="font-semibold uppercase">
      Transactions ({{ formatNumber(total) }})
    </h1>
    <div class="flex justify-between w-full mt-8">
      <div class="flex justify-start w-full gap-x-8">
        <Select
          name="accountId"
          class-name="border border-gray-300 p-2 w-full rounded-lg text-opacity-40 shadow-sm bg-blend-color-dodge text-[14px]"
          wrapper-class-name="grid max-w-[200px] w-full"
          label-class-name="text-sm text-gray-500 font-semibold"
          label="Account"
          :options="options"
          @changed="handleFilterChange"
        />
        <div class="flex gap-x-4">
          <InputDate
            name="startDate"
            class-name="border border-gray-300 p-2 w-full rounded-lg text-opacity-40 shadow-sm bg-blend-color-dodge text-[14px]"
            wrapper-class-name="grid max-w-[200px] w-full"
            label-class-name="text-sm text-gray-500 font-semibold"
            label="Start Date"
            @changed="handleFilterChange"
          />
          <InputDate
            name="endDate"
            class-name="border border-gray-300 p-2 w-full rounded-lg text-opacity-40 shadow-sm bg-blend-color-dodge text-[14px]"
            wrapper-class-name="grid max-w-[200px] w-full"
            label-class-name="text-sm text-gray-500 font-semibold"
            label="End Date"
            @changed="handleFilterChange"
          />
        </div>
      </div>
      <Pagination
        :total="total"
        :per-page="query.take"
        :total-pages="total"
        :current-page="query.currentPage"
        @pagechanged="onPageSelected"
      />
    </div>
    <div class="border-t border-gray-200 my-8"></div>
    <div>
      <TransactionsTable
        :transactions="transactions"
        @dateSorted="handleFilterChange"
        @selected="handleTransactionSelected"
      />
    </div>
  </div>
</template>

<script>
import TransactionsTable from '../components/TransactionsTable.vue'
import Select from '~/components/Form/Select.vue'
import InputDate from '~/components/Form/InputDate.vue'
import accounts from '~/apollo/queries/accounts'
import categories from '~/apollo/queries/categories'
import transactions from '~/apollo/queries/transactions'
import transactionsCount from '~/apollo/queries/transactions-count'
import Pagination from '~/components/Pagination.vue'

export default {
  name: 'TransactionView',
  apollo: {
    accounts: {
      query: accounts,
      prefetch: true,
      variables() {
        return {}
      },
    },
    categories: {
      query: categories,
      prefetch: true,
      variables() {
        return {}
      },
    },
    transactions() {
      return {
        query: transactions,
        prefetch: true,
        variables() {
          return {
            take: this.query.take,
            skip: this.query.skip,
            accountId: this.query.accountId,
            categoryId: this.query.categoryId,
            relations: ['category'],
            date: this.query.date,
            startDate: this.query.startDate,
            endDate: this.query.endDate,
          }
        },
      }
    },
    transactionsCount() {
      return {
        query: transactionsCount,
        prefetch: true,
        variables() {
          return {
            accountId: this.query.accountId,
            categoryId: this.query.categoryId,
          }
        },
      }
    },
  },
  components: { Select, InputDate, TransactionsTable, Pagination },
  data() {
    return {
      query: {
        skip: 0,
        take: 20,
        date: 'desc',
        startDate: null,
        endDate: null,
        currentPage: 1,
      },
    }
  },
  computed: {
    options() {
      return (this.accounts ?? []).map(({ id: value, name: key }) => ({
        key,
        value,
      }))
    },
    total() {
      return this.transactionsCount?.count || 0
    },
  },
  methods: {
    handleTransactionSelected(transaction) {
      return this.$router.push('/transactions/' + transaction.id)
    },
    handleFilterChange(data) {
      const { key, value } = data
      data = { [key]: value }
      if (key === 'accountId') {
        data = { ...data, skip: 0, currentPage: 1 }
      }
      this.query = Object.assign({}, this.query, data)
    },
    onPageSelected(currentPage) {
      this.query.currentPage = currentPage
      this.query = Object.assign({}, this.query, {
        skip: this.query.take * currentPage,
      })
    },
    formatNumber(number) {
      return new Intl.NumberFormat('en-GB', {
        style: 'decimal',
      }).format(number)
    },
  },
}
</script>
