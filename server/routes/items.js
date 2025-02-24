import express from 'express';
import Item from '../models/Item.js';
import authenticate from '../middleware/auth.js';

const router = express.Router();

// 1. Get all items (public)
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Create a new item (protected)
router.post('/', authenticate, async (req, res) => {
  // Attach the logged-in user id to the item
  const newItem = new Item({ ...req.body, user: req.user.id });
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. Get a specific item by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. Delete an item (protected: only owner can delete)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item)
      return res.status(404).json({ message: "Item not found" });
    if (item.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
