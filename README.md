# Hi Legends 👋

![Image](https://seashore-mailer.vercel.app/images/seashore.png)

## <p align="center">Seashore Contact Form Mailer</p>
  
This is a contact form mailer application made using nodemailer package for [Seashore Mediclinic](https://www.seashoremediclinic.com) website.

## 🛠️ Tech Stack

- [Express](https://expressjs.com/)
- [Nodemailer](https://nodemailer.com/)
- [Deployed on Vercel](https://vercel.com/)   

## 🛠️ Clone the project  

```bash
git clone https://github.com/thajucp123/seashore-mailer.git
```

```bash
npm install nodemailer express cors dotenv
```

## 🧑🏻‍💻 Environment Variables

create a `.env` file in the root directory and place your email username and password as below,

```env
EMAIL_USER=[your email id]
EMAIL_PASS=[your email password]
```

## ➤ API Reference

### Submit form

```http
POST /send-email
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`   | `string` | **Required**. Your name    |
| `email`  | `string` | **Required**. Your email   |
| `phone`  | `string` | **Required**. Your email   |
| `message`| `string` | **Required**. Your message |

```http
POST /newsletter
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`  | `string` | **Required**. Your email   |

## 🛠️ Deploy on Vercel  

Vercel only supports either Static sites or Serverless functions. So, in order to host our app as a serverless function, and the images to be served as static files, we need to add the following ```vercel.json``` file in the root directory. Also, make sure to add the environment variables manually in the Vercel project settings as well.

```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/public/(.*)",
      "dest": "/public/$1"
    },
    {
      "src": "/send-email",
      "dest": "app.js"
    },
    {
      "src": "/newsletter",
      "dest": "app.js"
    },
    {
      "src": "/(.*)",
      "dest": "app.js"
    }
  ]
}
```

## 🙇 Author

#### Thajudeen CP

- LinkedIn: [@thaju-fakrudheen](https://www.linkedin.com/in/thaju-fakrudheen/)
- Github: [@thajucp123](https://github.com/thajucp123)