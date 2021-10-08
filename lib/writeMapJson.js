const fs = require('fs-extra');
const path = require('path');
const _ = require('lodash');

module.exports = function writeMapJson(posts, { config }) {
    fs.outputJsonSync(
        path.join(process.cwd(), config.outputDir, '_data', 'map-points.json'),
        posts.map((post) =>
            _.pick(post, [
                'coordinates',
                'title',
                'cover',
                'dateShort',
                'category',
                'permalink',
            ]),
        ),
    );
};
