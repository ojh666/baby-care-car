// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection("itemlists")    //此处标注需要获取的云数据库名称
  .get({
    success(res){
      return res
    },
    fail(err){
      return err
    }
  })
}