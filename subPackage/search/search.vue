<template>
  <view>
    <!-- 搜索框 -->
    <view class="search-box">
      <uni-search-bar @input="input" radius="100" cancelButton="none"></uni-search-bar>
    </view>
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="keyWord !== ''">
      <view class="sugg-item" v-for="(item,index) in searchResults.goods" :key="index"
        @click="goToDetail(item.goods_id)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <view class="history-text">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17px" @click="clearHistory"></uni-icons>
      </view>
      <view class="history-item">
        <uni-tag :text="item" v-for="(item,index) in historys" :key="index" class="history-tag" @click="goToGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        keyWord: '',
        searchResults: [],
        historyList: ['a', 'app', 'apple', '佩奇']
      };
    },
    methods: {
      //输入触发事件
      input(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.keyWord = e
          this.getSearchResults()
          this.saveHistoryList()
        }, 500)
      },
      //发送请求得到搜索建议
      async getSearchResults() {
        if (this.keyWord === null) {
          this.searchResults = []
          return
        }
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', {
          query: this.keyWord
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message

      },
      //跳转到页面
      goToDetail(goods_id) {
        uni.navigateTo({
          url: '/subPackage/goods_detail/goods_detail?goods_id=' + goods_id
        })
      },
      //将输入的关键字放入historyList
      saveHistoryList() {
        const set = new Set(this.historyList)
        set.delete(this.keyWord)
        set.add(this.keyWord)
        set.delete('')
        this.historyList = Array.from(set)
        uni.setStorageSync('keyWord', JSON.stringify(this.historyList))
      },
      //清除历史记录
      clearHistory(){
        this.historyList = []
        uni.removeStorage({
          key:'keyWord'
        })
      },
      //点击历史标签跳转到商品列表
      goToGoodsList(item){
        uni.navigateTo({
          url:'/subPackage/goods_list/goods_list?query=' + item 
        })
      }
    },
    computed: {
      //搜索历史进行反转
      historys() {
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('keyWord') || '[]')
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #cfcfcf;
      padding: 13px 0;

      .goods-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  .history-box {
    margin-top: 5px;

    .history-text {
      display: flex;
      padding: 5px 10px;
      justify-content: space-between;
      font-size: 13px;
      border-bottom: 1px solid #cfcfcf;
    }

    .history-item {
      display: flex;
      flex-wrap: wrap;
      padding: 5px 5px;

      .history-tag {
        margin-right: 5px;
      }
    }
  }
</style>