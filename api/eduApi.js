import { post, get, deleted } from "./request"
const { eduDomain } = require("./domain")
/**
 * 获取本学期的周数
 * @returns {*}
 */
export const requestCurrentSemesterWeekCount = (success, fail) => {
  return get(`${eduDomain}/semester/currentSemesterWeekCount`, {}, success, fail)
}

/**
 * 获取学期列表
 * @returns {*}
 */
export const requestCourseList = (success, fail) => {
  return get(`${eduDomain}/eduStudyResult/getMyStudyScore`, {}, success, fail)
}

/**
 * 获取当前处于校历的第几周
 * @param {*} success 
 * @param {*} fail 
 */
export const requestCurremtWeekCount = (success, fail) => {
  return get(`${eduDomain}/semester/getCurrentWeek`, {}, success, fail)
}