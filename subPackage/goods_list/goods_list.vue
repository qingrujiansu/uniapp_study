<template>
  <view>
    <my-goods :goods="goodsList"></my-goods>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObject: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        isLoading: false
      };
    },
    onLoad(options) {
      this.queryObject.query = options.query || ''
      this.queryObject.cid = options.cid || ''
      this.getGoodsList()
    },
    methods: {
      async getGoodsList(cb) {
        this.isLoading = true
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObject)
        this.isLoading = false
        cb && cb()
        if (res.meta.status !== 200) uni.$http.showMsg()
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      }
    },
    onReachBottom() {
      if (this.queryObject.pagenum * this.queryObject.pagesize >= this.total) return uni.$showMsg('数据加载完毕')
      if (this.isLoading) return
      this.queryObject.pagenum++
      this.getGoodsList()
    },
    onPullDownRefresh() {
      //重置关键顺序
      this.total = 0
      this.queryObject.pagenum = 1
      this.goodsList = []
      this.isLoading = false
      this.getGoodsList(()=>uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">

</style>
