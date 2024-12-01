const express = require('express');
const cors = require('cors');
const app = express();

// Use CORS middleware
app.use(cors());

app.use(express.json());

// Your existing routes
app.post('/api/users/register/user', (req, res) => {
    // Your registration logic
    res.json({ success: true, message: "User registered successfully!" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
