import React from 'react'
import StarIcon from '@material-ui/icons/Star';
import "./card.css"
import {format} from "timeago.js"

function Card({pin}) {
    return (
        <div className="card">
            <b className="card_name">Place info</b>
            <h4>{pin.title}</h4>
            <label>Review:</label>
            <p>{pin.desc}</p> 
            <label>Reating</label>
            <div>
            {Array(pin.rating).fill(
            <StarIcon className="star"/>
            )}
            </div>
            <label>Created by:</label>
            <b>{pin.username}</b>
            {/* <label>Created at:</label>
            <p>{format(pin.createdAt)}</p> */}
            
        </div>
    )
}

export default Card
