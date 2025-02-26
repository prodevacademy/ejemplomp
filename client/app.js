

const mp = new MercadoPago("", {
    locale:"es-AR"
});


document.getElementById("checkout-btn").addEventListener("click", async ()=>{

 try{    
const orderData = {
    title:document.querySelector(".name1").innerText,
    quantity: 1,
    price:20,
}

const response = await fetch("http://localhost:3000/create_preference", {
    method:"POST",
    headers:{
        "Content-Type":"application/json",
    },
    body: JSON.stringify(orderData)
});

const preference = await response.json();
createCheckoutButton(preference.id);
 
}  catch(error){
    alert("ERROR")
}

})


const createCheckoutButton =(preferenceid)=>{
    const bricksBuilder = mp.bricks();

    const renderComponent = async ()=>{
        if(window.checkoutButton) window.checkoutButton.unmount();
        
    await bricksBuilder.create("wallet", "wallet_container", {
    initialization: {
        preferenceId: preferenceid,
    },

 });
 
    };
    renderComponent();
}


