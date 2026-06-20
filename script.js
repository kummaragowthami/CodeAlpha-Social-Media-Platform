const url =

"http://localhost:5000";

async function addPost() {

const username =

document.getElementById(

"username"

).value;

const content =

document.getElementById(

"content"

).value;

await fetch(

url+"/posts",

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},

body:JSON.stringify({

username,

content

})

}

);

loadPosts();

}

async function loadPosts(){

const response=

await fetch(

url+"/posts"

);

const posts=

await response.json();

let output="";

posts.forEach(post=>{

output+=`

<div class="post">

<h3>

${post.username}

</h3>

<p>

${post.content}

</p>

<button

onclick="likePost(

${post.id}

)">

Like

${post.likes}

</button>

</div>

`;

});

document.getElementById(

"posts"

).innerHTML=

output;
output += `
<div class="post">

<h3>${post.username}</h3>

<p>${post.content}</p>

<button onclick="likePost(${post.id})">
Like ${post.likes}
</button>

<br><br>

<input
id="comment${post.id}"
placeholder="Write a comment">

<button onclick="addComment(${post.id})">
Comment
</button>

<div id="comments${post.id}"></div>

</div>
`;

}

async function likePost(id){

await fetch(

url+

"/posts/like/"+id,

{

method:"PUT"

}

);

loadPosts();

}

loadPosts();
posts.forEach(post=>{
loadComments(post.id);
});
async function addComment(postId){

const username =
document.getElementById("username").value;

const text =
document.getElementById(
"comment"+postId
).value;

await fetch("/comments",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
postId,
username,
text
})

});

loadPosts();

}

async function loadComments(postId){

const response =
await fetch(
"/comments/"+postId
);

const comments =
await response.json();

let html = "";

comments.forEach(c=>{

html += `
<p>
<b>${c.username}</b> :
${c.text}
</p>
`;

});

const div =
document.getElementById(
"comments"+postId
);

if(div){
div.innerHTML = html;
}
}
async function followUser(){

const user =
document.getElementById(
"username"
).value;

const followPerson =
document.getElementById(
"followUser"
).value;

await fetch("/follow",{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
user,
followPerson
})

});

alert(
user +
" is following " +
followPerson
);

}