<template>
  <div>
    <TransactionView />
  </div>
</template>

<script>
export default {
  name: 'ViewTransactionPage',
  components: {
    TransactionView: () => import('~/views/Transaction.vue'),
  },
  head() {
    return {
      title: 'View Transaction',
    }
  },
}
</script>
