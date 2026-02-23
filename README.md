# ✈️ WanderLust: Full-Stack Travel Platform

WanderLust is a full-stack web application designed for travelers to discover, list, and review unique accommodations around the world. Built with the Mongoose model-view-controller (MVC) architecture, it offers a seamless experience for both property owners and travelers.

---

## 🚀 Features

- **User Authentication**: Secure signup and login using Passport.js.
- **Manage Listings**: Users can create, edit, and delete their own accommodation listings.
- **Reviews & Ratings**: Share experiences with a robust review system and star ratings.
- **Cloud Image Storage**: High-quality listing images managed via Cloudinary.
- **Interactive Maps**: (Integration in progress) Visualizing listing locations.
- **Flash Messaging**: Real-time feedback for user actions (success/error).

---

## 🛠️ Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-A91E50?style=for-the-badge&logo=ejs&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

---

## 📦 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/jayfinaviya/WanderLust.git
   cd MAJORPROJECT
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory and add:
   ```env
   ATLASDB_URL=your_mongodb_atlas_url
   SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_cloudinary_key
   CLOUD_API_SECRET=your_cloudinary_secret
   ```

4. **Run the Application**
   ```bash
   node app.js
   ```
   The app will be running at `http://localhost:8080`.

---

## 📂 Project Structure

```text
MAJORPROJECT/
├── controllers/    # Route controllers (Logic)
├── models/         # Database schemas (Mongoose)
├── routes/         # Express routes
├── views/          # EJS templates
├── public/         # Static assets (CSS, JS, Images)
├── utils/          # Utility functions and error handling
└── app.js          # Entry point
```

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

---

## 📄 License

This project is licensed under the ISC License.

---
*Created with ❤️ by Jay Finaviya*
