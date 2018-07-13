let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();



app.use(express.static(__dirname + '/authorApp/dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ===============================



// ==== NEW MONGOOSE CODE! =======
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/authors');
mongoose.Promise = global.Promise;

// ======================

let AuthorSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})


let Author = mongoose.model("Author", AuthorSchema);
// ==============================




// ===== ROUTES! ======
//get all author
app.get('/authors', function(req, res) {
    Author.find({}, function(err, authors) {
        if (err) {
            console.log("Returned error", err);
            // respond with JSON
            res.json({ message: "loading all authors", error: err })
        } else {
            // respond with JSON
            res.json({ message: "Success", data: authors })
        }
    })
})

//get one author
app.get("/authors/:id", function(req, res) {
        Author.findOne({ _id: req.params.id }, function(err, author) {
            if (err) {
                res.json("Error loading the author")
            } else {
                res.json(author);
            }
        })
    })
    //create new author
app.post("/authors", function(req, res) {
        console.log(req.body)
        author = new Author(req.body);
        author.save(function(err) {
            if (err) {
                console.log('Error save the new author');
                res.json("Error creating new author");
            } else {
                console.log('Successfully to add a author');
                res.json(author);
            }
        })
    })
    //update an author
app.put("/authors/:id", function(req, res) {
        Author.findOne({ _id: req.params.id }, function(err, author) {
            if (err) {
                res.json("Error updating author");
            } else {
                author.set(req.body);
                author.updated_at = Date.now();
                author.save(function(err, author) {
                    if (err) {
                        res.json("Error updating author");
                    } else {
                        res.json(author);
                    }
                })
            };
        });
    })
    //delete author
app.delete('/authors/:id', function(req, res) {
    Author.findByIdAndRemove({
        _id: req.params.id
    }, function(err, data) {
        if (err) {
            res.json({ error: err })
        } else {
            res.json({ success: data })
        }
    })
})


app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./authorApp/dist/index.html"))
});


// ==== SERVER LISTENER! =======
app.listen(8000, function() {
    console.log("Express on port 8000!")
});
// =============================