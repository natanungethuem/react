import axios from 'axios';

export default class HomeService {
    getBalance() {
        return axios.get( '/balance/balance' );
    }
}
