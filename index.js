const express = require("express");
const app = express();
const users = require('./db/users.json');
const PORT = 3000;

// Template engine
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json()) // habitlitar el tipo a recibir en el server 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.info(`> Estoy arribísima en el puerto http://localhost:${PORT} ! ✨🦄`);
});

