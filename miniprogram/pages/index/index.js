Page({
    data: {
     warning:false,
     topimg:'scaleToFill',
     topimg1:'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
     topimg2:'http://nimg.ws.126.net/?url=http://dingyue.ws.126.net/2021/0425/bc75a4f8p00qs4bd20028c000e800e8g.png&thumbnail=650x2147483647&quality=80&type=jpg',
     condition:false,
     useropenid:"" ,  //用户的openid,用于确定向哪个用户发送表单
    },

touji:function(){
  this.setData({
   warning:false
 })
},
touji1:function(){
  this.setData({
   warning:true
 })
},
release:function(){
 wx.navigateTo({
  url: '../car/car',
  events: {
    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
    acceptDataFromOpenedPage: function(data) {
      console.log(data)
    },
    someEvent: function(data) {
      console.log(data)
    }
  },
  success: function(res) {
    // 通过eventChannel向被打开页面传送数据
    res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
  }
}) 
},
//获取用户openid函数，向此用户发送订阅消息
getUserpenid(){
  let that=this
  wx.cloud.callFunction({
    name:"getopenid",
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
},
//第一次进入此页面执行此函数
onLoad: function (){
this.getUserpenid();
},
jianhu:function(){
  var that=this
  setInterval(function () {
    that.ifArrive()
  }, 3000)    //代表1秒钟发送一次请求
},
ifArrive:function(e)
{

  wx.request({
    url: 'http://web.juhe.cn:8080/finance/stock/hs?gid=sh601009&key=58bb9436e6e17f31f330fd133e1d95ca', 
    data: {
      
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    method:'get',
    success: (res) =>{
      console.log(res.data)
  },   
    fail (res) {
        console.log("fail!!!")
      }})
 // console.log("轮播请求1秒触发一次")
},
//调用发送表单云函数
sendbycloud(){
  let that=this
  wx.cloud.callFunction({
    name:"sendnotice",
    data:{    //传递
      openid:that.data.useropenid,
    },
    success(res){
      console.log("发送成功",res)
    },
    fail(res){
      console.log("发送失败",res)
    },
  })
},
//点击按钮调用sendbycloud函数,弹出订阅按钮
send(){
   wx.requestSubscribeMessage({
    tmplIds: ["Cb4-xVMsJnnxAR4FkTkx95eKcehGFnhs6mxTZHPU7WY"],
    success: function (res) {
      if (res.XII_0By8D9WabnUjVPB_8S1itsm2d4_xxxxx === 'accept'){
        wx.showToast({
          title: '订阅OK！',
        })
      }
      console.log(res)
      //成功
    },
    fail(err) {
      //失败
      console.error(err);
    }
  })
},
})