

const mp2 = new MercadoPago('', {
    locale:"es-AR"
});



document.getElementById("checkout-btn2").addEventListener("click", async ()=>{

  try{

    const orderData = {
        title:document.querySelector(".name2").innerText,
        quantity: 1,
        price:50,
    }

    const response = await fetch("http://localhost:3000/create_preference", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(orderData)
    });
    
    const preference = await response.json();
    createCheckoutButton2(preference.id);
    
} catch(error){
    alert("ERROR")
}


})


const createCheckoutButton2 =(preferenceid)=>{
    const bricksBuilder = mp2.bricks();

    const renderComponent = async ()=>{
        if(window.checkoutButton) window.checkoutButton.unmount();
        
    await bricksBuilder.create("wallet", "wallet_container2", {
    initialization: {
        preferenceId: preferenceid,
    },

 });
 
    };
    renderComponent();
}