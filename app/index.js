const express = require("express");
const { publicRoutes, protectedRoutes } = require("./router");

function run() {
  const app = express()
  app.use(express.json())
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log("Server running at PORT", PORT);
  })
  
  app.use(express.static(__dirname + "/images"))
  app.use("/api", publicRoutes);
  app.use("/api", protectedRoutes);
}

run();
