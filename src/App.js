import React, { useEffect, useState } from 'react'
import axios from 'axios'
function App() {


    const [a, seta] = useState([])
    const [ob1, setob1] = useState({
        name: "",
        email: ""
    })

    const [ob2, setob2] = useState({
        id: "",
        name: "",
        email: ""
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

    const insert = () => {
        axios.post(`https://reactfb1-4a480-default-rtdb.firebaseio.com/users.json`, ob1)
            .then(res => res?.data?.name)
            .then(id => ({ ...ob1, id }))
            .then(d => seta([...a, d]))
    }

    const edit = (user) => {
        setob2(user)//user is loop of table that contains id,name,email
    }

    const del = (id) => {
        axios.delete(`https://reactfb1-4a480-default-rtdb.firebaseio.com/users/${id}.json`)
            .then(res => a.filter(x => x.id !== id))
            .then(d => seta(d))

    }

    const update = () => {
        axios.patch(`https://reactfb1-4a480-default-rtdb.firebaseio.com/users/${ob2.id}.json`, ob2)
            .then(res => console.log(res.data))
    }

    const handleChange1 = e => {
        console.log(e.target.name, e.target.value)
        setob1({ ...ob1, [e.target.name]: e.target.value })
    }
    const handleChange2 = e => {
        console.log(e.target.name, e.target.value)
        setob2({ ...ob2, [e.target.name]: e.target.value })
    }


    const loadUsers = () => {
        axios.get(`https://reactfb1-4a480-default-rtdb.firebaseio.com/users.json`)
            .then(res => transform(res.data))
            .then(d => {
                console.log(d)
                seta(d)
            })

    }


    useEffect(loadUsers, [])

    return <div>
        <h1>CRUD</h1>
        <div>
            <h3>insert form</h3>
            <input placeholder='name' value={ob1.name} onChange={handleChange1} name="name" />
            <input placeholder='email' value={ob1.email} onChange={handleChange1} name="email" />
            <button onClick={insert}>insert</button>
        </div>
        {ob2?.id && <div>
            <h3>edit form</h3>
            <input placeholder='name' value={ob2.name} onChange={handleChange2} name="name" />
            <input placeholder='email' value={ob2.email} onChange={handleChange2} name="email" />
            <button onClick={update}>update</button>
        </div>}


        <h2>all users {a?.length}</h2>
        <table>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>actions</th>
            {a?.map(x => <tr>
                <td>{x?.id}</td>
                <td>{x?.name}</td>
                <td>{x?.email}</td>
                <td>
                    <button onClick={() => edit(x)}>edit</button>
                    <button onClick={() => del(x?.id)}>delete</button>
                </td>
            </tr>)}
        </table>
    </div>
}
export default App