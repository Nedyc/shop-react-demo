class Auth{
    constructor() {
        this.authenticated = false;
    }

    //Login logic
    login(cb){
        this.authenticated = true;
        cb();
    }

    //Log out the user
    logout(cb){
        this.authenticated = false;
        cb();
    }

    //Return if user is logged or not
    isAuthenticated(){
        return this.authenticated;
    }
}

export default new Auth();