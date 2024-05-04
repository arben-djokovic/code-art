import axios from 'axios'

export default axios.create({
    baseURL: 'http://codeart.cc',
    headers: { "Content-Type": "application/json",
        "24CA04APR02": "A3RA7554F80ET26"
      },
      mode: 'no-cors'
})