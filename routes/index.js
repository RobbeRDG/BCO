var express = require('express');
var router = express.Router();
const canEditResultaat = require('../middleware/canEditResultaat');

// Require controller modules.
var home_controller = require('../controllers/homeController');
var bestuur_controller = require('../controllers/bestuurController');
var resultaten_controller = require('../controllers/resultatenController');
var about_controller = require('../controllers/aboutController');
var getstarted_controller = require('../controllers/getstartedController');
var contact_controller = require('../controllers/contactController');

/// home ROUTES ///

// GET catalog home page.
router.get('/', home_controller.index);

///about Routes///

router.get('/about', about_controller.about);

///contact Routes///

router.get('/contact', contact_controller.contact);

///get Started Routes///

router.get('/getstarted', getstarted_controller.getstarted);

/// bestuur ROUTES staan achter de about url ///

// GET request for creating bestuur. NOTE This must come before route for id (i.e. display author).
router.get('/about/bestuur/create', bestuur_controller.bestuur_create_get);

// POST request for creating bestuur.
router.post('/about/bestuur/create', bestuur_controller.bestuur_create_post);

// GET request to delete bestuur.
router.get('/about/bestuur/:id/delete', bestuur_controller.bestuur_delete_get);

// POST request to delete bestuur.
router.post('/about/bestuur/:id/delete', bestuur_controller.bestuur_delete_post);

// GET request to update bestuur.
router.get('/about/bestuur/:id/update', bestuur_controller.bestuur_update_get);

// POST request to update bestuur.
router.post('/about/bestuur/:id/update', bestuur_controller.bestuur_update_post);

// GET request for one bestuur.
router.get('/about/bestuur/:id', bestuur_controller.bestuur_detail);

// GET request for list of all bestuur.
router.get('/about/bestuur', bestuur_controller.bestuur_list);

/// resultaten ROUTES ///


// GET request for creating a resultaat. NOTE This must come before route that displays Genre (uses id).
router.get('/resultaten/create', canEditResultaat, resultaten_controller.resultaten_create_get);

//POST request for creating resultaat.
router.post('/resultaten/create', canEditResultaat, resultaten_controller.resultaten_create_post);
// GET request to delete resultaat.
router.get('/resultaten/:id/delete', resultaten_controller.resultaten_delete_get);
/*
// POST request to delete resultaat.
router.post('/resultaten/:id/delete', resultaten_controller.resultaten_delete_post);

// GET request to update resultaat.
router.get('/resultaten/:id/update', resultaten_controller.resultaten_update_get);

// POST request to update resultaat.
router.post('/resultaten/:id/update', resultaten_controller.resultaten_update_post);
*/
// GET request for one resultaat.
router.get('/resultaten/:id', resultaten_controller.resultaten_detail);

// GET request for list of all resultaten.
router.get('/resultaten', resultaten_controller.resultaten_list);


module.exports = router;