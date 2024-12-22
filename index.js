const express = require('express');
const bodyParser  = require('body-parser')
const app = express();



app.use(bodyParser.json())

//port number 
const port = 3030;

const notes = [
    {id:1 , title:'first note' , content:"first note"},
    {id:1 , title:'first note' , content:"first note"},
    {id:1 , title:'first note' , content:"first note"},
];
//get all notes
app.get('/notes' , (req , res) =>{
    res.json({
        'data':notes
    });
    console.log('wellcome to my api');
})


//get note by id
app.get('/notes/:id' , (req , res) =>{
    //get id from url requist that you are convetted id number
    const id = Number(req.params.id);
    console.log(typeof(id))
    //find the the data by using id
    const note = notes.find((item) => item.id === id);
    //check note is not empty
    if(!note){
        return res.status(404).json({message: 'any note was not found!'});
    }else{
        res.status(200).json({
            message: 'Note is Found',
            'data': note
        })
    }
})

//create new note
app.post('/notes' , (req , res) =>{
    
   //increment id 
   const newID = notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 0;
    //hoding requistes from body
    const newNote = {
        id : newID,
        title : req.body.title,
        content : req.body.content
    };

   //adding object note newNotes from body
   notes.push(newNote);
   res.json({
    'data':notes
   })

})

//update the note 
app.put('/notes/:id' , (req , res) =>{
    //get ID from the URL and then conver number
    const editID = Number(req.params.id);
    //find the index of the note ID
    const editNote = notes.find((item) => item.id === editID)
    //check if note item is exists
    if(!editNote){
        return res.status(404).json({message: 'Not Found Any Note!'});
    }
    notes[editNote] = {
        // ...notes[editNote], //hold old note in the notes array
        ...req.body
    }
    res.json({
        'data' : notes[editNote]
    })
    
})

//delete note
app.delete('/notes/:id' , (req , res) =>{
    //find the id from url 
    const deleteID = Number(req.params.id);
    //find note item you went to delete
    const deleteNote = notes.find((item) => item.id === deleteID);
    //check if notte is empty
    if(!deleteNote){
        res.status(404).json({ message: 'could not have any note!'});
    }
    notes.splice(deleteNote , 1)    
    res.json({
        'data' : notes
    })
})


app.listen(port , () =>{
    console.log(`server run at ${port} port`);
})