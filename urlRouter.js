const casUrl = 'cas.sues.edu.cn'
const casParam = '/cas/login'
const casRequestUrl='https://cas.sues.edu.cn/cas/login'
const workFlowUrl = 'workflow.sues.edu.cn/default/work/shgcd/jkxxcj/com.sudytech.work.shgcd.jkxxcj.jkxxcj.saveOrUpdate.biz.ext'
const casHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Host': 'cas.sues.edu.cn',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36',
    'Referer': 'https://cas.sues.edu.cn/cas/login',
}
module.exports = { casUrl, casParam, workFlowUrl, casHeaders,casRequestUrl }