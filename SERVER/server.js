const app = require("./src/app");
const { app: {  port } } = require('./src/configs/config.mongodb')
const server = app.listen(port, () => {
    console.log(`WSV eCommit start with ${port}`);
});