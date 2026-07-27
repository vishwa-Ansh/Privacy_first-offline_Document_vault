# 📂 Document Vault

> A modern, privacy-first, 100% offline document management application built with React Native and Expo.

Store, organize, and access your important documents securely without relying on any cloud service.

---

# ✨ Overview

Document Vault is a local-first document manager designed for users who value privacy.

Unlike traditional document storage applications, this app **never uploads your files to any server**.

Everything stays on your own device.

- 🔒 Privacy First
- 📱 Offline Only
- 🚫 No Cloud
- 🚫 No Backend
- 🚫 No Login
- 🚫 No Tracking

---

# 🎯 Vision

Most document management apps depend on cloud storage.

Document Vault follows a different philosophy.

> **Your documents belong to you, not to a server.**

The application is designed to provide a premium document management experience while ensuring that every file remains on the user's device.

---

# ✨ Features

## 📁 Folder Management

Organize documents into categories.

- Identity
- Banking
- Education
- Government
- Health
- Vehicle
- Property
- Office
- Insurance
- Travel
- Personal
- Others

---

## 🪪 Document Types

Supports storing

- Aadhaar Card
- PAN Card
- Passport
- Driving License
- Voter ID
- Birth Certificate
- Income Certificate
- Caste Certificate
- Domicile Certificate
- RC
- Vehicle Insurance
- Medical Reports
- Prescriptions
- Degree
- Marksheet
- Passbook
- Cheque Book
- Property Documents
- Tax Documents
- PDFs
- Images

---

## 🖼 Modern UI

- Glassmorphism Design
- Light Theme
- Dark Theme (Planned)
- Smooth Animations
- Premium Card View
- Folder Preview
- Thumbnail Support

---

## 📄 Supported Files

- JPG
- JPEG
- PNG
- WEBP
- PDF

Future

- DOCX
- XLSX
- PPTX

---

# 🔒 Privacy

This project is built around one principle.

**Everything remains on your device.**

The application

✅ Stores files locally

✅ Never uploads files

✅ Never tracks users

✅ Never requires internet

✅ Never creates an online account

---

# 🛠 Technology Stack

Frontend

- React Native
- Expo
- Expo Router
- TypeScript

Storage

- Expo FileSystem
- Expo SQLite
- MMKV (optional)

UI

- React Native Skia
- Reanimated
- Gesture Handler

Utilities

- Expo Image Picker
- Expo Image Manipulator

Future

- ML Kit OCR
- OpenCV
- Biometric Authentication

---

# 📂 Project Structure

```
DocumentVault/

│
├── app/
│   ├── (tabs)/
│   ├── onboarding/
│   ├── home/
│   ├── folder/
│   ├── document/
│   ├── search/
│   ├── settings/
│   └── _layout.tsx
│
├── assets/
│   ├── fonts/
│   ├── icons/
│   ├── images/
│   └── animations/
│
├── components/
│   ├── cards/
│   ├── buttons/
│   ├── folder/
│   ├── search/
│   ├── common/
│   └── ui/
│
├── constants/
│
├── database/
│   ├── schema.ts
│   ├── sqlite.ts
│   └── queries.ts
│
├── hooks/
│
├── navigation/
│
├── services/
│   ├── thumbnail.ts
│   ├── search.ts
│   └── storage.ts
│
├── types/
│
├── utils/
│
├── app.json
├── package.json
└── README.md
```

---

# 📂 Local Storage Structure

```
DocumentsVault/

│
├── Identity/
│   ├── Aadhaar Card.jpg
│   ├── PAN Card.jpg
│   ├── Passport.pdf
│   ├── Driving License.jpg
│   └── Voter ID.jpg
│
├── Banking/
│   ├── SBI Passbook.pdf
│   ├── Cheque Book.jpg
│   └── Bank Statement.pdf
│
├── Education/
│   ├── 10th.pdf
│   ├── 12th.pdf
│   ├── Degree.pdf
│   ├── Certificate.pdf
│   └── Resume.pdf
│
├── Government/
│   ├── Income Certificate.pdf
│   ├── Caste Certificate.pdf
│   ├── Domicile.pdf
│   └── Ration Card.jpg
│
├── Health/
│   ├── Medical Report.pdf
│   ├── Prescription.jpg
│   ├── ABHA Card.pdf
│   └── Insurance.pdf
│
├── Vehicle/
│   ├── RC.pdf
│   ├── Insurance.pdf
│   ├── PUC.pdf
│   └── Challan.pdf
│
├── Property/
│
├── Office/
│
├── Personal/
│
└── Others/
```

---

# 📱 Application Flow

```
Splash

↓

Onboarding

↓

Permission

↓

Folder Selection

↓

Home

↓

Folder

↓

Document

↓

Preview

↓

Search

↓

Settings
```

---

# 🚀 Future Roadmap

### Phase 1

- Folder Management
- Local Storage
- PDF Support
- Image Support
- Search
- Favorites

### Phase 2

- Thumbnail Generation
- Card View
- Folder Cover Images
- Tags
- Recent Files

### Phase 3

- Offline OCR
- Automatic Document Detection
- Smart Search
- Document Scanner
- Auto Categorization

### Phase 4

- PIN Lock
- Fingerprint Unlock
- Face ID
- Secure Folder

---

# 📦 Installation

```bash
git clone https://github.com/your-username/document-vault.git

cd document-vault

npm install

npx expo start
```

---

# 🤝 Contributing

Contributions are welcome.

If you have ideas for improving the application, feel free to open an issue or submit a pull request.

---

# 📄 License

This project is licensed under the MIT License.

---

# ❤️ Philosophy

> Privacy is not a feature—it's the foundation.

Document Vault is built to ensure your personal documents remain exactly where they belong: **on your device, under your control.**