import {test, expect} from "@playwright/test"

test("Create a pet and fetch its detail", async({request, baseURL}) => {
    const response = await request.post(`${baseURL}pet`, {
        data : {
            "id": Date.now(),
            "category": {
              "id": 999,
              "name": "Dog"
            },
            "name": "Doggo",
            "photoUrls": [
              "https://upload.wikimedia.org/wikipedia/commons/1/18/Dog_Breeds.jpg?20201016183302"
            ],
            "tags": [
              {
                "id": 666,
                "name": "white"
              }
            ],
            "status": "available"
          }
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const petInfo = await response.json();
    const petId = petInfo.id
    const getPet = await request.get(`${baseURL}pet/`+petId);
    expect(getPet.ok()).toBeTruthy();
    expect(getPet.status()).toBe(200);
    const pet_Info = await getPet.json();
    expect(pet_Info.id).toBe(petId);

});

test ("Create a new pet", async({request, baseURL}) => {

    const response = await request.post(`${baseURL}pet`, {
        data: {
            "id": 1234,
            "category": {
              "id": 4567,
              "name": "Kitty"
            },
            "name": "Cat",
            "photoUrls": [
              "https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"
            ],
            "tags": [
              {
                "id": 6747,
                "name": "small"
              }
            ],
            "status": "available"

        }
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const petDetail = await response.json();

});

test("Create and update pet", async({request, baseURL}) => {
    const response = await request.post(`${baseURL}pet`, {
        data : {
            "id": Date.now(),
            "category": {
              "id": 999,
              "name": "Dog"
            },
            "name": "Doggo",
            "photoUrls": [
              "https://upload.wikimedia.org/wikipedia/commons/1/18/Dog_Breeds.jpg?20201016183302"
            ],
            "tags": [
              {
                "id": 666,
                "name": "white"
              }
            ],
            "status": "available"
          }
    })

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(((await response.json()).category).name).toBe("Dog");
    expect(((await response.json()).tags[0]).name).toBe("white");

    // saving the pet id of the newly created pet
    const petId = (await response.json()).id

    // updating the created pet
    const updatePet = await request.put(`${baseURL}pet`, {
        data : {
            "id": Date.now(),
            "category": {
              "id": 999,
              "name": "Dog"
            },
            "name": "Doggo",
            "photoUrls": [
              "https://upload.wikimedia.org/wikipedia/commons/1/18/Dog_Breeds.jpg?20201016183302"
            ],
            "tags": [
              {
                "id": 666,
                "name": "white"
              }
            ],
            "status": "available"
          }
        })

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(((await updatePet.json()).category).name).toBe("Dog");
    expect(((await updatePet.json()).tags[0]).name).toBe("white");

});

test("Create and delete a pet", async({request, baseURL}) => {
    const response = await request.post(`${baseURL}pet`, {
        data : {
            "id": Date.now(),
            "category": {
              "id": 999,
              "name": "Dog"
            },
            "name": "Doggo",
            "photoUrls": [
              "https://upload.wikimedia.org/wikipedia/commons/1/18/Dog_Breeds.jpg?20201016183302"
            ],
            "tags": [
              {
                "id": 666,
                "name": "white"
              }
            ],
            "status": "available"
          }
    })

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(((await response.json()).category).name).toBe("Dog");
    expect(((await response.json()).tags[0]).name).toBe("white");
    const petId = (await response.json()).id
    const deletePet = await request.delete(`${baseURL}pet/`+petId, {
        headers :{
            api_key : "special-key",
        }
    })
    expect(deletePet.ok()).toBeTruthy();
    expect(deletePet.status()).toBe(200);
    const getPet = await request.get(`${baseURL}pet/`+petId);
    expect(response.ok()).toBeTruthy();
    expect(getPet.status()).toBe(404);
    expect((await getPet.json()).message).toBe("Pet not found");

});

test("Create a new pet order", async({request, baseURL}) => {
    const newOrder = await request.post(`${baseURL}store/order` ,{
        data : {
            "id": Date.now(),
            "petId": 1234,
            "quantity": 10,
            "shipDate": "2023-05-07T12:48:50.940Z",
            "status": "placed",
            "complete": true
          }
    })

    expect(newOrder.ok()).toBeTruthy();
    expect(newOrder.status()).toBe(200);
    expect((await newOrder.json()).petId).toBe(1234);

});

test("Create a order and find it using order id", async ({request, baseURL}) => {
    const newOrder = await request.post(`${baseURL}store/order` ,{
        data : {
            "id": 10,
            "petId": 1234,
            "quantity": 10,
            "shipDate": "2023-05-07T12:48:50.940Z",
            "status": "placed",
            "complete": true
          }
        });

    expect(newOrder.ok()).toBeTruthy();
    expect(newOrder.status()).toBe(200);
    expect((await newOrder.json()).id).toBe(10);
    const findOrder = await request.get(`${baseURL}store/order/`+10)
    expect(newOrder.ok()).toBeTruthy();
    expect(newOrder.status()).toBe(200);
    expect((await findOrder.json()).petId).toBe(1234);
});

test("Create and delete an order", async({request, baseURL}) => {
    const newOrder = await request.post(`${baseURL}store/order` ,{
        data : {
            "id": Date.now(),
            "petId": 1234,
            "quantity": 10,
            "shipDate": "2023-05-07T12:48:50.940Z",
            "status": "placed",
            "complete": true
          }
        }); 

    expect(newOrder.ok()).toBeTruthy();
    expect(newOrder.status()).toBe(200);
    const orderId = (await newOrder.json()).id
    const deletOrder = await request.delete(`${baseURL}store/order/`+orderId);
    expect(deletOrder.ok()).toBeTruthy();
    expect(deletOrder.status()).toBe(200);
    expect(Number((await deletOrder.json()).message)).toBe(orderId);
    

});

test("Get inventory details", async({request, baseURL}) =>  {

    const response = await request.get(`${baseURL}store/inventory`);
    const inventory = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

});

test("Create a new user", async ({ request, baseURL}) => {

    const response = await request.post(`${baseURL}user`, {
      data : {
        "id": 1,
        "username": "magdao",
        "firstName": "magda",
        "lastName": "o",
        "email": "magdao@gmail.com",
        "password": "test123@123",
        "phone": "555555555",
        "userStatus": 0
      },
    });
  
    const result = await response.json();
    const userID = result.message;
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200); 
  
});

test("Create a new user and then update the user details", async ({ request, baseURL}) => {

    const userName = "magdao";
    const response = await request.post(`${baseURL}user`, {
        data : {
            "id": 1,
            "username": "magdao",
            "firstName": "magda",
            "lastName": "o",
            "email": "magdao@gmail.com",
            "password": "test123",
            "phone": "555555555",
            "userStatus": 0
          },
    });

  const result = await response.json();
  const userID = result.message;
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  
  const responseLogin = await request.get(`${baseURL}user/login`, {
    params : {
        "username": "magdao",
        "password": "test123",
    }
  });

  const responseUpdate = await request.put(`${baseURL}user/`+userName, {
    data : {
        "id": 1,
        "username": userName,
        "firstName": "magdao-updated",
        "lastName": "xxx",
        "email": "magdao@gmail.com",
        "password": "test123",
        "phone": "555555555",
        "userStatus": 0
      },

  });

  const resultUpdate = await responseUpdate.json();
  const userIDUpdate = resultUpdate.message;

  expect(responseUpdate.ok()).toBeTruthy();
  expect(responseUpdate.status()).toBe(200);
});

test("Create a new user and then delete it", async ({ request, baseURL}) => {

    const userName = "magdao";
    const response = await request.post(`${baseURL}user`, {
    data : {
      "id": 0,
      "username": userName,
      "firstName": "magda",
      "lastName": "p",
      "email": "magdao@gmail.com",
      "password": "test123",
      "phone": "555555555",
      "userStatus": 0
    },
  });

  const result = await response.json();
  const userID = result.message;
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200); 
  const responseLogin = await request.get(`${baseURL}user/login`, {
    params : {
        "username": "magdao",
        "password": "test123",
    }
  });

  expect(responseLogin.ok()).toBeTruthy();
  expect(responseLogin.status()).toBe(200);
  const responseDelete = await request.delete(`${baseURL}user/`+userName);
  expect(responseDelete.ok()).toBeTruthy();
  expect(responseDelete.status()).toBe(200);
  const responseData = await responseDelete.json();
  expect (responseData.message).toContain(userName);

});