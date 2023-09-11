
// INSERT Document ( create function we use)
// User.create({name:"Ashish",email: "abcd3@gmail.com",age:20})
// .then(() => console.log("User Created"))
// .catch(err => console.log(err.message))

// READ Document (find, findOne, findById)
// User.findOne({email:"abcd3@gmail.com"}).sort({age:-1})
// .then( (users) => {
//     console.log(users)
// })
// .catch(err => console.log(err.message))

// User.findById("64fb4b9c9d13a4691e2e97d9")
// .then(doc => console.log(doc))

// Update Doc
// User.findOneAndUpdate({name:"Ashish"}, {age:70})
// .then(() => console.log("updated"))
// .catch((err) => console.log(err.message))


// Delete Doc
// User.findOneAndDelete({email:"abcd3@gmail.com",name:"Nishta"})
// .then(() => console.log("deletd"))
// .catch((err) => console.log(err.message))


// User.findByIdAndDelete("64fb4b2c98965358d7fb5078")
// .then(() => console.log("deletd"))
// .catch((err) => console.log(err.message))