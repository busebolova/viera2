# GitHub CMS Kurulum Rehberi

VIERA Construction web sitesi için GitHub tabanlı içerik yönetim sistemi kurulum adımları.

## 1. GitHub Personal Access Token Oluşturma

1. GitHub > Settings > Developer settings > Personal access tokens > Tokens (classic)
2. "Generate new token (classic)"
3. Scope: **repo** (Full control)
4. Token'ı kopyalayın

## 2. Vercel Environment Variables

Vercel Dashboard > Settings > Environment Variables:

| Değişken | Değer |
|----------|-------|
| `GITHUB_TOKEN` | ghp_... |
| `GITHUB_OWNER` | kullanici-adiniz |
| `GITHUB_REPO` | repo-adiniz |
| `GITHUB_BRANCH` | main |
| `ADMIN_PASSWORD` | guclu-sifre |

## 3. Content Klasörü

GitHub reponuzda `content/` klasörü:
- home.json
- about.json
- contact.json
- services.json
- projects.json

## 4. Test

1. `/admin/login` sayfasına gidin
2. ADMIN_PASSWORD ile giriş yapın
3. İçerik düzenleyin ve kaydedin
4. GitHub'da commit'i görün

## Güvenlik

- Token'ı public repository'de paylaşmayın
- ADMIN_PASSWORD güçlü olsun
- Token yetkilerini minimum tutun
