import React, {useState} from 'react';
import * as yup from "yup";
import {Link} from "react-router-dom";
import axios from 'axios';


const formScema = yup.object().shape({
    size: yup
        .string()
        .test('len', "Required", val => val.length !== 4),
    sauce: yup
        .string()
        .test('len', "Required", val => val.length !== 5),
    top: yup
        .boolean()
        .oneOf([false], "Choose up to 10"),
    sub: yup
        .boolean()
        .oneOf([false], "Choose up to 1"),
    inst: yup
        .string(),

    quantity: yup
        .string()
    
})


const Pizza = () => {
    const [pizza, setPizza] = useState({
        size: "size",
        sauce: "sauce",
        top: [],
        sub: false,
        inst: "",
        quantity:""
    })
    const [errorState, setErrorState]= useState({
        size: "",
        sauce: "Required",
        top: [],
        sub:"",
        inst: "",
        quantity:""
    })
    const [tops, setTops] = useState([])
    
    const pizzaInfo = e =>{
        e.persist();
        validate(e);
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setPizza({...pizza, [e.target.name]:value});
    };
    const toppings = e =>{
        e.persist();
        if (e.target.checked === true){
            setTops(old=>[...old, e.target.name])
            setPizza({...pizza, top:tops});
        }
        else{
            setTops(tops.filter(item=> item !== e.target.name));
            setPizza({...pizza, top:tops});
        }
    }

    const validate = e => {
        yup 
            .reach(formScema, e.target.name)
            .validate(e.target.value)
            .then(valid =>{
                setErrorState({
                    ...errorState, [e.target.name]:""
                });
            })
            .catch(err => {
                console.log(err.errors);
                setErrorState({
                    ...errorState,
                    [e.target.name]: err.errors[0]
                });
            });
    };

    const formSubmit = (e) =>{
        e.preventDefault();
        console.log("form submitted!");
        axios
            .post("https://reqres.in/api/users", pizza)
            .then(response=> {
                let data=response.data;
                alert(`Your Pizza-> Size: ${data.size}, Sauce: ${data.sauce}, Special instructions: ${data.inst}`);
            })
            .catch(err=> console.log(err));
    }

   
    return(
        <div>
            <div>
                <Link to={"/"}><button className="home">home</button></Link>
            </div>
            <div className="form">
                <form onSubmit={formSubmit}>
                    <div className="header">Build Your Own Pizza</div>
                    <img src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="Pizza" className="img"></img>
                    <div>Build Your Own Pizza</div>
                    <div>
                        Coice of Size
                        {pizza.size === "size" ? (<span className="error"><br/>Required<br/></span>) : null}
                    </div>
                    <div>
                        <label htmlFor="size">
                            <select
                                name="size"
                                id="size" 
                                value = {pizza.size}
                                onChange={pizzaInfo}   
                            >   
                                <option value = "size">Size</option>
                                <option value = "small">Small</option>
                                <option value = "medium">Medium</option>
                                <option value = "large">Large</option>
                                <option value = "xL">Fat Ass</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        Choice of Sauce
                        {pizza.sauce === "sauce" ? (<span className="error"><br/>{errorState.sauce}<br/></span>) : null}
                    </div>
                    <div>
                        <label htmlFor="sauce">
                            <select
                                name="sauce"
                                id="sauce" 
                                value = {pizza.sauce}
                                onChange={pizzaInfo}   
                            >   
                                <option value = "sauce">Sauce</option>
                                <option value = "red">Original Red </option>
                                <option value = "garlic">Garlic Ranch</option>
                                <option value = "bbq">BBQ Sauce</option>
                                <option value = "spinach">Spinach Alfredo</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        Add Toppings
                        <span p className="error"><br/>Choose up to 4<br/></span>
                    </div>
                    <div>
                        <label htmlFor="top">
                            Pepperoni
                            <input
                                type="checkbox"
                                name="pepperoni"
                                id="top"
                                onChange={toppings}
                            />
                            Sausage
                            <input
                                type="checkbox"
                                name="sausage"
                                id="top"
                                onChange={toppings}
                            />
                            Canadian Bacon
                            <input
                                type="checkbox"
                                name="bacon"
                                id="top"
                                onChange={toppings}
                            />
                            Black Olives
                            <input
                                type="checkbox"
                                name="olives"
                                id="top"
                                onChange={toppings}
                            />   
                            
                        </label>
                    </div> 
                    <div>
                        Choice of Substitute
                        <span><br/>choose 1<br/></span>
                        Gluten Free
                        <input
                            type="checkbox"
                            name = "sub"
                            id ="sub"
                            onChange ={pizzaInfo}
                        />
                    </div>
                    <div>
                        Special Instructions
                        <label htmlFor ="inst">
                            <input
                            type="text"
                            name="inst"
                            id="inst"
                            value = {pizza.inst}
                            onChange = {pizzaInfo} 
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="quantity">
                            <input
                                type="number"
                                name="quantity"
                                id="quantity"
                                value = {pizza.quantity}
                                onChange = {pizzaInfo}
                            />
                        </label>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
                
        </div>
    );
}

export default Pizza;