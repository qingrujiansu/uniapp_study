<template>
  <view class="goods-detail-box">
    <swiper autoplay="true" circular="true" duration="1000" interval="3000" indicator-dots="true">
      <swiper-item v-for="(item,index) in goodsDetail.pics" :key="index" @click="preview(index)">
        <image :src="item.pics_big_url" mode="widthFix">
      </swiper-item>
    </swiper>

    <!-- 商品信息区域 -->
    <view class="goods-info-box" v-if="goodsDetail.goods_name">
      <view class="price">
        ￥{{goodsDetail.goods_price}}
      </view>
      <view class="goods-body">
        <view class="goods-name">
          {{goodsDetail.goods_name}}
        </view>
        <view class="goods-collect">
          <uni-icons type="star" size="18px" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="goods-freight">
        <text>快递：免运费</text>
      </view>
    </view>

    <rich-text :nodes="goodsDetail.goods_introduce"></rich-text>

    <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
      @buttonClick="buttonClick" class="goods-nav" />
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        goodsDetail: [],
        options: [{
          icon: 'shop',
          text: '店铺',
          infoBackgroundColor: '#007aff',
          infoColor: "red"
        }, {
          icon: 'cart',
          text: '购物车',
          info: 0
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    onLoad(option) {
      this.getGoodsDetail(option.goods_id)
    },
    watch: {
      total: {
        handler(newValue) {
            const findResult = this.options.find(x => x.text === '购物车')
            if (findResult) {
              findResult.info = newValue
            }
          },
           immediate: true
      },
    },
    computed: {
      ...mapState('m_cart', ['cart']),
      ...mapGetters('m_cart', ['total'])
    },
    methods: {
      ...mapMutations('m_cart', ['addToCart']),
      async getGoodsDetail(goods_id) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id
        })
        if (res.meta.status !== 200) uni.$http.showMsg()
        res.message.goods_introduce.replace(/webp/g, 'jpg').replace(/< img/, '<img style="display:block;"')
        this.goodsDetail = res.message
      },
      preview(index) {
        uni.previewImage({
          current: index,
          urls: this.goodsDetail.pics.map(x => x.pics_big_url)
        })
      },
      onClick(e) {

        if (e.content.text == '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      buttonClick(e) {
        // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
        if (e.content.text === '加入购物车') {
          const goods = {
            goods_id: this.goodsDetail.goods_id,
            goods_name: this.goodsDetail.goods_name,
            goods_price: this.goodsDetail.goods_price,
            goods_count: 1,
            goods_state: true,
            goods_small_logo: this.goodsDetail.goods_small_logo,
          }
          this.addToCart(goods)
        }

      }
    }
  }
</script>

<style lang="scss">
  .goods-detail-box {
    padding-bottom: 50px;
  }

  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .goods-info-box {
    padding: 10px 0 10px 10px;

    .price {
      color: #c00000;
      width: 700;
    }

    .goods-body {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      font-size: 13px;

      .goods-name {}

      .goods-collect {
        width: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: gray;
        border-left: 1px solid #efefef;
      }
    }

    .goods-freight {
      margin-top: 5px;
      font-size: 12px;
    }
  }

  .goods-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>
