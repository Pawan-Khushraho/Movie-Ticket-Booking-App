const paymentController = require('../controllers/payment.controller');
const {authJwt,validatePaymentRequestBody} = require('../middlewares');


module.exports = function(app){
    app.get('/mba/api/v1/payments',[authJwt.verifyToken],paymentController.getAllPayments);
    app.get('/mba/api/v1/payments/:id',[authJwt.verifyToken],paymentController.getPaymentById);
    app.post('/mba/api/v1/payments',[authJwt.verifyToken,validatePaymentRequestBody.validatePaymentReqBody],paymentController.createPayment);
}