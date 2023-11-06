import { useState } from "react"
import "./Box.css"

export default function Box({ isActive = false, toggle }) {
    return (
        <div
            className="Box"
            style={{ backgroundColor: isActive ? "red" : "black" }}
            onClick={toggle} />
    )
}