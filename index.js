const express = require('express');
const userRoutes = require('./routes/user.routes');
const loginRoutes = require('./routes/login.routes');
const categoriesRoutes = require('./routes/categories.routes');
const postRoutes = require('./routes/post.routes');
const errorsMiddleware = require('./errors');

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/categories', categoriesRoutes);
app.use('/post', postRoutes);

app.use(errorsMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
