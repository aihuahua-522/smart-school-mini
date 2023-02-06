import { get } from "./request";
import { miniDomain } from "./domain";
/**
 * 请求获取首页
 */
export const requestTopMenu = (success, fail) => {
  return get(`${miniDomain}/menu/top`, {}, success, fail)
}


/**
 * 请求获取首页
 */
export const requestMenuList = (success, fail) => {
  return get(`${miniDomain}/menu/list`, {}, success, fail)
}


