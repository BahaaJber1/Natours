const checkIdParam = (data) => {
  return (req, res, next, val) => {
    if (val >= data.length)
      return res.status(404).json({ status: "fail", message: "Invalid ID" });
    next();
  };
};

export { checkIdParam };
