# MCH Indicator — គេហទំព័របញ្ចូលទិន្នន័យ

ឯកសារ៖ `index.html` (គេហទំព័រ) · `Code.gs` (ផ្នែករក្សាទុកទិន្នន័យក្នុង Google Sheet)

## ជំហាន ១ — បង្កើតកន្លែងរក្សាទុកទិន្នន័យ (Google Sheet)
1. បង្កើត Google Sheet ថ្មី → **Extensions → Apps Script**។
2. លុបកូដដែលមាន Paste `Code.gs` ហើយប្តូរ `ACCESS_CODE` ជាលេខកូដរបស់អ្នក។
3. **Deploy → New deployment → ⚙ Web app** · Execute as: **Me** · Who has access: **Anyone** → Deploy (អនុញ្ញាតតាម Google)។
4. ចម្លង **Web app URL** (បញ្ចប់ដោយ `/exec`)។

## ជំហាន ២ — កែ index.html
- ជំនួស `PASTE_APPS_SCRIPT_URL_HERE` ដោយ URL ខាងលើ។
- ជំនួសបញ្ជី `HC=[...]` (៥៦ ឈ្មោះ) ដោយឈ្មោះមណ្ឌលសុខភាពពិតប្រាកដ។

## ជំហាន ៣ — ដាក់លើ GitHub Pages
1. GitHub → New repository (ឧ. `mch-form`) → Upload `index.html`។
2. **Settings → Pages → Deploy from a branch → main / (root) → Save**។
3. តំណគេហទំព័រ៖ `https://<username>.github.io/mch-form/` — ចែកឲ្យមណ្ឌលសុខភាព ជាមួយលេខកូដ។

## ចំណាំ
- ប្រសិនបើកែ `Code.gs` ក្រោយ Deploy ត្រូវ **Deploy → Manage deployments → Edit → New version**។
- Repository សាធារណៈ (public) នឹងបង្ហាញឈ្មោះមណ្ឌលក្នុង `index.html`។ លេខកូដមិននៅក្នុង GitHub ទេ ប៉ុន្តែអ្នកដឹងលេខកូដអាចបញ្ចូលជំនួសមណ្ឌលផ្សេងបាន។
- ទិន្នន័យ ១ ជួរ = ១ មណ្ឌល × ១ ខែ ក្នុងសន្លឹក `Data`។
