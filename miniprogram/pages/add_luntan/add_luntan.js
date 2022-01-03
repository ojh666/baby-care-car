Page({
  data: {
    name0:'',
    details0: "",//事件内容
    time0:'00:00',//发布时间，可调整为当前时间
    id:"",        //消息id,每个消息的固有属性
    useropenid:"" ,  //用户的openid
  },
  //获取openid(用于改动users数据库中的数据）
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
  onLoad: function (e) {
    this.getUserpenid()
    var id = e.id
    let that=this
    if (id) 
    {
      getData(id, this);
    } 
    else {
      that.setData({
        id: Date.now()
      })
    }
  },
  //消息内容改动
  change1(e) {
    var val = e.detail.value;
    this.setData({
      details0: val
    });
  },
  change2(e) {
    var val = e.detail.value;
    this.setData({
      name0: val
    });
  },
  //消息发布时间（写一个函数读取当前时间即可）
  get_time(){
    //console.log(new Date(Date.parse(new Date())+ 60*60*1000*8).toISOString().substring(0,10)); //日期
    //console.log(new Date().toTimeString().substring(0,8)); //时间
    //console.log(new Date(Date.parse(new Date())+ 60*60*1000*8).toISOString().substring(0,10)+' '+new Date().toTimeString().substring(0,8)); //日期加时间

    var val = new Date(Date.parse(new Date())+ 60*60*1000*8).toISOString().substring(0,10)+' '+new Date().toTimeString().substring(0,8);
    this.setData({
      time0: val
    });
    console.log(val)  //打印当前时间
  },
  //将创建的数据上传至云端
  upload(){
    let that=this
    if(that.data.name0=="")  //发帖名称为空
    {
      that.setData({ 
       name0:'匿名',   
      })
    }
    //修改itemlists数据库中的数据
    setTimeout(function () {
      console.log("进入itemlists修改界面")
      //将消息存入数据库中
      wx.cloud.database().collection("itemlists")
      .add({
        data:{
          name:that.data.name0,
          details:that.data.details0,
          time:that.data.time0,
        },
        success(res){
          console.log("添加成功",res)
        },
        fail(res){
          console.log("添加失败",res)
        },
      })
    
    }, 2000) //延迟时间 这里是2秒
  },
  //取消发布
  cancel () {
    wx.navigateBack();
  },  
  //确认发布
  sure () {
    var reg = /^\s*$/g;
    this.setData({
      time: Date.now()
    });
    this.get_time();    //调用获取当前时间函数
    this.upload();      //调用上传至云端函数
    wx.navigateBack();  //返回主界面
  },

})