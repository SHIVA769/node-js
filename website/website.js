const express = require('express');
const app = express();
const path = require('path');
const port = 3000;


// Serve static files from the html directory
app.use(express.static(path.join(__dirname, '..', 'html')));

// parse URL-encoded form bodies (from HTML forms)
app.use(express.urlencoded({ extended: true }));
// parse JSON bodies (optional)
app.use(express.json());

// Main page route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'web.html'));
});


// About page route
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'html', 'about.html'));
});
app.post('/submit', (req, res) => {
    const { name, email } = req.body || {};
    if (!name || !email) {
        return res.status(400).json({ error: 'name and email are required' });
    }

    console.log('Form submission received:', { name, email });

    // simple confirmation response
    res.json({ success: true, user: { name, email } });
});



// Error handling middleware
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '..', 'html', 'about.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Try these routes:
    - http://localhost:${port}/      (home page)
    - http://localhost:${port}/about (about page)`);
});