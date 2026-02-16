import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // 保護 dashboard 路徑
      if (req.nextUrl.pathname.startsWith('/dashboard')) {
        return token !== null
      }
      return true
    },
  },
})

export const config = {
  matcher: ['/dashboard/:path*', '/api/assessments/:path*'],
}
