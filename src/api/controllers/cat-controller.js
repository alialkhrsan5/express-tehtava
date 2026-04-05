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

  const result = await addCat({ cat_name, weight, owner, birthdate, filename });
  
  if (result.cat_id) {
    res.status(201);
    res.json({ message: 'New cat added.', result });
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  const result = await modifyCat(req.body, req.params.id);
  if (result) {
    res.json({message: 'Cat item updated.'});
  } else {
    res.sendStatus(400);
  }
};

const deleteCat = async (req, res) => {
  const result = await removeCat(req.params.id);
  if (result) {
    res.json({message: 'Cat item deleted.'});
  } else {
    res.sendStatus(400);
  }
};

export { getCat, getCatById, getCatsByUserId, postCat, putCat, deleteCat };