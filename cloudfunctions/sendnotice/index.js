const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
        "touser": event.openid,
        "page": 'index',
        "lang": 'zh_CN',
        "data": {
          "thing1": {
            "value": 'warn'
          },
          "character_string3": {
            "value": '2018-01-01'
          },
        },
        "templateId": 'Cb4-xVMsJnnxAR4FkTkx95eKcehGFnhs6mxTZHPU7WY',
        "miniprogramState": 'developer'
      })
    return result
  } catch (err) {
    return err
  }
}