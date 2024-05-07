/**
 * Use Node.js Express framework to create a simple web service
 */


const express = require('express'); // introduce the express framework
const bodyParser = require('body-parser');  // body-parser 是一个 Express 中间件，用于解析 HTTP 请求体, 并使其在 req.body 属性中可用
const { randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');


// create an instance of express web program
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// get request: get all posts
app.get('/posts', (req, res) => {
    res.send(posts); // 发送response给客户端
});


// post request: create a new post
app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');  // generate a random id

    // store the post into posts 
    const { title } = req.body; //从请求体 req.body 中提取 title 属性

    posts[id] = {
        id, title  //将 id 和 title 作为键值对存储到一个对象中
    };

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    });

    res.status(201).send(posts[id]);

});

app.post('/events', (req, res) => {
    console.log('Received Event: ', req.body.type);

    res.send({});
})

app.listen(4000, () => {
    console.log("Listening on 4000");
});