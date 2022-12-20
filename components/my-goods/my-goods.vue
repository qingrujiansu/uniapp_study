<template>
  <view>
    <view class="goods-list">
      <view v-for="(goods,index) in goods" :key="index" @click="goToGoodsDetail(goods)">
        <view class="goods-item">
          <!-- 商品左侧 -->
          <view class="goods-item-left">
            <!-- 商品图片 -->
            <image :src="goods.goods_small_logo" class="goods-pic" mode="widthFix"></image>
          </view>
          <!-- 商品右侧 -->
          <view class="goods-item-right">
            <!-- 商品名字 -->
            <view class="goods-name">{{goods.goods_name}}</view>
            <!-- 商品价格 -->
            <view class="goods-info-box">
              <view class="goods-info-box-price">￥{{goods.goods_price | tofixed}}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods",
    data() {
      return {

      };
    },
    methods:{
      goToGoodsDetail(item){
        console.log(item);
        uni.navigateTo({
          url:'/subPackage/goods_detail/goods_detail?goods_id = ' + item.goods_id
        })
      }
    },
    props:{
      goods:{
        type:Array,
        default:[]
      }
    },
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
.goods-list {
    
    .goods-item{
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #cfcfcf;
      padding: 5px 5px;
      .goods-item-left{
        .goods-pic{
          width: 110px;
          display: block;
        }
      }
      .goods-item-right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 5px;
        .goods-name {
          font-size: 13px;
        }
        .goods-info-box-price {
          color: #c00000;
          font-weight: 700;
        }
      }
    }
  }
</style>
