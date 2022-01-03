
Page({
   data: {
    useropenid:"",      //用户的openid，唯一标识用户身份
    list:[],            //存储论坛中的所有已发布消息（即读取数据库中的数据）

    },
    //获取itemlists数据库中的数据（论坛中所有的数据）
    getItemlists(){
      let that=this
      wx.cloud.callFunction({
        name:"getitemlists",    //使用云函数获取方式
        success(res){
          console.log("请求云函数数据成功",res)
          that.setData({
            list:res.result.data    //将获取到的数据存储至list数组中
          })
          //打印从数据库中读取到的数据
          console.log("list中的数据",that.data.list)   
        },
        fail(res){
          console.log("请求云函数数据失败",res)
        }
      })
    },
    //第一次进入页面需要调用这个函数
    onLoad: function (options) {
      this.getItemlists()    //调用获取数据的函数
      let that=this
      that.setData({ 
        //在这里面对data里面的数据赋值
      })
    },
   //获取用户的openid
   getUserpenid(){
    let that=this
    wx.cloud.callFunction({
      name:"getopenid",    //调用云函数方法
      success(res){
        console.log("获取openid成功(提前获取)",res.result._openid)
        that.setData({
          useropenid:res.result._openid,
        }) 
      },
      fail(res){
        console.log("获取openid失败",res)
      },
    })
    setTimeout(function () {
      that.getUsers()//要延时执行的代码
     }, 1000) //延迟时间 这里是1秒
   },
   //添加事件
   add() {
    wx.navigateTo({
      url: '../add_luntan/add_luntan',
    })
  },
   change() {
    this.getItemlists()    //调用获取数据的函数
      let that=this
      that.setData({ 
        //在这里面对data里面的数据赋值
      })
   },
 
  })
  









