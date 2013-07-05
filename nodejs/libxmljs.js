console.time('nodejs libxmljs parsing');

var results = [],

    fs     = require('fs'),
    path   = require('path'),
    walk   = require('walk'),
    libxml = require('libxmljs'),

    walker = walk.walk(path.join(__dirname, '../fixtures')),
    files  = [];

walker.on('file', function(root, stat, next) {
  for (var i = process.env.EXECUTION_CYCLES - 1; i >= 0; i--) {
    file = root + '/' + stat.name;

    fs.readFile(file, function(err, data) {
      if (data) {
        results.push(libxml.parseXmlString(data));
      }
    });

    next();
  }
});

walker.on('end', function() {
  console.timeEnd('nodejs libxmljs parsing');
});
