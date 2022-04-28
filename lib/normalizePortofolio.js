const dayjs = require('dayjs');
const it = require('dayjs/locale/it');
const slug = require('slug');

module.exports = (photos) => {
    return photos.map((photo, i) => {
        let output = {
            index: ++i,
            slug: slug(`${photo.fields.title}-${photo.sys.id}`),
            alt: photo.fields.description,
            title: photo.fields.title,
            src: photo.fields.photo.fields.file.url,
            width: photo.fields.photo.fields.file.details.image.width,
            height: photo.fields.photo.fields.file.details.image.height,
            date: dayjs(photo.fields.date).locale(it).format('DD MMMM YYYY'),
            dateTime: dayjs(photo.fields.date)
                .locale(it)
                .format('YYYY-MM-DD HH:mm'),
        };

        return output;
    });
};
