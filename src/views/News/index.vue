<template>
    <div class="news">
        <header>
            <span></span>
            <van-badge v-if="msgNum" :content="msgNum" max="99">
                <div>消息</div>
            </van-badge>
            <div v-else>消息</div>
            <van-icon name="delete-o" color="#F56C6C" size="16" @click="clearMessage" />
        </header>
        <main>
            <van-search placeholder="请搜索聊天记录" input-align="center" background="#fff" />
            <!--初始-->
            <div class="msg">
                <div class="msg-img" style="background: #27dede;line-height: 60px;">
                    <van-icon color="#fff" size="30" name="smile-o" />
                </div>
                <div class="msg-content">
                    <div class="msg-content-left">
                        @我的
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
                    </div>
                    <div class="msg-content-right">
                        <van-icon size="14" color="#c9c9c9" name="arrow" />
                    </div>
                </div>
            </div>

            <!--消息-->
            <div v-for="(item, index) in msgList" :key="index" class="msg" @click="goMsgInfo(index)">
                <div class="msg-img">
                    <img :src="item.img" alt="">
                </div>
                <div class="msg-content" :class="index === msgList.length - 2 ? 'border-none' : ''">
                    <div class="msg-content-left">
                        <div class="msg-content-left-t">{{ item.name }}</div>
                        <div class="msg-content-left-b">{{ item.msg }}</div>
                    </div>
                    <div class="msg-content-right">
                        <div class="msg-content-right-t">{{ item.time }}</div>
                        <div class="msg-content-right-b">
                            <van-badge v-if="item.num" :content="item.num" max="99" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>

import { Dialog } from 'vant'

export default {
    name: 'News',
    data () {
        return {
            msgList: [
                {
                    id: 1,
                    name: '你的黎呀',
                    img: require('../../assets/message/1.jpg'),
                    msg: '慢慢又漫漫，漫漫亦灿灿',
                    num: Math.floor(Math.random() * 20),
                    time: '20:33'
                },
                {
                    id: 2,
                    name: '小丽美食',
                    img: require('../../assets/message/2.jpg'),
                    msg: '快来品尝吧！',
                    num: Math.floor(Math.random() * 20),
                    time: '18:20'
                },
                {
                    id: 3,
                    name: '追剧少年的日常',
                    img: require('../../assets/message/3.jpg'),
                    msg: '最近出的好几部剧都挺好看，你快去看看吧。',
                    num: Math.floor(Math.random() * 20),
                    time: '昨天'
                },
                {
                    id: 4,
                    name: '电视剧亲爱的小孩',
                    img: require('../../assets/message/4.jpg'),
                    msg: '人均表情帝实锤了，这真不是对照着emoji一比一放大的嘛',
                    num: Math.floor(Math.random() * 20),
                    time: '昨天'
                },
                {
                    id: 5,
                    name: '周小姐的半个故事',
                    img: require('../../assets/message/5.jpg'),
                    msg: '十里红妆特1捆个冰墩墩钥匙扣',
                    num: Math.floor(Math.random() * 20),
                    time: '前天'
                },
                {
                    id: 6,
                    name: '叫我姨太好了',
                    img: require('../../assets/message/6.jpg'),
                    msg: '4月下旬上线的热门新剧',
                    num: Math.floor(Math.random() * 20),
                    time: '22-04-08'
                },
                {
                    id: 7,
                    name: '原神猫尾酒馆',
                    img: require('../../assets/message/7.jpg'),
                    msg: '无愧是「荒地生星，灿若烈阳」之神明',
                    num: Math.floor(Math.random() * 20),
                    time: '22-04-02'
                },
                {
                    id: 8,
                    name: '校园咨询君',
                    img: require('../../assets/message/8.jpg'),
                    msg: ' 4月1日，高校宿舍楼解封前夜，大白在楼下和同学们一起唱歌互动庆祝。',
                    num: Math.floor(Math.random() * 20),
                    time: '22-04-01'
                },
                {
                    id: 9,
                    name: '搬砖少女王大锤',
                    img: require('../../assets/message/9.jpg'),
                    msg: '。',
                    num: Math.floor(Math.random() * 20),
                    time: '22-03-26'
                },
                {
                    id: 10,
                    name: '迷妹吐槽日常',
                    img: require('../../assets/message/10.jpg'),
                    msg: '笑不活了，家人们',
                    num: Math.floor(Math.random() * 20),
                    time: '22-03-02'
                }
            ]

        }
    },
    computed: {
        msgNum () {
            let num = 0
            this.msgList.map(i => (num += i.num))
            return num
        }
    },
    methods: {
        clearMessage () {
            Dialog.confirm({ message: '确定清除私信的所有未读吗' }).then(() => {
                this.msgList.map(i => (i.num = 0))
                this.$toast('清除成功')
            }).catch(e => {})
        },
        goMsgInfo (i) {
            this.$router.push(`/news/chat?name=${this.msgList[i].name}`)
            this.msgList[i].num = 0
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
        background: #f7f8fa;
        font-weight: 600;
        letter-spacing: 1px;
        position: sticky;
        top: 0;
        z-index: 10;
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
            padding: 0 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            overflow: hidden;

            .msg-img {
                width: 48px;
                height: 48px;
                flex-shrink: 0;
                text-align: center;
                line-height: 48px;
                margin-right: 12px;
                border-radius: 48px;
                border-bottom: 0.5px solid #f4f4f4;
                overflow: hidden;

                img {
                    width: 48px;
                    height: 48px;
                }
            }

            .msg-content {
                width: calc(100% - 60px);
                height: 48px;
                padding: 8px 0;
                border-bottom: 0.5px solid #ebedf0;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .msg-content-left {
                    font-size: 16px;
                    font-weight: 500;
                    color: #222;
                    width: calc(100% - 60px);

                    .msg-content-left-t {
                        width: 100%;
                        height: 28px;
                        line-height: 28px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        word-break: break-all;
                    }
                    .msg-content-left-b {
                        width: 100%;
                        height: 20px;
                        line-height: 20px;
                        font-size: 15px;
                        color: #909399;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        word-break: break-all;
                    }
                }

                .msg-content-right {
                    padding-left: 8px;
                    flex-shrink: 0;
                    width: 52px;
                    text-align: right;
                    font-size: 12px;
                    color: #909399;

                    .msg-content-right-t {
                        height: 28px;
                        line-height: 28px;
                    }
                    .msg-content-right-b {
                        height: 20px;
                        line-height: 20px;
                    }
                }
            }
        }

        .border-none {
            border: 0;
        }
    }
}
</style>
