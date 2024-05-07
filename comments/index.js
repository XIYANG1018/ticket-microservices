const express = require('express'); 
const bodyParser = require('body-parser'); 
const { randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};  // postId -> commentsList -> comment id, comment content

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);  // 通过请求体中的id得到comments的list，如果不存在就为空的list
});


app.post('/posts/:id/comments', async (req, res) => {
   const commentId = randomBytes(4).toString('hex');  // generate the comment id
   const { content } = req.body; // get the content
   const comments = commentsByPostId[req.params.id] || [];  // 通过请求体中的id得到comments的list，如果不存在就为空的list

   comments.push({ id: commentId, content, status: 'pending' });  // 把请求体中的content和我们generate的commentId存储到这个list中

   commentsByPostId[req.params.id] = comments;  

   await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
        id: commentId,
        content,
        postId: req.params.id,
        status: 'pending'
    }
   });

   res.status(201).send(comments); // send back the entire array of comments
});

// Create an event to the event bus
app.post('/events', async (req, res) => {
    console.log('Received Event: ', req.body.type);

    const { type, data } = req.body;

    // 接收CommentModerated event，并且更新对应comment的status，原来的status是pending
    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;    

        // tell other services that the status has been changed, send out an event CommentUpdated
        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        })
    }

    


    res.send({});
})

app.listen(4001, () => {
    console.log("Listening on 4001");
});