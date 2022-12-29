import axios from 'axios';

const eCommerce_API = axios.create({
    baseURL:  "http://Starmax-env.eba-qmptzanb.us-west-1.elasticbeanstalk.com/ecommerce",
    //baseURL: "http://localhost:8080/ecommerce",
    headers: {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

export default eCommerce_API;