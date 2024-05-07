const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

// 用于处理POST请求并将请求转发给其他服务
// set up a post request handler
app.post('/events', (req, res) => {
    const event = req.body;

    // make a series of requests to different addresses , 将请求体中的事件数据转发到三个不同的地址
    // 同步地向三个地址发送事件,等待所有请求完成后再返回响应。这可能会导致性能瓶颈,因为如果有一个服务响应缓慢或者出现故障,整个请求就会被阻塞。
    axios.post('http://localhost:4000/events', event).catch((err) => {
    console.log(err.message);
    });
    axios.post('http://localhost:4001/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://localhost:4002/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post("http://localhost:4003/events", event).catch((err) => {
        console.log(err.message);
    });

    res.send({ status: 'OK' });
});


app.listen(4005, () => {
    console.log('Listening on 4005');
});