# Skill Bridge - 商业级技能迁移平台

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 设置环境变量
cp .env.example .env.local
# 编辑 .env.local 添加你的 API keys

# 初始化数据库
npx prisma migrate dev

# 启动开发服务器
npm run dev
```

## 💰 商业模式

### 定价策略
- **Free**: $0/月 - 3次评估/月
- **Pro**: $12/月 - 无限评估 + AI辅导
- **Team**: $39/月 - 团队功能 + API

### 收入来源
1. **订阅收入** (主要)
2. **教育联盟** (Udemy/Coursera 20-40%佣金)
3. **企业咨询** ($5000+/项目)

## 🛠 技术栈

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (Neon) + Prisma
- **Auth**: NextAuth.js (Google + Email)
- **Payments**: Stripe
- **UI**: Tailwind CSS + Lucide Icons
- **Visualization**: React Flow

## 📁 项目结构

```
app/
├── (marketing)/      # 营销页面
│   ├── page.tsx      # Landing Page
│   └── pricing/      # 定价页面
├── api/
│   ├── auth/         # NextAuth 路由
│   ├── checkout/     # Stripe 支付
│   └── recommend/    # 技能推荐 API
├── dashboard/        # 用户仪表盘
├── graph/           # 技能图谱
├── globals.css
└── layout.tsx

components/
├── SkillGraph.tsx   # 交互式图谱
└── ui/              # UI 组件

lib/
├── auth.ts          # 认证配置
├── stripe.ts        # Stripe 配置
├── skills.ts        # 技能数据
└── prisma.ts        # Prisma 客户端

prisma/
└── schema.prisma    # 数据库模型
```

## 🔑 环境变量

```bash
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Stripe
STRIPE_SECRET_KEY="sk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PRICE_PRO="price_..."

# Email (可选)
EMAIL_SERVER="smtp://..."
EMAIL_FROM="Skill Bridge <noreply@skillbridge.ai>"
```

## 🚀 部署到 Vercel

1. 连接 GitHub 仓库到 Vercel
2. 添加环境变量
3. 部署

## 📊 变现策略

1. **SEO 内容营销** - 博客文章获取自然流量
2. **产品引导转化** - 免费用户 -> Pro 订阅
3. **合作伙伴** - 与在线课程平台分成
4. **LinkedIn 广告** - 精准投放职业人群

## 📄 License

MIT © Skill Bridge
