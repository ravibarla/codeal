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
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
    });
  };
  //   method to create a post to DOM
  createPost();
}
