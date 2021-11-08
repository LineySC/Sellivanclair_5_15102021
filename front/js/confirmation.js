const requireUrl = window.location.search;
const getData = new URLSearchParams(requireUrl);
const orderId = getData.get('order');

document.getElementById('orderId').innerHTML = `${orderId}`