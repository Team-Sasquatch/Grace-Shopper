function addToCart(cartObj) {
    console.log("cartObject: ", cartObj);
    let obj = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    let foundInCart = false;
    console.log("obj",obj);
    if (obj.length>0){
      for (let i=0;i<obj.length;i++){
        if (obj[i].id === cartObj.id){
          obj[i].quantity+=cartObj.quantity;
          foundInCart= true;
          break;
        }
      }
    }
    if (!foundInCart && cartObj.quantity!==0){
      obj.push(cartObj);
    }
    localStorage.setItem("shoppingCart", JSON.stringify(obj));
  }

  export default addToCart;