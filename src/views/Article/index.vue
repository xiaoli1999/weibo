<template>
    <div class="info">
        <NavBar title="微博正文" left-text="" left-arrow @click-left="$router.back()" fixed/>
        <van-pull-refresh v-model="refreshLoading" success-text="热门微博更新成功" @refresh="onRefresh">
            <header class="header">
                <img class="header-img" :src="info.headPortrai" alt="">
                <div class="header-content">
                    <div class="header-content-top">{{ info.nickname }}</div>
                    <div class="header-content-bot">{{ info.updateTime }} 来自 {{ info.city }}</div>
                </div>
                <div class="header-btn">
                    <van-button v-if="info.isAttention" icon="success" type="info" color="#999" size="small" round plain>已关注</van-button>
                    <van-button icon="plus" type="info" color="#ff8200" size="small" round plain @click.stop="attention(info.id)">关注</van-button>
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
                分享
            </div>
            <div class="comment" v-show="tab===1">
                评论
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import { ImagePreview, NavBar } from 'vant'
import { articleInfo } from '../../api'

export default {
    name: 'index',
    components: { NavBar },
    data () {
        return {
            refreshLoading: false,
            info: {},
            tab: 0
        }
    },
    created () {
        this.getInfo()
    },
    methods: {
        async getInfo () {
            const { msg, code, data } = await articleInfo(this.$route.params.id)
            if (code !== 200) return this.$toast.error(msg)
            this.info = { ...data, ...data.userInfo, imgList: data.wbImage.split('***') }
        },
        async onRefresh () {
            await this.getInfo()
            this.$toast('刷新成功')
            this.refreshLoading = false
        },
        attention ([id, index]) {
            this.$toast('已关注')
        },
        share ([id, index]) {
            this.$toast('已转发')
        },
        praise ([id, index]) {
            this.$toast('点赞成功')
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
                    width: 80%;
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
        min-height: 100vh;
    }

    .comment {
        background: #fff;
        min-height: 100vh;
    }
}
</style>
