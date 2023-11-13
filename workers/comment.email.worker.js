import { queue } from "../config/kue";
import { newComment } from "../mailers/comment.mailers";

queue.process("emails", (job, done) => {
  console.log("email workers is processing the job", job.data);
  newComment(job.data);
  done();
});
