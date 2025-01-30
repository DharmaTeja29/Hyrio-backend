const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const verificationController = require('../controllers/verificationController');
const verifyRole = require('../middleware/verfyRole');

router.use(verifyRole('company'));

router.get('/', companyController.getName);

router.get('/jobs$', companyController.getJobs);

router.get('/jobProfile/:jobId', companyController.getJobProfile);

router.get('/details$', companyController.getCompany);

router.post('/job$', companyController.postNewJob);

router.put('/company$', companyController.putCompany);

router.delete('/job/:jobId', companyController.deleteJob);

router.post('/sendMail$', verificationController.sendOTPMail);

router.post('/verifyMail$', verificationController.verifyOTPMail);

router.post('/resendMail$', verificationController.resendOTPMail);

router.post('/sendMobile$', verificationController.sendOTPMobile);

router.post('/verifyMobile$', verificationController.verifyOTPMobile);

router.post('/resendMobile$', verificationController.resendOTPMobile);

module.exports = router;