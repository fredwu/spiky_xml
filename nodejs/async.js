console.time('nodejs async parsing');

var results = [],

    fs     = require('fs'),
    path   = require('path'),
    walk   = require('walk'),
    xml2js = require('xml2js'),

    walker = walk.walk(path.join(__dirname, '../fixtures')),
    files  = [];

var parser = new xml2js.Parser();

walker.on('file', function(root, stat, next) {
  for (var i = process.env.EXECUTION_CYCLES - 1; i >= 0; i--) {
    file = root + '/' + stat.name;

    fs.readFile(file, function(err, data) {
      if (data) {
        parser.parseString(data, function (err, result) {
          results.push(result);
        });
      }
    });

    next();
  }
});

walker.on('end', function() {
  console.timeEnd('nodejs async parsing');
});
