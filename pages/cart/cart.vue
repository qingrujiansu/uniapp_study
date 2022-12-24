<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <my-address></my-address>
    <view class="cart-icon">
      <uni-icons type="shop" size="18px"></uni-icons>
      <text>购物车</text>
    </view>
    <!-- 购物车列表渲染 -->
    <uni-swipe-action>
      <block v-for="(item,index) in cart" :key="index">
        <uni-swipe-action-item :right-options="options" @click="removeGoodsHandler(item)">
          <my-goods :goods="item" :showRadio="true" @radio-change="radioChangeHandler" :showNum="true"
            @countChange="countChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>

    <!-- 结算区域 -->
    <my-settle></my-settle>
  </view>
  <!-- 空白图片区域 -->
  <view class="image-container"v-else>
    <image src="/static/cart_empty@2x.png"></image>
    <text>购物车为空</text>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    mixins: [badgeMix],
    data() {
      return {
        options: [{
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }]
      }
    },
    computed: {
      ...mapState('m_cart', ['cart']),

    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoods']),

      radioChangeHandler(e) {
        this.updateGoodsState(e)
      },
      countChangeHandler(e) {
        this.updateGoodsCount(e)
      },
      removeGoodsHandler(e) {
        this.removeGoods(e.goods_id)
      },

    }
  }
</script>

<style lang="scss">
  .cart-icon {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    text {
      margin-right: 5px;
      font-size: 12px;
    }
  }

  .cart-container {
    padding-bottom: 50px;
  }
  .image-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 150px;
    font-size: 14px;
    image{
      width: 70px;
      height: 70px;
    }
    
  }
</style>
