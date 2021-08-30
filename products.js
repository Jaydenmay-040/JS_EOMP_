function openApparel() {
    document.getElementById("apparel").style.display = "flex";
    document.getElementById("shoes").style.display = "none";
    document.getElementById("accessories").style.display = "none";
  }

function openSneaker() {
    document.getElementById("shoes").style.display = "flex";
    document.getElementById("apparel").style.display = "none";
    document.getElementById("accessories").style.display = "none";
  }

function openAccessories() {
    document.getElementById("accessories").style.display = "flex";
    document.getElementById("shoes").style.display = "none";
    document.getElementById("apparel").style.display = "none";
  }

let allSneakers = document.querySelector("#shoes");
let content1Row = document.querySelector(".content1_row");

  let productList = [
    {
      imgUrl: "./images/products/img11.png",
      imgAlt: "p-1",
      productCategory: "sneakers",
      productName: "nike air more uptempo '96",
      productPrice: "R 2 999.00",
      productDescription: "men's shoe",
    },
    {
      imgUrl: "./images/img17.png",
      imgAlt: "p-1",
      productCategory: "sneakers",
      productName: "nike air force 1 '07 PRM",
      productPrice: "R 2 999.00",
      productDescription: "men's shoe",
    },
    {
      imgUrl: "./images/products/img12.png",
      imgAlt: "p-1",
      productCategory: "sneakers",
      productName: "nike blazer mid '77",
      productPrice: "R 1 899.00",
      productDescription: "men's shoe",
    },
  ]

  function productCard(card) {
    let displayedCard = `
    <div class="content1_frame">
    <img class="img1" src="${card.imgUrl}" alt="">
    <div class="content1_info">
      <div class="labels">
        <h1 class="title">${card.productName}</h1>
        <h2 class="subtitle">${card.productDescription}</h2>
      </div>
      <h1 class="price">${card.productPrice}</h1>
    </div>
  </div>
    `;
  return displayedCard;
  };

  allSneakers.addEventListener("click", () => {
    content1Row.innerHTML = ""
    let allSneakers = productList.filter(card => {
      return card.productCategory === "shoe"
    })
    content1Row.innerHTML = ""
    allSneakers.forEach(card => {
      content1Row.innerHTML+=productCard(card)
    })
  } );

  productList.forEach(card => {
    content1Row.innerHTML+=productCard(card)
  })

let profileBottom = document.querySelector(".bottom");

function userData(username) {
  fetch(`https://mysterious-crag-59427.herokuapp.com/get-user/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      user = data.user;
      profileBottom.innerHTML = `
      <h1 id="info" class="fullName">${user[0][1]}</h1>
      <div class="username"><p id="info1">username: <h1 id="info">${user[0][2]}</h1></p></div>
      <div class="password"><p id="info1">password: <h1 id="info">${user[0][3]}</h1></p></div>
      <h1 id="info" class="email">${user[0][4]}</h1>`;
    });
}

userData(window.localStorage['username'])

function openNav() {
  document.getElementById("navbar").style.width = "30vw";
  document.getElementById("link8").style.display = "none";
  document.getElementById("link9").style.display = "flex";
  // document.body.style.backgroundColor = "rgb(32, 38, 44)";
  // document.getElementById("openNav").style.color = "#475c70";
  // document.getElementById("closebtn").style.color = "white";
}

function closeNav() {
  document.getElementById("navbar").style.width = "0";
  document.getElementById("link8").style.display = "flex";
  document.getElementById("link9").style.display = "none";
  document.getElementById("navbar").style.whiteSpace = "nowrap";
}


function editProduct(e) {
  let product_id = parseInt(e.id);
  console.log(product_id);
  let name = document.querySelector(".content1_row").value;
  let image = document.querySelector(".imgUrl").src;
  let category = document.querySelector(".productCategory").value;
  let description = document.querySelector(".productDescription").value;
  let price = document.querySelector(".productPrice").value;

  console.log(name, category, description, price);

  fetch(
    `https://agile-tundra-03577.herokuapp.com/edit-product/${product_id}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `jwt ${window.localStorage["jwt-token"]}`,
      },
      body: JSON.stringify({
        product_name: name,
        product_image: image,
        product_category: category,
        product_description: description,
        product_price: price,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
