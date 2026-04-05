import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  
  console.log('Original file path:', req.file.path);
  
  const thumbPath = req.file.path + '_thumb';

  try {
    await sharp(req.file.path)
      .resize(160, 160)
      .png()
      .toFile(thumbPath);
      
    console.log('Thumbnail created successfully at:', thumbPath);
    next(); 
  } catch (err) {
    console.error('Error creating thumbnail', err);
    next();
  }
};

export { createThumbnail };