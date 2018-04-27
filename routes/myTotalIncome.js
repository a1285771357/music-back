var express = require('express');
var router = express.Router();

router.post('/mimosa/client/investor/baseaccount/myTotalIncome', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin","*");
    /*星号表示所有的异域请求都可以接受，*/
    res.setHeader("Access-Control-Allow-Methods","GET,POST");
    res.json({"errorCode":0,"errorMessage":null,"totalCapitalAmount":0,"capitalList":[{"capitalColor":"#ffab7a","capitalName":"快活宝(元)","capitalAmount":0,"capitalDetails":[{"amount":0,"productName":"含申请中"}]},{"capitalColor":"#ffdac4","capitalName":"暴风天天向上(元)","capitalAmount":0,"capitalDetails":[{"amount":0,"productName":"含申请中"}]},{"capitalColor":"#99cef2","capitalName":"定期(元)","capitalAmount":0,"capitalDetails":[{"amount":0,"productName":"含募集中"}]},{"capitalColor":"#ffd7f2","capitalName":"在途(元)","capitalAmount":0,"capitalDetails":[{"amount":0,"productName":"含转入中"},{"amount":0,"productName":"含转出中"}]}]})
})

module.exports = router;