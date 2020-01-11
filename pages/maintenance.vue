<template>
  <section class="container">
    <v-container grid-list-xl>
      <v-layout column wrap>
        <v-alert :value="true" type="error" outline>
          本日23:00~24:00の間はメンテンナス作業中でございます。<br>
          メンテナンス完了までお待ちいただくか、<br>
          <a href="https://olivebodycare.healthcare/about/contact">メールフォーム</a>からご予約をお願いいたします。
        </v-alert>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  middleware: ['maintenance-redirector']
}
</script>
