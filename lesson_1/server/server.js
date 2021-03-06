const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(express.static('.'));
app.use(bodyParser.json()); // Указываем, что содержимое - JSON
app.use(cors());

app.get('/catalogData', (req, res) => {
    fs.readFile('data/catalog.json', (err, data) => {
        res.send(data);
    })
})

app.get('/getBasket', (req, res) => {
    fs.readFile('data/cart.json', (err, data) => {
        res.send(data);
    })
})

app.post('/addToCart', (req, res) => {
    fs.readFile('data/cart.json', 'utf8', (err, data) => {
        const cart = JSON.parse(data);
        const item = req.body;
        addStats('add', item.product_name);

        let index = cart.findIndex((element, index, array) => {
            if (element.product_name === item.product_name && element.price === item.price) {
                element.quantity++;
                return true;
            }
        });

        if (index == -1) {
            item.quantity = 1;
            cart.push(item);
        }

        fs.writeFile('data/cart.json', JSON.stringify(cart), (err) => {
            if (err) {
                res.send('{"result": 0}');
            } else {
                res.send('{"result": 1}');
            }
        });
    });
});

app.post('/deleteFromBasket', (req, res) => {
    fs.readFile('data/cart.json', 'utf8', (err, data) => {
        const cart = JSON.parse(data);
        const item = req.body;
        addStats('delete', item.product_name);

        let index = cart.findIndex((element, index, array) => {
            if (element.product_name === item.product_name && element.price === item.price) {
                element.quantity--;
                return true;
            }
        });

        if (cart[index].quantity < 1) {
            cart.splice(index, 1);
        }

        fs.writeFile('data/cart.json', JSON.stringify(cart), (err) => {
            if (err) {
                res.send('{"result": 0}');
            } else {
                res.send('{"result": 1}');
            }
        });
    });
});

function addStats(action, product_name) {
    let operationData = {
        action: action,
        product_name: product_name,
        date: (new Date).toString()
    };
    fs.readFile('data/stats.json', 'utf8', (err, data) => {
        const stats = JSON.parse(data);
        stats.push(operationData);
        fs.writeFile('data/stats.json', JSON.stringify(stats), (err) => {
            if (err) console.log(err);
        });
    })
}

app.listen(3000, function () {
    console.log('server is running on port 3000!');
});