import React, { useEffect, useState } from 'react'
import axios from 'axios'
function App() {

    const [a, seta] = useState([])
    const [ob, setob] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        country: "",
        city: "",
        state: "",
        gender: "male",
        status: false
    })
    const transform = ob => {
        let temp = []
        let x = Object.keys(ob)
        let y = Object.values(ob)

        for (let i = 0; i < x.length; i++) {
            temp.push({
                id: x[i],
                name: y[i].name,
                email: y[i].email,
            })
        }
        return temp
    }

    const handleChange = e => {
        let name = e.target.name
        let value = e.target.value
        // console.log(name, value)
        setob({ ...ob, [name]: value })
    }
    const handleCheckbox = () => {
        // console.log(ob.status)
        setob({ ...ob, status: !ob.status })
    }
    const create = () => {
        let url = `https://reactfb1-4a480-default-rtdb.firebaseio.com/customers.json`
        axios.post(url, ob)
    }

    const loadUser = () => {
        let url = `https://reactfb1-4a480-default-rtdb.firebaseio.com/customers.json`
        axios.get(url)
            .then(d => d.data)
            .then(d => transform(d))
            .then(d => seta(d))
    }
    useEffect(loadUser, [])
    return <div>
        <h1>CRUD</h1>
        <div>
            <h1>insert form</h1>
            <input name="name" value={ob.name} placeholder="name" onChange={handleChange} />
            <input name="email" value={ob.email} placeholder="email" onChange={handleChange} />
            <input name="phone" value={ob.phone} placeholder="phone" onChange={handleChange} />
            <input name="password" value={ob.password} placeholder="password" onChange={handleChange} />
            <input name="country" value={ob.country} placeholder="country" onChange={handleChange} />
            <input name="city" value={ob.city} placeholder="city" onChange={handleChange} />
            <input name="state" value={ob.state} placeholder="state" onChange={handleChange} />
            <input name="gender" value={ob.gender} placeholder="gender" onChange={handleChange} />
            <input name="status" type="checkbox" checked={ob.status} placeholder="status" onChange={handleCheckbox} />
            <button onClick={create}>create</button>
        </div>

        <table>
            <thead>
                <tr>
                    <th>name</th>
                    <th>email</th>
                    <th>phone</th>
                    <th>password</th>
                    <th>country</th>
                    <th>city</th>
                    <th>state</th>
                    <th>gender</th>
                </tr>
            </thead>
            <tbody>
                {a.map(x => <tr key={x.id}>
                    <td>{x.name}</td>
                    <td>{x.email}</td>
                    <td>{x.phone}</td>
                    <td>{x.password}</td>
                    <td>{x.country}</td>
                    <td>{x.city}</td>
                    <td>{x.state}</td>
                    <td>{x.gender}</td>
                </tr>)}
            </tbody>
        </table>
    </div>
}
export default App