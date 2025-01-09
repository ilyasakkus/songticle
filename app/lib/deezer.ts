import https from 'https';

const RAPID_API_KEY = 'd0ae159158msh252d03370e660d8p125f2djsn4ba29578ca04';
const RAPID_API_HOST = 'deezerdevs-deezer.p.rapidapi.com';




interface DeezerTrack {
  id: number;
  title: string;
  title_short: string;
  title_version: string;
  duration: string;
  preview: string;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  rank: string;
  artist: {
    id: number;
    name: string;
    picture_small: string;
    picture_medium: string;
  };
  album: {
    id: number;
    title: string;
    cover_medium: string;
  };
}

interface DeezerSearchResponse {
  data: DeezerTrack[];
  total: number;
  next?: string;
}

function makeRequest(path: string): Promise<DeezerSearchResponse> {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      hostname: RAPID_API_HOST,
      port: null,
      path: path,
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': RAPID_API_HOST
      }
    };

    const req = https.request(options, (res) => {
      const chunks: Buffer[] = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const body = Buffer.concat(chunks);
        try {
          const data = JSON.parse(body.toString());
          resolve(data);
        } catch {
          reject(new Error('Failed to parse response'));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

export async function searchDeezerArtist(query: string) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      hostname: 'deezerdevs-deezer.p.rapidapi.com',
      port: null,
      path: `/search?q=${encodeURIComponent(query)}`,
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': RAPID_API_HOST
      }
    };

    const req = https.request(options, (res) => {
      const chunks: Buffer[] = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const body = Buffer.concat(chunks);
        try {
          const data = JSON.parse(body.toString());
          console.log('Raw Deezer response:', data);
          if (!data || !data.data) {
            resolve({ data: [] });
          } else {
            const results = data.data.map((item: any) => ({
              track: {
                id: item.id,
                title: item.title,
                title_short: item.title_short,
                duration: item.duration,
                preview: item.preview,
                explicit_lyrics: item.explicit_lyrics,
                rank: item.rank
              },
              artist: {
                id: item.artist.id,
                name: item.artist.name,
                picture: item.artist.picture,
                picture_small: item.artist.picture_small,
                picture_medium: item.artist.picture_medium,
                picture_big: item.artist.picture_big,
                picture_xl: item.artist.picture_xl,
                link: item.artist.link
              },
              album: {
                id: item.album.id,
                title: item.album.title,
                cover: item.album.cover,
                cover_small: item.album.cover_small,
                cover_medium: item.album.cover_medium,
                cover_big: item.album.cover_big,
                cover_xl: item.album.cover_xl,
                md5_image: item.album.md5_image
              }
            }));
            resolve({ data: results });
          }
        } catch (err) {
          console.error('Failed to parse response:', err);
          reject(err);
        }
      });
    });

    req.on('error', (error) => {
      console.error('Request error:', error);
      reject(error);
    });

    req.end();
  });
}
