<template>
    <div class="info">
        <NavBar title="微博正文" left-text="" left-arrow @click-left="$router.back()" fixed/>
        <van-pull-refresh v-model="refreshLoading" success-text="微博正文更新成功" @refresh="onRefresh">
            <header class="header">
                <img class="header-img" :src="info.headPortrai" alt="">
                <div class="header-content">
                    <div class="header-content-top">{{ info.nickname }}</div>
                    <div class="header-content-bot">更新于{{ info.updateTime }} 来自 {{ info.city }}</div>
                </div>
                <div class="header-btn" @click.stop="attention">
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
                    <div class="tab-h-right">赞 {{ info.praiseNum ? info.praiseNum : '' }}</div>
                </div>
            </van-sticky>
            <div class="share" v-show="tab===0">
                <div class="share-wrap">
                    <img v-for="(item , index) in shareList.slice(0, 10)" :key="index" :src="item" alt="">
                    <div>等人已转发</div>
                </div>
            </div>
            <div class="comment" v-show="tab===1">
                评论
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import { ImagePreview, NavBar } from 'vant'
import { articleInfo, articlePraise, articleShare, attentionUser, getSharetList, getCommentList, releaseComment } from '../../api'
import { mapState } from 'vuex'

export default {
    name: 'index',
    components: { NavBar },
    data () {
        return {
            refreshLoading: false,
            tab: 0,
            info: {
                // 模拟数据
                userId: 415614655,
                wbId: 541,
                headPortrai: 'https://tvax3.sinaimg.cn/crop.0.0.664.664.180/008l5vt8ly8gt83edy69vj30ig0igq3t.jpg?KID=imgbed,tva&Expires=1650387696&ssig=Gol0nAy0uA',
                nickname: '你的黎呀',
                updateTime: '2022-4-19 23:00',
                city: '西安市',
                isAttention: false,
                shareNum: 24,
                commentNum: 2,
                praiseNum: 14,
                isPraise: false
            },
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
            commentValue: ''
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
            this.info = { ...data, ...data.userInfo, imgList: data.wbImage.split('***') }
        },
        async onRefresh () {
            await this.getInfo()
            this.$toast('刷新成功')
            this.refreshLoading = false
        },
        async attention () {
            const query = {
                userId: this.info.userId, // 暂定为被关注的用户的id
                id: this.UserInfo.userId // 关注的用户的id
            }
            const { code, msg } = await attentionUser(query)
            if (code !== 200) return this.$toast.fail(msg)
            // 做关注取关处理 本来打算只做关注的
            this.info.isAttention = !this.info.isAttention
            this.$toast(this.info.isAttention ? '已关注' : '取消关注')
        },
        async share () {
            const query = {
                wbId: this.info.wbId, // 微博id
                id: this.UserInfo.userId // 用户的id
            }
            const { code, msg } = await articleShare(query)
            if (code !== 200) return this.$toast.fail(msg)
            this.$toast('已转发')
            // TODO 暂不做判断， 后端做判断，已分享既会提示已分享
            this.info.shareNum += 1
            this.$toast('已转发')
        },
        async praise () {
            const query = {
                wbId: this.info.wbId, // 微博id
                id: this.UserInfo.userId // 用户的id
            }
            const { code, msg } = await articlePraise(query)
            if (code !== 200) return this.$toast.fail(msg)
            this.info.praiseNum = this.info.isPraise ? this.info.praiseNum-- : this.info.praiseNum++
            this.info.isPraise = !this.info.isPraise
            this.$toast(!this.info.isPraise ? '取消点赞' : '点赞成功')
        },
        previewImg (images, index) {
            ImagePreview({
                images: images ?? [],
                startPosition: index,
                closeable: true
            })
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

            > img {
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
    }

    .comment {
        background: #fff;
        min-height: 100vh;
    }
}
</style>
