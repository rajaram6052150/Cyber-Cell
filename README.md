# 🛡️ Debit Freeze Automation System

This project is a secure full-stack application built with **Angular (frontend)** and **PHP (backend)** to automate the **debit freeze process on suspicious bank accounts**, based on reports submitted by **Cyber Security Authorities**.

> 🔐 The system uses **JWT Authentication**, integrates with a **MySQL database**, and allows uploading of CSR (Cyber Security Reports) for validation and processing.

---

## 🚀 Features

- 🔐 Secure **Login/Signup with JWT**
- 📤 Upload CSR Reports (PDF/CSV)
- 🏦 Automatically mark flagged accounts for **debit freeze**
- 📄 Dashboard to view processed, pending, and frozen accounts
- 🧾 Admin and Auditor role-based access
- 🗃️ Persistent storage with **MySQL**
- 📊 Audit logs for every freeze/unfreeze operation

---

## 🧱 Tech Stack

| Layer         | Technology          |
|---------------|---------------------|
| Frontend      | Angular 15+         |
| Backend       | PHP (Laravel/Slim)  |
| Auth          | JSON Web Tokens     |
| Database      | MySQL               |
| Storage       | File system / AWS S3 (optional) |
| API Protocol  | RESTful             |

---

## 🔧 Setup Instructions

### ✅ Prerequisites

- Node.js + npm
- Angular CLI
- PHP 8+
- Composer
- MySQL Server

---

### 🔹 Frontend (Angular)

```bash
cd frontend
npm install
ng serve --open
