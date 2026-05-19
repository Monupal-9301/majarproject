    // TAX SWITCH
    const swhbtn = document.getElementById("switch-btn");

    if(swhbtn){

        swhbtn.addEventListener("click", () => {

            let taxinfo = document.getElementsByClassName("taxinfo");

            for(let taxsinfo of taxinfo){

                if(taxsinfo.style.display != "inline"){
                    taxsinfo.style.display = "inline";
                }
                else{
                  taxsinfo.style.display = "none";
                }
            }
       });
    }

    // FILTER AJAX

    const filters = document.querySelectorAll(".filter");
    const listingContainer = document.getElementById("listing-container");
    
    if(filters.length && listingContainer){

        filters.forEach((filter)=>{

            filter.addEventListener("click", async()=>{

                const category = filter.dataset.category;

                try{

                   const response = await fetch(`/listing/filter/data?category=${category}`);
                   const data = await response.json();
                   renderListings(data);
                }
                catch(err){
                   console.log(err);
               }
            }); 
        });
    }

    function renderListings(data){

        listingContainer.innerHTML = "";


        if(data.length === 0){

            listingContainer.innerHTML = `
                <h3 class="mt-4">No listings found</h3>
            `;

            return;
        }


        data.forEach((datas) => {

            listingContainer.innerHTML += `

                <a href="/listing/${datas._id}" class="text-link">

                    <div class="card listing-card" style="width: 17rem;">

                        <img src="${datas.image.url}" class="card-main-img-top" alt="listing image">

                        <div class="card-img-overlay"></div>

                        <div class="card-body">

                            <b class="card-text">${datas.title}</b>

                            <p class="card-price">
                                ₹${Number(datas.price).toLocaleString("en-IN")}/night
                                <i class="taxinfo"> +18 GST</i>
                            </p>

                        </div>

                    </div>

                    <br>

                </a>
            `;

        } );
    }