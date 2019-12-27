// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command


exports.main = async(event, conent) => {
  // const targetDB = db.collection(event.database)
  // const targetDB = db.collection('user_collect')
  const targetDB = db.collection(event.table)


  try {
    if (event.type == 'get') {
      return await targetDB.where(event.condition).field(event.field).limit(10).get()


    }
    if (event.type == 'add') {
      return await targetDB.add({
        data: event.data
      })
    }
    if (event.type == 'update') {
      return await targetDB.doc(event.indexKey).update({
        data: event.data
      })
    }
    if (event.type == 'remove') {
      return await targetDB.where(event.condition).remove()

      // return event

    }
  } catch (err) {
    console.log(err)
  }
}