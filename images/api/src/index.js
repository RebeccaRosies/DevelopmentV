const s = require("./server.js");

s().then((app) => {

    app.listen(3000, (err) => {
        if (!err) {
            console.log("running on port " + 3000)
        } else {
            console.error(err)
        }
    })
})