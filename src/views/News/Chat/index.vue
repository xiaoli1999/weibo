<template>
    <div class="chat">
        <NavBar :title="name" left-text="" left-arrow @click-left="onClickLeft" />
        <main></main>
        <van-search v-model="msg" shape="round" background="#fff" label="" placeholder="" show-action>
            <template #left>
                <div class="search-left" @click="handelClick">
                    <van-icon name="phone-circle-o" size="22px" />
                </div>
            </template>
            <template #action>
                <van-icon name="add-o" size="20px" @click="handelClick" />
            </template>
        </van-search>
    </div>
</template>

<script>
import { NavBar } from 'vant'

export default {
    name: 'Chat',
    components: { NavBar },
    data () {
        return {
            name: '',
            msg: '',
            chatList: []
        }
    },
    computed: {

    },
    created () {
        this.name = this.$route.query.name ?? '聊天'
    },
    methods: {
        onClickLeft () {
            this.$router.back()
        },
        handelClick () {
            this.$toast('该功能暂未实现')
        }

    }
}
</script>

<style lang="less" scoped>
.chat {
    width: 100%;
    background: #f7f8fa;

    main {
        width: 100%;
        height: calc(100vh - 92px);
    }

    /deep/ .van-search {
        padding: 6px 8px;

        .van-cell {
            line-height: 22px;
        }
    }

    /deep/ .van-search__content {
        border-radius: 60px;
        background: #f7f8fa;
    }

    /deep/ .van-field__left-icon {
        display: none;
    }

    .search-left {
        padding-right: 8px;
        color: #969696;
        position: relative;
        top: 1px;
    }

    /deep/ .van-search__action {
        padding-right: 0;
        position: relative;
        top: 1.5px;
        color: #e86b0f;
    }
}
</style>
