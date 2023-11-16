{let e=()=>{let t=$("#new-post-form");t.submit(e=>{e.preventDefault(),$.ajax({type:"post",url:"/posts/create",data:t.serialize(),success:e=>{var t=s(e.data.post);$("#post-list-container>ul").prepend(t),o($(" .delete-post-button",t)),new PostComments(e.data.post._id),new ToggleLike($(".toggle-like-button",t)),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:1500}).show()},error:e=>{console.log(e)}})})},s=e=>$(`
    <li id="post-${e._id}>">
  <p>
  
    <small>
      <a class="delete-post-button" href="/posts/destroy/${e._id}">X</a>
    </small>
    ${e.content}

    <br />
    <small>${e.user.name}</small>
    <br />
    <small>
    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${e._id}&type=post" >
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
      <input type="hidden" name="post" value="${e._id}" />
      <input type="submit" value="add comment" />
    </form>
  
    <div class="post-comment-list">
      <ul id="post-comments-${e._id}">
       
      </ul>
    </div>
  </div>
</li>

    `),o=t=>{$(t).click(e=>{e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:e=>{$("#post-$(data.post_id)").remove()},error:e=>{console.log(e)}})})};e()}