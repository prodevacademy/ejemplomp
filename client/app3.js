
const mp3 = new MercadoPago('TEST-72b833a6-ef7b-469a-a035-9c3f00579bfd', {
    locale:"es-AR"
});

//80 usd a pesos argentinos son 76270

document.getElementById("checkout-btn3").addEventListener("click", async ()=>{

    try{

    const orderData = {
        title:document.querySelector(".name3").innerText,
        quantity: 1,
        price:80,
    }

    const response = await fetch("http://localhost:3000/create_preference", {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(orderData)
    });
    
    const preference = await response.json();
    createCheckoutButton3(preference.id);

} catch(error){
   alert("ERROR")
}
    
})

const createCheckoutButton3 =(preferenceid)=>{
    const bricksBuilder = mp3.bricks();

    const renderComponent = async ()=>{
        if(window.checkoutButton) window.checkoutButton.unmount();
        
    await bricksBuilder.create("wallet", "wallet_container3", {
    initialization: {
        preferenceId: preferenceid,
    },

 });
 
    };
    renderComponent();
}