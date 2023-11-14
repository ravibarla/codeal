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
          let newPost = newPostDom(data.data.post);
          // console.log(data)
          $("#post-list-container>ul").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));

          // call the create comment class
          new PostComments(data.data.post._id);

          // change :: enable the functionality of the toggle like button on the new post 4
          new ToggleLike($(".toggle-like-button", newPost));

          new Noty({
            theme: "relax",
            text: "Post published!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: (error) => {
          console.log(error);
        },
      });
    });
  };
  //   method to create a post to DOM
  let newPostDom = (post) => {
    // change :: show the count zero likes on the post
    return $(`
    <li id="post-${post._id}>">
  <p>
  
    <small>
      <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
    </small>
    ${post.content}

    <br />
    <small>${post.user.name}</small>
    <br />
    <small>
    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=post" >
    0 likes
    </small>
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

  //method to delete a post from dom
  let deletePost = (deleteLink) => {
    $(deleteLink).click((e) => {
      e.preventDefault();
      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: (data) => {
          $(`#post-$(data.post_id)`).remove();
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  };
  createPost();
}
