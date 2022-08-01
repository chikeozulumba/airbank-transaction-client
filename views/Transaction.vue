<template>
  <div
    class="bg-white p-8 max-w-[1200px] min-h-[95vh] my-[2.5vh] rounded-lg shadow-sm w-full mx-auto"
  >
    <h1 class="font-semibold uppercase">
      Transactions ({{ formatNumber(total) }})
    </h1>
  </div>
</template>

<script>
import transaction from '~/apollo/queries/transaction'

export default {
  name: 'TransactionView',
  apollo: {
    transaction() {
      return {
        query: transaction,
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
  },
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
