export default {
    // rootPath: 'http://localhost:6969'
    // rootPath: process.env.REACT_APP_STATE === "localhost" ? "http://localhost:6969" : ""
    rootPath: process.env.ENVIROMENT === 'local' ? "http://localhost:6969" : "https://marvelpj-server.herokuapp.com"
};