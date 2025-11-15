# Local Development Setup - PHP Installation Guide

PHP is not currently installed on your Mac. Here are your options:

## Option 1: Install Homebrew + PHP (Recommended)

**Step 1: Install Homebrew**
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After installation, follow any instructions it gives you (might need to add brew to your PATH).

**Step 2: Install PHP**
```bash
brew install php
```

**Step 3: Verify Installation**
```bash
php --version
```

**Step 4: Start Local Server**
```bash
cd "/Users/user/Documents/Coding/Code Ninjas/Photo Gallery"
php -S localhost:8000
```

Then visit: `http://localhost:8000`

