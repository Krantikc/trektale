class ErrorHandlerService {
    parseValidationErrors(errors) {
        let errorsList = [];
        if (errors) {
            const errorKeys = Object.keys(errors);
            errorKeys.forEach((errorKey, i) => {
                errorsList.push(errors[errorKey]);
            });
        }
        return errorsList;
    }
}

module.exports = new ErrorHandlerService();