# Media Gallery Frontend

This is the **frontend application** for the Media Gallery project. It is built with:

- React
- Vite
- Tailwind CSS
- React Router

---

## 🚀 Requirements

- Node.js (for building only)

---

## 📦 Installation

1. Clone the repository.
2. Copy `.env.example` to `.env` and fill in your settings.
3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. To build for production:

    ```bash
    npm run build
    ```

6. Upload the `dist` folder to your web server.

---

## ⚙️ Environment Variables

| Variable               | Description                               |
|----------------------|---------------------------------|
| `VITE_API_BASE_URL`  | URL of the backend API           |
| `VITE_UPLOADS_URL`   | Base URL for uploaded images |

---

## 🛠️ Notes

- React Router's `basename` is set for `/demos/media-gallery/`.
- Images load from `VITE_UPLOADS_URL`.
- Routes may 404 on page reload unless proper **Apache rewrite rules** are used.

---

## 📄 License

See [LICENSE](LICENSE) for details.

