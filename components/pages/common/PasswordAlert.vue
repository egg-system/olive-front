<template>
  <v-alert :value="true" type="error" outline>
    システムのリニューアルに伴い、以前ユーザー登録をした方はこちらからパスワードの再設定をお願いいたします。<br>
    <nuxt-link to="/password/reset">パスワードの再設定へ</nuxt-link>
  </v-alert>
</template>
