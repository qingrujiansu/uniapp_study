<template>
  <view>
    <view class="goods-list">
        <view class="goods-item">
          <!-- 商品左侧 -->
          <view class="goods-item-left">
            <radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
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
              <uni-number-box min="1" v-if="showNum" :value="goods.goods_count" @change="countBlurHandler"></uni-number-box>
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
     radioClickHandler(){
       this.$emit('radio-change',{
         goods_id : this.goods.goods_id,
         goods_state : !this.goods.goods_state
       })
     },
     countBlurHandler(val){
       this.$emit('countChange',{
         goods_id:this.goods.goods_id,
         goods_count:+val
       })
     }
    },
    props:{
      goods:{
        type:Object,
        default:{}
      },
      showRadio:{
        type:Boolean,
        default:false
      },
      showNum:{
        type:Boolean,
        default:false
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
      width:750rpx;
      box-sizing: border-box;
      justify-content: space-between;
      border-bottom: 1px solid #cfcfcf;
      padding: 5px 5px;
      .goods-item-left{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .goods-pic{
          width: 110px;
          display: block;
        }
      }
      .goods-item-right{
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 5px;
        .goods-name {
          font-size: 13px;
        }
        .goods-info-box{
          display: flex;
          justify-content: space-between;
          .goods-info-box-price {
            color: #c00000;
            font-weight: 700;
          }
        }
        
      }
    }
  }
</style>
