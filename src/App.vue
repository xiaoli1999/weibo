<template>
    <div id="app">
        <router-view :class="showFooter ? 'content has-bottom' : 'content'"></router-view>
        <Footer v-show="showFooter" />
    </div>
</template>

<script>
import Footer from '@/components/Footer'

export default {
    name: 'App',
    components: { Footer },
    data () {
        return {}
    },
    computed: {
        showFooter () {
            return (this.$route.name === 'home' || this.$route.name === 'news' || this.$route.name === 'user')
        }
    }
}
</script>

<style lang="less">
@import './less/allin.less';

#app {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    min-height: 100vh;
    background: #f7f8fa;
}

.content {
    width: 100%;
    min-height: 100vh;
}

.has-bottom {
    min-height: calc(100vh - 50px);
    padding-bottom: 50px;
}
</style>
