const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());


const posts = {};
// quick example
// posts === {
//     '1': {
//         id: '1',
//         title: 'post title',
//         comments: [
//             {id: 'klj3kl', content: 'comment'}
//         ]
//     },

//     '2': {
//         id: '2',
//         title: 'post title',
//         comments: [
//             {id: 'klj3kl', content: 'comment'}
//         ]
//     },
//     '3': {
//         id: '3',
//         title: 'post title',
//         comments: [
//             {id: 'klj3kl', content: 'comment'}
//         ]
//     }
// }

// Two route handlers
app.get('/posts', (req, res) => {
    res.send(posts);

});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    // if event is postcreated
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }

    // if event is commentcreated
    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        post.comments.push( { id, content, status} );
    }

    if ( type === 'CommentUpdated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => {
            return comment.id === id;
        });

        // update the comment status
        comment.status = status;
        comment.content = content;
    }

    console.log(posts);

    res.send({});
});

app.listen(4002, () => {
    console.log('Listening on 4002');
})
