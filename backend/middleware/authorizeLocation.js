function authorizeLocation(options = {}) {
  const { field = 'location', source = 'body' } = options;

  return (req, res, next) => {
    // Administrators can access every location
    if (req.user.role === 'ADMINISTRATOR') {
      return next();
    }

    let locationName;

    switch (source) {
      case 'body':
        locationName = req.body[field];
        break;

      case 'params':
        locationName = req.params[field];
        break;

      case 'query':
        locationName = req.query[field];
        break;

      default:
        locationName = req.body[field];
    }

    if (!locationName) {
      return res.status(400).json({
        success: false,
        message: 'Location is required.',
      });
    }

    const allowedLocations = req.user.locations || [];

    if (!allowedLocations.includes(locationName)) {
      return res.status(403).json({
        success: false,
        message: "You don't have access to this location.",
      });
    }

    next();
  };
}

module.exports = authorizeLocation;
