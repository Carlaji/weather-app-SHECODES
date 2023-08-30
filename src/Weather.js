import React from "react";

export default function Weather(props) {
  return (
    <ul>
      <li>Temperature: {props.temp}℃</li>
      <li>Description: {props.description}</li>
      <li>Humidity: {props.humidity}%</li>
      <li>Wind: {props.wind}km/h</li>
      <li>
        <img src={props.icon} alt={props.description} />
      </li>
    </ul>
  );
}
