{
  //method to submit form data for new post using AJAX
  let createPost = () => {
    let newPostForm = $("#new-post-form");
    newPostForm.submit((e) => {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: (data) => {
          let newpost = newPostDom(data.data.post);
          $("#post-list-container>ul").prepend(newpost)
        },
        error: (error) => {
          console.log(error);
        },
      });
    });
  };
  //   method to create a post to DOM
  let newPostDom = (post) => {
    return $(`
    <li id="post-${post._id}>">
  <p>
  
    <small>
      <a class="delete-post-button" href="/posts/destroy/${post.id}">X</a>
    </small>
    ${post.content}

    <br />
    <small>${post.user.name}</small>
  </p>
  <div class="post-comments">

    <form action="/comments/create" method="post" id="">
      <input
        type="text"
        name="content"
        placeholder="type here to add comment"
        required
      />
      <input type="hidden" name="post" value="${post._id}" />
      <input type="submit" value="add comment" />
    </form>
  
    <div class="post-comment-list">
      <ul id="post-comments-${post._id}">
       
      </ul>
    </div>
  </div>
</li>

    `);
  };
  createPost();
}
