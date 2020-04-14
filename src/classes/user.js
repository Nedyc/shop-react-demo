class User{
    constructor() {
        this.username = null;
    }

    setUsername(username){
        this.username = username;
    }

    getUsername(){
        return this.username;
    }

}

export default new User();