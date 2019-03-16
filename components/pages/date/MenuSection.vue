<template>
  <section class="selected-menu">
    <div>
      <registration-menu :is-first="false"/>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import RegistrationMenu from '~/components/pages/common/RegistrationMenu.vue'
export default {
  components: {
    RegistrationMenu
  }
}
</script>
