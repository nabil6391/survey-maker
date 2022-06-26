let orders = [341, 454, 198, 264, 307];

let totalOrders = 0;


const add = (totalOrder, order) => {
    return totalOrder + order;
}

for (let i = 0; i < orders.length; i++) {
    add(totalOrders, orders[i])
    console.log(orders[i])
}




console.log(totalOrders);