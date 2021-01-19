 const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
    .then(response => response.json())
    .then(data => data)
}

 const postOrders = async (data = {}) => {
  const response = await fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

export {getOrders, postOrders}