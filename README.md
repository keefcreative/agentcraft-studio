# 🧠 AgentCraft Studio

A desktop development assistant that lets you build software step-by-step using prompt engineering, AI agents, and a human-in-the-loop design flow.

Built with:
- Electron + Vite
- React + TailwindCSS
- OpenAI / Claude (API key required)
- Local file system and project syncing

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/YOUR_USERNAME/agentcraft-studio.git
cd agentcraft-studio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create `.env` File
```
OPENAI_API_KEY=your-api-key-here
```

### 4. Run in Dev Mode
```bash
npm run dev
```
This launches both the Vite dev server and the Electron app.

---

## 📦 Build for Production
```bash
npm run build
```
Creates a distributable app for your platform using Electron Builder.

Installers will be saved in:
```
/release/
```

---

## 💾 Project Folder Syncing
- Projects are created in your system’s **Documents/AI-Workspaces** folder.
- `.rules` files are saved locally per project.

---

## 🛠 Features
- Splash screen with load animation
- Project workspace selector
- YAML rules uploader
- AI-generated steps and prompt timeline
- Code refinement + review
- Persistent API key storage via localStorage or `.env`

---

## 👤 Author
Built by [@keefcreative](https://github.com/keefcreative)

---

## 📝 License
MIT License
