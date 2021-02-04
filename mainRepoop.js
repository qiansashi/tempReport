var https = require('https')
var readline = require('readline')
var stream = require('stream')
var qs = require('querystring');
const request = require('request')
const { JSDOM } = require('jsdom')
const url = require('./urlRouter')
// const security=require('./security')
const options = {
    hostname: url.casUrl,
    port: 443,
    path: url.casParam,
    method: 'GET'
}
function readInputForm() {
    const userForm = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    userForm.on('line', (line) => {
        var userInfo = line.split(' ')
        for (var i in userInfo) {
            console.log(userInfo[i])
        }
    })
    userForm.on('close', () => {
        process.exit()
    })
}
//promise 封装cas请求
var casRquest = new Promise((resolve, reject) => {
    var casHtml = https.request(options, (res) => {
        console.log('status:' + res.statusCode)
        console.log('header:' + JSON.stringify(res.headers))
        resolve(res)
        reject(res)
    })
    casHtml.on('error', (e) => {
        console.log('e:' + e.message)
    })
    casHtml.end()
})
function getCasExecution(chunk) {
    const dom = new JSDOM(chunk)
    const { window } = dom
    const { document } = window
    global.window = window
    global.document = document
    const $ = global.jQuery = require('jQuery')
    var execution = $("input[name='execution']").val()
    console.log('exec   ' + execution)
    return execution
}
function casLogin(casArray, resData) {
    let option = {
        hostname: url.casUrl,
        port: 443,
        path: url.casParam,
        method: 'POST',
        headers: url.casHeaders
    }
    resData.on('data', (chunk) => {
        var execution = getCasExecution(chunk)
        var formData = {
            username: casArray[0],
            password: '0b67ff90a703cfdcb7593c8e2493fae552ac224b1aae0de75ebfd64d3cb1c32130f610c89a746e4b1c282a99884bf38baf4451e9b084ad3bf35b9d29889394cd46cfe7e755b461093d1383f0d849e0eb0216fe68651954023760d038a6fdca9b7cf67e973baa96b4f29b514d19e9caa92e32e37ecb15a86a71cd32b2551b4a43',
            encrypted: 'true',
            _eventId: 'submit',
            loginType: '1',
            submit: '登 录',
            execution: execution
        }
        var form = qs.stringify(formData)
        console.log(form)
        let opt = {
            url: url.casRequestUrl,
            port: 443,
            method: 'POST',
            headers: url.casHeaders,
            body: form
        }
        //request模块文档地址：https://github.com/request/request
        // request.post({
        //     uri: url.casRequestUrl,
        //     options: url.casHeaders
        // }, function (err, httpResponse, body) {
        //     console.log('post data: ' + body)
        // }).form(formData)
        request(opt, (err, res, body) => {
            if (err) {
                console.log(err)
            } else {
                const dom = new JSDOM(body)
                const { window } = (dom).window
                const { document } = window
                global.window = window
                global.document = document
                const $ = global.jQuery = require('jQuery')
                if ($('h2').text() == '成功' || $('h2').text() == '登录成功') {
                    console.log('post data: ' + body)
                    console.log(res.headers['set-cookie'])
                }else{
                    console.log('h2 testttttt'+$('h2').text())
                }
            }
        })
        //https.ClientRequest类无法请求待修改
        // var casLoginRequest = https.request(option, res => {
        //     console.log('loginStatus: ' + res.statusCode)
        //     console.log('loginHeader: ' + JSON.stringify(res.headers))
        //     res.on('data', (chunk) => {
        //         console.log('body2 ' + chunk)
        //     })
        // })
        // casLoginRequest.write(form)
        // casLoginRequest.on('error', (e) => {
        //     console.log('e:' + e.message)
        // })
        // casLoginRequest.end('data', () => {
        //     console.log('post end')
        // })
    })
}
function workflowLogin() {

}
casRquest.then((res) => {
    res.on('data', (chunk) => {
        // console.log('body ' + chunk)
        getCasExecution(chunk)
    })
})
casRquest.then((res) => { casLogin(['021117111'], res) })