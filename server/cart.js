let add = (cart, req) => {

    cart.contents.push(req.body);
    cart.countGoods++;
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    console.log( req.body.quantity);
    find.quantity += req.body.quantity;
    return JSON.stringify(cart, null, 4);
};
let deleteItem = (cart, req) => {

    let index = cart.contents.findIndex(el => el.id_product === +req.params.id);

    // if(cart.contents[index].quantity === 1){

        cart.contents.splice(index, 1);
        cart.countGoods--;
    // }else{
    //
    //     cart.contents[index].quantity--;
    // }
    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change,
    deleteItem
};