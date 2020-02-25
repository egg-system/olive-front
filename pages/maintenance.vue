<template>
  <v-container grid-list-xl class="min-height mt-8">
    <v-layout justify-center>
      <v-flex>
        <v-alert :value="true" type="error" outlined>
          本日23:00~24:00の間はメンテンナス作業中でございます。<br>
          メンテナンス完了までお待ちいただくか、<br>
          <a href="https://olivebodycare.healthcare/about/contact">メールフォーム</a>からご予約をお願いいたします。
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  middleware: ['maintenance-redirector']
}
</script>
