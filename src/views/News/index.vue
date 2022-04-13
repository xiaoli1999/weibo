<template>
    <div class="news">
        <header>
            <span></span>
            <van-badge :content="msgNum" max="99">
                <div>消息</div>
            </van-badge>
            <van-icon name="delete-o" color="#F56C6C" size="16" @click="clearMessage" />
        </header>
        <main>
            <van-search placeholder="请搜索聊天记录" input-align="center" background="#fff" />
            <div class="msg">
                <div class="msg-img" style="background: #27dede;line-height: 60px;">
                    <van-icon color="#fff" size="30" name="smile-o" />
                </div>
                <div class="msg-content">
                    <div class="msg-content-left">
                        @我的
                        <div class="msg-content-left-t"></div>
                        <div class="msg-content-left-b"></div>
                    </div>
                    <div class="msg-content-right">
                        <van-icon size="14" color="#c9c9c9" name="arrow" />
                    </div>
                </div>
            </div>
            <div class="msg">
                <div class="msg-img" style="background: #6aba6a;line-height: 60px;">
                    <van-icon color="#fff" size="30" name="comment-circle-o" />
                </div>
                <div class="msg-content">
                    <div class="msg-content-left">
                        评论
                        <div class="msg-content-left-t"></div>
                        <div class="msg-content-left-b"></div>
                    </div>
                    <div class="msg-content-right">
                        <van-icon size="14" color="#c9c9c9" name="arrow" />
                    </div>
                </div>
            </div>
            <div class="msg">
                <div class="msg-img" style="background: #49eb49;line-height: 60px;">
                    <van-icon color="#fff" size="30" name="good-job-o" />
                </div>
                <div class="msg-content">
                    <div class="msg-content-left">
                        赞
                        <div class="msg-content-left-t"></div>
                        <div class="msg-content-left-b"></div>
                    </div>
                    <div class="msg-content-right">
                        <van-icon size="14" color="#c9c9c9" name="arrow" />
                    </div>
                </div>
            </div>

            <div v-if="false" class="msg">
                <div class="msg-img">
                    <van-icon color="#fff" name="smile-o" />
                </div>
                <div class="msg-content">
                    <div class="msg-content-left">
                        <div class="msg-content-left-t"></div>
                        <div class="msg-content-left-b"></div>
                    </div>
                    <div class="msg-content-right">
                        <div class="msg-content-right-t"></div>
                        <div class="msg-content-right-b"></div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>

export default {
    name: 'News',
    data () {
        return {

        }
    },
    computed: {
        msgNum () {
            return 105
        }
    },
    created () {

    },
    methods: {
        clearMessage () {
            console.log('00')
        }
    }
}
</script>

<style lang="less" scoped>
.news {
    width: 100%;
    background: #f7f8fa;

    header {
        padding: 0 16px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        color: #222;
        font-weight: 600;
        letter-spacing: 1px;
        position: sticky;
        top: 0;
        border-bottom: 1px solid #ddd;

        /deep/ .van-badge--fixed {
            right: -8px;
        }
    }

    main {
        padding-bottom: 50px;

        /deep/ .van-search {
            padding: 10px 8px;

            .van-cell {
                line-height: 22px;
            }
        }

        /deep/ .van-search__content {
            border-radius: 60px;
            background: #f4f4f4;
        }

        .msg {
            background: #fff;
            padding: 10px 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .msg-img {
                width: 48px;
                height: 48px;
                flex-shrink: 0;
                text-align: center;
                line-height: 48px;
                margin-right: 16px;
                border-radius: 48px;
                border-bottom: 0.5px solid #f4f4f4;
            }

            .msg-content {
                width: 100%;
                height: 48px;
                border-bottom: 0.5px solid #ebedf0;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .msg-content-left {
                    width: 100%;
                    font-size: 15px;
                    font-weight: 600;
                    letter-spacing: 1px;
                }

                .msg-content-right {
                    padding-left: 8px;
                    flex-shrink: 0;
                    width: 100%;
                    min-width: 52px;
                    max-width: 72px;
                    text-align: right;
                }
            }
        }
    }
}
</style>
