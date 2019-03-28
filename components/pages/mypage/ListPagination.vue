<template>
  <div class="text-xs-center">
    <v-pagination
      v-model="page"
      :length="10"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    page: 3
  })
}
</script>
