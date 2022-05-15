
const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
}

exports.validateLoginData = (data) => {
    let errors = {};

    if (data.email === "@bccancer.bc.ca") errors.email = 'Must not be empty';
    if (isEmpty(data.password)) errors.password = 'Must not be empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};
