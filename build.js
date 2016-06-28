var Metalsmith = require('metalsmith'),
  templates = require('metalsmith-templates'),
  collections = require('metalsmith-collections'),
  pagination = require('metalsmith-pagination'),
  compress = require('metalsmith-gzip'),
  markdown = require("metalsmith-markdown");


Metalsmith(__dirname)
    .use(collections({
        articles: {
          pattern:'*.md',
          sortBy: 'date',
          reverse: true
       }
     }))
    .use(pagination({
      'collections.articles': {
          perPage: 5,
          template: 'theblog.hbt',
          first: 'blog/1/index.html',
          path: 'blog/:num/index.html',
          pageMetadata: {
                title: 'Archive'
              }
        }
    }))
    .use(markdown())
    .use(templates('handlebars'))
    .use(compress())
    .destination('./build')
    .build(function(err) {
	if (err) console.log(err);
  })
