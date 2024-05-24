import Account from "./models/Account.js";

const createAccount = async () =>{
    const newAccount = new Account({
        email: 'john.doe@example.com',
        password: 'password1',
        userId: newAccount._id
    })
    try {
        await newAccount.save();
        console.log('Account created successfully');
    } catch (error) {
        console.error('Error creating Account:', error);
    }
}

export default createAccount;