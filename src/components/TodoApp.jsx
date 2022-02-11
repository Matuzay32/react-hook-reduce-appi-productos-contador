import React, { useReducer, useState } from 'react';


const initialsTodos = [
	{
		id: 1,
		title: "1 tarea",
	},
	{
		id: 2,
		title: "2 tarea",
	},
	{
		id: 3,
		title: "3 tarea",
	},
	{
		id: 4,
		title: "4 tarea",
	},
];


const types = {
    add: 'add',
    update: 'update',
    delete: 'delete',
}


const reducer = (state, action) => {

	if (action.type === types.delete) {
		return state.filter((todo) => todo.id != action.payload);
	}


	if (action.type === types.add) {
        console.log([...state, action.payload]);
		return [...state, action.payload];
	}


	if (action.type === types.update) {
		const updateTodo = action.payload;

		return state.map((element) =>
			element.id === updateTodo.id ? updateTodo : element
		);
	}
	return state;
};

const TodoApp = () => {

    const textoInput  = ({target})=>{
        const textInput = target.value;
        setText(textInput);
    }


    const handdleSumbit = (e) => {

			e.preventDefault();


			dispatch({
				type: types.add,
				payload: {
					id: Date.now(),
					title: text,
				},
			});
		};

const [todos, dispatch] = useReducer(reducer, initialsTodos);
const [text, setText] = useState("");





return (
    <div>
      <ul>
    
        {
        todos?.map((todo)=>{
    
        return (
        <li key={todo.id}>
          <h2>{todo.title}</h2>
    
          <button onClick={()=> dispatch({ type: types.delete ,payload : todo.id})}>
    
            Delete
    
          </button>
    
    
          <button onClick={()=> dispatch({ type: types.update ,payload : {...todo, title: text}})}>
    
            Update
    
          </button>
        </li>
        );
    
        })
        }
    
      </ul>
      <form onSubmit={handdleSumbit}>
        <input onChange={textoInput} value={text} placeholder='Ingrese la tarea' type='text' />
    
    
      </form>
    
    </div> );
};


export default TodoApp;