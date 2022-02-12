const fs = require('fs')
const [, , command] = process.argv;
if (command === 'add') {
    addItem();
}
else if (command === 'list') {
    readItem();
}
else if (command === 'edit') {
    updateItem();
}
else if (command === 'delete') {
    deleteItem();
}
function addItem() {
    const id = 1;
    const [, , , title] = process.argv;
    if (!title) {
        console.log("please enter title")
    }
    else {
        const data = JSON.parse(fs.readFileSync('./data.json', { encoding: 'utf-8' }));
        if (data.length == 0) {
            fs.writeFileSync('./data.json', JSON.stringify({ title, id: 1 }));
        }
        else {
            const newId = data[data.length - 1].id + 1;
            data.push({ title, id: newId })
            fs.writeFileSync('./data.json', JSON.stringify(data));
        }
    }
}
function readItem() {
    const data = JSON.parse(fs.readFileSync('./data.json', { encoding: 'utf-8' }));
    console.log(data);
}
function updateItem() {
    const data = JSON.parse(fs.readFileSync('./data.json', { encoding: 'utf-8' }));
    const [, , , id, newTitle] = process.argv;
    const newData = data.find((elem) => +data.id === +id)
    if (newData) {
        newData.title = newTitle;
        fs.writeFileSync('./data.json', JSON.stringify(data))
        console.log(data);
    }
    else {
        console.log("id not found")
    }
}
function deleteItem() {
    const data = JSON.parse(fs.readFileSync('./data.json', { encoding: 'utf-8' }));
    const [, , , id] = process.argv;
    let deleteID = data.findIndex((elem) => +elem.id === +id)
    console.log(deleteID)
    if (deleteID != -1) {
        newData = data.filter((elem) => +elem.id !== +id)
        fs.writeFileSync('./data.json', JSON.stringify(newData));
        console.log(newData);
    } else {
        console.log("id not found");
    }
}
