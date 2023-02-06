import { get, post } from "./request"
import id from "../miniprogram_npm/dayjs/locale/id";
const { libraryDomain } = require("./domain")


/**
 * 获取分类列表
 * @param {*} success
 * @param {*} fail
 */
export const requestTypeList = (success, fail) => {
  return get(`${libraryDomain}/bookClassify`, {}, success, fail)
}


/**
 * 获取书籍列表
 * @param {*} param
 * @param {*} success
 * @param {*} fail
 */
export const requestBookList = (param, success, fail) => {
  return post(`${libraryDomain}/bookPublish/page`, param, success, fail)
}


/**
 * 请求书籍详情
 * @param id
 * @param success
 * @param fail
 */
export const requestBookDetail = (id,success,fail)=>{
  return get(`${libraryDomain}/bookPublish/Mini/${id}`,{},success,fail)
}


/**
 * 请求预约书籍
 * @param param
 * @param success
 * @param fail
 */
export const requestReserveBook = (param,success,fail)=>{
  return post(`${libraryDomain}/libraryBookBorrow/reserveBook`,param,success,fail)
}


/**
 * 请求获取书籍借还信息
 * @param id 书籍id
 * @param success
 * @param fail
 */
export const requestLibraryData = (id,success,fail) =>{
  return get(`${libraryDomain}/libraryBookBorrow/getOrderData/${id}`,{},success,fail)
}


/**
 * 获取借还订单列表
 * @param param
 * @param success
 * @param fail
 */
export const requestOrderList = (param,success,fail) =>{
  return post(`${libraryDomain}/libraryBookBorrow/page`,param,success,fail)
}


/**
 * 根据id查询详情
 * @param id
 * @param success
 * @param fail
 */
export const requestBookBorrowDetail = (id,success,fail) => {
  return get(`${libraryDomain}/libraryBookBorrow/${id}`,{},success,fail)
}
