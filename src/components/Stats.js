export default function Stats({ items }) {

  if(items.length === 0)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 📝</em>
      </p>
    );

  const newItems = items.length; // derived state
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / newItems) * 100);

  return (
  <footer>
    {percentage === 100 ? 'You got everything! Ready to go ✈️' : `You have ${newItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
    <em>💼 You have {newItems} on your List, and you already packed {numPacked} ({percentage}%) </em>
  </footer>);
}
