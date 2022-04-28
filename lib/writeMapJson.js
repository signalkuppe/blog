const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

module.exports = function writeMapJson(posts) {
    fs.outputJsonSync(
        path.join(
            process.cwd(),
            pequeno.config.outputDir,
            '_data',
            'map-points.json',
        ),
        posts.map((post) =>
            _.pick(post, [
                'coordinates',
                'title',
                'id',
                'cover',
                'dateShort',
                'category',
                'permalink',
                'tags',
            ]),
        ),
    );
};
