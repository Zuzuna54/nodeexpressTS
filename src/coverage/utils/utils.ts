

//Helper fucntion to check if the email is valid
export const validateEmail = (email: string): boolean => {

    console.log(`initiating validateEmail \n`);

    //Regex to validate email
    const emailRegex: RegExp = /\S+@\S+\.\S+/;
    console.log(`emailRegex: ${emailRegex}`);

    //Validate the email
    console.log(`Validating the email\n`)
    const emailValidated: boolean = emailRegex.test(email);
    console.log(`emailValidated: ${emailValidated}`);

    return emailValidated

};


//Helper function to validate username not to contain empty spaces and special characters
export const validateUsername = (username: string): boolean => {

    console.log(`initiating validateUsername \n`);

    //Regex to validate username
    const usernameRegex: RegExp = /^[a-zA-Z0-9]+$/;
    console.log(`usernameRegex: ${usernameRegex}`);

    //Validate the username
    console.log(`Validating the username\n`)
    const usernameValidated: boolean = usernameRegex.test(username);
    console.log(`usernameValidated: ${usernameValidated}`);

    return usernameValidated

};


//Helper function to validate password to be longer than 8 characters
export const validatePasswordLength = (password: string): boolean => {

    console.log(`initiating validatePassword \n`);

    //Validate the password
    console.log(`Validating the password\n`)
    const passwordValidated: boolean = password.length >= 8;
    console.log(`passwordValidated: ${passwordValidated}`);

    return passwordValidated

};


//Helper function to validate password not to contain empty spaces
export const validatePasswordSpaces = (password: string): boolean => {

    console.log(`initiating validatePassword \n`);

    //Regex to validate password
    const passwordRegex: RegExp = /\s/;
    console.log(`passwordRegex: ${passwordRegex}`);

    //Validate the password
    console.log(`Validating the password\n`)
    const passwordValidated: boolean = passwordRegex.test(password);
    console.log(`passwordValidated: ${passwordValidated}`);

    return passwordValidated

};


//Helper function to validate password
export const validatePassword = (password: string): boolean => {

    console.log(`initiating validatePassword \n`);

    //Validate the password
    console.log(`Validating the password\n`)
    const passwordValidated: boolean = validatePasswordLength(password) && !validatePasswordSpaces(password);
    console.log(`passwordValidated: ${passwordValidated}`);

    return passwordValidated

};

