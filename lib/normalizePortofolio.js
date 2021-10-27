module.exports = (photos) => {
    return photos.map((photo) => {
        let output = {
            id: photo.sys.id,
            photo: {
                alt: photo.fields.title,
                title: photo.fields.description,
                url: photo.fields.photo.fields.file.url,
            },
            date: photo.fields.date,
        };

        return output;
    });
};
