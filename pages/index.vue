<template>
  <div>
    <TransactionView />
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  components: {
    TransactionView: () => import('~/views/Transactions.vue'),
  },
  head() {
    return {
      title: 'Transactions',
    }
  },
}
</script>
