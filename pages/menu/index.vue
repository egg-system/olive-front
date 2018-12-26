<template>
  <section class="container">
    <div>
      <h1>menu</h1>
      <div class="text-xs-center">
        <nuxt-link to="/date">
          日時
        </nuxt-link>
      </div>
      <div class="text-xs-center">
        <nuxt-link to="/option">
          オプション
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
