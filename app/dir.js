module.exports = { root: __dirname, host(path) {
  return "http://localhost:4000/" + path; 
} };
