<template>
  <div>
    <Transaction
      v-if="!$apollo.queries.transaction.loading && transaction"
      :transaction="transaction"
    />
  </div>
</template>

<script>
import transaction from '~/apollo/queries/transaction'

export default {
  name: 'ViewTransactionPage',
  apollo: {
    transaction() {
      return {
        query: transaction,
        prefetch: true,
        variables() {
          return {
            id: this.$route.params.id,
            relations: ['account', 'category'],
          }
        },
      }
    },
  },
  components: {
    Transaction: () => import('~/views/Transaction.vue'),
  },
  head() {
    return {
      title: 'View Transaction',
    }
  },
}
</script>
