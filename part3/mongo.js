const mongoose = require('mongoose');

const password = process.argv[2];
const url = `mongodb+srv://hosnam214:${password}@cluster0.cp7h6w1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const name = process.argv[3]
const number = process.argv[4]

mongoose.set('strictQuery', false);

if(password){
    mongoose.connect(url)
    .then(() => {
        const personSchema = new mongoose.Schema({
            name: String,
            number: String,
        });
        const Person = mongoose.model('Person', personSchema);
        if(!name || !number){
            Person.find({})
            .then((result) => {
                console.log('phonebook: ');
                result.forEach(person => {
                    console.log(`${person.name} ${person.number}`);
                })
            mongoose.connection.close();
            });           
        }else{
            const person = new Person({name, number})
            person.save()
            .then(() => {
                console.log(`added ${name} number ${number} to phonebook`);
                mongoose.connection.close();
            })
        }
    })
    .catch((error) => {
        console.error('unable to connect to MongoDB');
    })
}
else{
    console.log('Give password as argument');
}
