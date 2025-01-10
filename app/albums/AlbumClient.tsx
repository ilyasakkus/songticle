import Link from 'next/link'

interface Album {
  artists: {
    id: string
    name: string
  }
}

interface Props {
  album: Album
}

const AlbumClient = ({ album }: Props) => (
  <Link 
    href={`/artists/${album.artists.id}`}
    className="text-xl text-primary hover:underline mb-2 inline-block"
  >
    {album.artists.name}
  </Link> 
)

export default AlbumClient 