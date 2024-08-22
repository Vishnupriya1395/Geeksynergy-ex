// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, authUser, getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/', protect, getAllUsers);  // This should now work correctly
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

module.exports = router;
