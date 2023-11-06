export const index = (req, res) => {
  return res.json(200, {
    message: "List of posts",
    posts: [],
  });
};
