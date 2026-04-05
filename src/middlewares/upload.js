import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  
  const thumbPath = req.file.path + '_thumb';

  try {
    await sharp(req.file.path)
      .resize(160, 160)
      .png()
      .toFile(thumbPath);
      
    next();
  } catch (err) {
    console.error('Error creating thumbnail', err);
    next();
  }
};

export { createThumbnail };