import axios from 'axios';

class ApiDispatcher{
    constructor() {
        this.url = "http://us-central1-test-b7665.cloudfunctions.net/api/";
    }

    //Ajax wrapper call
    async call(endpoint, type, params){
        let axios_call;
        endpoint = this.url+endpoint;
        switch(type){
            default:
            case "get":
                axios_call = await axios.get(endpoint);
                break;
            case "post":
                axios_call = await axios.post(endpoint, params);
                break;
            case "delete":
                axios_call = await axios.delete(endpoint);
                break;
        }
        return axios_call.data;
    }
}

export default new ApiDispatcher();