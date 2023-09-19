import React, {useState} from 'react';
import axios from "axios";
import {logDOM} from "@testing-library/react";

const DinamicInput = () => {
    const [value, setValue] = useState([{...newUrl}])
    const [lastId, setLastId] = useState(0)

    function handleChange(event, index) {
        const valueNew = [...value]
        valueNew[index].url = event
        setValue(valueNew)
    }

    function handleChange1(event, index) {
        const valueNew = [...value]
        valueNew[index].text = event
        setValue(valueNew)
    }

    function addField() {
        if (value.length) {
            const added = [...value]
            const data = {...newUrl}
            data.id = lastId + 1
            added.push(data)
            setLastId((e) => ++e)
            setValue(added)
        }
    }

    console.log(value, 'value')

    function removeField(index) {
        setValue(value.filter((item, idx) => index !== idx))
    }

    async function handleClick(index, url) {
        if (url) {
            await axios.get(url)
                .then((response) => {
                    if (response.status === 200) {
                        const resNew = [...value]
                        resNew[index].result = response.headers
                        setValue(resNew)
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        const resNew = [...value]
                        resNew[index].result = error.response.status
                    }
                })
        } else {
            const resNew = [...value]
            resNew[index].errorMessage = "Ne korektnyi URL"
            setValue(resNew)
        }
    }



    return (
        <div>
            <div>
                <h1>URLs</h1>

                <div style={{ width: 500 }}>
                    {value.map((item, index) => (
                        <div key={index} style={{ width: 500 }}>
                            {item.id + " "}
                            <input
                                value={item?.url}
                                onChange={(e) => handleChange(e.target.value, index)}
                            />{" "}
                            <input
                                type="text"
                                value={item?.text}
                                onChange={(e) => handleChange1(e.target.value, index)}
                            />
                            <button onClick={() => handleClick(index, item.url)}>
                                Get data
                            </button>{" "}
                            <button onClick={() => removeField(index)}>Remove field</button>
                            {item.errorMessage}
                        </div>
                    ))}
                </div>
                <br />
                <br />

                <div>
                    <button onClick={addField}>Add Field</button>
                </div>
            </div>

            <h1>Answers</h1>

            <div>
                {value.map((item, index) => (
                    <div key={index}>
                        Результат запроса {item.id}: {item.result}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DinamicInput;

export const newUrl = {
    id: 0,
    url: "",
    errorMessage: "",
    result: "",
    data: "",
    text: ""
};