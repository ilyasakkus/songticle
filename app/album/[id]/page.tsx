import { GetServerSideProps } from 'next'

type Props = {
  params: {
    id: string
  }
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.params as { id: string }

  // Perform any data fetching or processing here

  return {
    props: {
      params: {
        id
      }
    }
  }
}

export default function Page({ params }: Props) {
  const { id } = params

  // Render your component using the id
  return (
    <div>
      <h1>Album ID: {id}</h1>
      {/* Add more content here */}
    </div>
  )
} 