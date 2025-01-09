import { use } from 'react'

type Props = {
  params: {
    id: string
  }
}

async function fetchAlbumData(id: string) {
  // Replace with your actual data fetching logic
  const response = await fetch(`https://api.example.com/albums/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch album data')
  }
  return response.json()
}

export default async function Page({ params }: Props) {
  const { id } = params

  // Fetch data directly in the component
  const albumData = await fetchAlbumData(id)

  return (
    <div>
      <h1>Album ID: {id}</h1>
      <h2>Album Title: {albumData.title}</h2>
      {/* Render more album details here */}
    </div>
  )
} 