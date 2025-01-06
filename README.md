For setup Electon Server project with MongoDB follow this,

```javascript
npm install
npm init -y
npx tsc --init

```





## User-Management

- **Endpoint:** **`POST /user/update`**

- **Request Headers:**

- `Authorization: <Admin/superAdmin JWT_TOKEN>`

- **Request Body:**



- **Response**

```json
{
    "success": true,
    "message": "Users update successfully",
    "data": [{
        "secret": {
            "ascii": "ue3lZ({vqn.zU3l*20TU:oq1Igd>nv9!",
            "hex": "7565336c5a287b76716e2e7a55336c2a323054553a6f71314967643e6e763921",
            "base32": "OVSTG3C2FB5XM4LOFZ5FKM3MFIZDAVCVHJXXCMKJM5SD43TWHEQQ",
            "otpauth_url": "otpauth://totp/Electon%3A%20673d763cc092d2c93364d43e?secret=OVSTG3C2FB5XM4LOFZ5FKM3MFIZDAVCVHJXXCMKJM5SD43TWHEQQ"
        },
        "_id": "673d763cc092d2c93364d43e",
        "firstName": "Mehedi",
        "lastName": "Hasan",
        "gender": "male",
        "email": "mehedihasan@gmail.com",
        "description": "Describe your self...",
        "role": "super_admin",
        "auth2": false,
        "friends": [],
        "status": "active",
        "createdAt": "2024-11-20T05:40:12.512Z",
        "updatedAt": "2024-12-31T16:00:14.994Z",
        "__v": 0,
        "image": "https://i.ibb.co/k05htkr/Mehedi-Hasan.png",
        "address": {
            "district": "Patuakhali",
            "division": "Barishal",
            "subDistrict": "Patuakhali Sadar",
            "roadNo": "Tuskhali",
            "postCode": 8888,
            "_id": "67506877c3d78cd8e5557c6a"
        },
        "phoneNumber": "01601588531"
    },........
]
}

```

### **1. Edit-Profile

- **Endpoint:** **` POST /user/update`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
    "firstName":"Mehedi"
}
```

- **Response**
- 
```json
{
    "success": true,
    "message": "Users update successfully",
    "data": {
        "secret": {
            "ascii": "ue3lZ({vqn.zU3l*20TU:oq1Igd>nv9!",
            "hex": "7565336c5a287b76716e2e7a55336c2a323054553a6f71314967643e6e763921",
            "base32": "OVSTG3C2FB5XM4LOFZ5FKM3MFIZDAVCVHJXXCMKJM5SD43TWHEQQ",
            "otpauth_url": "otpauth://totp/Electon%3A%20673d763cc092d2c93364d43e?secret=OVSTG3C2FB5XM4LOFZ5FKM3MFIZDAVCVHJXXCMKJM5SD43TWHEQQ"
        },
        "_id": "673d763cc092d2c93364d43e",
        "firstName": "Mehedi",
        "lastName": "Hasan",
        "gender": "male",
        "email": "mehedihasan@gmail.com",
        "description": "Describe your self...",
        "role": "super_admin",
        "auth2": false,
        "friends": [],
        "status": "active",
        "createdAt": "2024-11-20T05:40:12.512Z",
        "updatedAt": "2024-12-31T16:00:14.994Z",
        "__v": 0,
        "image": "https://i.ibb.co/k05htkr/Mehedi-Hasan.png",
        "address": {
            "district": "Patuakhali",
            "division": "Barishal",
            "subDistrict": "Patuakhali Sadar",
            "roadNo": "Tuskhali",
            "postCode": 8888,
            "_id": "67506877c3d78cd8e5557c6a"
        },
        "phoneNumber": "01601588531"
    }
}

```



### **3. Convert  User to Admin**

- **Endpoint:** **`POST /user/create-admin`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
    "_id":"670ccf078f20dfc3********"
}
```
- **Response:**
  
```json
{
    "success": true,
    "message": "Admin created Successfully",
    "data": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    }
}
```

### **3. Convert User Role**

- **Endpoint:** **`POST /user/userToSeller`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**
N/A


- **Response:**

```json
{
    "success": true,
    "message": "Role Changed successfully",
    "data": {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    }
}
```


### **3. Block user**

- **Endpoint:** **`POST /user/block/userId`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
{
    "status":"block"
}

```

- **Response:**

```json
{
    "success": true,
    "message": "user status has been changed",
    "data": {
        "gender": "male",
        "auth2": false,
        "_id": "67016c3b3ed9fe196110d309",
        "firstName": "Mehedi",
        "lastName": "Hasan",
        "age": 25,
        "email": "mehedi@gmail.com",
        "phoneNumber": "01601588531",
        "role": "super_admin",
        "address": {
            "district": "Barisal",
            "division": "Barisal",
            "subDistrict": "",
            "roadNo": "",
            "postCode": 8600,
            "_id": "674808dcfeeef9ec2c53698b"
        },
        "friends": [],
        "status": "blocked",
        "createdAt": "2024-10-05T16:41:31.169Z",
        "updatedAt": "2024-12-31T16:50:54.771Z",
        "__v": 0,
        "image": "https://i.ibb.co/0tzD6XY/men2.jpg",
        "description": "Describe your self..."
    }
}
```

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



### **3. Create your Product**

- **Endpoint:** **`POST /product/create-product`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`
- **Request Body:**

```json
 {
    "title": "Desktop",
    "description": "A powerful Desktop for both work and gaming.",
    "image": "https://example.com/images/laptop.jpg",
    "price": 1299.99,
    "quantity": 5,
    "color": ["Silver"],
    "category":"pc",
    "rating": 4.5,
    "sellerId":"67016c3b3ed9fe196110d309"
  }

```

- **Response:**

```json
{
    "success": true,
    "message": "The Product created successfully!",
    "data": {
        "title": "Desktop",
        "description": "A powerful Desktop for both work and gaming.",
        "image": "https://example.com/images/laptop.jpg",
        "color": [
            "Silver"
        ],
        "quantity": 5,
        "category": "pc",
        "price": 1299.99,
        "rating": 4.5,
        "sellerId": "67016c3b3ed9fe196110d309",
        "_id": "677a468eeb969f85fa5934f6",
        "createdAt": "2025-01-05T08:45:02.589Z",
        "updatedAt": "2025-01-05T08:45:02.589Z",
        "__v": 0
    }
}
```

### **3. Delete your Product**

- **Endpoint:** **`POST /product/delete-product/:product_id`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`

- **Response:**

{
    "success": true,
    "message": "The Product deleted successfully!",
    "data": {
        "acknowledged": true,
        "deletedCount": 0
    }
}

```
### **3. get single  Product**

- **Endpoint:** **`POST /product/single-product/673f481a477caee0df21c04e`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`

- **Response:**

```json
{
    "success": true,
    "message": "The Product Retrieved successfully!",
    "data": {
        "_id": "673f481a477caee0df21c04e",
        "title": "Mobile",
        "description": "A powerful Desktop for both work and gaming.",
        "image": "https://i.ibb.co/yR9bnXv/3-1.jpg",
        "color": [
            "Silver"
        ],
        "quantity": 4,
        "price": 1299.99,
        "rating": 4.5,
        "sellerId": "67016c3b3ed9fe196110d309",
        "createdAt": "2024-11-21T14:47:54.693Z",
        "updatedAt": "2024-12-04T15:01:01.133Z",
        "__v": 0,
        "category": "others"
    }
}

```

### **3. get All  Products as an Admin with search query**

- **Endpoint:** **`POST /product/get-all-products`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`

- **Response:**

```json
{
    "success": true,
    "message": "Products Retrieved successfully!",
    "meta": {
        "page": 1,
        "limit": 10,
        "total": 13,
        "totalPage": 2
    },
    "data": [
        {
            "_id": "677a468eeb969f85fa5934f6",
            "title": "Desktop",
            "description": "A powerful Desktop for both work and gaming.",
            "image": "https://example.com/images/laptop.jpg",
            "color": [
                "Silver"
            ],
            "quantity": 5,
            "category": "pc",
            "price": 1299.99,
            "rating": 4.5,
            "sellerId": "67016c3b3ed9fe196110d309",
            "createdAt": "2025-01-05T08:45:02.589Z",
            "updatedAt": "2025-01-05T08:45:02.589Z"
        },
        {
            "_id": "677a4613eb969f85fa5934ef",
            "title": "Desktop",
            "description": "A powerful Desktop for both work and gaming.",
            "image": "https://example.com/images/laptop.jpg",
            "color": [
                "Silver"
            ],
            "quantity": 5,
            "category": "others",
            "price": 1299.99,
            "rating": 4.5,
            "sellerId": "67016c3b3ed9fe196110d309",
            "createdAt": "2025-01-05T08:43:00.004Z",
            "updatedAt": "2025-01-05T08:43:00.004Z"
        },
        {
            "_id": "67526311cd73361733204aa7",
            "title": "Sony 42' TV",
            "description": "The Sony 42-Inch Smart TV offers a stunning visual experience with its Full HD resolution and X-Reality PRO technology, ensuring vibrant colors and sharp details in every scene. Its sleek and modern design complements any living space, making it an ideal centerpiece for your entertainment needs. With built-in smart features, you can seamlessly stream your favorite shows and movies on platforms like Netflix, YouTube, and Prime Video. The TV also boasts ClearAudio+ technology, delivering immersive and dynamic sound for a captivating viewing experience. Energy-efficient and user-friendly, the Sony 42-Inch Smart TV combines style, performance, and sustainability in one exceptional package.",
            "image": "https://i.ibb.co/hXc7vxz/tv.png",
            "color": [
                "Black",
                "White"
            ],
            "quantity": 56,
            "category": "others",
            "price": 360,
            "sellerId": "673d763cc092d2c93364d43e",
            "createdAt": "2024-12-06T02:36:01.168Z",
            "updatedAt": "2024-12-06T02:36:01.168Z"
        },........
        
    ]
}
```

### **3. get All  Products as an Admin with search query**

- **Endpoint:** **`POST /product/my-products`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`

- **Response:**

```json

{
    "success": true,
    "message": "The Product Retrieved successfully!",
    "data": [
        {
            "_id": "67506b0bb9b573eea2d36e85",
            "title": "Box",
            "description": "The sony box has multiple function as well as Bluetooth method too",
            "image": "https://i.ibb.co/3h4v7xg/img-p4.webp",
            "color": [
                "Black",
                "Gray"
            ],
            "quantity": 280,
            "price": 80,
            "sellerId": {
                "_id": "673d763cc092d2c93364d43e",
                "firstName": "Mehedi",
                "lastName": "Hasan",
                "gender": "male",
                "email": "mmehedihasanjoyv@gmail.com",
                "description": "Describe your self...",
                "role": "super_admin",
                "auth2": false,
                "friends": [],
                "status": "active",
                "createdAt": "2024-11-20T05:40:12.512Z",
                "updatedAt": "2024-12-31T16:58:52.288Z",
                "__v": 0,
                "image": "https://i.ibb.co/k05htkr/Mehedi-Hasan.png",
                "address": {
                    "district": "Patuakhali",
                    "division": "Barishal",
                    "subDistrict": "Patuakhali Sadar",
                    "roadNo": "Tuskhali",
                    "postCode": 8888,
                    "_id": "67506877c3d78cd8e5557c6a"
                },
                "phoneNumber": "01601588531"
            },
            "createdAt": "2024-12-04T14:45:31.817Z",
            "updatedAt": "2024-12-04T15:01:01.133Z",
            "__v": 0,
            "category": "others"
        },........
       
       
    ]
}

```



### **3. Update product**

- **Endpoint:** **`POST /product/update-product/6702d3aa9d67555985d280bf`**
- **Request Headers:**
    - `Authorization: <JWT_TOKEN>`

- ** Request body:**

 ```json
 {
    "title":"Desktop"
}
 ```

- **Response:**

```json

{
    "success": true,
    "message": "The Product updated successfully!",
    "data": {
        "acknowledged": true,
        "modifiedCount": 0,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 0
    }
}
```





