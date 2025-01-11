async function getServerSideProps (context) {
  const { req } = context
  const cookies = await req.cookies()
  const authToken = cookies.get('sb-wxyzxkgugqfofypuzeth-auth-token')

  if (!authToken) {
    // Handle the case where the auth token is missing
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  // ... existing code to fetch album links ...
} 