import { addCat, findCatById, findCatsByUserId, listAllCats, modifyCat, removeCat } from '../models/cat-model.js';

const getCat = async (req, res) => {
  res.json(await listAllCats());
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const getCatsByUserId = async (req, res) => {
  const cats = await findCatsByUserId(req.params.id);
  res.json(cats);
};

const postCat = async (req, res) => {
  const { cat_name, weight, owner, birthdate } = req.body;
  const filename = req.file ? req.file.filename : null;
  const catOwner = owner || res.locals.user.user_id;

  const result = await addCat({ 
    cat_name, 
    weight, 
    owner: catOwner, 
    birthdate, 
    filename 
  });
  
  if (result.cat_id) {
    res.status(201).json({ message: 'New cat added.', result });
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  // Lähetetään res.locals.user mukana tarkistusta varten
  const result = await modifyCat(req.body, req.params.id, res.locals.user);
  if (result) {
    res.json({message: 'Cat item updated.'});
  } else {
    res.status(403).json({message: 'Not authorized or cat not found'});
  }
};

const deleteCat = async (req, res) => {
  // Lähetetään res.locals.user mukana tarkistusta varten
  const result = await removeCat(req.params.id, res.locals.user);
  if (result) {
    res.json({message: 'Cat item deleted.'});
  } else {
    res.status(403).json({message: 'Not authorized or cat not found'});
  }
};

export { getCat, getCatById, getCatsByUserId, postCat, putCat, deleteCat };