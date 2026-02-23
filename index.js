const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');
const app = express();
const PORT = 8000;  


app.use(express.json());
app.use(express.urlencoded({extended: true}));

//ROUTES


app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
    </ul>`
    return res.send(html);
});

//REST API
app.get('/api/users', (req, res) => {
  return res.json(users);
});


app.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})
.post((req, res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({status: "success"});
    });
})
app.patch("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    // Merge old user with new data
    users[userIndex] = { ...users[userIndex], ...body };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ status: "error" });
        }
        return res.json({
            status: "success",
            updatedUser: users[userIndex]
        });
    });
});
app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = users.splice(userIndex, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ status: "error" });
        }
        return res.json({
            status: "success",
            deletedUser: deletedUser[0]
        });
    });
});





    

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// app.post("/api/users", (req, res) => {
//     res.json({status: "pending"});
// });

// app.patch("/api/users/:id", (req, res) => {
//     res.json({status: "pending"});
// });

// app.delete("/api/users/:id", (req, res) => {
//     res.json({status: "pending"});
// });
