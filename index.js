const express = require('express');
const users = require('./MOCK_DATA.json');
const app = express();
const PORT = 8000;  


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
.patch((req, res) => {
    return res.json({status: "pending"});
})
.delete((req, res) => {
    return res.json({status: "pending"});
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
