import { useState } from "react";

// Sample item names
const itemNames = ['pencil', 'pen', 'marker', 'paper','glu','scale','gel','gum','water','chowk'];

const Inventory = () => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [operation, setOperation] = useState('add');  //Add or Subtract
  const [inventory, setInventory] = useState({ pencil: 0, pen: 0, marker: 0, paper: 0, glu: 0, scale: 0, gel: 0, gum: 0, water: 0, chowk: 0 });
  const [entries, setEntries] = useState([]);


  const handleItemChange = (e) => {
    setItem(e.target.value.toLowerCase());
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  const updateQuantity = () => {
    if (itemNames.includes(item) && !isNaN(quantity) && quantity > 0) {
        const updateValue = Number(quantity) *  (operation === 'subtract' ? -1 : 1);

        //Prevent inventory from going negative.
        if (inventory[item] + updateValue < 0) {
          alert('Insufficient quantity in inventory to subtract.');
          return;
        }

      setInventory(prevInventory => ({
        ...prevInventory,
        [item]: prevInventory[item] + updateValue,
      }));

      //Add the new entries (positive or negative) on top of the list.
      setEntries(prevEntries => [
        { item, quantity: updateValue },  //New entry goes at the top
        ...prevEntries  // Existing entries follow.
      ]);

      setItem('');
      setQuantity('');
    } 
    
    else {
      alert('Please enter a valid item name.');
    }
  };

  const getTotalQuantity = () => {
    return Object.values(inventory).reduce((acc, cur) => acc + cur, 0);
  };


  function refreshPage(){ 
    window.location.reload(); 
}


  return (
    <div>
      <h1>Office Inventory</h1>
        <div>
        <label>
            Choose :
            <input type="radio" id="preferred" name="choose" value="office"/>Office
            <input type="radio" id="preferred" name="choose" value="office"/>Personal
        </label>

        <br/><br/>

        <label>
          Item Name :  
          <input type="text" value={item} onChange={handleItemChange} />
        </label>

        <label>
           Quantity : 
          <input type="text" value={quantity} onChange={handleQuantityChange} />
        </label>

        

        <button onClick={updateQuantity}>Submit</button>


        <label>
          Operation :
          <select value={operation} onChange={handleOperationChange}> 
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
          </select>
        </label>


        
        <button type="button" class="btn btn-success" onClick={ refreshPage }> <span>Clear Entries</span> </button> 

      </div>

      <div class="table-container">

      <div className="table-section">
          <h2>Submitted Entries</h2>
      <table class="entries-container">
        <thead>
        
          <tr>
            <th>Item</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.item}</td>
              <td>{entry.quantity > 0 ? `+${entry.quantity}` : entry.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
</div>


        <div className="table-section">
          
        <h2>Inventory Table</h2>
              <table class="info-container">
              <thead>
              
                   <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                   </tr>
              </thead>
        
            <tbody>
              {itemNames.map(name => (
                   <tr key={name}>
                       <td>{name}</td>
                       <td>{inventory[name]}</td>
                   </tr>
              ))}
            </tbody>
          </table>
        </div>    
      </div>


      <div class="grand-total-container">
      <table>
                  <tr>
                    <td ><strong>Grand Total</strong></td>
                      <td><strong>{getTotalQuantity()}</strong></td>
                  </tr>
              </table>

              </div>
         

    </div>
  );
};
  export default Inventory;