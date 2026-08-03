import React from "react";
import {useState} from "react";



export default function App() {
  const [items, setItems] = useState([]);
  


  function handleAddItems(item) {
    setItems((items) => [...items, item]); // new state depends on the current state
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList
       items={items}
       onDeleteItem={handleDeleteItem}
       onToggleItem={handleToggleItem} />
      <Stats items={items} />
    </div>
  );
}



function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);


  function handleSubmit(e){
    e.preventDefault();

    if(!description) return;

    const newItem = {description, quantity, packed: false, id: Date.now()};
    console.log(newItem);

    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item name..." 
      value={description} 
      onChange={(e) => setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  );
}

function Item({ item , onDeleteItem, onToggleItem}) {
  return (
    <li>
      <input type="checkbox" checked={item.packed} onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )

}


function Logo() {
  return <h1> 🌴 Far Away 💼</h1>
}



function PackingList({ items, onDeleteItem, onToggleItem}) {// render actual items
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item = {item} 
          onDeleteItem={onDeleteItem}
          onToggleItem={onToggleItem}
           key={item.id} />
      ))}
      </ul>
    </div>
  
  );
}

function Stats({ items }) {
  const newItems = items.length; // derived state
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / newItems) * 100);

  return (
  <footer>
    {percentage === 100 ? 'You got everything! Ready to go ✈️' : `You have ${newItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
    <em>💼 You have {newItems} on your List, and you already packed {numPacked} ({percentage}%) </em>
  </footer>);
}
