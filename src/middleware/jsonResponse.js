export const jsonResponseMiddleware = (req, res, next) => {
  res.jsonResponse = ({ status = "success", message = "", data = null }) => {
    res.status(200).json({ status, message, data });
  };
  next();
};
