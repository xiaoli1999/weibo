<template>
    <div class="article-list">
        <div v-for="(item, index) in list" :key="index" class="article" @click="articleInfo(item.wbId)">
            <div class="header">
                <img class="header-img" :src="item.avatar" alt="">
                <div class="header-content">
                    <div class="header-content-top">{{ item.name }}</div>
                    <div class="header-content-bot">{{ item.time }} 来自 {{ item.city }}</div>
                </div>
                <div v-if="home" class="header-btn" @click.stop="attention(item.userId, index)">
                    <van-button v-if="item.isAttention" icon="success" type="info" color="#999" size="small" round plain>已关注</van-button>
                    <van-button v-else icon="plus" type="info" color="#ff8200" size="small" round plain>关注</van-button>
                </div>
                <div v-else class="header-btn"></div>
            </div>
            <div class="main">
                <div class="main-desc">
                    {{ item.homePageDisplay }}
                    <span class="main-desc-all" v-if="item.homePageDisplay.length >= 60">...全文</span>
                </div>
                <div v-if="item.imgList && item.imgList.length" class="main-img">
                    <div v-for="(i, idx) in item.imgList" :key="idx">
                        <img :src="i" alt="" @click.stop="previewImg(item.imgList, idx)">
                    </div>
                </div>
            </div>
            <div v-if="home" class="panel">
                <div @click.stop="share(item.wbId, index)">
                    <van-icon name="share-o" color="#696969" size="20" />
                    {{ item.forwardingNum ? item.forwardingNum : 0 }}
                </div>
                <div @click.stop="articleInfo(item.wbId)">
                    <van-icon name="chat-o" color="#696969" size="20" />
                    {{ item.evaluationNum ? item.evaluationNum : 0 }}
                </div>
                <div @click.stop="praise(item.wbId, index)">
                    <van-icon v-if="item.isLike" name="good-job-o" color="#ff8200" size="20" />
                    <van-icon v-else name="good-job-o" color="#696969" size="20" />
                    {{ item.likeNum ? item.likeNum : 0 }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ImagePreview } from 'vant'
export default {
    name: 'ArticleList',
    props: {
        list: {
            type: Array,
            require: true
        },
        home: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        attention (id, index) {
            this.$emit('attention', [id, index])
        },
        share (id, index) {
            this.$emit('share', [id, index])
        },
        praise (id, index) {
            this.$emit('praise', [id, index])
        },
        previewImg (images, index) {
            ImagePreview({
                images: images ?? [],
                startPosition: index,
                closeable: true
            })
        },
        articleInfo (id) {
            this.$router.push(`/article/info/${id}`)
        }
    }
}
</script>

<style lang="less" scoped>
.article-list {
    background: #f7f8fa;
    overflow: hidden;

    .article {
        padding: 0 8px;
        background: #fff;
        margin-bottom: 10px;

        .header {
            padding: 8px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            overflow: hidden;

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

        .main {
            padding: 4px 0;

            .main-desc {
                word-break: break-all;
                min-height: 22px;
                line-height: 22px;
                font-size: 14px;
                color: #333;
                padding: 8px 0;

                .main-desc-all {
                    padding-left: 4px;
                    color: #3c6e9e;
                }
            }

            .main-img {
                flex-wrap: wrap;
                overflow: hidden;
                display: grid;
                grid-template-columns: repeat(3, 32%);
                grid-gap: 1.33%;
                padding-bottom: 12px;

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
        }

        .panel {
            padding: 0 16px;
            height: 40px;
            border-top: 1px solid #f4f4f4;
            box-sizing: border-box;
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
}
</style>
