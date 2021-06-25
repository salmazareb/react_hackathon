import React,{useState} from 'react'
import axios from 'axios'
import "./card.css" 

function CardForm({newPlace, setPins , setNewPlace, pins}) {
    const [title,setTitle]=useState(null)
    const [username,setUsername]=useState(null)
    const [desc,setDesc]=useState(null)
    const [rating,setRating]=useState(1)


    const hanleSubmit = async (e) => {
        e.preventDefault()
        const newPin = {
            username:username,
            title:title,
            desc:desc,
            rating:rating,
            lat:newPlace.lat,
            long:newPlace.long
        }
        try {
            const result = await axios.post("/pins",newPin)
            setPins([...pins,result.data])
            setNewPlace(null)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="card-form">
            <form onSubmit={hanleSubmit}>
                <label>Place Name:</label>
                <input type="text" placeholder="place name" onChange={(e)=> setTitle(e.target.value)} />
                <label>Review</label>
                <textarea placeholder="tell us about this place!" onChange={(e)=> setDesc(e.target.value)}/>
                <label>Rating</label>
                <select onChange={(e)=> setRating(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label>User Name:</label>
                <input type="text" placeholder="User name" onChange={(e)=> setUsername(e.target.value)}/>
                <button type="submit">Add Pin</button>
            </form>
        </div>
    )
}

export default CardForm
