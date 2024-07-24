function isAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.tipo === 1) {
    return next();
  } else {
    res.status(403).send('Acceso denegado.');
  }
}

module.exports = isAdmin;