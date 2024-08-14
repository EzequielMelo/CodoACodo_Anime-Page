var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
const session = require('express-session');
const hbs = require('hbs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var logoutRouter = require('./routes/logout');
var myprofileRouter = require('./routes/myprofile');
var favoritesRouter = require('./routes/favorites');
var votesRouter = require('./routes/votes');
var commentsRouter = require('./routes/comments');
var searchRouter = require('./routes/search');
var adminDashboardRouter = require('./routes/adminDashboard');
var adminAddAnimeRouter = require('./routes/adminAddAnime');
var adminAddAnimeRouter = require('./routes/adminAddAnime');
var watchRouter = require('./routes/watch');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'mi-secreto-super-seguro',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 60 * 1000 } // 30 minutos
}));

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session && req.session.user;
  res.locals.user = req.session ? req.session.user : null;
  res.locals.isAdmin = req.session && req.session.user && req.session.user.tipo === 1;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/myprofile', myprofileRouter);
app.use('/favorites', favoritesRouter);
app.use('/votes', votesRouter);
app.use('/comments', commentsRouter);
app.use('/search', searchRouter);
app.use('/adminDashboard', adminDashboardRouter);
app.use('/adminAddAnime', adminAddAnimeRouter);
app.use('/watch', watchRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
