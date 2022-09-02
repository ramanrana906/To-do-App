const express= require('express');


const router = express.Router();

const homeController = require('../controllers/home-controller');
router.get('/',homeController.home);
router.post('/add-task', homeController.addTask);

router.post('/delete-task', homeController.deleteTask);




module.exports= router;