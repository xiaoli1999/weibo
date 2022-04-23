<template>
    <div class="info">
        <NavBar title="微博正文" left-text="" left-arrow @click-left="$router.back()" fixed/>
        <van-pull-refresh v-model="refreshLoading" success-text="微博正文更新成功" @refresh="onRefresh">
            <header class="header">
                <img v-if="info.userInfo && info.userInfo.headPortrai" class="header-img" :src="info.userInfo.headPortrai" alt="">
                <div class="header-content">
                    <div v-if="info.userInfo && info.userInfo.nickname" class="header-content-top">{{ info.userInfo.nickname }}</div>
                    <div class="header-content-bot">更新于{{ info.updateTime }} 来自 {{ info.city }}</div>
                </div>
                <div class="header-btn" @click="attention">
                    <van-button v-if="info.isAttention" icon="success" type="info" color="#999" size="small" round plain>已关注</van-button>
                    <van-button v-else icon="plus" type="info" color="#ff8200" size="small" round plain>关注</van-button>
                </div>
            </header>
            <main>{{ info.wbContent }}</main>
            <div v-if="info.imgList && info.imgList.length" class="main-img">
                <div v-for="(i, idx) in info.imgList" :key="idx">
                    <img :src="i" alt="" @click.stop="previewImg(info.imgList, idx)">
                </div>
            </div>
            <div class="line"></div>
            <van-sticky :offset-top="46">
                <div class="tab-h">
                    <div class="tab-h-left">
                        <div :class="tab === 0 ? 'active' : ''" @click="tab=0">转发 {{ info.shareNum ? info.shareNum : '' }}</div>
                        <div :class="tab === 1 ? 'active' : ''" @click="tab=1">评论 {{ info.commentNum ? info.commentNum : '' }}</div>
                    </div>
                    <div class="tab-h-right">赞 {{ info.likeNum ? info.likeNum : '' }}</div>
                </div>
            </van-sticky>
            <div class="share" v-show="tab===0">
                <div class="share-wrap">
                    <div v-for="(item , index) in shareList.slice(0, 10)" :key="index">
                        <img v-if="item.wbForwardUser && item.wbForwardUser.headPortrai"  :src="item.wbForwardUser.headPortrai" alt="">
                    </div>
                    <div>等人已转发</div>
                </div>
                <div class="share-panel">
                    <div @click="share">
                        <van-icon name="share-o" color="#696969" size="20" />
                         {{ info.forwardingNum }}
                    </div>
                    <div @click="tab=1">
                        <van-icon name="chat-o" color="#696969" size="20" />
                         {{ info.evaluationNum }}
                    </div>
                    <div @click.stop="praise">
                        <van-icon v-if="info.isPraise" name="good-job-o" color="#ff8200" size="20" />
                        <van-icon v-else name="good-job-o" color="#696969" size="20" />
                        {{ info.likeNum ? info.likeNum : 0 }}
                    </div>
                </div>
            </div>
            <div class="comment" v-show="tab===1">
                <div v-if="commentList && commentList.length">
                    <div v-for="(item, index) in commentList" :key="index" class="comment-item">
                        <img :src="item.user ? item.user.headPortrai : ''" alt="">
                        <div class="comment-item-r">
                            <div v-if="item.user && item.user.nickname"  class="comment-item-name">{{ item.user ? item.user.nickname : '' }}</div>
                            <div class="comment-item-content">{{ item.evaluationContent }}</div>
                            <div class="comment-item-time">{{ item.createTime }}</div>
                        </div>
                    </div>
                </div>
                <van-empty v-else description="暂无评论" />
                <div class="comment-panel">
                    <van-search v-model="commentValue" shape="round" background="#fff" label="" placeholder="说点什么吧" show-action>
                        <template #action>
                            <van-button round block type="info" size="small" :disabled="!commentValue || commentLoading" @click="submitComment" :loading="commentLoading" loading-text="评论中...">评论</van-button>
                        </template>
                    </van-search>
                </div>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import { ImagePreview, NavBar } from 'vant'
import { articleInfo, articlePraise, articleShare, attentionUser, releaseComment } from '../../api'
import { mapState } from 'vuex'

export default {
    name: 'index',
    components: { NavBar },
    data () {
        return {
            refreshLoading: false,
            tab: 0,
            info: {},
            shareList: [
                'https://tvax3.sinaimg.cn/crop.0.0.664.664.180/008l5vt8ly8gt83edy69vj30ig0igq3t.jpg?KID=imgbed,tva&Expires=1650387696&ssig=Gol0nAy0uA',
                'https://tvax3.sinaimg.cn/crop.0.0.664.664.180/008l5vt8ly8gt83edy69vj30ig0igq3t.jpg?KID=imgbed,tva&Expires=1650387696&ssig=Gol0nAy0uA',
                'https://tvax3.sinaimg.cn/crop.0.0.664.664.180/008l5vt8ly8gt83edy69vj30ig0igq3t.jpg?KID=imgbed,tva&Expires=1650387696&ssig=Gol0nAy0uA',
                'https://tvax3.sinaimg.cn/crop.0.0.664.664.180/008l5vt8ly8gt83edy69vj30ig0igq3t.jpg?KID=imgbed,tva&Expires=1650387696&ssig=Gol0nAy0uA',
                'https://tvax3.sinaimg.cn/crop.0.0.664.664.180/008l5vt8ly8gt83edy69vj30ig0igq3t.jpg?KID=imgbed,tva&Expires=1650387696&ssig=Gol0nAy0uA',
                'https://tvax3.sinaimg.cn/crop.0.0.664.664.180/008l5vt8ly8gt83edy69vj30ig0igq3t.jpg?KID=imgbed,tva&Expires=1650387696&ssig=Gol0nAy0uA'
            ],
            commentList: [
                {
                    nickname: '漫漫',
                    headPortrai: 'https://tvax3.sinaimg.cn/crop.0.0.664.664.180/008l5vt8ly8gt83edy69vj30ig0igq3t.jpg?KID=imgbed,tva&Expires=1650387696&ssig=Gol0nAy0uA',
                    content: '我来评论啦！'
                },
                {
                    nickname: '测试',
                    headPortrai: 'https://tvax3.sinaimg.cn/crop.0.0.664.664.180/008l5vt8ly8gt83edy69vj30ig0igq3t.jpg?KID=imgbed,tva&Expires=1650387696&ssig=Gol0nAy0uA',
                    content: '呵呵变化的SABDASJLD！'
                },
                {
                    nickname: '不去',
                    headPortrai: 'https://tvax3.sinaimg.cn/crop.0.0.664.664.180/008l5vt8ly8gt83edy69vj30ig0igq3t.jpg?KID=imgbed,tva&Expires=1650387696&ssig=Gol0nAy0uA',
                    content: '烦死你反倒是男方拿独守空房！'
                }
            ],
            commentValue: '',
            commentLoading: false
        }
    },
    computed: {
        ...mapState(['UserInfo'])
    },
    created () {
        this.getInfo()
    },
    methods: {
        async getInfo () {
            const { msg, code, data } = await articleInfo(this.$route.params.id)
            if (code !== 200) return this.$toast.fail(msg)
            this.info = {
                ...data,
                isAttention: false,
                isLike: false
            }
             this.shareList = data.userWbForwardingList
            this.commentList = data.evaluationList
        },
        async onRefresh () {
            await this.getInfo()
            this.$toast('刷新成功')
            this.refreshLoading = false
        },
        async attention () {
            if (!this.$checkLogin()) return this.$router.replace('/login')
            const isAttention = this.info.isAttention
            const query = {
                beFocusUserId: this.info.userId, // 暂定为被关注的用户的id
                userId: this.UserInfo.userId, // 关注的用户的id
                isAttention
            }
            const { code, msg } = await attentionUser(query)
            if (code !== 200) return this.$toast.fail(msg)

            this.info.isAttention = !isAttention
            this.$toast(this.info.isAttention ? '已关注' : '取消关注')
        },
        async share () {
            if (!this.$checkLogin()) return this.$router.replace('/login')
            const query = {
                wbId: this.info.wbId, // 暂定为被关注的用户的id
                userId: this.UserInfo.userId // 关注的用户的id
            }
            const { code, msg } = await articleShare(query)
            if (code !== 200) return this.$toast.fail(msg)
            this.$toast('已转发')
            this.info.forwardingNum += 1
            this.$toast('已转发')
        },
        async praise () {
            if (!this.$checkLogin()) return this.$router.replace('/login')
            const query = {
                wbId: this.info.wbId, // 微博id
                userId: this.UserInfo.userId, // 用户的id
                isLike: this.info.isLike
            }
            const { code, msg } = await articlePraise(query)
            if (code !== 200) return this.$toast.fail(msg)

            this.info.likeNum = this.info.isLike ? this.info.likeNum - 1 : this.info.likeNum + 1
            this.info.isLike = !this.info.isLike
            this.$toast(!this.info.isLike ? '取消点赞' : '点赞成功')
        },
        previewImg (images, index) {
            ImagePreview({
                images: images ?? [],
                startPosition: index,
                closeable: true
            })
        },
        async submitComment () {
            if (!this.$checkLogin()) return this.$router.replace('/login')
            this.commentLoading = true
            const query = {
                wbId: this.info.wbId,
                evaluationContent: this.commentValue,
                userId: this.UserInfo.userId // 用户的id
            }
            const { code, msg } = await releaseComment(query)
            if (code !== 200) return this.$toast.fail(msg)
            this.commentLoading = false
            this.commentValue = ''
            this.$toast('评价成功！')
            await this.getInfo()
        }
    }
}
</script>

<style lang="less" scoped>
.info {
    width: 100%;
    background: #f7f8fa;

    .nav {
        background: #fafbfb;

        /deep/ .van-nav-bar__text {
            color: #222;
        }

        /deep/ .van-nav-bar__title {
            font-size: 16px;
            font-weight: 500;
        }
    }

    /deep/ .van-pull-refresh {
        padding-top: 46px;
        min-height: calc(100vh - 96px);
    }

    header {
        padding: 10px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        background: #fff;
        margin-top: 10px;

        .header-img {
            width: 40px;
            height: 40px;
            border: .5px solid #eee;
            border-radius: 36px;
            overflow: hidden;
            margin-right: 10px;
            flex-shrink: 0;
            box-sizing: border-box;
        }

        .header-content {
            width: calc(100% - 130px);

            .header-content-top {
                height: 22px;
                line-height: 22px;
                font-size: 14px;
                color: #ff8200;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-break: break-all;
            }

            .header-content-bot {
                height: 18px;
                line-height: 20px;
                font-size: 12px;
                color: #939393;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-break: break-all;
            }
        }

        .header-btn {
            margin-left: 10px;
            flex-shrink: 0;
            min-width: 82px;
            text-align: right;
        }
    }

    main {
        font-size: 14px;
        line-height: 20px;
        padding: 0 10px 10px;
        background: #fff;
    }

    .main-img {
        flex-wrap: wrap;
        overflow: hidden;
        display: grid;
        padding: 0 10px 10px;
        grid-template-columns: repeat(3, 32%);
        grid-gap: 1.33%;
        background: #fff;

        > div {
            padding-top: 100%;
            position: relative;
            overflow: hidden;

            > img {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                object-fit: cover;
            }
        }
    }

    .line {
        height: 10px;
        background: #f7f8fa;
    }

    .tab-h {
        padding: 0 12px;
        height: 50px;
        box-sizing: border-box;
        border-bottom: 1px solid #f4f4fa;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 15px;
        color: #696969;
        background: #fff;

        .tab-h-left {
            display: flex;
            align-items: center;

            > div {
                position: relative;
                height: 48px;
                line-height: 48px;
                margin-right: 16px;
            }

            .active {
                color: #323232;
                font-size: 16px;
                font-weight: 600;

                &::after {
                    display: block;
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    border-radius: 2px;
                    bottom: 2px;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    background: #ff8200;
                }
            }
        }
    }

    .share {
        background: #fff;
        min-height: calc(100vh - 220px);
        padding: 16px 12px;

        .share-wrap {
            width: 100%;
            min-height: 30px;
            display: flex;
            align-items: center;

             img {
                width: 24px;
                height: 24px;
                border-radius: 24px;
                border: 0.5px solid #f7faf8;
                box-sizing: border-box;
                margin: 3px 2px 3px 0;
                overflow: hidden;
            }

            > div {
                padding-left: 4px;
                display: inline-block;
                font-size: 14px;
                color: #959595;
                flex-shrink: 0;
            }
        }

        .share-panel {
            position: fixed;
            bottom: 0;
            width: calc(100% - 64px);
            padding: 0 32px;
            height: 40px;
            left: 0;
            right: 0;
            margin: 0 auto;
            background: #fff;
            z-index: 10;
            box-shadow: 2px 0 8px 1px #eee;
            display: flex;
            align-items: center;
            justify-content: space-between;

            > div {
                max-width: 25%;
                font-size: 14px;
                color: #363636;
            }
        }
    }

    .comment {
        background: #fff;
        min-height: 100vh;

        .comment-item {
            margin: 0 16px;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            overflow: hidden;

            > img {
                width: 32px;
                height: 32px;
                border: .5px solid #eee;
                border-radius: 32px;
                overflow: hidden;
                margin-right: 8px;
                flex-shrink: 0;
                box-sizing: border-box;
            }

            .comment-item-r {
                width: calc(100% - 40px);

                .comment-item-name {
                    height: 22px;
                    line-height: 20px;
                    font-size: 14px;
                    color: #ff8200;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    word-break: break-all;
                }

                .comment-item-content{
                    min-height: 18px;
                    line-height: 16px;
                    font-size: 13px;
                    color: #323232;
                    word-break: break-all;
                }

                .comment-item-time {
                    width: 100%;
                    min-height: 20px;
                    line-height: 20px;
                    font-size: 12px;
                    color: #939393;
                    word-break: break-all;
                }
            }

            .header-btn {
                margin-left: 10px;
                flex-shrink: 0;
                min-width: 82px;
                text-align: right;
            }
        }

        .comment-panel {
            position: fixed;
            width: 100%;
            height: 44px;
            left: 0;
            right: 0;
            margin: 0 auto;
            z-index: 10;
            box-shadow: 2px 0 8px 1px #eee;
            bottom: 0;
            background: #fff;

            /deep/ .van-search {
                padding: 8px 0 6px 8px;

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

            /deep/ .van-button--small {
                height: 26px;
                padding: 0 10px;
                border: 0;
                background-image: linear-gradient(to right, #e86b0f 0%, #ff8200 99%, #ff8200 100%);
            }

            .search-left {
                padding-right: 8px;
                color: #969696;
                position: relative;
                top: 1px;
            }

        }
    }
}
</style>
